import { latinClass, useI18n } from "../i18n/language";
import { bmiBandKey, localizeAdviceMetric, localizeAdviceTitle } from "../i18n/tools";
import { buildAdvice, calorieBalance } from "../lib/advice";
import { ACTIVITY_OPTIONS, GOAL_OPTIONS, parseBody } from "../lib/body";
import { kcal, pct, round1 } from "../lib/format";
import { evaluateIntake, hasIntake } from "../lib/nutrition";
import { buildRadar } from "../lib/radar";
import { matchProducts } from "../lib/recommend";
import { useStore } from "../state/store";
import type { Gender } from "../types";
import { NutritionRadar } from "./NutritionRadar";
import { ProductMatchList } from "./ProductCard";
import { DataModuleTabs } from "./DataModuleTabs";

export function BmiPage() {
  const { state, dispatch } = useStore();
  const { locale, tools } = useI18n();
  const t = tools.bmi;
  const result = parseBody(state.body);
  const logged = hasIntake(state.inputs);
  const nutrition = evaluateIntake(state.inputs, result?.fitnessProtein ?? false);
  const balance = calorieBalance(nutrition, result, state.occasion);
  const advice = result && logged ? buildAdvice(nutrition, result, state.occasion) : [];
  const matches =
    result && logged
      ? matchProducts({
          nutrition,
          occasion: state.occasion,
          goal: state.body.goal,
          activity: state.body.activity,
          balance,
          weightKg: Number(state.body.weightKg),
          fitness: result.fitnessProtein,
        })
      : [];
  const axes =
    result && logged
      ? buildRadar(nutrition, state.occasion, Number(state.body.weightKg), result.fitnessProtein)
      : [];

  const patch = (partial: Partial<typeof state.body>) => dispatch({ type: "body", patch: partial });

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <DataModuleTabs />
      <p className={`text-xs font-semibold text-coral-600 ${latinClass(locale)}`}>{t.kicker}</p>
      <h1 className="mt-2 max-w-2xl font-serif text-4xl text-forest-900">{t.title}</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-mute">{t.intro}</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <form
          className="rounded-3xl border border-sand-200 bg-white p-5 shadow-sm sm:p-6"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="grid gap-4 sm:grid-cols-3">
            <Field
              label={t.height}
              suffix="cm"
              value={state.body.heightCm}
              onChange={(heightCm) => patch({ heightCm })}
              hint="120–230"
            />
            <Field
              label={t.weight}
              suffix="kg"
              value={state.body.weightKg}
              onChange={(weightKg) => patch({ weightKg })}
              hint="30–250"
            />
            <Field label={t.age} suffix={t.years} value={state.body.age} onChange={(age) => patch({ age })} hint="18–90" />
          </div>

          <fieldset className="mt-5">
            <legend className={`text-xs font-semibold text-mute ${latinClass(locale)}`}>{t.sex}</legend>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {(
                [
                  ["female", t.female],
                  ["male", t.male],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => patch({ gender: id satisfies Gender })}
                  className={`rounded-2xl px-3 py-3 text-sm font-semibold ${
                    state.body.gender === id ? "bg-forest-700 text-white" : "bg-sand-50 text-ink"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-5">
            <legend className={`text-xs font-semibold text-mute ${latinClass(locale)}`}>{t.activity}</legend>
            <div className="mt-2 space-y-2">
              {ACTIVITY_OPTIONS.map((option) => (
                <label
                  key={option.id}
                  className={`flex cursor-pointer items-start gap-3 rounded-2xl px-3 py-3 ${
                    state.body.activity === option.id ? "bg-forest-50 ring-1 ring-forest-200" : "bg-sand-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="activity"
                    className="mt-1"
                    checked={state.body.activity === option.id}
                    onChange={() => patch({ activity: option.id })}
                  />
                  <span>
                    <span className="block text-sm font-semibold">
                      {t.activities[option.id].label} · ×{option.factor}
                    </span>
                    <span className="mt-0.5 block text-xs leading-5 text-mute">{t.activities[option.id].detail}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-5">
            <legend className={`text-xs font-semibold text-mute ${latinClass(locale)}`}>{t.goal}</legend>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {GOAL_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => patch({ goal: option.id })}
                  className={`rounded-2xl px-3 py-3 text-left ${
                    state.body.goal === option.id ? "bg-coral-500 text-white" : "bg-sand-50 text-ink"
                  }`}
                >
                  <span className="block text-sm font-semibold">{t.goals[option.id].label}</span>
                  <span className={`mt-1 block text-xs leading-5 ${state.body.goal === option.id ? "text-white/90" : "text-mute"}`}>
                    {t.goals[option.id].detail}
                  </span>
                </button>
              ))}
            </div>
          </fieldset>
        </form>

        <div className="space-y-4">
          {result ? (
            <div className="rounded-3xl bg-forest-800 p-6 text-sand-50">
              <p className={`text-xs text-forest-200 ${latinClass(locale)}`}>{t.hk}</p>
              <p className="mt-2 font-serif text-5xl">{round1(result.bmi).toFixed(1)}</p>
              <p className="mt-1 text-lg text-white">{t.bands[bmiBandKey(result.bmi)].label}</p>
              <p className="mt-3 text-sm leading-6 text-forest-100">{t.bands[bmiBandKey(result.bmi)].detail}</p>
              <div className="relative mt-5 h-2 rounded-full bg-white/15">
                <div className="absolute inset-y-0 left-[17.5%] w-[22.5%] rounded-full bg-forest-300/80" />
                <div
                  className="absolute top-1/2 size-3.5 -translate-y-1/2 rounded-full bg-coral-500 ring-2 ring-white"
                  style={{ left: `calc(${Math.min(100, Math.max(0, ((result.bmi - 15) / 20) * 100))}% - 7px)` }}
                />
              </div>
              <p className="mt-2 text-[11px] text-forest-200">{t.scale}</p>
              <dl className="mt-6 grid grid-cols-3 gap-3 text-center">
                <Metric label={t.bmr} value={kcal(result.bmr)} />
                <Metric label={t.tdee} value={kcal(result.tdee)} />
                <Metric label={t.target} value={kcal(result.targetCalories)} />
              </dl>
              <p className="mt-4 text-xs leading-5 text-forest-100">
                {t.targets[state.body.goal]}. {result.fitnessProtein ? t.proteinFit : t.proteinClassic}
              </p>
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-sand-300 bg-white p-6 text-sm leading-6 text-mute">
              {t.empty}
            </div>
          )}

          <div className="rounded-3xl border border-sand-200 bg-white p-5">
            <h2 className="font-serif text-2xl text-forest-900">{t.versus}</h2>
            {logged && result ? (
              <>
                <p className="mt-3 text-sm leading-6 text-ink">
                  {t.loggedLine
                    .replace("{energy}", kcal(nutrition.totals.energy))
                    .replace("{budget}", kcal(balance.budget))
                    .replace("{diff}", kcal(Math.abs(balance.delta)))
                    .replace("{dir}", balance.delta >= 0 ? t.over : t.under)}
                </p>
                <ul className="mt-4 space-y-2 text-sm leading-6">
                  {advice.slice(0, 3).map((item) => (
                    <li key={item.title} className="rounded-2xl bg-sand-50 px-3 py-2">
                      <span className="font-semibold">{localizeAdviceTitle(locale, item.title)}. </span>
                      {localizeAdviceMetric(locale, item.metric)}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => dispatch({ type: "nav", view: "report" })}
                  className="mt-4 rounded-full bg-forest-700 px-4 py-2.5 text-sm font-semibold text-white"
                >
                  {t.openReport}
                </button>
              </>
            ) : (
              <p className="mt-3 text-sm leading-6 text-mute">
                {logged ? t.ready : t.none}{" "}
                <button
                  type="button"
                  onClick={() => dispatch({ type: "nav", view: "calculator" })}
                  className="font-semibold text-forest-800"
                >
                  {t.openCalc}
                </button>
                {logged ? null : <span className="mt-2 block text-xs">{t.after}</span>}
              </p>
            )}
          </div>
        </div>
      </div>

      {axes.length > 0 && (
        <section className="mt-8">
          <h2 className="font-serif text-3xl text-forest-900">{t.radarTitle}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-mute">{t.radarBody}</p>
          <div className="mt-4">
            <NutritionRadar axes={axes} />
          </div>
        </section>
      )}

      {matches.length > 0 && (
        <section className="mt-8">
          <h2 className="font-serif text-3xl text-forest-900">{t.matchTitle}</h2>
          <p className="mt-2 text-sm text-mute">{t.matchBody.replace("{pct}", pct(nutrition.ratios.protein))}</p>
          <div className="mt-4">
            <ProductMatchList matches={matches} />
          </div>
        </section>
      )}
    </div>
  );
}

function Field({
  label,
  suffix,
  value,
  hint,
  onChange,
}: {
  label: string;
  suffix: string;
  value: string;
  hint: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <FieldLabel label={label} suffix={suffix} />
      <input
        inputMode="decimal"
        value={value}
        placeholder={hint}
        aria-label={label}
        onChange={(event) => onChange(event.target.value.replace(/[^\d.]/g, "").slice(0, 6))}
        className="mt-1.5 w-full rounded-2xl border border-sand-300 bg-sand-50 px-3 py-3 text-lg outline-none focus:border-forest-600"
      />
    </label>
  );
}

function FieldLabel({ label, suffix }: { label: string; suffix: string }) {
  const { locale } = useI18n();
  return (
    <span className={`text-xs font-semibold text-mute ${latinClass(locale)}`}>
      {label} ({suffix})
    </span>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/10 px-2 py-3">
      <dt className="text-[11px] tracking-wide text-forest-200 uppercase">{label}</dt>
      <dd className="mt-1 text-sm font-semibold">{value}</dd>
    </div>
  );
}
