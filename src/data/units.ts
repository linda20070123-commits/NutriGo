import type { UnitId } from "../types";

export interface UnitDef {
  id: UnitId;
  label: string;
  short: string;
  multiplier: number;
  hint: string;
}

export const UNITS: Record<UnitId, UnitDef> = {
  g: {
    id: "g",
    label: "Grams (g)",
    short: "g",
    multiplier: 1,
    hint: "Precise weight in grams",
  },
  fist: {
    id: "fist",
    label: "Fist",
    short: "fist",
    multiplier: 150,
    hint: "1 fist ≈ 150 g · staples, vegetables, fruit",
  },
  palm: {
    id: "palm",
    label: "Palm",
    short: "palm",
    multiplier: 87.5,
    hint: "1 palm ≈ 75–100 g; calculations use 88 g",
  },
  thumb: {
    id: "thumb",
    label: "Thumb",
    short: "thumb",
    multiplier: 12.5,
    hint: "1 thumb ≈ 10–15 g; calculations use 12.5 g",
  },
  pack: {
    id: "pack",
    label: "Pack",
    short: "pack",
    multiplier: 50,
    hint: "1 small snack pack ≈ 50 g",
  },
  can: {
    id: "can",
    label: "Can / Cup",
    short: "can",
    multiplier: 400,
    hint: "1 canned drink or milk tea ≈ 330–500 g",
  },
  slice: {
    id: "slice",
    label: "Slice",
    short: "slice",
    multiplier: 100,
    hint: "1 cake slice ≈ 100 g",
  },
};

export function multiplierFor(
  unit: UnitId,
  overrides?: Partial<Record<UnitId, number>>,
): number {
  return overrides?.[unit] ?? UNITS[unit].multiplier;
}

export function hintFor(
  unit: UnitId,
  notes?: Partial<Record<UnitId, string>>,
): string {
  return notes?.[unit] ?? UNITS[unit].hint;
}
