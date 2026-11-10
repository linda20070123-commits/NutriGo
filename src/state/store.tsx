import { createContext, useContext, useEffect, useMemo, useReducer, type Dispatch, type ReactNode } from "react";
import { ALL_FOODS } from "../data/foods";
import { normalizeSubscription, rewardProgress, startTrial, startVip } from "../lib/membership";
import type {
  ActivityLevel,
  BodyMetrics,
  FoodInput,
  HealthGoal,
  MealOccasion,
  RewardProgress,
  SubscriptionStatus,
  UnitId,
  View,
} from "../types";

const STORAGE_KEY = "nutrigo-state-v1";
const QUANTITY_VERSION = 2;

export interface AppState {
  view: View;
  step: number;
  occasion: MealOccasion;
  inputs: Record<string, FoodInput>;
  body: BodyMetrics;
  plan: string[];
  quantityVersion: number;
  completedAt: number | null;
  /** Membership tier and its validity window. */
  subscription: SubscriptionStatus;
  /** Mealboxes accumulated towards the 10/20 reward milestones. */
  rewardBoxes: number;
  /** Product id currently open in the meal booking modal. */
  bookingProductId: string | null;
}

type Action =
  | { type: "nav"; view: View; step?: number }
  | { type: "step"; step: number }
  | { type: "occasion"; occasion: MealOccasion }
  | { type: "quantity"; id: string; quantity: string }
  | { type: "unit"; id: string; unit: UnitId }
  | { type: "preset" }
  | { type: "reset-intake" }
  | { type: "body"; patch: Partial<BodyMetrics> }
  | { type: "toggle-plan"; id: string }
  | { type: "subscribe"; tier: "trial" | "vip" }
  | { type: "cancel-subscription" }
  | { type: "open-booking"; productId: string }
  | { type: "close-booking" }
  | { type: "confirm-booking"; boxes: number };

const SAMPLE: Record<string, FoodInput> = {
  rice: { quantity: "2", unit: "fist" },
  poultry: { quantity: "1.5", unit: "palm" },
  greens: { quantity: "1", unit: "fist" },
  fruit: { quantity: "1", unit: "fist" },
  oil: { quantity: "1", unit: "thumb" },
  bubble: { quantity: "1", unit: "can" },
  chocolate: { quantity: "1", unit: "pack" },
};

function blankInputs(): Record<string, FoodInput> {
  return Object.fromEntries(ALL_FOODS.map((food) => [food.id, { quantity: "0", unit: food.units[0] }]));
}

export const initialBody: BodyMetrics = {
  heightCm: "",
  weightKg: "",
  age: "",
  gender: "",
  activity: "sedentary",
  goal: "maintain",
};

function initialState(): AppState {
  return {
    view: "home",
    step: 0,
    occasion: "daily",
    inputs: blankInputs(),
    body: initialBody,
    plan: [],
    quantityVersion: QUANTITY_VERSION,
    completedAt: null,
    subscription: { tier: "none", startedAt: null, expiresAt: null },
    rewardBoxes: 0,
    bookingProductId: null,
  };
}

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "nav":
      return {
        ...state,
        view: action.view,
        step: action.step === undefined ? state.step : action.step,
        // Finishing the 5-step log lands on the report: stamp it so the mascot can celebrate.
        completedAt: action.view === "report" && state.view !== "report" ? Date.now() : state.completedAt,
      };
    case "step":
      return { ...state, step: action.step };
    case "occasion":
      return { ...state, occasion: action.occasion };
    case "quantity":
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.id]: { ...state.inputs[action.id], quantity: action.quantity },
        },
      };
    case "unit":
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.id]: { ...state.inputs[action.id], unit: action.unit },
        },
      };
    case "preset": {
      const inputs = blankInputs();
      for (const [id, value] of Object.entries(SAMPLE)) inputs[id] = value;
      return { ...state, inputs, occasion: "daily", step: 4, view: "calculator" };
    }
    case "reset-intake":
      return { ...state, inputs: blankInputs(), step: 0 };
    case "body":
      return { ...state, body: { ...state.body, ...action.patch } };
    case "toggle-plan": {
      const plan = state.plan.includes(action.id)
        ? state.plan.filter((id) => id !== action.id)
        : [...state.plan, action.id];
      return { ...state, plan };
    }
    case "subscribe": {
      const subscription = action.tier === "trial" ? startTrial() : startVip();
      return { ...state, subscription };
    }
    case "cancel-subscription":
      return { ...state, subscription: { tier: "none", startedAt: null, expiresAt: null } };
    case "open-booking":
      return { ...state, bookingProductId: action.productId };
    case "close-booking":
      return { ...state, bookingProductId: null };
    case "confirm-booking":
      return {
        ...state,
        // The modal stays open so it can show the confirmation state; the
        // caller closes it explicitly once the member has read it.
        rewardBoxes: state.rewardBoxes + action.boxes,
      };
    default:
      return state;
  }
}

