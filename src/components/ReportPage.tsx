import { FOOD_STEPS } from "../data/foods";
import { latinClass, useI18n } from "../i18n/language";
import { bmiBandKey, diagnosisText, localizeAdviceBody, localizeAdviceMetric, localizeAdviceTitle } from "../i18n/tools";
import { buildAdvice, calorieBalance } from "../lib/advice";
import { parseBody } from "../lib/body";
import { grams, kcal, pct, round1 } from "../lib/format";
import { evaluateIntake } from "../lib/nutrition";
import { matchProducts } from "../lib/recommend";
import { useStore } from "../state/store";
import { buildRadar } from "../lib/radar";
import { NutritionRadar } from "./NutritionRadar";
import { ProductMatchList } from "./ProductCard";
import { RatioTrack, StatusPill } from "./Status";

export function ReportPage() {
  const { state, dispatch } = useStore();
  const { locale, tools } = useI18n();
  const t = tools.report;
  const body = parseBody(state.body);
  const nutrition = evaluateIntake(state.inputs, body?.fitnessProtein ?? false);
  const balance = calorieBalance(nutrition, body, state.occasion);
  const advice = buildAdvice(nutrition, body, state.occasion);
  const matches = matchProducts({
    nutrition,
    occasion: state.occasion,
    goal: state.body.goal,
    activity: state.body.activity,
    balance,
    weightKg: body ? Number(state.body.weightKg) : null,
    fitness: body?.fitnessProtein ?? false,
  });
  const { totals, ratios } = nutrition;
  const axes = buildRadar(
    nutrition,
    state.occasion,
    body ? Number(state.body.weightKg) : null,
    body?.fitnessProtein ?? false,
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="no-print flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => dispatch({ type: "nav", view: "calculator" })}
          className="text-sm font-semibold text-forest-800"
        >
          {t.edit}
        </button>
        <button
          type="button"
          onClick={() => window.print()}
          className="rounded-full border border-sand-300 bg-white px-4 py-2 text-sm font-semibold"
        >
          {t.print}
        </button>
      </div>

      <article className="mt-4 rounded-[28px] border border-sand-200 bg-white px-5 py-7 shadow-[0_20px_50px_-36px_rgba(28,36,25,0.55)] sm:px-8">
        <p className={`text-xs font-semibold text-coral-600 ${latinClass(locale)}`}>{t.kicker}</p>
        <h1 className="mt-2 font-serif text-4xl leading-tight text-forest-900">{t.title}</h1>
        <p className="mt-2 text-mute">
          {tools.calc.occasions[state.occasion]} ·{" "}
          {new Date().toLocaleDateString(locale === "en" ? "en-HK" : locale, { dateStyle: "long" })}
          {body ? ` · BMI ${round1(body.bmi).toFixed(1)} · ${tools.bmi.bands[bmiBandKey(body.bmi)].label}` : ""}
        </p>

        <section className="mt-8">
          <h2 className="font-serif text-2xl text-forest-900">
            1. {state.occasion === "daily" ? t.daily : t.meal}
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Stat label={t.energy} value={kcal(totals.energy)} note={t.energyNote} />
            <Stat label={t.carbs} value={grams(totals.carbs)} note={`${pct(ratios.carbs)} ${t.ofEnergy} · ${t.whoCarbs}`} />
            <Stat
              label={t.protein}
              value={grams(totals.protein)}
              note={`${pct(ratios.protein)} ${t.ofEnergy} · ${t.targetBand.replace("{min}", String(nutrition.proteinBand.min)).replace("{max}", String(nutrition.proteinBand.max))}`}
            />
            <Stat label={t.fat} value={grams(totals.fat)} note={`${pct(ratios.fat)} ${t.ofEnergy} · ${t.whoFat}`} />
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <Stat
              label={t.sugars}
              value={grams(totals.addedSugars)}
              note={`${pct(ratios.freeSugars)} ${t.ofEnergy} · ${t.sugarNote}`}
              alert={ratios.freeSugars > 10}
            />
            <Stat label={t.fruit} value={grams(totals.intrinsicSugars)} note={t.fruitNote} />
          </div>

          <div className="mt-6 space-y-5">
            <RatioRow label={t.carbs} value={ratios.carbs} start={45} end={75} />
            <RatioRow label={t.protein} value={ratios.protein} start={nutrition.proteinBand.min} end={nutrition.proteinBand.max} />
            <RatioRow label={t.fat} value={ratios.fat} start={15} end={30} />
            <RatioRow label={t.sugars} value={ratios.freeSugars} start={0} end={10} marker={5} />
          </div>
          <p className="mt-3 text-xs text-mute">{t.bandNote}</p>
        </section>

        <section className="mt-10">
          <h2 className="font-serif text-2xl text-forest-900">{t.profile}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-mute">
            {t.profileBody.replace(
              "{protein}",
              body ? (body.fitnessProtein ? "1.6 g/kg" : "1 g/kg") : locale === "en" ? "a 60 g reference day" : locale === "zh-CN" ? "每天 60 克参考" : "每天 60 克參考",
            )}
          </p>
          <div className="mt-4">
            <NutritionRadar axes={axes} />
          </div>
        </section>

        <section className="mt-10">
          <h2 className="font-serif text-2xl text-forest-900">2. {t.who}</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {nutrition.diagnoses.map((item) => {
              const copy = diagnosisText(tools, item.key, item.status, body?.fitnessProtein ?? false);
              const range = item.key === "freeSugars" ? t.ranges.sugars : item.key === "carbs" ? t.ranges.carbs : item.key === "fat" ? t.ranges.fat : item.rangeLabel;
              return (
              <div key={item.key} className="rounded-2xl border border-sand-200 p-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold">{t.labels[item.key]}</h3>
                  <StatusPill status={item.status} />
                </div>
                <p className="mt-2 text-sm font-medium text-forest-900">{copy.h}</p>
                <p className="mt-1 text-sm leading-6 text-mute">{copy.d}</p>
                <p className={`mt-3 text-xs text-mute ${latinClass(locale)}`}>
                  {pct(item.ratio)} · {range}
                </p>
              </div>
              );
            })}
          </div>
          {ratios.freeSugars > 10 && (
            <p className="mt-4 rounded-2xl bg-coral-50 px-4 py-3 text-sm leading-6 text-coral-600">{t.excess}</p>
          )}
        </section>

        <section className="mt-10">
          <h2 className="font-serif text-2xl text-forest-900">3. {t.guide}</h2>
          <div className="mt-4 space-y-3">
            {advice.map((item) => (
              <div key={item.title} className="rounded-2xl bg-sand-50 px-4 py-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-semibold text-forest-900">{localizeAdviceTitle(locale, item.title)}</h3>
                  <p className="text-sm font-semibold text-coral-600">{localizeAdviceMetric(locale, item.metric)}</p>
                </div>
                <p className="mt-2 text-sm leading-6 text-ink">{localizeAdviceBody(locale, item.body)}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-2xl border border-dashed border-sand-300 px-4 py-4 text-sm leading-6 text-mute">
            {body ? (
              t.compared.replace("{label}", tools.bmi.targets[state.body.goal]).replace("{budget}", kcal(balance.budget))
            ) : (
              <>
                {t.noBody}{" "}
                <button type="button" onClick={() => dispatch({ type: "nav", view: "bmi" })} className="font-semibold text-forest-800">
                  {t.addBody}
                </button>
              </>
            )}
          </div>
        </section>

        {nutrition.lines.length > 0 && (
          <section className="mt-10">
            <h2 className="font-serif text-2xl text-forest-900">{t.intake}</h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className={`text-xs text-mute ${latinClass(locale)}`}>
                  <tr>
                    <th className="py-2 pr-3 font-semibold">{t.food}</th>
                    <th className="py-2 pr-3 font-semibold">{t.weight}</th>
                    <th className="py-2 pr-3 font-semibold">{t.carbs}</th>
                    <th className="py-2 pr-3 font-semibold">{t.protein}</th>
                    <th className="py-2 pr-3 font-semibold">{t.fat}</th>
                    <th className="py-2 pr-3 font-semibold">{t.freeSugars}</th>
                    <th className="py-2 font-semibold">{t.energy}</th>
                  </tr>
                </thead>
                <tbody>
                  {nutrition.lines.map((line) => {
                    const step = FOOD_STEPS.find((item) => item.foods.some((food) => food.id === line.id));
                    return (
                    <tr key={line.id} className="border-t border-sand-200">
                      <td className="py-2 pr-3">
                        <span className="block font-medium">{tools.foods[line.id]?.name ?? line.name}</span>
                        <span className="text-xs text-mute">{step ? tools.steps[step.id].title : line.stepTitle}</span>
                      </td>
                      <td className="py-2 pr-3">{grams(line.grams)}</td>
                      <td className="py-2 pr-3">{grams(line.carbs)}</td>
                      <td className="py-2 pr-3">{grams(line.protein)}</td>
                      <td className="py-2 pr-3">{grams(line.fat)}</td>
                      <td className="py-2 pr-3">
                        {grams(line.addedSugars)}
                        {line.intrinsicSugars > 0 ? ` + ${grams(line.intrinsicSugars)} ${t.fruitBit}` : ""}
                      </td>
                      <td className="py-2">{kcal(line.energy)}</td>
                    </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </article>

      <section className="mt-8">
        <p className={`text-xs font-semibold text-coral-600 ${latinClass(locale)}`}>{t.recommend}</p>
        <h2 className="mt-2 font-serif text-3xl text-forest-900">4. {t.mealsTitle}</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-mute">{t.mealsBody}</p>
        <div className="mt-5">
          <ProductMatchList matches={matches} />
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value, note, alert = false }: { label: string; value: string; note: string; alert?: boolean }) {
  return (
    <div className={`rounded-2xl px-4 py-3 ${alert ? "bg-coral-50" : "bg-sand-50"}`}>
      <p className="text-xs tracking-wide text-mute uppercase">{label}</p>
      <p className={`mt-1 font-serif text-2xl ${alert ? "text-coral-600" : "text-forest-900"}`}>{value}</p>
      <p className="mt-1 text-xs leading-5 text-mute">{note}</p>
    </div>
  );
}

function RatioRow({
  label,
  value,
  start,
  end,
  marker,
}: {
  label: string;
  value: number;
  start: number;
  end: number;
  marker?: number;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span className="font-semibold text-forest-800">{pct(value)}</span>
      </div>
      <RatioTrack value={value} bandStart={start} bandEnd={end} marker={marker} />
    </div>
  );
}
