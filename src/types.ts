export type UnitId = "g" | "fist" | "palm" | "thumb" | "pack" | "can" | "slice";

export type Gender = "female" | "male";

export type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "very_active";

export type HealthGoal = "lose" | "maintain" | "gain" | "wellness";

export type MealOccasion = "daily" | "breakfast" | "lunch" | "dinner" | "afternoon";

export type View = "home" | "calculator" | "bmi" | "report" | "membership";

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

/* ------------------------------------------------------------------ */
/* Membership & meal booking                                           */
/* ------------------------------------------------------------------ */

/** A single bookable dish inside a SilentBite box. */
export interface MealItem {
  id: string;
  /** English dish name. Localized variants live in the i18n tables. */
  name: string;
  /** Short description of the dish for the picker. */
  note: string;
  kcal: number;
  /** Grams of dietary fiber. */
  fiber: number;
  protein: number;
  carbs: number;
  fat: number;
}

/** A bookable box: a headline dish plus the sides that travel with it. */
export interface MealBox {
  id: string;
  /** Matches the Product id so existing cards can open the booking modal. */
  productId: string;
  title: string;
  image: string;
  kcal: number;
  protein: number;
  fiber: number;
  /** The default dish, plus swappable variations for step 2. */
  variants: MealItem[];
  /** Sides and extras that are part of the box. */
  ingredients: string[];
}

/** Where the member currently sits in the subscription lifecycle. */
export type SubscriptionTier = "none" | "trial" | "vip";

export interface SubscriptionStatus {
  tier: SubscriptionTier;
  /** ISO timestamp for when the current period ends. */
  startedAt: string | null;
  expiresAt: string | null;
}

/** Milestone tracking for the 10/20 mealbox reward system. */
export interface RewardProgress {
  /** Mealboxes accumulated towards the next milestone. */
  boxes: number;
  /** HK$ value of the next milestone coupon. */
  nextMilestone: 10 | 20;
  /** HK$ value of the next coupon after `nextMilestone`. */
  nextValue: number;
  /** HK$ value already unlocked. */
  unlockedValue: number;
  /** Milestones the member has already reached. */
  unlockedMilestones: number[];
}

/** How often the member wants boxes delivered. */
export type PlanFrequency = "weekly" | "monthly";

export interface BookingPlan {
  frequency: PlanFrequency;
  /** Number of boxes per delivery cycle. */
  quantity: number;
  /** HK$ per box before any member discount. */
  unitPrice: number;
  /** HK$ taken off the subtotal by membership benefits. */
  discount: number;
}

/* ------------------------------------------------------------------ */
/* Booking windows & the day / meal-time matrix                        */
/* ------------------------------------------------------------------ */

/** Which meal sessions a single date is booked for. */
export type MealType = "lunch" | "dinner" | "both";

/** One row of the schedule matrix. */
export interface DaySchedule {
  /** Localized day name, e.g. "Thursday". */
  dateStr: string;
  /** Day of week, 0 = Sunday .. 6 = Saturday. */
  dayOfWeek: number;
  /** Whether the member has booked this date at all. */
  selected: boolean;
  /** Which sessions are booked on this date. */
  mealType: MealType;
}

/** One of the two fixed weekly ordering windows. */
export interface BookingWindow {
  /** "A" is the Wednesday cutoff, "B" is the Sunday cutoff. */
  id: "A" | "B";
  /** Days this window can deliver, as weekday numbers. */
  days: number[];
  /** The weekday the order has to be placed by. */
  cutoffDay: number;
}

/** A window together with the resolved dates it covers. */
export interface WindowDates {
  window: BookingWindow;
  /** Dates available in this window, already resolved against today. */
  dates: { dateStr: string; dayOfWeek: number; date: Date }[];
}

export interface BookingModalProps {
  /** The box being booked. Null when the modal is closed. */
  meal: MealBox | null;
  onClose: () => void;
  onConfirm: (booking: BookingSelection) => void;
}

/** Everything the checkout summary needs to render. */
export interface BookingSelection {
  meal: MealBox;
  item: MealItem;
  plan: BookingPlan;
  subtotal: number;
  total: number;
  rewardBoxesBefore: number;
  rewardBoxesAfter: number;
  /** The dates and sessions the member actually booked. */
  schedule: DaySchedule[];
  /** Total number of mealboxes the schedule adds up to. */
  totalMealCount: number;
}

