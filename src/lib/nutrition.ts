import { ALL_FOODS, FOOD_STEPS } from "../data/foods";
import { multiplierFor } from "../data/units";
import type {
  BandStatus,
  FoodInput,
  LineItem,
  MacroDiagnosis,
  MacroRatios,
  MealOccasion,
  NutrientTotals,
  NutritionResult,
} from "../types";

const PROTEIN_CLASSIC = { min: 10, max: 15 };
const PROTEIN_FITNESS = { min: 15, max: 25 };

export function gramsFromInput(foodId: string, input: FoodInput | undefined): number {
  if (!input) return 0;
  const food = ALL_FOODS.find((item) => item.id === foodId);
  if (!food) return 0;
  const quantity = Number(input.quantity);
  if (!Number.isFinite(quantity) || quantity <= 0) return 0;
  return quantity * multiplierFor(input.unit, food.unitMultipliers);
}

function emptyTotals(): NutrientTotals {
  return {
    carbs: 0,
    protein: 0,
    fat: 0,
    addedSugars: 0,
    intrinsicSugars: 0,
    energy: 0,
    grams: 0,
  };
}

export function evaluateIntake(
  inputs: Record<string, FoodInput>,
  fitnessProtein: boolean,
): NutritionResult {
  const lines: LineItem[] = [];

  for (const step of FOOD_STEPS) {
    for (const food of step.foods) {
      const grams = gramsFromInput(food.id, inputs[food.id]);
      if (grams <= 0) continue;
      const factor = grams / 100;
      const carbs = food.carbs * factor;
      const protein = food.protein * factor;
      const fat = food.fat * factor;
      const sugars = food.freeSugars * factor;
      lines.push({
        id: food.id,
        name: food.name,
        stepTitle: step.title,
        grams,
        carbs,
        protein,
        fat,
        addedSugars: food.sugarKind === "added" ? sugars : 0,
        intrinsicSugars: food.sugarKind === "intrinsic" ? sugars : 0,
        energy: carbs * 4 + protein * 4 + fat * 9,
      });
    }
  }

  const totals = lines.reduce((sum, line) => {
    sum.carbs += line.carbs;
    sum.protein += line.protein;
    sum.fat += line.fat;
    sum.addedSugars += line.addedSugars;
    sum.intrinsicSugars += line.intrinsicSugars;
    sum.energy += line.energy;
    sum.grams += line.grams;
    return sum;
  }, emptyTotals());

  const ratios = ratiosFrom(totals);
  const proteinBand = fitnessProtein ? PROTEIN_FITNESS : PROTEIN_CLASSIC;

  return {
    lines,
    totals,
    ratios,
    proteinBand: { ...proteinBand, fitness: fitnessProtein },
    diagnoses: diagnose(ratios, totals.energy, proteinBand, fitnessProtein),
  };
}

function ratiosFrom(totals: NutrientTotals): MacroRatios {
  if (totals.energy <= 0) {
    return { carbs: 0, protein: 0, fat: 0, freeSugars: 0 };
  }
  return {
    carbs: ((totals.carbs * 4) / totals.energy) * 100,
    protein: ((totals.protein * 4) / totals.energy) * 100,
    fat: ((totals.fat * 9) / totals.energy) * 100,
    freeSugars: ((totals.addedSugars * 4) / totals.energy) * 100,
  };
}

function diagnose(
  ratios: MacroRatios,
  energy: number,
  proteinBand: { min: number; max: number },
  fitnessProtein: boolean,
): MacroDiagnosis[] {
  if (energy <= 0) {
    return [
      emptyDiagnosis("carbs", "Carbohydrate", "45–75%"),
      emptyDiagnosis("protein", "Protein", fitnessProtein ? "15–25%" : "10–15%"),
      emptyDiagnosis("fat", "Fat", "15–30%"),
      emptyDiagnosis("freeSugars", "Free sugars", "≤ 10%, ideal ≤ 5%"),
    ];
  }

  return [
    carbDiagnosis(ratios.carbs),
    proteinDiagnosis(ratios.protein, proteinBand, fitnessProtein),
    fatDiagnosis(ratios.fat),
    sugarDiagnosis(ratios.freeSugars),
  ];
}

