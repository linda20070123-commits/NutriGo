import { useEffect, useMemo, useState } from "react";
import { BOX_INGREDIENTS, COMMERCE, DISH_NAMES } from "../i18n/commerce";
import { latinClass, useI18n } from "../i18n/language";
import { parseBody } from "../lib/body";
import { kcal } from "../lib/format";
import { buildPlan, REWARD_MILESTONES, REWARD_VALUES } from "../lib/membership";
import { useStore } from "../state/store";
import type { BookingModalProps, BookingSelection, MealBox, MealItem, PlanFrequency } from "../types";

type Step = 1 | 2 | 3;

export function MealBookingModal({ meal, onClose, onConfirm }: BookingModalProps) {
  const { state, dispatch, subscription, rewards } = useStore();
  const { locale, m } = useI18n();
  const c = COMMERCE[locale].booking;

  const [step, setStep] = useState<Step>(1);
  const [frequency, setFrequency] = useState<PlanFrequency>("monthly");
  const [variantId, setVariantId] = useState<string>(meal?.variants[0]?.id ?? "");
  const [quantity, setQuantity] = useState(1);
  const [done, setDone] = useState(false);
  // Snapshot of the reward numbers taken when the order is confirmed, so the
  // success screen is not recomputed against the already-updated store.
  const [confirmed, setConfirmed] = useState<{ boxes: number; value: number } | null>(null);

  // Reset the flow whenever a new box is opened.
  useEffect(() => {
    if (!meal) return;
    setStep(1);
    setFrequency("monthly");
    setVariantId(meal.variants[0]?.id ?? "");
    setQuantity(1);
    setDone(false);
    setConfirmed(null);
  }, [meal]);

  // Lock body scroll while the modal is open.
  useEffect(() => {
    if (!meal) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [meal, onClose]);

  const item: MealItem | undefined = useMemo(
    () => meal?.variants.find((variant) => variant.id === variantId) ?? meal?.variants[0],
    [meal, variantId],
  );

  const plan = useMemo(() => buildPlan(frequency, subscription), [frequency, subscription]);

  // The order buys `quantity` cycles of the plan, so the subtotal multiplies out.
  const subtotal = plan.unitPrice * plan.quantity * quantity;
  const memberDiscount = plan.discount * quantity;

  // TDEE context for the macro sync panel.
  const body = parseBody(state.body);
  const budget = body?.targetCalories ?? null;
  const energyPct = budget && item ? Math.round((item.kcal / budget) * 100) : null;

  const rewardBoxesBefore = rewards.boxes;
  const rewardBoxesAfter = rewardBoxesBefore + plan.quantity * quantity;
  const unlockedNow = REWARD_MILESTONES.filter(
    (milestone) => rewardBoxesBefore < milestone && rewardBoxesAfter >= milestone,
  );
  const unlockedValue = unlockedNow.reduce((sum, milestone) => sum + REWARD_VALUES[milestone], 0);

  if (!meal || !item) return null;

  // Narrowed into locals so the nested confirm() closure keeps the types.
  const activeMeal: MealBox = meal;
  const activeItem: MealItem = item;

  const localizedIngredients = BOX_INGREDIENTS[locale][activeMeal.id] ?? activeMeal.ingredients;
  const dishName = DISH_NAMES[locale][activeItem.id] ?? activeItem.name;
  // The box name comes from the shared meal copy so it matches the catalogue card.
  const boxName = m.mealsById[activeMeal.productId]?.name ?? activeMeal.title;

  function confirm() {
    const selection: BookingSelection = {
      meal: activeMeal,
      item: activeItem,
      plan,
      subtotal,
      total: subtotal - memberDiscount,
      rewardBoxesBefore,
      rewardBoxesAfter,
    };
    dispatch({ type: "confirm-booking", boxes: plan.quantity * quantity });
    onConfirm(selection);
    setConfirmed({ boxes: rewardBoxesAfter, value: unlockedValue });
    setDone(true);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#1e3a32]/45 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      role="presentation"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={c.title}
        className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-[28px] bg-[#f6f1e6] shadow-2xl sm:rounded-[28px]"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Header + pre-selected meal preview */}
        <header className="sticky top-0 z-10 border-b border-sand-200 bg-[#f6f1e6]/95 px-5 py-4 backdrop-blur sm:px-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className={`text-xs font-semibold text-coral-600 ${latinClass(locale)}`}>
                {c.step.replace("{n}", String(step)).replace("{total}", "3")}
              </p>
              <h2 className="mt-1 font-serif text-2xl leading-snug text-forest-900">{c.title}</h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label={c.close}
              className="shrink-0 rounded-full border border-sand-300 bg-white px-3 py-2 text-sm font-semibold text-mute transition hover:bg-sand-50"
            >
              ✕
            </button>
          </div>

          {/* Step indicator */}
          <ol className="mt-4 flex items-center gap-2">
            {[c.steps.plan, c.steps.customize, c.steps.checkout].map((label, index) => {
              const number = (index + 1) as Step;
              const active = number === step;
              return (
                <li key={label} className="flex flex-1 items-center gap-2">
                  <span
                    className={`flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      active ? "bg-forest-700 text-white" : number < step ? "bg-forest-200 text-forest-800" : "bg-sand-200 text-mute"
                    }`}
                  >
                    {number}
                  </span>
                  <span className={`hidden text-xs font-semibold sm:block ${active ? "text-forest-900" : "text-mute"}`}>
                    {label}
                  </span>
                  {index < 2 && <span className="h-px flex-1 bg-sand-300" aria-hidden="true" />}
                </li>
              );
            })}
          </ol>
        </header>

        {done ? (
          <div className="px-5 py-10 text-center sm:px-7">
            <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-forest-100 text-3xl" aria-hidden="true">
              🎉
            </div>
            <p className="mt-5 font-serif text-2xl text-forest-900">{c.confirmed}</p>
            <p className="mt-2 text-sm text-mute">
              {c.rewardAfter.replace("{boxes}", String(confirmed?.boxes ?? rewardBoxesAfter))}
            </p>
            {(confirmed?.value ?? 0) > 0 && (
              <p className="mt-3 inline-block rounded-2xl bg-sun-400/20 px-4 py-2 text-sm font-bold text-amber-ink">
                {c.rewardUnlock.replace("{value}", String(confirmed?.value))}
              </p>
            )}
            <button
              type="button"
              onClick={onClose}
              className="mt-7 rounded-full bg-forest-700 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-forest-800"
            >
              {c.close}
            </button>
          </div>
        ) : (
          <>
            {/* Meal preview */}
            <div className="flex gap-4 border-b border-sand-200 px-5 py-5 sm:px-7">
              <img
                src={activeMeal.image}
                alt={activeMeal.title}
                className="size-24 shrink-0 rounded-2xl bg-[#d7f3e4] object-cover sm:size-28"
              />
              <div className="min-w-0 flex-1">
                <h3 className="font-serif text-xl leading-snug text-forest-900">{dishName}</h3>
                <p className="mt-1 text-xs text-mute">{boxName}</p>
                <dl className="mt-3 flex flex-wrap gap-2">
                  {[
                    [c.calories, kcal(activeItem.kcal)],
                    [c.protein, `${activeItem.protein} g`],
                    [c.fiber, `${activeItem.fiber} g`],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-xl bg-white px-2.5 py-1.5 text-center">
                      <dt className="text-[10px] text-mute uppercase">{label}</dt>
                      <dd className="text-xs font-bold text-forest-800">{value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-2 text-[11px] text-mute">
                  {c.ingredients}: {localizedIngredients.join(" · ")}
                </p>
              </div>
            </div>

            {/* Step 1: plan */}
            {step === 1 && (
              <section className="px-5 py-6 sm:px-7">
                <h3 className="font-serif text-xl text-forest-900">{c.steps.plan}</h3>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <PlanOption
                    active={frequency === "weekly"}
                    onSelect={() => setFrequency("weekly")}
                    title={c.planA.title}
                    detail={c.planA.detail}
                    price={c.planA.price}
                    note={c.planA.note}
                    badge={undefined}
                  />
                  <PlanOption
                    active={frequency === "monthly"}
                    onSelect={() => setFrequency("monthly")}
                    title={c.planB.title}
                    detail={c.planB.detail}
                    price={c.planB.price}
                    note={c.planB.note}
                    badge={c.planB.recommended}
                  />
                </div>

                <div className="mt-5 flex items-center gap-3 rounded-2xl bg-white px-4 py-3">
                  <label className="text-sm font-semibold text-forest-900" htmlFor="booking-quantity">
                    {c.quantity}
                  </label>
                  <input
                    id="booking-quantity"
                    type="number"
                    min={1}
                    max={6}
                    value={quantity}
                    onChange={(event) => setQuantity(Math.max(1, Math.min(6, Number(event.target.value) || 1)))}
                    className="w-20 rounded-xl border border-sand-300 bg-sand-50 px-3 py-2 text-sm outline-none focus:border-forest-600"
                  />
                  <span className="text-xs text-mute">
                    {plan.quantity} {c.boxesPerCycle}
                  </span>
                </div>
              </section>
            )}

            {/* Step 2: customization + macro sync */}
            {step === 2 && (
              <section className="px-5 py-6 sm:px-7">
                <h3 className="font-serif text-xl text-forest-900">{c.selectDish}</h3>
                <div className="mt-4 space-y-2">
                  {activeMeal.variants.map((variant) => {
                    const active = variant.id === activeItem.id;
                    const name = DISH_NAMES[locale][variant.id] ?? variant.name;
                    return (
                      <button
                        key={variant.id}
                        type="button"
                        onClick={() => setVariantId(variant.id)}
                        className={`flex w-full items-start gap-3 rounded-2xl border px-4 py-3 text-left transition ${
                          active ? "border-forest-600 bg-forest-50" : "border-sand-200 bg-white hover:bg-sand-50"
                        }`}
                      >
                        <span
                          className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border-2 ${
                            active ? "border-forest-700 bg-forest-700 text-white" : "border-sand-300"
                          }`}
                          aria-hidden="true"
                        >
                          {active && <span className="text-[10px] leading-none">✓</span>}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-semibold text-forest-900">{name}</span>
                          <span className="block text-xs leading-5 text-mute">{variant.note}</span>
                        </span>
                        <span className="shrink-0 text-right text-xs text-mute">
                          <span className="block font-bold text-forest-800">{kcal(variant.kcal)}</span>
                          <span className="block">{variant.fiber} g fiber</span>
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Macro sync against the daily budget */}
                <div className="mt-6 rounded-2xl bg-forest-50 p-4">
                  <h4 className="text-sm font-bold text-forest-900">{c.tdeeTitle}</h4>
                  <p className="mt-1 text-xs leading-5 text-mute">{c.tdeeBody}</p>
                  {energyPct !== null && budget !== null ? (
                    <>
                      <div className="mt-4">
                        <div className="flex items-baseline justify-between text-xs">
                          <span className="font-semibold text-forest-900">
                            {c.tdeeOfDay.replace("{pct}", `${energyPct}%`)}
                          </span>
                          <span className="text-mute">
                            {kcal(activeItem.kcal)} / {kcal(budget)} kcal
                          </span>
                        </div>
                        <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-white">
                          <div
                            className={`h-full rounded-full transition-[width] duration-500 ${
                              energyPct > 110 ? "bg-coral-500" : energyPct >= 60 ? "bg-forest-600" : "bg-sun-400"
                            }`}
                            style={{ width: `${Math.min(100, energyPct)}%` }}
                          />
                        </div>
                      </div>
                      <p className="mt-3 text-xs font-semibold text-forest-800">
                        {energyPct > 110
                          ? c.bunnyLine.warning
                          : energyPct >= 60
                            ? c.bunnyLine.optimal
                            : c.bunnyLine.hungry}
                      </p>
                    </>
                  ) : (
                    <p className="mt-3 text-xs leading-5 text-mute">{c.tdeeUnknown}</p>
                  )}
                </div>
              </section>
            )}

            {/* Step 3: checkout */}
            {step === 3 && (
              <section className="px-5 py-6 sm:px-7">
                <h3 className="font-serif text-xl text-forest-900">{c.summaryTitle}</h3>

                <dl className="mt-4 divide-y divide-sand-200 rounded-2xl bg-white px-4">
                  <Row label={`${plan.quantity} × HK$${plan.unitPrice}`} value={`HK$${subtotal}`} />
                  <Row
                    label={c.memberDiscount}
                    value={`−HK$${memberDiscount}`}
                    accent={memberDiscount > 0}
                  />
                  <Row label={c.total} value={`HK$${subtotal - memberDiscount}`} strong />
                </dl>

                {memberDiscount === 0 && (
                  <p className="mt-3 text-xs text-mute">
                    {discountNote(locale)}
                  </p>
                )}

                {/* Reward progress preview */}
                <div className="mt-5 rounded-2xl bg-forest-50 p-4">
                  <p className="text-sm font-semibold text-forest-900">
                    {c.rewardAdds.replace("{n}", String(plan.quantity * quantity))}
                  </p>
                  <p className="mt-1 text-xs text-mute">
                    {c.rewardAfter.replace("{boxes}", String(rewardBoxesAfter))}
                  </p>
                  {unlockedValue > 0 && (
                    <p className="mt-3 rounded-xl bg-sun-400/20 px-3 py-2 text-xs font-bold text-amber-ink">
                      {c.rewardUnlock.replace("{value}", String(unlockedValue))}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={confirm}
                  className="mt-6 w-full rounded-full bg-forest-700 px-6 py-4 text-sm font-bold text-white transition hover:bg-forest-800"
                >
                  {c.cta}
                </button>
              </section>
            )}

            {/* Step navigation */}
            <footer className="flex items-center justify-between gap-3 border-t border-sand-200 px-5 py-4 sm:px-7">
              <button
                type="button"
                onClick={() => (step === 1 ? onClose() : setStep((step - 1) as Step))}
                className="rounded-full border border-sand-300 bg-white px-5 py-2.5 text-sm font-semibold text-mute transition hover:bg-sand-50"
              >
                {step === 1 ? c.close : c.back}
              </button>
              {step < 3 && (
                <button
                  type="button"
                  onClick={() => setStep((step + 1) as Step)}
                  className="rounded-full bg-forest-700 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-forest-800"
                >
                  {c.next}
                </button>
              )}
            </footer>
          </>
        )}
      </div>
    </div>
  );
}

function PlanOption({
  active,
  onSelect,
  title,
  detail,
  price,
  note,
  badge,
}: {
  active: boolean;
  onSelect: () => void;
  title: string;
  detail: string;
  price: string;
  note: string;
  badge?: string;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`relative rounded-2xl border p-4 text-left transition ${
        active ? "border-forest-600 bg-forest-50 shadow-[0_10px_30px_-20px_rgba(28,36,25,0.6)]" : "border-sand-200 bg-white hover:bg-sand-50"
      }`}
    >
      {badge && (
        <span className="absolute right-3 top-3 rounded-full bg-forest-700 px-2.5 py-1 text-[10px] font-bold text-white">
          {badge}
        </span>
      )}
      <span className="block text-sm font-bold text-forest-900">{title}</span>
      <span className="mt-1 block text-xs text-mute">{detail}</span>
      <span className="mt-3 block font-serif text-xl text-forest-800">{price}</span>
      <span className="mt-1.5 block text-[11px] leading-4 text-mute">{note}</span>
    </button>
  );
}

function Row({
  label,
  value,
  strong = false,
  accent = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
  accent?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3 py-3">
      <dt className={`text-sm ${strong ? "font-bold text-forest-900" : "text-mute"}`}>{label}</dt>
      <dd
        className={`text-sm ${
          strong
            ? "font-serif text-xl font-bold text-forest-900"
            : accent
              ? "font-bold text-forest-700"
              : "font-semibold text-ink"
        }`}
      >
        {value}
      </dd>
    </div>
  );
}

function discountNote(locale: string): string {
  if (locale === "zh-CN") return "会员可减 HK$5／份，订阅会员后自动套用。";
  if (locale === "zh-HK") return "會員可減 HK$5／份，訂閱會員後自動套用。";
  return "Members save HK$5 per box. Subscribe to have it applied automatically.";
}
