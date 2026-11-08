import { PRODUCTS } from "../data/products";
import type {
  ActivityLevel,
  CalorieBalance,
  HealthGoal,
  MealOccasion,
  NutritionResult,
  ProductMatch,
} from "../types";
import { buildRadar } from "./radar";

interface MatchInput {
  nutrition: NutritionResult;
  occasion: MealOccasion;
  goal: HealthGoal;
  activity: ActivityLevel;
  balance: CalorieBalance;
  weightKg: number | null;
  fitness: boolean;
}

export function matchProducts(input: MatchInput): ProductMatch[] {
  const { nutrition, occasion, goal, balance, weightKg, fitness } = input;
  const { ratios, totals } = nutrition;
  const scored = PRODUCTS.map((product) => ({ product, score: 0, reasons: [] as string[] }));
  const axes = buildRadar(nutrition, occasion, weightKg, fitness);
  const axis = (key: string) => axes.find((item) => item.key === key)?.you ?? 0;

  const add = (id: string, points: number, reason: string) => {
    const row = scored.find((item) => item.product.id === id);
    if (!row) return;
    row.score += points;
    row.reasons.push(reason);
  };

  if (totals.energy <= 0) {
    const balanced = PRODUCTS.find((product) => product.id === "balanced");
    return balanced
      ? [{ product: balanced, reasons: ["No intake yet. This is the maintenance box to start a commute day from."] }]
      : [];
  }

  if (axis("protein") < 70 || ratios.protein < nutrition.proteinBand.min) {
    add("protein", 6, "Protein is short of the goal, which is the muscle-loss risk on this log.");
  } else if (goal === "gain" && ratios.protein < 20) {
    add("protein", 4, "A muscle goal needs a box with chicken and shrimp, not another low-protein lunch.");
  }

  if (axis("vitamins") < 75) {
    add("vitamin", 5, "Vitamin density is under the target. Greens, peppers, and kiwi close that gap.");
  }

  if (axis("fiber") < 70) {
    add("fiber", 5, "Fiber is under the 25 g day target. Roasted pumpkin, kale, colorful vegetables, and deep-sea cod over multi-grain rice close that gap.");
  }

  if (ratios.fat > 30 || ratios.freeSugars > 10 || balance.excessive) {
    add("lean", 6, "Fat, free sugars, or total energy is over the line, so the next box should be tighter.");
  } else if (goal === "lose") {
    add("lean", 3, "Weight management is the stated goal.");
  }

  const proteinCeiling = nutrition.proteinBand.fitness ? 25 : 35;
  const inRange =
    ratios.carbs >= 45 &&
    ratios.carbs <= 75 &&
    ratios.fat >= 15 &&
    ratios.fat <= 30 &&
    ratios.protein >= nutrition.proteinBand.min &&
    ratios.protein <= proteinCeiling &&
    ratios.freeSugars <= 10;

  if (inRange || goal === "maintain" || goal === "wellness") {
    add(
      "balanced",
      inRange ? 5 : 2,
      inRange
        ? "The macro split already fits the WHO bands. This is the maintenance plate."
        : "Daily maintenance is the goal, so the balanced box stays on the shortlist.",
    );
  }

  return scored
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score || a.product.order - b.product.order)
    .slice(0, 2)
    .map((row) => ({ product: row.product, reasons: row.reasons }));
}
