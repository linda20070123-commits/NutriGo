import { COMMERCE } from "../i18n/commerce";
import { latinClass, useI18n } from "../i18n/language";
import { BOX_PRICE, MEMBERSHIP_PRICE, REWARD_MILESTONES, REWARD_VALUES } from "../lib/membership";
import { useStore } from "../state/store";
import type { RewardProgress, SubscriptionTier } from "../types";

const TIER_STYLES: Record<SubscriptionTier, string> = {
  none: "bg-sand-100 text-mute border-sand-200",
  trial: "bg-sun-400/20 text-amber-ink border-sun-400/50",
  vip: "bg-forest-100 text-forest-800 border-forest-300",
};

export function MembershipPage() {
  const { state, dispatch, subscription, rewards } = useStore();
  const { locale } = useI18n();
  const c = COMMERCE[locale].member;

  const dateFmt = new Intl.DateTimeFormat(locale === "en" ? "en-HK" : locale, { dateStyle: "long" });
  const expiresDate = subscription.expiresAt ? dateFmt.format(new Date(subscription.expiresAt)) : null;

  // A stored-but-expired tier still counts as "not subscribed" for display.
  const displayTier: SubscriptionTier = subscription.tier;
  const expired = state.subscription.tier !== "none" && displayTier === "none";

  const statusText =
    displayTier === "none" ? c.status.none : displayTier === "trial" ? c.status.trial : c.status.vip;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <p className={`text-xs font-semibold text-coral-600 ${latinClass(locale)}`}>{c.kicker}</p>
      <h1 className="mt-2 font-serif text-4xl leading-tight text-forest-900">{c.title}</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-mute">{c.body}</p>

      {/* Status header */}
      <section className="mt-8 rounded-[28px] border border-forest-200 bg-white p-6 shadow-[0_18px_50px_-34px_rgba(28,36,25,0.55)]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className={`text-xs font-semibold text-mute ${latinClass(locale)}`}>{c.statusLabel}</p>
            <span
              className={`mt-2 inline-block rounded-full border px-4 py-2 text-sm font-semibold ${TIER_STYLES[displayTier]}`}
            >
              {statusText}
            </span>
          </div>
          {displayTier === "trial" && expiresDate && (
            <p className="text-sm text-mute">{c.trialEnds.replace("{date}", expiresDate)}</p>
          )}
          {displayTier === "vip" && expiresDate && (
            <p className="text-sm text-mute">{c.vipRenews.replace("{date}", expiresDate)}</p>
          )}
          {expired && expiresDate && <p className="text-sm text-mute">{c.expired}</p>}
        </div>

        {displayTier === "none" && (
          <p className="mt-5 rounded-2xl bg-sun-400/15 px-4 py-3 text-sm font-semibold text-amber-ink">
            {c.trialBanner}
          </p>
        )}
      </section>

      {/* Plan card */}
      <section className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_1fr]">
        <div className="rounded-[28px] border border-forest-200 bg-white p-6 shadow-[0_18px_50px_-34px_rgba(28,36,25,0.55)] sm:p-8">
          <h2 className="font-serif text-2xl text-forest-900">{c.planTitle}</h2>
          <p className="mt-3 font-serif text-4xl text-forest-800">{c.price}</p>
          <p className="mt-1 text-xs text-mute">{c.priceNote}</p>

          <ul className="mt-6 space-y-3">
            {[c.perks.calc, c.perks.delivery, c.perks.rewards].map((perk) => (
              <li key={perk} className="flex gap-3 text-sm leading-6 text-ink">
                <span className="mt-0.5 shrink-0" aria-hidden="true">
                  ✓
                </span>
                <span>{perk}</span>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap gap-3">
            {displayTier === "none" && (
              <button
                type="button"
                onClick={() => dispatch({ type: "subscribe", tier: "trial" })}
                className="rounded-full bg-forest-700 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-forest-800"
              >
                {c.ctaTrial}
              </button>
            )}
            {(displayTier === "none" || displayTier === "trial") && (
              <button
                type="button"
                onClick={() => dispatch({ type: "subscribe", tier: "vip" })}
                className="rounded-full border border-forest-700 px-6 py-3.5 text-sm font-bold text-forest-800 transition hover:bg-forest-50"
              >
                {c.ctaVip}
              </button>
            )}
            {displayTier === "vip" && (
              <button
                type="button"
                onClick={() => dispatch({ type: "cancel-subscription" })}
                className="rounded-full border border-sand-300 px-6 py-3.5 text-sm font-semibold text-mute transition hover:bg-sand-50"
              >
                {c.cancel}
              </button>
            )}
          </div>
          <p className="mt-3 text-xs text-mute">
            {membershipFootnote(locale, MEMBERSHIP_PRICE, BOX_PRICE)}
          </p>
        </div>

        {/* Reward system */}
        <div className="rounded-[28px] border border-forest-200 bg-forest-50 p-6 sm:p-8">
          <h2 className="font-serif text-2xl text-forest-900">{c.rewardTitle}</h2>
          <p className="mt-2 text-sm leading-6 text-mute">{c.rewardHint}</p>

          <div className="mt-6">
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-sm font-semibold text-forest-900">
                {c.rewardProgress.replace("{boxes}", String(rewards.boxes))}
              </span>
              <span className="text-xs text-mute">
                {c.rewardNext
                  .replace("{boxes}", String(rewards.nextMilestone))
                  .replace("{value}", String(rewards.nextValue))}
              </span>
            </div>
            <RewardBar rewards={rewards} />
            <ul className="mt-4 space-y-2">
              {REWARD_MILESTONES.map((milestone) => {
                const reached = rewards.unlockedMilestones.includes(milestone);
                return (
                  <li
                    key={milestone}
                    className={`flex items-center justify-between rounded-2xl px-4 py-2.5 text-sm ${
                      reached ? "bg-forest-700 text-white" : "bg-white text-mute"
                    }`}
                  >
                    <span className="font-semibold">
                      {c.rewardMilestone.replace("{boxes}", String(milestone))}
                    </span>
                    <span className="font-bold">HK${REWARD_VALUES[milestone]}</span>
                  </li>
                );
              })}
            </ul>
            {rewards.unlockedValue > 0 && (
              <p className="mt-4 rounded-2xl bg-sun-400/20 px-4 py-3 text-sm font-semibold text-amber-ink">
                {c.rewardUnlocked.replace("{value}", String(rewards.unlockedValue))}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="mt-6 rounded-[28px] border border-sand-200 bg-white p-6 sm:p-8">
        <h2 className="font-serif text-2xl text-forest-900">{c.compareTitle}</h2>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead>
              <tr className="border-b border-sand-200">
                <th className="py-3 pr-3 font-semibold text-mute">{c.compare.feature}</th>
                <th className="py-3 pr-3 font-semibold text-mute">{c.compare.none}</th>
                <th className="py-3 pr-3 font-semibold text-mute">{c.compare.trial}</th>
                <th className="py-3 font-semibold text-mute">{c.compare.vip}</th>
              </tr>
            </thead>
            <tbody className="text-ink">
              <tr className="border-b border-sand-100">
                <td className="py-3 pr-3 font-medium">{c.compareRows.boxes}</td>
                <td className="py-3 pr-3">—</td>
                <td className="py-3 pr-3">2</td>
                <td className="py-3">15</td>
              </tr>
              <tr className="border-b border-sand-100">
                <td className="py-3 pr-3 font-medium">{c.compareRows.discount}</td>
                <td className="py-3 pr-3">HK${BOX_PRICE}</td>
                <td className="py-3 pr-3">HK${BOX_PRICE - 5}</td>
                <td className="py-3">HK${BOX_PRICE - 5}</td>
              </tr>
              <tr className="border-b border-sand-100">
                <td className="py-3 pr-3 font-medium">{c.compareRows.priority}</td>
                <td className="py-3 pr-3">—</td>
                <td className="py-3 pr-3">✓</td>
                <td className="py-3">✓</td>
              </tr>
              <tr>
                <td className="py-3 pr-3 font-medium">{c.compareRows.rewards}</td>
                <td className="py-3 pr-3">—</td>
                <td className="py-3 pr-3">✓</td>
                <td className="py-3">✓</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function RewardBar({ rewards }: { rewards: RewardProgress }) {
  const max = REWARD_MILESTONES[REWARD_MILESTONES.length - 1];
  const percent = Math.min(100, (rewards.boxes / max) * 100);
  return (
    <div className="mt-3">
      <div className="h-3 w-full overflow-hidden rounded-full bg-sand-200">
        <div
          className="h-full rounded-full bg-forest-600 transition-[width] duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="mt-1.5 flex justify-between text-[11px] text-mute">
        {REWARD_MILESTONES.map((milestone) => (
          <span key={milestone} className={rewards.unlockedMilestones.includes(milestone) ? "font-bold text-forest-700" : ""}>
            {milestone}
          </span>
        ))}
      </div>
    </div>
  );
}

function membershipFootnote(locale: string, membership: number, box: number): string {
  if (locale === "zh-CN") return `会员费 HK$${membership}／月，每份餐盒 HK$${box}，会员再减 HK$5。`;
  if (locale === "zh-HK") return `會員費 HK$${membership}／月，每份餐盒 HK$${box}，會員再減 HK$5。`;
  return `Membership HK$${membership}/month. Each mealbox is HK$${box}, and members pay HK$5 less per box.`;
}
