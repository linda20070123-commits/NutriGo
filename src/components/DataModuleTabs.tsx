import { latinClass, useI18n } from "../i18n/language";
import { useStore } from "../state/store";
import type { View } from "../types";

const TAB_IDS: View[] = ["calculator", "bmi"];

export function DataModuleTabs() {
  const { state, dispatch } = useStore();
  const { locale, tools } = useI18n();

  return (
    <div className="mb-6 flex flex-wrap gap-6 border-b border-[#e7dfd2]" role="tablist" aria-label={tools.tabs.label}>
      {TAB_IDS.map((id) => {
        const active = state.view === id;
        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => dispatch({ type: "nav", view: id })}
            className={`-mb-px pb-2 text-sm font-semibold ${latinClass(locale)} ${
              active ? "border-b-2 border-[#1e3a32] text-[#1e3a32]" : "border-b-2 border-transparent text-[#5c675f]"
            }`}
          >
            {id === "bmi" ? tools.tabs.bmi : tools.tabs.calculator}
          </button>
        );
      })}
    </div>
  );
}