function emptyDiagnosis(
  key: MacroDiagnosis["key"],
  label: string,
  rangeLabel: string,
): MacroDiagnosis {
  return {
    key,
    label,
    ratio: 0,
    status: "empty",
    rangeLabel,
    headline: "No intake logged",
    detail: "Enter a quantity above zero in the calculator to score this marker.",
  };
}

function carbDiagnosis(ratio: number): MacroDiagnosis {
  const status: BandStatus = ratio < 45 ? "low" : ratio > 75 ? "high" : "ideal";
  const headline =
    status === "low"
      ? "Carbohydrate is under the WHO band"
      : status === "high"
        ? "Carbohydrate is above the WHO band"
        : "Carbohydrate is inside 45–75%";
  const detail =
    status === "low"
      ? "A very low carbohydrate share can make a commute day feel flat, especially if breakfast was skipped."
      : status === "high"
        ? "Most of this intake is starch or sugar. Pair the next plate with protein and vegetables."
        : "This share matches the WHO/FAO population range for carbohydrate.";
  return { key: "carbs", label: "Carbohydrate", ratio, status, rangeLabel: "45–75%", headline, detail };
}

function proteinDiagnosis(
  ratio: number,
  band: { min: number; max: number },
  fitness: boolean,
): MacroDiagnosis {
  const status: BandStatus = ratio < band.min ? "low" : ratio > band.max ? "high" : "ideal";
  const rangeLabel = fitness ? "15–25%" : "10–15%";
  const headline =
    status === "low"
      ? "Protein is below the target band"
      : status === "high"
        ? fitness
          ? "Protein is above the training band"
          : "Protein is above the classic 10–15% band"
        : fitness
          ? "Protein fits an active day"
          : "Protein is inside 10–15%";
  const detail = fitness
    ? "Because activity or a muscle goal is set, the protein band is relaxed from 10–15% to 15–25%."
    : "The classic WHO/FAO share is 10–15%. Training days can reasonably sit at 15–25%; set that in Body metrics if it applies.";
  return { key: "protein", label: "Protein", ratio, status, rangeLabel, headline, detail };
}

function fatDiagnosis(ratio: number): MacroDiagnosis {
  const status: BandStatus = ratio < 15 ? "low" : ratio > 30 ? "high" : "ideal";
  const headline =
    status === "low"
      ? "Fat is under 15%"
      : status === "high"
        ? "Fat is above the 30% line"
        : "Fat is inside 15–30%";
  const detail =
    status === "high"
      ? "Above 30% of energy, fat is flagged. Cooking oil, fried food, and full-sugar milk tea are the usual sources on this route."
      : status === "low"
        ? "Very low fat makes meals less satisfying and can shortchange fat-soluble vitamins."
        : "Fat is within the WHO/FAO range.";
  return { key: "fat", label: "Fat", ratio, status, rangeLabel: "15–30%", headline, detail };
}

function sugarDiagnosis(ratio: number): MacroDiagnosis {
  let status: BandStatus = "ideal";
  let headline = "Free sugars are at or under 5%";
  let detail = "This is the WHO ideal line for free sugars across the day.";
  if (ratio > 10) {
    status = "excess";
    headline = "Free sugars are over the 10% line";
    detail =
      "WHO treats more than 10% of energy from free sugars as a high intake. That pattern raises the chance of dental caries and makes insulin demand harder than it needs to be.";
  } else if (ratio > 5) {
    status = "acceptable";
    headline = "Free sugars are in the acceptable 5–10% band";
    detail = "Safe enough for a population guide, and still worth steering toward the 5% ideal.";
  }
  return {
    key: "freeSugars",
    label: "Free sugars",
    ratio,
    status,
    rangeLabel: "Ideal ≤ 5% · acceptable ≤ 10%",
    headline,
    detail,
  };
}

export function hasIntake(inputs: Record<string, FoodInput>): boolean {
  return ALL_FOODS.some((food) => gramsFromInput(food.id, inputs[food.id]) > 0);
}

export function occasionLabel(occasion: MealOccasion): string {
  switch (occasion) {
    case "daily":
      return "Full day";
    case "breakfast":
      return "Breakfast";
    case "lunch":
      return "Lunch";
    case "dinner":
      return "Dinner";
    case "afternoon":
      return "Afternoon";
  }
}
