import { useEffect, useMemo, useState } from "react";
import bunnyCheering from "../assets/bunny/cheering.png";
import bunnyHungry from "../assets/bunny/hungry.png";
import bunnyOptimal from "../assets/bunny/optimal.png";
import bunnyWarning from "../assets/bunny/warning.png";
import { latinClass, useI18n } from "../i18n/language";
import { parseBody } from "../lib/body";
import { kcal, pct } from "../lib/format";
import { evaluateIntake } from "../lib/nutrition";
import { useStore } from "../state/store";

type BunnyState = "optimal" | "hungry" | "warning" | "cheering";

const CHEER_MS = 6000;

/** Pre-rendered kawaii artwork, one PNG per mascot state. */
const BUNNY_ART: Record<BunnyState, { src: string; width: number; height: number }> = {
  optimal: { src: bunnyOptimal, width: 620, height: 1070 },
  hungry: { src: bunnyHungry, width: 620, height: 829 },
  warning: { src: bunnyWarning, width: 620, height: 1140 },
  cheering: { src: bunnyCheering, width: 620, height: 1064 },
};

export function NutriBunny() {
  const { state, dispatch } = useStore();
  const { locale, m } = useI18n();
  const [cheering, setCheering] = useState(false);

  const body = parseBody(state.body);
  const nutrition = useMemo(
    () => evaluateIntake(state.inputs, body?.fitnessProtein ?? false),
    [state.inputs, body?.fitnessProtein],
  );
  const logged = nutrition.totals.energy;
  const goal = body?.tdee ?? 0;
  const progressRatio = goal > 0 ? logged / goal : 0;

  // The 5-step log finishes on the report view: celebrate it for a few seconds.
  useEffect(() => {
    if (!state.completedAt) return;
    setCheering(true);
    const timer = window.setTimeout(() => setCheering(false), CHEER_MS);
    return () => window.clearTimeout(timer);
  }, [state.completedAt]);

  // Thresholds on progressRatio = loggedCalories / tdeeGoal:
  //   over 110%  -> warning
  //   80% - 110% -> optimal (the 80% - 100% band, plus the small over-100% tail)
  //   under 80%  -> hungry
  // With no profile yet there is nothing to be short of, so the bunny greets
  // with its NutriGo bento.
  const mascotState: BunnyState = cheering
    ? "cheering"
    : goal <= 0
      ? "optimal"
      : progressRatio > 1.1
        ? "warning"
        : progressRatio >= 0.8
          ? "optimal"
          : "hungry";

  const copy = m.bunny;
  const dialogue = copy.states[mascotState];

  function openCalculator() {
    dispatch({ type: "nav", view: "calculator", step: 0 });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openDashboard() {
    dispatch({ type: "nav", view: "bmi" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <section
      aria-label={copy.name}
      className="bunny-banner relative overflow-hidden rounded-[28px] border border-[#d7efe0] bg-[#f2f8f3] px-4 py-5 sm:px-6 sm:py-6"
    >
      <div className="pointer-events-none absolute -right-10 -top-12 size-48 rounded-full bg-[#dff2e6]/70" />
      <div className="pointer-events-none absolute -bottom-16 left-1/3 size-44 rounded-full bg-[#eaf6ee]/80" />

      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        <div className="order-2 flex-1 sm:order-1">
          <p className={`text-xs font-semibold text-[#2D6A4F] ${latinClass(locale)}`}>{copy.name}</p>
          <p className="mt-2 max-w-md text-sm leading-6 text-[#40534a]">{copy.greeting}</p>

          <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold text-[#2D6A4F] ring-1 ring-[#d7efe0]">
            <span
              className={`size-2 rounded-full ${
                mascotState === "warning"
                  ? "bg-[#e25522]"
                  : mascotState === "hungry"
                    ? "bg-[#f5c518]"
                    : "bg-[#1f9d55]"
              }`}
            />
            {copy.chip[mascotState]}
          </div>

          <div className="mt-4 max-w-sm">
            <div className="flex items-baseline justify-between gap-3 text-xs text-[#5c675f]">
              <span>
                {copy.labels.logged}: <span className="font-semibold text-[#1e3a32]">{kcal(logged)}</span>
              </span>
              <span>
                {copy.labels.goal}: <span className="font-semibold text-[#1e3a32]">{goal > 0 ? kcal(goal) : "—"}</span>
              </span>
            </div>
            <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-[#d7efe0]">
              <div
                className={`h-full rounded-full transition-[width] duration-500 ${
                  mascotState === "warning" ? "bg-[#e25522]" : "bg-[#2D6A4F]"
                }`}
                style={{ width: `${goal > 0 ? Math.min(100, Math.round(progressRatio * 100)) : 0}%` }}
              />
            </div>
            <p className="mt-1.5 text-[11px] text-[#5c675f]">
              {goal > 0 ? `${pct(progressRatio * 100)} ${copy.labels.ofGoal}` : copy.labels.start}
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={openCalculator}
              className={`rounded-full bg-[#2D6A4F] px-4 py-2.5 text-xs font-bold text-white transition-transform hover:-translate-y-0.5 ${latinClass(locale)}`}
            >
              {copy.labels.start}
            </button>
            <button
              type="button"
              onClick={openDashboard}
              className={`rounded-full bg-white px-4 py-2.5 text-xs font-bold text-[#1e3a32] ring-1 ring-[#d7efe0] transition-transform hover:-translate-y-0.5 ${latinClass(locale)}`}
            >
              {copy.labels.view}
            </button>
          </div>
        </div>

        <div className="order-1 flex shrink-0 flex-col items-center sm:order-2 sm:items-end">
          <div className="relative mb-1 w-full max-w-[17rem] sm:max-w-xs">
            <div
              key={mascotState}
              className="bunny-bubble relative rounded-2xl border border-[#d7efe0] bg-white px-4 py-3 text-sm leading-6 font-medium text-[#1e3a32] shadow-[0_14px_28px_-18px_rgba(45,106,79,0.45)]"
            >
              {dialogue}
              <span className="absolute -bottom-2 left-1/2 size-4 -translate-x-1/2 rotate-45 border-b border-r border-[#d7efe0] bg-white" />
            </div>
          </div>

          <div className="bunny-stage relative flex h-[210px] w-[150px] items-end justify-center sm:h-[250px] sm:w-[190px]">
            <img
              key={mascotState}
              src={BUNNY_ART[mascotState].src}
              alt={`${copy.name} — ${copy.chip[mascotState]}`}
              width={BUNNY_ART[mascotState].width}
              height={BUNNY_ART[mascotState].height}
              className="bunny-figure relative z-10 h-full w-full object-contain object-bottom drop-shadow-[0_16px_24px_rgba(45,106,79,0.22)]"
              draggable={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