function isOccasion(value: unknown): value is MealOccasion {
  return value === "daily" || value === "breakfast" || value === "lunch" || value === "dinner" || value === "afternoon";
}

function isView(value: unknown): value is View {
  return value === "home" || value === "calculator" || value === "bmi" || value === "report" || value === "membership";
}

function isActivity(value: unknown): value is ActivityLevel {
  return value === "sedentary" || value === "light" || value === "moderate" || value === "active" || value === "very_active";
}

function isGoal(value: unknown): value is HealthGoal {
  return value === "lose" || value === "maintain" || value === "gain" || value === "wellness";
}

function hydrate(): AppState {
  const base = initialState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return base;
    const saved = JSON.parse(raw) as Partial<AppState>;
    const inputs = { ...base.inputs };
    const keepSavedQuantities = saved.quantityVersion === QUANTITY_VERSION;
    if (keepSavedQuantities && saved.inputs && typeof saved.inputs === "object") {
      for (const food of ALL_FOODS) {
        const entry = saved.inputs[food.id];
        if (!entry) continue;
        const unit = food.units.find((option) => option === entry.unit) ?? food.units[0];
        inputs[food.id] = {
          quantity: typeof entry.quantity === "string" && entry.quantity !== "" ? entry.quantity : "0",
          unit,
        };
      }
    }
    return {
      view: isView(saved.view) ? saved.view : "home",
      step: typeof saved.step === "number" && saved.step >= 0 && saved.step <= 4 ? saved.step : 0,
      occasion: isOccasion(saved.occasion) ? saved.occasion : "daily",
      inputs,
      quantityVersion: QUANTITY_VERSION,
      body: {
        heightCm: typeof saved.body?.heightCm === "string" ? saved.body.heightCm : "",
        weightKg: typeof saved.body?.weightKg === "string" ? saved.body.weightKg : "",
        age: typeof saved.body?.age === "string" ? saved.body.age : "",
        gender: saved.body?.gender === "male" || saved.body?.gender === "female" ? saved.body.gender : "",
        activity: isActivity(saved.body?.activity) ? saved.body.activity : "sedentary",
        goal: isGoal(saved.body?.goal) ? saved.body.goal : "maintain",
      },
      plan: Array.isArray(saved.plan) ? saved.plan.filter((id) => typeof id === "string") : [],
      completedAt: null,
      subscription: normalizeSubscription(readSubscription(saved.subscription)),
      rewardBoxes:
        typeof saved.rewardBoxes === "number" && Number.isFinite(saved.rewardBoxes) && saved.rewardBoxes > 0
          ? Math.floor(saved.rewardBoxes)
          : 0,
      bookingProductId: null,
    };
  } catch {
    return base;
  }
}

function readSubscription(value: unknown): SubscriptionStatus {
  if (!value || typeof value !== "object") {
    return { tier: "none", startedAt: null, expiresAt: null };
  }
  const candidate = value as Partial<SubscriptionStatus>;
  const tier = candidate.tier;
  if (tier !== "trial" && tier !== "vip") {
    return { tier: "none", startedAt: null, expiresAt: null };
  }
  return {
    tier,
    startedAt: typeof candidate.startedAt === "string" ? candidate.startedAt : null,
    expiresAt: typeof candidate.expiresAt === "string" ? candidate.expiresAt : null,
  };
}

interface StoreValue {
  state: AppState;
  dispatch: Dispatch<Action>;
  /** The subscription with expired tiers already normalised away. */
  subscription: SubscriptionStatus;
  /** Reward tracker derived from the accumulated mealbox count. */
  rewards: RewardProgress;
}

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, hydrate);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const value = useMemo(
    () => ({
      state,
      dispatch,
      subscription: normalizeSubscription(state.subscription),
      rewards: rewardProgress(state.rewardBoxes),
    }),
    [state],
  );
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreValue {
  const value = useContext(StoreContext);
  if (!value) throw new Error("useStore must be used inside StoreProvider");
  return value;
}
