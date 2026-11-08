import { useState } from "react";
import { latinClass, useI18n } from "../i18n/language";
import { useStore } from "../state/store";
import { NutriBunny } from "./NutriBunny";
import { Catalog } from "./ProductCard";

export function HomePage() {
  const { dispatch } = useStore();
  const { locale, m } = useI18n();
  const [joined, setJoined] = useState(false);

  function startAnalysis() {
    dispatch({ type: "nav", view: "calculator", step: 0 });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div>
      <section id="home" className="w-full overflow-hidden bg-[#f6f1e6]">
        <img
          src="/home/hero-poster.jpg"
          alt={m.heroAlt}
          className="-mt-[6.2%] block w-full"
        />
      </section>

      <section id="data" className="scroll-mt-24 mx-auto max-w-6xl px-4 pt-12 sm:px-6">
        <div className="mb-6">
          <NutriBunny />
        </div>
        <p className={`text-xs font-semibold text-[#1e7a45] ${latinClass(locale)}`}>{m.data.kicker}</p>
        <div className="mt-4 rounded-[28px] border border-[#d7efe0] bg-[#fffaf4] p-6 sm:flex sm:items-center sm:justify-between sm:gap-8">
          <div>
            <h2 className="max-w-xl font-serif text-3xl leading-snug text-[#1e3a32]">{m.data.title}</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#5c675f]">{m.data.body}</p>
          </div>
          <button
            type="button"
            onClick={startAnalysis}
            className={`mt-5 shrink-0 rounded-full bg-[#1e7a45] px-6 py-3.5 text-sm font-bold text-white sm:mt-0 ${latinClass(locale)}`}
          >
            {m.data.cta}
          </button>
        </div>
      </section>

      <section id="membership" className="scroll-mt-24 mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <p className={`text-xs font-semibold text-[#e07a3a] ${latinClass(locale)}`}>{m.membership.kicker}</p>
        <div className="mt-4 rounded-[28px] border border-[#f0c7be] bg-[#fffaf4] p-6 sm:flex sm:items-center sm:justify-between sm:gap-6">
          <div>
            <h2 className="font-serif text-3xl leading-snug text-[#1e3a32]">{m.membership.title}</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#5c675f]">{m.membership.body}</p>
            {joined && <p className="mt-3 text-sm font-semibold text-[#1e7a45]">{m.membership.joined}</p>}
          </div>
          <button
            type="button"
            onClick={() => setJoined(true)}
            className="mt-5 shrink-0 rounded-2xl bg-[#ff5a4a] px-5 py-4 text-left text-white sm:mt-0"
          >
            <span className="block text-sm font-black">{m.membership.cta}</span>
            <span className="mt-1 block max-w-[16rem] text-xs leading-5 text-white/90">{m.membership.note}</span>
          </button>
        </div>
      </section>

      <section id="meals" className="scroll-mt-24 mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <p className={`text-xs font-semibold text-[#1e7a45] ${latinClass(locale)}`}>{m.meals.kicker}</p>
        <h2 className="mt-2 font-serif text-3xl leading-snug text-[#1e3a32]">{m.meals.title}</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#5c675f]">{m.meals.body}</p>
        <div className="mt-6">
          <Catalog />
        </div>
      </section>
    </div>
  );
}
