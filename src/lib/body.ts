import type { ActivityLevel, BodyMetrics, BodyResult, HealthGoal } from "../types";

export const ACTIVITY_OPTIONS: { id: ActivityLevel; label: string; factor: number; detail: string }[] = [
  { id: "sedentary", label: "Desk commute", factor: 1.2, detail: "Mostly seated, short walks to the station" },
  { id: "light", label: "Lightly active", factor: 1.375, detail: "A daily walk or easy movement on top of the commute" },
  { id: "moderate", label: "Moderately active", factor: 1.55, detail: "Training or being on your feet most days" },
  { id: "active", label: "Training regularly", factor: 1.725, detail: "Hard sessions several days a week" },
  { id: "very_active", label: "Athlete-level", factor: 1.9, detail: "Very hard training or a physical job plus training" },
];

export const GOAL_OPTIONS: { id: HealthGoal; label: string; detail: string }[] = [
  { id: "lose", label: "Lose weight", detail: "A moderate deficit, about 400 kcal under maintenance" },
  { id: "maintain", label: "Maintain", detail: "Eat around your maintenance energy" },
  { id: "gain", label: "Build muscle", detail: "A small surplus, about 300 kcal, with a higher protein band" },
  { id: "wellness", label: "Long-term wellness", detail: "Maintenance energy, with an eye on sodium, fiber, and sugars" },
];

export function parseBody(metrics: BodyMetrics): BodyResult | null {
  const heightCm = Number(metrics.heightCm);
  const weightKg = Number(metrics.weightKg);
  const age = Number(metrics.age);
  if (!metrics.gender) return null;
  if (!Number.isFinite(heightCm) || heightCm < 120 || heightCm > 230) return null;
  if (!Number.isFinite(weightKg) || weightKg < 30 || weightKg > 250) return null;
  if (!Number.isFinite(age) || age < 18 || age > 90) return null;

  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  const sexConstant = metrics.gender === "male" ? 5 : -161;
  const bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + sexConstant;
  const activity = ACTIVITY_OPTIONS.find((item) => item.id === metrics.activity) ?? ACTIVITY_OPTIONS[0];
  const tdee = bmr * activity.factor;
  const goal = GOAL_OPTIONS.find((item) => item.id === metrics.goal) ?? GOAL_OPTIONS[1];

  let targetCalories = tdee;
  let targetLabel = "Maintenance";
  if (goal.id === "lose") {
    targetCalories = Math.max(bmr, tdee - 400);
    targetLabel = "Weight-loss target";
  } else if (goal.id === "gain") {
    targetCalories = tdee + 300;
    targetLabel = "Muscle-gain target";
  } else if (goal.id === "wellness") {
    targetLabel = "Wellness target";
  }

  const category = bmiCategory(bmi);
  return {
    bmi,
    bmr,
    tdee,
    category: category.label,
    categoryDetail: category.detail,
    targetCalories,
    targetLabel,
    fitnessProtein: metrics.goal === "gain" || metrics.activity === "active" || metrics.activity === "very_active",
  };
}

function bmiCategory(bmi: number): { label: string; detail: string } {
  if (bmi < 18.5) {
    return {
      label: "Underweight",
      detail: "Below 18.5 on the Hong Kong adult BMI bands. Strength and regular meals matter more than cutting.",
    };
  }
  if (bmi < 23) {
    return {
      label: "Normal range",
      detail: "18.5–22.9 on the Hong Kong adult BMI bands used for Asian populations.",
    };
  }
  if (bmi < 25) {
    return {
      label: "Overweight",
      detail: "23–24.9 is the Hong Kong increased-risk band, even though some Western charts still call this normal.",
    };
  }
  return {
    label: "Obese",
    detail: "25 or above on the Hong Kong adult bands. A modest calorie deficit and a higher-protein lunch are the practical first levers.",
  };
}
