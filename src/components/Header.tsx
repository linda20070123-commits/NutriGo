import { useId, useState } from "react";
import { productById } from "../data/products";
import { latinClass, useI18n } from "../i18n/language";
import { useStore } from "../state/store";
import type { View } from "../types";
import { LanguageSwitcher } from "./LanguageSwitcher";

type HomeSection = "home" | "meals" | "data" | "membership";

function scrollToSection(id: string) {
  window.setTimeout(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 60);
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`flex items-center gap-2 ${compact ? "" : ""}`}>
      <svg viewBox="0 0 36 36" className="size-9 shrink-0" aria-hidden="true">
        <path d="M8 8c2 6 2 12 0 20" fill="none" stroke="#1e3a32" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M8 14c6 1 10 1 14-2" fill="none" stroke="#1e3a32" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M8 20c5 1 9 0 12-3" fill="none" stroke="#1e3a32" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M22 8c2 4 6 6 10 6-2 6-8 10-12 8 1-5 1-10 2-14z" fill="#7dcea0" />
        <path d="M27 11c2 2 4 2 6 1" fill="none" stroke="#1e7a45" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
      <span className="font-serif text-[1.7rem] leading-none tracking-tight">
        <span className="text-[#1e3a32]">Nutri</span>
        <span className="text-[#e07a3a]">Go</span>
      </span>
    </span>
  );
}

export function Header() {
  const { state, dispatch } = useStore();
  const { locale, m } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [homeSection, setHomeSection] = useState<HomeSection>("home");
  const dialogTitle = useId();
  const planNames = state.plan.map((id) => productById(id)?.name).filter(Boolean);
  const onHome = state.view === "home";

  function goHome() {
    setMenuOpen(false);
    setHomeSection("home");
    dispatch({ type: "nav", view: "home" });
    window.setTimeout(() => document.getElementById("home")?.scrollIntoView({ behavior: "smooth", block: "start" }), 40);
  }

  function goSection(id: HomeSection) {
    setMenuOpen(false);
    setHomeSection(id);
    if (state.view !== "home") dispatch({ type: "nav", view: "home" });
    scrollToSection(id);
  }

  function goView(view: View) {
    setMenuOpen(false);
    dispatch({ type: "nav", view });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const linkClass = (active: boolean) =>
    `px-1 pb-1 text-[13px] font-semibold ${latinClass(locale)} ${
      active ? "border-b-2 border-[#1e3a32] text-[#1e3a32]" : "border-b-2 border-transparent text-[#24382f] hover:text-[#1e7a45]"
    }`;

  return (
    <header className="no-print sticky top-0 z-30 bg-[#f6f1e6]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <button type="button" onClick={goHome} className="text-left" aria-label="NutriGo home">
          <Logo />
        </button>
        <div className="flex items-center gap-2 sm:gap-3">
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            <button type="button" className={linkClass(onHome && homeSection === "home")} onClick={goHome}>
              {m.nav.home}
            </button>
            <button type="button" className={linkClass(onHome && homeSection === "meals")} onClick={() => goSection("meals")}>
              {m.nav.meals}
            </button>
            <button type="button" className={linkClass(onHome && homeSection === "data")} onClick={() => goSection("data")}>
              {m.nav.data}
            </button>
            <button type="button" className={linkClass(onHome && homeSection === "membership")} onClick={() => goSection("membership")}>
              {m.nav.membership}
            </button>
            <button type="button" className={linkClass(state.view === "membership")} onClick={() => goView("membership")}>
              {m.nav.membershipCenter}
            </button>
          </nav>
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setLoginOpen(true)}
            className={`hidden rounded-full bg-[#1e3a32] px-5 py-2.5 text-[13px] font-semibold text-white lg:inline-flex ${latinClass(locale)}`}
          >
            {m.nav.login}
          </button>
          <button
            type="button"
            className={`rounded-full border border-[#1e3a32]/15 px-3 py-2 text-xs font-semibold text-[#1e3a32] lg:hidden ${latinClass(locale)}`}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? m.nav.close : m.nav.menu}
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 pb-4 lg:hidden" aria-label="Mobile">
          <button type="button" className="rounded-xl px-3 py-3 text-left text-sm font-semibold" onClick={goHome}>
            {m.nav.home}
          </button>
          <button type="button" className="rounded-xl px-3 py-3 text-left text-sm font-semibold" onClick={() => goSection("meals")}>
            {m.nav.meals}
          </button>
          <button type="button" className="rounded-xl px-3 py-3 text-left text-sm font-semibold" onClick={() => goSection("data")}>
            {m.nav.data}
          </button>
          <button type="button" className="rounded-xl px-3 py-3 text-left text-sm font-semibold" onClick={() => goSection("membership")}>
            {m.nav.membership}
          </button>
          <button type="button" className="rounded-xl px-3 py-3 text-left text-sm font-semibold" onClick={() => goView("membership")}>
            {m.nav.membershipCenter}
          </button>
          <button
            type="button"
            className="mt-1 rounded-full bg-[#1e3a32] px-4 py-3 text-sm font-semibold text-white"
            onClick={() => {
              setMenuOpen(false);
              setLoginOpen(true);
            }}
          >
            {m.nav.login}
          </button>
        </nav>
      )}
      {planNames.length > 0 && (
        <p className="mx-auto max-w-6xl px-4 pb-2 text-xs text-[#5c675f] sm:px-6">
          {planNames.length === 1 ? m.plan.one : m.plan.many.replace("{n}", String(planNames.length))}
        </p>
      )}
      {loginOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#1e3a32]/40 p-4 sm:items-center" role="presentation" onClick={() => setLoginOpen(false)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={dialogTitle}
            className="w-full max-w-md rounded-[28px] bg-[#f6f1e6] p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <p id={dialogTitle} className="font-serif text-3xl text-[#1e3a32]">
              {m.login.title}
            </p>
            <p className="mt-2 text-sm leading-6 text-[#5c675f]">{m.login.body}</p>
            <label className={`mt-5 block text-xs font-semibold text-[#1e3a32] ${latinClass(locale)}`} htmlFor="login-email">
              {m.login.email}
            </label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={m.login.placeholder}
              className="mt-2 w-full rounded-2xl border border-[#e7dfd2] bg-white px-4 py-3 text-sm outline-none focus:border-[#1e7a45]"
            />
            <div className="mt-5 flex gap-3">
              <button
                type="button"
                className="flex-1 rounded-full bg-[#1e3a32] px-4 py-3 text-sm font-semibold text-white"
                onClick={() => {
                  setLoginOpen(false);
                  goView("calculator");
                }}
              >
                {m.login.continue}
              </button>
              <button type="button" className="rounded-full px-4 py-3 text-sm font-semibold text-[#1e3a32]" onClick={() => setLoginOpen(false)}>
                {m.login.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  const { m } = useI18n();
  return (
    <footer className="no-print mx-auto max-w-6xl px-4 py-8 text-sm leading-6 text-[#5c675f] sm:px-6">
      {m.footer}
    </footer>
  );
}
