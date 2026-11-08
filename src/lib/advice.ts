import type { AdviceItem, BodyResult, CalorieBalance, MealOccasion, NutritionResult } from "../types";
import { grams, kcal, pct, round1 } from "./format";
import { occasionLabel } from "./nutrition";

const MEAL_SHARE: Record<Exclude<MealOccasion, "daily">, number> = {
  breakfast: 0.25,
  lunch: 0.35,
  dinner: 0.3,
  afternoon: 0.1,
};

const FALLBACK_BUDGET: Record<MealOccasion, number> = {
  daily: 2500,
  breakfast: 700,
  lunch: 900,
  dinner: 850,
  afternoon: 400,
};

export function calorieBalance(
  nutrition: NutritionResult,
  body: BodyResult | null,
  occasion: MealOccasion,
): CalorieBalance {
  const energy = nutrition.totals.energy;
  if (body) {
    if (occasion === "daily") {
      const budget = body.targetCalories;
      const delta = energy - budget;
      return {
        comparedWith: body.targetLabel,
        budget,
        delta,
        excessive: energy > budget * 1.05,
        summary:
          delta > 50
            ? `This day is ${kcal(delta)} above your ${body.targetLabel.toLowerCase()} of ${kcal(budget)}.`
            : delta < -50
              ? `This day is ${kcal(Math.abs(delta))} under your ${body.targetLabel.toLowerCase()} of ${kcal(budget)}.`
              : `This day sits on your ${body.targetLabel.toLowerCase()} of ${kcal(budget)}.`,
      };
    }
    const budget = body.tdee * MEAL_SHARE[occasion];
    const delta = energy - budget;
    return {
      comparedWith: `${occasionLabel(occasion)} share of TDEE`,
      budget,
      delta,
      excessive: energy > budget * 1.15,
      summary: `${occasionLabel(occasion)} is about ${pct((energy / body.tdee) * 100)} of your daily TDEE (${kcal(body.tdee)}). A practical budget for this meal is ${kcal(budget)}.`,
    };
  }

  const budget = FALLBACK_BUDGET[occasion];
  const delta = energy - budget;
  return {
    comparedWith: occasion === "daily" ? "2,500 kcal reference cap" : `${occasionLabel(occasion)} reference cap`,
    budget,
    delta,
    excessive: energy > budget,
    summary:
      occasion === "daily"
        ? "Body metrics are not saved yet, so excess energy uses a 2,500 kcal reference cap. Add height and weight for a personal TDEE."
        : `Without body metrics, this ${occasionLabel(occasion).toLowerCase()} log is compared with a ${kcal(budget)} reference cap.`,
  };
}

