export type UnitId = "g" | "fist" | "palm" | "thumb" | "pack" | "can" | "slice";

export type Gender = "female" | "male";

export type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "very_active";

export type HealthGoal = "lose" | "maintain" | "gain" | "wellness";

export type MealOccasion = "daily" | "breakfast" | "lunch" | "dinner" | "afternoon";

export type View = "home" | "calculator" | "bmi" | "report";

export type SugarKind = "none" | "added" | "intrinsic";

export interface FoodItem {
  id: string;
  name: string;
  note: string;
  /** Reference kcal per 100 g from the food table. Report energy uses Atwater factors. */
  referenceKcal: number;
  carbs: number;
  freeSugars: number;
  protein: number;
  fat: number;
  sugarKind: SugarKind;
  units: UnitId[];
  unitMultipliers?: Partial<Record<UnitId, number>>;
  unitNotes?: Partial<Record<UnitId, string>>;
}

export interface FoodStep {
  id: string;
  title: string;
  kicker: string;
  foods: FoodItem[];
}

export interface FoodInput {
  quantity: string;
  unit: UnitId;
}

export interface LineItem {
  id: string;
  name: string;
  stepTitle: string;
  grams: number;
  carbs: number;
  protein: number;
  fat: number;
  addedSugars: number;
  intrinsicSugars: number;
  energy: number;
}

export interface NutrientTotals {
  carbs: number;
  protein: number;
  fat: number;
  addedSugars: number;
  intrinsicSugars: number;
  energy: number;
  grams: number;
}

export interface MacroRatios {
  carbs: number;
  protein: number;
  fat: number;
  freeSugars: number;
}

export type BandStatus = "empty" | "low" | "ideal" | "acceptable" | "high" | "excess";

export interface MacroDiagnosis {
  key: "carbs" | "protein" | "fat" | "freeSugars";
  label: string;
  ratio: number;
  status: BandStatus;
  rangeLabel: string;
  headline: string;
  detail: string;
}

export interface NutritionResult {
  lines: LineItem[];
  totals: NutrientTotals;
  ratios: MacroRatios;
  proteinBand: { min: number; max: number; fitness: boolean };
  diagnoses: MacroDiagnosis[];
}

export interface BodyMetrics {
  heightCm: string;
  weightKg: string;
  age: string;
  gender: Gender | "";
  activity: ActivityLevel;
  goal: HealthGoal;
}

export interface BodyResult {
  bmi: number;
  bmr: number;
  tdee: number;
  category: string;
  categoryDetail: string;
  targetCalories: number;
  targetLabel: string;
  fitnessProtein: boolean;
}

export interface AdviceItem {
  title: string;
  metric: string;
  body: string;
  tone: "good" | "caution" | "alert";
}

export interface CalorieBalance {
  comparedWith: string;
  budget: number;
  delta: number;
  excessive: boolean;
  summary: string;
}

export interface Product {
  id: string;
  order: number;
  name: string;
  trigger: string;
  image: string;
  audience: string;
  pain: string;
  hook: string;
  ingredients: string[];
  kcal: number;
  carbs: number;
  protein: number;
  fat: number;
  sugarNote: string;
}

export interface ProductMatch {
  product: Product;
  reasons: string[];
}
