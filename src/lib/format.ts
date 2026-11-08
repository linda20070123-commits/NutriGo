export function round1(value: number): number {
  return Math.round(value * 10) / 10;
}

export function grams(value: number): string {
  const rounded = round1(value);
  return Number.isInteger(rounded) ? `${rounded} g` : `${rounded.toFixed(1)} g`;
}

export function kcal(value: number): string {
  return `${Math.round(value).toLocaleString("en-HK")} kcal`;
}

export function pct(value: number): string {
  if (!Number.isFinite(value)) return "0.0%";
  return `${round1(value).toFixed(1)}%`;
}