export function buildAdvice(
  nutrition: NutritionResult,
  body: BodyResult | null,
  occasion: MealOccasion,
): AdviceItem[] {
  const { totals, ratios } = nutrition;
  if (totals.energy <= 0) {
    return [
      {
        title: "Log a real plate first",
        metric: "0 kcal",
        body: "The guide stays blank until there is food to score. Zeros are fine for categories you skipped.",
        tone: "caution",
      },
    ];
  }

  const items: AdviceItem[] = [];
  const balance = calorieBalance(nutrition, body, occasion);
  const sugarCeiling10 = (0.1 * totals.energy) / 4;
  const sugarCeiling5 = (0.05 * totals.energy) / 4;

  if (ratios.freeSugars > 10) {
    const excess = totals.addedSugars - sugarCeiling10;
    items.push({
      title: "Bring free sugars under 10%",
      metric: `${grams(excess)} to cut`,
      tone: "alert",
      body: `This log has ${grams(totals.addedSugars)} of free sugars, ${pct(ratios.freeSugars)} of energy. The 10% ceiling is ${grams(sugarCeiling10)}, so cut about ${grams(excess)}. The 5% ideal line is ${grams(sugarCeiling5)}. A 500 g full-sugar milk tea is about 50 g of free sugars on its own; swapping it for unsweetened tea removes most of a typical excess.`,
    });
  } else if (ratios.freeSugars > 5) {
    const excess = totals.addedSugars - sugarCeiling5;
    items.push({
      title: "Nudge free sugars toward 5%",
      metric: `${grams(excess)} above ideal`,
      tone: "caution",
      body: `Free sugars are ${grams(totals.addedSugars)} (${pct(ratios.freeSugars)}), inside the acceptable band and ${grams(excess)} above the ideal 5% line of ${grams(sugarCeiling5)}. Keep juice, candy, and sweet drinks as the foods you trade out first.`,
    });
  } else {
    items.push({
      title: "Free sugars are in a good place",
      metric: pct(ratios.freeSugars),
      tone: "good",
      body: `Added free sugars are ${grams(totals.addedSugars)}, at or under the WHO 5% ideal. Whole-fruit sugars are tracked separately and are not part of this warning.`,
    });
  }

  if (totals.intrinsicSugars > 0) {
    items.push({
      title: "Whole fruit is not the free-sugar problem",
      metric: grams(totals.intrinsicSugars),
      tone: "good",
      body: `Fruit in this table contributes ${grams(totals.intrinsicSugars)} of intrinsic fructose. WHO free-sugar limits target added sugars, honey, syrups, and juices, so that fruit stays outside the red line.`,
    });
  }

  if (ratios.fat > 30) {
    const excessFat = (totals.fat * 9 - 0.3 * totals.energy) / 9;
    items.push({
      title: "Lower fat to the 30% ceiling",
      metric: `${grams(excessFat)} fat`,
      tone: "alert",
      body: `Fat is ${pct(ratios.fat)} of energy. Removing about ${grams(excessFat)} of fat brings it to 30%. That is roughly ${round1(excessFat / 12.5).toFixed(1)} thumbs of oil, or choosing grilled chicken over the fried portion.`,
    });
  } else if (ratios.fat < 15 && !balance.excessive) {
    const needed = (0.15 * totals.energy - totals.fat * 9) / 9;
    items.push({
      title: "Add a little fat for satiety",
      metric: `${grams(needed)} fat`,
      tone: "caution",
      body: `Fat is ${pct(ratios.fat)}. About ${grams(needed)} more fat reaches the 15% floor. One thumb of oil is 12.5 g, which covers that gap for most logs of this size.`,
    });
  }

  const proteinFloor = nutrition.proteinBand.min / 100;
  if (ratios.protein < nutrition.proteinBand.min) {
    const needed = (proteinFloor * totals.energy) / 4 - totals.protein;
    const chicken = needed > 0 ? (needed / 22) * 100 : 0;
    items.push({
      title: `Lift protein to ${nutrition.proteinBand.min}%`,
      metric: `${grams(needed)} protein`,
      tone: "alert",
      body: `Protein is ${pct(ratios.protein)} against a ${nutrition.proteinBand.fitness ? "training" : "classic"} band of ${nutrition.proteinBand.min}–${nutrition.proteinBand.max}%. Add about ${grams(needed)} of protein, close to ${grams(chicken)} of cooked chicken breast in this table (22 g protein per 100 g).`,
    });
  } else if (ratios.protein > nutrition.proteinBand.max) {
    items.push({
      title: "Protein is generous",
      metric: pct(ratios.protein),
      tone: "caution",
      body: nutrition.proteinBand.fitness
        ? `Protein is above the 25% training ceiling. Extra is not harmful for most healthy adults, but the rest of the plate still needs vegetables and carbohydrate you can actually train on.`
        : `Protein is above the classic 10–15% band. If you train after work, set Body metrics to a muscle goal or a regular training level and the target widens to 15–25%.`,
    });
  }

  if (ratios.carbs < 45) {
    const needed = (0.45 * totals.energy) / 4 - totals.carbs;
    const rice = needed > 0 ? (needed / 28) * 100 : 0;
    items.push({
      title: "Add carbohydrate back to 45%",
      metric: `${grams(needed)} carbs`,
      tone: "caution",
      body: `Carbohydrate is ${pct(ratios.carbs)}. About ${grams(needed)} of carbohydrate restores the floor, roughly ${grams(rice)} of cooked rice (28 g carbohydrate per 100 g, a little under 1 fist).`,
    });
  } else if (ratios.carbs > 75) {
    const excess = totals.carbs - (0.75 * totals.energy) / 4;
    items.push({
      title: "Ease carbohydrate under 75%",
      metric: `${grams(excess)} carbs`,
      tone: "alert",
      body: `Carbohydrate is ${pct(ratios.carbs)}. Shift about ${grams(excess)} of carbohydrate off the plate, usually the sugary drink or the extra rice, and put protein or vegetables in its place.`,
    });
  }

  if (body) {
    items.push({
      title: balance.excessive ? "Energy is over the personal budget" : "Energy versus your budget",
      metric: balance.delta > 0 ? `${kcal(balance.delta)} over` : `${kcal(Math.abs(balance.delta))} under`,
      tone: balance.excessive ? "alert" : "good",
      body: `${balance.summary} Estimated BMR is ${kcal(body.bmr)} and TDEE is ${kcal(body.tdee)} from Mifflin–St Jeor.`,
    });
  } else if (balance.excessive) {
    items.push({
      title: "Energy is above the reference cap",
      metric: kcal(totals.energy),
      tone: "alert",
      body: `${balance.summary} Open Body metrics so the next report can use your own TDEE instead of this reference.`,
    });
  }

  return items;
}
