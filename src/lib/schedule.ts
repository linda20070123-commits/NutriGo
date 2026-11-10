import type { DaySchedule, MealType, WindowDates } from "../types";

/**
 * NutriGo places orders through two fixed weekly windows:
 *
 * - Window A: the Wednesday cutoff covers Thursday, Friday, Saturday, Sunday.
 * - Window B: the Sunday cutoff covers Monday, Tuesday, Wednesday.
 *
 * Each window is a contiguous run of delivery days that begins the day after
 * its cutoff. The window that is open now is the one whose most recent cutoff
 * has already passed, and the window that follows it starts the day after the
 * current run ends, so the two never overlap and a member can never order the
 * same calendar day twice.
 */
export const WINDOW_A_DAYS = [4, 5, 6, 0] as const; // Thu, Fri, Sat, Sun
export const WINDOW_B_DAYS = [1, 2, 3] as const; // Mon, Tue, Wed

/** The weekday each window's order is placed by. */
export const WINDOW_CUTOFF: Record<"A" | "B", number> = { A: 3, B: 0 };

/** The weekday each window's delivery run starts on. */
export const RUN_START: Record<"A" | "B", number> = { A: 4, B: 1 };

/** The delivery days of each window. */
export const WINDOW_DAYS: Record<"A" | "B", readonly number[]> = {
  A: WINDOW_A_DAYS,
  B: WINDOW_B_DAYS,
};

/** The window whose delivery days follow the given weekday. */
export function windowForDay(dayOfWeek: number): "A" | "B" {
  // Wednesday opens window A; Sunday opens window B.
  return dayOfWeek === 3 || dayOfWeek === 4 || dayOfWeek === 5 || dayOfWeek === 6 ? "A" : "B";
}

function startOfDay(date: Date): number {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy.getTime();
}

/**
 * The start of the delivery run for the window whose cutoff most recently
 * passed, including a cutoff that falls today.
 */
function currentRunStart(id: "A" | "B", today: Date): Date {
  const cutoff = WINDOW_CUTOFF[id];
  // Days back to the most recent cutoff, on or before today.
  const daysBack = (today.getDay() - cutoff + 7) % 7;
  const cutoffDate = new Date(today);
  cutoffDate.setDate(today.getDate() - daysBack);
  // The run opens the day after the cutoff.
  cutoffDate.setDate(cutoffDate.getDate() + 1);
  return cutoffDate;
}

/** The consecutive delivery days of a run, starting at `start`. */
function runDates(start: Date, days: readonly number[]): Date[] {
  const first = new Date(start);
  first.setHours(0, 0, 0, 0);
  return days.map((_, index) => {
    const date = new Date(first);
    date.setDate(first.getDate() + index);
    return date;
  });
}

function describe(id: "A" | "B", dates: Date[]): WindowDates {
  return {
    window: { id, days: [...WINDOW_DAYS[id]], cutoffDay: WINDOW_CUTOFF[id] },
    dates: dates.map((date) => ({ dateStr: "", dayOfWeek: date.getDay(), date })),
  };
}

/**
 * Resolves the two booking windows relative to today: the one that is open
 * now, and the one that follows it.
 */
export function resolveWindows(today = new Date()): { current: WindowDates; next: WindowDates } {
  const currentId = windowForDay(today.getDay());
  const nextId = currentId === "A" ? "B" : "A";

  const currentAll = runDates(currentRunStart(currentId, today), WINDOW_DAYS[currentId]);
  // Days that have already passed can no longer be booked.
  const currentDates = currentAll.filter((date) => date.getTime() >= startOfDay(today));

  // The next run picks up the day after the current run ends.
  const afterLast = new Date(currentAll[currentAll.length - 1]);
  afterLast.setDate(afterLast.getDate() + 1);
  const nextDates = runDates(afterLast, WINDOW_DAYS[nextId]);

  return {
    current: describe(currentId, currentDates),
    next: describe(nextId, nextDates),
  };
}

/** How many mealboxes a single day contributes. */
export function mealsForType(mealType: MealType): number {
  return mealType === "both" ? 2 : 1;
}

/** Total mealboxes across a schedule. */
export function countMeals(schedule: DaySchedule[]): number {
  return schedule.reduce((total, day) => (day.selected ? total + mealsForType(day.mealType) : total), 0);
}
