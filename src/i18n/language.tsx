import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { COPY, type Locale, type Messages } from "./copy";
import { TOOLS, type ToolCopy } from "./tools";

const STORAGE_KEY = "nutrigo-lang";

interface LanguageValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  m: Messages;
  tools: ToolCopy;
}

const LanguageContext = createContext<LanguageValue | null>(null);

function readLocale(): Locale {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "zh-CN" || saved === "zh-HK") return saved;
  } catch {
    /* private mode */
  }
  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readLocale);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale;
    document.title = COPY[locale].meta.title;
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale: setLocaleState,
      m: COPY[locale],
      tools: TOOLS[locale],
    }),
    [locale],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n(): LanguageValue {
  const value = useContext(LanguageContext);
  if (!value) throw new Error("useI18n must be used inside LanguageProvider");
  return value;
}

export function latinClass(locale: Locale, extra = ""): string {
  return `${locale === "en" ? "uppercase tracking-[0.14em]" : "tracking-normal"} ${extra}`.trim();
}
