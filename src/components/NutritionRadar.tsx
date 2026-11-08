import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from "recharts";
import { useI18n } from "../i18n/language";
import type { RadarAxis } from "../lib/radar";

export function NutritionRadar({ axes }: { axes: RadarAxis[] }) {
  const { locale, tools } = useI18n();
  const labeled = axes.map((axis) => ({ ...axis, axis: tools.radar[axis.key] ?? axis.axis }));
  const logged = locale === "en" ? "logged" : locale === "zh-CN" ? "已记录" : "已記錄";
  const goal = locale === "en" ? "goal" : "目标";
  const goalWord = locale === "zh-HK" ? "目標" : goal;
  return (
    <div className="grid gap-4 md:grid-cols-[1.35fr_0.65fr]">
      <div className="relative overflow-hidden rounded-[28px] bg-[#10241f] p-3 shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_24px_60px_-24px_rgba(31,143,255,0.55)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(250,204,21,0.22),transparent_36%),radial-gradient(circle_at_85%_80%,rgba(31,143,255,0.28),transparent_40%),radial-gradient(circle_at_60%_40%,rgba(139,61,255,0.18),transparent_42%)]" />
        <div className="relative h-[320px] sm:h-[380px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={labeled} cx="50%" cy="52%" outerRadius="68%">
              <defs>
                <linearGradient id="nutrigoYou" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#facc15" stopOpacity={0.95} />
                  <stop offset="45%" stopColor="#2dd4bf" stopOpacity={0.85} />
                  <stop offset="100%" stopColor="#c084fc" stopOpacity={0.9} />
                </linearGradient>
                <filter id="nutrigoGlow" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <PolarGrid stroke="rgba(186,230,253,0.45)" strokeWidth={1.2} />
              <PolarAngleAxis dataKey="axis" tick={{ fill: "#ecfdf5", fontSize: 12, fontWeight: 600 }} />
              <PolarRadiusAxis
                domain={[0, 100]}
                tickCount={5}
                angle={54}
                tick={{ fill: "rgba(226,232,240,0.8)", fontSize: 10 }}
                stroke="rgba(186,230,253,0.25)"
              />
              <Radar
                name="Optimal"
                dataKey="target"
                stroke="#86efac"
                strokeDasharray="5 4"
                fill="#86efac"
                fillOpacity={0.08}
                strokeWidth={1.5}
              />
              <Radar
                name="Your plate"
                dataKey="you"
                stroke="#fef08a"
                fill="url(#nutrigoYou)"
                fillOpacity={0.55}
                strokeWidth={2.4}
                style={{ filter: "url(#nutrigoGlow)" }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <p className="relative px-3 pb-2 text-center text-[11px] tracking-[0.16em] text-emerald-100/80 uppercase">
          {tools.radarCaption}
        </p>
      </div>
      <ul className="grid content-center gap-2">
        {labeled.map((axis) => (
          <li key={axis.key} className="rounded-2xl bg-white px-3 py-3 shadow-[0_10px_30px_-22px_rgba(28,36,25,0.6)]">
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2 text-sm font-semibold">
                <span className="size-2.5 rounded-full" style={{ background: axis.color, boxShadow: `0 0 10px ${axis.color}` }} />
                {axis.axis}
              </span>
              <span className="font-serif text-xl" style={{ color: axis.color }}>
                {axis.you.toFixed(0)}%
              </span>
            </div>
            <p className="mt-1 text-xs text-mute">
              {axis.actualLabel} {logged} · {goalWord} {axis.goalLabel}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
