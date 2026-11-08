import { PROFILE_PER_100G } from "../data/profileNutrients";
import type { MealOccasion, NutritionResult } from "../types";
import { grams, round1 } from "./format";

export interface RadarAxis {
  key: string;
  axis: string;
  you: number;
  target: number;
  actualLabel: string;
  goalLabel: string;
  color: string;
}

const SHARE: Record<MealOccasion, number> = {
  daily: 1,
  breakfast: 0.25,
  lunch: 0.35,
  dinner: 0.3,
  afternoon: 0.1,
};

const DAILY = {
  fiber: 25,
  vitamin: 120,
  mineral: 80,
  healthyFat: 25,
  proteinReference: 60,
};

function adequacy(actual: number, goal: number): number {
  if (goal <= 0) return 0;
  return Math.max(0, Math.min(100, (actual / goal) * 100));
}

export function profileTotals(nutrition: NutritionResult) {
  return nutrition.lines.reduce(
    (sum, line) => {
      const density = PROFILE_PER_100G[line.id];
      if (!density) return sum;
      const factor = line.grams / 100;
      sum.fiber += density.fiber * factor;
      sum.healthyFat += density.healthyFat * factor;
      sum.vitamin += density.vitamin * factor;
      sum.mineral += density.mineral * factor;
      return sum;
    },
    { fiber: 0, healthyFat: 0, vitamin: 0, mineral: 0 },
  );
}

export function buildRadar(
  nutrition: NutritionResult,
  occasion: MealOccasion,
  weightKg: number | null,
  fitness: boolean,
): RadarAxis[] {
  const share = SHARE[occasion];
  const profile = profileTotals(nutrition);
  const proteinGoal = (weightKg && weightKg > 0 ? weightKg * (fitness ? 1.6 : 1) : DAILY.proteinReference) * share;
  const fiberGoal = DAILY.fiber * share;
  const vitaminGoal = DAILY.vitamin * share;
  const mineralGoal = DAILY.mineral * share;
  const fatGoal = DAILY.healthyFat * share;
  const protein = nutrition.totals.protein;

  return [
    {
      key: "protein",
      axis: "Protein",
      you: round1(adequacy(protein, proteinGoal)),
      target: 100,
      actualLabel: grams(protein),
      goalLabel: grams(proteinGoal),
      color: "#8b3dff",
    },
    {
      key: "fiber",
      axis: "Fiber",
      you: round1(adequacy(profile.fiber, fiberGoal)),
      target: 100,
      actualLabel: grams(profile.fiber),
      goalLabel: grams(fiberGoal),
      color: "#1f9d55",
    },
    {
      key: "vitamins",
      axis: "Vitamins",
      you: round1(adequacy(profile.vitamin, vitaminGoal)),
      target: 100,
      actualLabel: `${Math.round(profile.vitamin)} pts`,
      goalLabel: `${Math.round(vitaminGoal)} pts`,
      color: "#e2a100",
    },
    {
      key: "minerals",
      axis: "Minerals",
      you: round1(adequacy(profile.mineral, mineralGoal)),
      target: 100,
      actualLabel: `${Math.round(profile.mineral)} pts`,
      goalLabel: `${Math.round(mineralGoal)} pts`,
      color: "#1f8fff",
    },
    {
      key: "healthyFats",
      axis: "Healthy fats",
      you: round1(adequacy(profile.healthyFat, fatGoal)),
      target: 100,
      actualLabel: grams(profile.healthyFat),
      goalLabel: grams(fatGoal),
      color: "#ff6b35",
    },
  ];
}
