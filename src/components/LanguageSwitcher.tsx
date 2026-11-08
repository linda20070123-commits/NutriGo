import type { Locale } from "../i18n/copy";
import { useI18n } from "../i18n/language";

const OPTIONS: { id: Locale; label: string }[] = [
  { id: "en", label: "EN" },
  { id: "zh-CN", label: "简" },
  { id: "zh-HK", label: "繁" },
];

export function LanguageSwitcher() {
  const { locale, setLocale, m } = useI18n();

  return (
    <div className="flex items-center rounded-full bg-white/80 p-1 ring-1 ring-[#1e3a32]/10" role="group" aria-label={m.nav.language}>
      {OPTIONS.map((option) => {
        const active = locale === option.id;
        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={active}
            onClick={() => setLocale(option.id)}
            className={`min-w-9 rounded-full px-2.5 py-1 text-xs font-semibold ${
              active ? "bg-[#1e3a32] text-white" : "text-[#1e3a32] hover:bg-[#e7f6ee]"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
