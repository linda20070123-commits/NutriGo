import type { BookingPlan, PlanFrequency, RewardProgress, SubscriptionStatus } from "../types";

/** Standard price for a single mealbox, in HK$. */
export const BOX_PRICE = 70;
/** Price range shown to members, in HK$. */
export const BOX_PRICE_RANGE = { min: 65, max: 75 };
/** Monthly VIP membership, in HK$. */
export const MEMBERSHIP_PRICE = 60;
/** Length of the free trial, in days. */
export const TRIAL_DAYS = 7;
/** Milestones for the reward system, in boxes. */
export const REWARD_MILESTONES = [10, 20] as const;
/** Coupon value unlocked at each milestone, in HK$. */
export const REWARD_VALUES: Record<10 | 20, number> = { 10: 20, 20: 40 };

/** Member discount applied to a box order, in HK$ per box. */
export const MEMBER_BOX_DISCOUNT = 5;

export const FREQUENCIES: Record<PlanFrequency, { boxes: number; unitPrice: number }> = {
  weekly: { boxes: 2, unitPrice: BOX_PRICE },
  monthly: { boxes: 15, unitPrice: BOX_PRICE },
};

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * A member's discount on a box order. Trial and VIP members both get the
 * member rate; a non-subscriber pays the standard price.
 */
export function discountFor(subscription: SubscriptionStatus): number {
  return subscription.tier === "none" ? 0 : MEMBER_BOX_DISCOUNT;
}

export function isSubscriptionActive(subscription: SubscriptionStatus, now = Date.now()): boolean {
  if (subscription.tier === "none") return false;
  if (!subscription.expiresAt) return false;
  return new Date(subscription.expiresAt).getTime() > now;
}

/**
 * Normalises a stored subscription so an expired trial or VIP tier falls back
 * to "none" instead of showing an active badge.
 */
export function normalizeSubscription(subscription: SubscriptionStatus, now = Date.now()): SubscriptionStatus {
  if (subscription.tier !== "none" && !isSubscriptionActive(subscription, now)) {
    return { tier: "none", startedAt: null, expiresAt: null };
  }
  return subscription;
}

export function startTrial(now = Date.now()): SubscriptionStatus {
  return {
    tier: "trial",
    startedAt: new Date(now).toISOString(),
    expiresAt: new Date(now + TRIAL_DAYS * DAY_MS).toISOString(),
  };
}

export function startVip(now = Date.now()): SubscriptionStatus {
  const expires = new Date(now);
  // Calendar month, so the renewal date matches what the member was billed on.
  expires.setMonth(expires.getMonth() + 1);
  return {
    tier: "vip",
    startedAt: new Date(now).toISOString(),
    expiresAt: expires.toISOString(),
  };
}

/** Builds the reward tracker from the number of boxes accumulated so far. */
export function rewardProgress(boxes: number): RewardProgress {
  const earned = REWARD_MILESTONES.filter((milestone) => boxes >= milestone);
  const unlockedMilestones = [...earned];
  const unlockedValue = unlockedMilestones.reduce((sum, milestone) => sum + REWARD_VALUES[milestone], 0);

  const nextMilestone = REWARD_MILESTONES.find((milestone) => boxes < milestone);
  if (nextMilestone === undefined) {
    return { boxes, nextMilestone: 20, nextValue: REWARD_VALUES[20], unlockedValue, unlockedMilestones };
  }

  return {
    boxes,
    nextMilestone,
    nextValue: REWARD_VALUES[nextMilestone],
    unlockedValue,
    unlockedMilestones,
  };
}

/** Builds the checkout plan for a frequency, applying the member discount. */
export function buildPlan(frequency: PlanFrequency, subscription: SubscriptionStatus): BookingPlan {
  const base = FREQUENCIES[frequency];
  const discount = discountFor(subscription);
  return {
    frequency,
    quantity: base.boxes,
    unitPrice: base.unitPrice,
    discount: discount * base.boxes,
  };
}

/**
 * The member rate for the monthly bundle. Members pay less per box than the
 * standard HK$70, which is the extra member discount on the 15-box plan.
 */
export function monthlyBundleRate(subscription: SubscriptionStatus): number {
  return subscription.tier === "none" ? BOX_PRICE : BOX_PRICE - MEMBER_BOX_DISCOUNT;
}
