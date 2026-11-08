import { FOOD_STEPS } from "../data/foods";
import { multiplierFor } from "../data/units";
import { latinClass, useI18n } from "../i18n/language";
import { grams, kcal, round1 } from "../lib/format";
import { evaluateIntake } from "../lib/nutrition";
import { parseBody } from "../lib/body";
import { useStore } from "../state/store";
import type { FoodItem, MealOccasion } from "../types";
import { DataModuleTabs } from "./DataModuleTabs";

const OCCASION_IDS: MealOccasion[] = ["daily", "breakfast", "lunch", "dinner", "afternoon"];

export function CalculatorPage() {
  const { state, dispatch } = useStore();
  const { locale, tools } = useI18n();
  const t = tools.calc;
  const step = FOOD_STEPS[state.step];
  const stepCopy = tools.steps[step.id];
  const body = parseBody(state.body);
  const preview = evaluateIntake(state.inputs, body?.fitnessProtein ?? false);

  const goNext = () => {
    if (state.step < FOOD_STEPS.length - 1) {
      dispatch({ type: "step", step: state.step + 1 });
      return;
    }
    dispatch({ type: "nav", view: "report" });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <DataModuleTabs />
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className={`text-xs font-semibold text-forest-700 ${latinClass(locale)}`}>{t.kicker}</p>
          <h1 className="mt-2 font-serif text-4xl text-forest-900">{t.title}</h1>
        </div>
        <div className="rounded-2xl bg-white px-4 py-3 text-right shadow-sm">
          <p className={`text-[11px] text-mute ${latinClass(locale)}`}>{t.running}</p>
          <p className="font-serif text-2xl text-forest-800">{kcal(preview.totals.energy)}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {OCCASION_IDS.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => dispatch({ type: "occasion", occasion: id })}
            className={`rounded-full px-3.5 py-2 text-sm font-medium ${
              state.occasion === id ? "bg-ink text-white" : "bg-white text-ink hover:bg-sand-100"
            }`}
          >
            {t.occasions[id]}
          </button>
        ))}
      </div>

      <div className="mt-6 rounded-3xl border border-sand-200 bg-white p-5 shadow-[0_16px_40px_-32px_rgba(28,36,25,0.5)] sm:p-6">
        <div className="flex items-center justify-between gap-3 text-sm">
          <p className="font-semibold text-forest-900">
            {t.step.replace("{n}", String(state.step + 1)).replace("{total}", String(FOOD_STEPS.length))}: {stepCopy.title}
          </p>
          <p className="text-mute">{stepCopy.kicker}</p>
        </div>
        <div className="mt-4 grid grid-cols-5 gap-2">
          {FOOD_STEPS.map((item, index) => {
            const active = index === state.step;
            const done = index < state.step;
            const tone = ["bg-leaf-500", "bg-ocean-500", "bg-sun-400", "bg-coral-500", "bg-berry-500"][index];
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => dispatch({ type: "step", step: index })}
                className="text-left"
                aria-current={active ? "step" : undefined}
              >
                <span className={`block h-2.5 rounded-full ${done || active ? tone : "bg-sand-200"} ${active ? "shadow-[0_0_16px_rgba(245,197,24,0.85)]" : ""}`} />
                <span className={`mt-1 block text-[11px] font-semibold ${active ? "text-forest-900" : "text-mute"}`}>
                  {index + 1}
                </span>
              </button>
            );
          })}
        </div>
        <div
          className="sr-only"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={5}
          aria-valuenow={state.step + 1}
          aria-label={t.step.replace("{n}", String(state.step + 1)).replace("{total}", String(FOOD_STEPS.length))}
        />

        <p className="sticky top-32 z-20 mt-4 rounded-2xl border border-coral-100 bg-coral-50 px-4 py-3 text-sm leading-6 text-coral-600 sm:top-24">
          {t.notice}
        </p>

        <div className="mt-5 space-y-4">
          {step.foods.map((food) => (
            <FoodRow key={food.id} food={food} />
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              disabled={state.step === 0}
              onClick={() => dispatch({ type: "step", step: state.step - 1 })}
              className="rounded-full border border-sand-300 px-4 py-2.5 text-sm font-semibold text-ink disabled:opacity-40"
            >
              {t.back}
            </button>
            <button
              type="button"
              onClick={() => dispatch({ type: "preset" })}
              className="rounded-full border border-sand-300 px-4 py-2.5 text-sm font-semibold text-forest-800"
            >
              {t.sample}
            </button>
            <button
              type="button"
              onClick={() => dispatch({ type: "reset-intake" })}
              className="rounded-full px-4 py-2.5 text-sm font-semibold text-mute"
            >
              {t.clear}
            </button>
          </div>
          <button
            type="button"
            onClick={goNext}
            className="rounded-full bg-coral-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-coral-600"
          >
            {state.step === FOOD_STEPS.length - 1 ? t.report : t.next}
          </button>
        </div>
      </div>

      <p className="mt-4 text-xs leading-5 text-mute">
        {t.footnote}
        {body?.fitnessProtein ? t.proteinFit : t.proteinClassic}
      </p>
    </div>
  );
}

function FoodRow({ food }: { food: FoodItem }) {
  const { state, dispatch } = useStore();
  const { locale, tools } = useI18n();
  const t = tools.calc;
  const copy = tools.foods[food.id];
  const input = state.inputs[food.id] ?? { quantity: "0", unit: food.units[0] };
  const quantity = Number(input.quantity);
  const valid = Number.isFinite(quantity) && quantity > 0;
  const gramsWeight = valid ? quantity * multiplierFor(input.unit, food.unitMultipliers) : 0;
  const hint = input.unit === "can" && copy?.can ? copy.can : tools.units[input.unit].hint;

  return (
    <div className="rounded-2xl border border-sand-200 bg-sand-50 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-ink">{copy?.name ?? food.name}</h2>
          <p className="mt-1 text-sm text-mute">{copy?.note ?? food.note}</p>
        </div>
        <p className="text-xs leading-5 text-mute">
          {t.per100} · {food.referenceKcal} kcal ref · C {food.carbs} · P {food.protein} · F {food.fat} · {t.sugars}{" "}
          {food.freeSugars}
          {food.sugarKind === "intrinsic" ? ` ${t.intrinsic}` : ""}
        </p>
      </div>

      <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-end">
        <label className="block lg:w-40">
          <span className={`text-xs font-semibold text-mute ${latinClass(locale)}`}>{t.quantity}</span>
          <input
            inputMode="decimal"
            value={input.quantity === "" ? "0" : input.quantity}
            aria-label={`${copy?.name ?? food.name} ${t.quantity}`}
            onChange={(event) =>
              dispatch({ type: "quantity", id: food.id, quantity: sanitizeQuantity(event.target.value) })
            }
            className="mt-1.5 w-full rounded-2xl border border-sand-300 bg-white px-3 py-3 text-lg outline-none focus:border-forest-600"
          />
        </label>
        <div className="flex-1">
          <p className={`text-xs font-semibold text-mute ${latinClass(locale)}`}>{t.measure}</p>
          <div className="mt-1.5 flex flex-wrap gap-2">
            {food.units.map((unit) => {
              const active = input.unit === unit;
              return (
                <button
                  key={unit}
                  type="button"
                  onClick={() => dispatch({ type: "unit", id: food.id, unit })}
                  className={`rounded-full px-3 py-2 text-sm font-semibold ${
                    active ? "bg-forest-700 text-white" : "bg-white text-forest-900 ring-1 ring-sand-300"
                  }`}
                >
                  {tools.units[unit].label}
                </button>
              );
            })}
          </div>
          <p className="mt-2 text-xs text-mute">
            {hint}
            {gramsWeight > 0 ? ` · ${t.counted.replace("{g}", grams(gramsWeight))}` : ""}
            {input.unit !== "g" && valid
              ? ` (${t.each.replace("{n}", String(round1(multiplierFor(input.unit, food.unitMultipliers))))})`
              : ""}
          </p>
        </div>
      </div>
    </div>
  );
}

function sanitizeQuantity(value: string): string {
  const cleaned = value.replace(/[^\d.]/g, "");
  if (cleaned === "" || cleaned === ".") return "0";
  const [wholeRaw, fraction] = cleaned.split(".");
  const whole = wholeRaw.replace(/^0+(?=\d)/, "").slice(0, 4);
  if (fraction === undefined) return whole === "" ? "0" : whole;
  return `${whole === "" ? "0" : whole}.${fraction.slice(0, 1)}`;
}
