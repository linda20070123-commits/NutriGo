import { useI18n } from "../i18n/language";
import type { BandStatus } from "../types";

export function statusTone(status: BandStatus): string {
  switch (status) {
    case "ideal":
      return "bg-forest-100 text-forest-800";
    case "acceptable":
      return "bg-[#f8ecd4] text-amber-ink";
    case "low":
      return "bg-[#e4f0f6] text-tide";
    case "high":
    case "excess":
      return "bg-coral-50 text-coral-600";
    default:
      return "bg-sand-100 text-mute";
  }
}

export function StatusPill({ status }: { status: BandStatus }) {
  const { tools } = useI18n();
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide ${statusTone(status)}`}>
      {tools.status[status]}
    </span>
  );
}

export function RatioTrack({
  value,
  bandStart,
  bandEnd,
  marker,
}: {
  value: number;
  bandStart: number;
  bandEnd: number;
  marker?: number;
}) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div className="relative mt-3 h-2.5 rounded-full bg-sand-200">
      <div
        className="absolute inset-y-0 rounded-full bg-forest-200"
        style={{ left: `${bandStart}%`, width: `${Math.max(0, bandEnd - bandStart)}%` }}
      />
      {marker !== undefined && (
        <div className="absolute inset-y-0 w-px bg-forest-700/50" style={{ left: `${marker}%` }} />
      )}
      <div
        className="absolute top-1/2 size-3.5 -translate-y-1/2 rounded-full border-2 border-white bg-forest-800 shadow"
        style={{ left: `calc(${clamped}% - 7px)` }}
      />
    </div>
  );
}
