import { PRODUCTS } from "../data/products";
import type { MealCopy } from "../i18n/copy";
import { latinClass, useI18n } from "../i18n/language";
import { localizeReason } from "../i18n/tools";
import { useStore } from "../state/store";
import type { Product, ProductMatch } from "../types";

export function ProductCard({
  product,
  reasons,
  featured = false,
}: {
  product: Product;
  reasons?: string[];
  featured?: boolean;
}) {
  const { state, dispatch } = useStore();
  const { locale, m } = useI18n();
  const saved = state.plan.includes(product.id);
  const text: MealCopy = m.mealsById[product.id] ?? {
    name: product.name,
    trigger: product.trigger,
    hook: product.hook,
    audience: product.audience,
    pain: product.pain,
    sugarNote: product.sugarNote,
    ingredients: product.ingredients,
  };

  return (
    <article
      className={`flex h-full flex-col overflow-hidden rounded-[28px] border bg-white shadow-[0_18px_50px_-28px_rgba(31,143,255,0.45)] ${
        featured ? "border-leaf-500/40 ring-2 ring-sun-400/70" : "border-white"
      }`}
    >
      <div className="relative aspect-square w-full bg-[#d7f3e4]">
        <img
          src={product.image}
          alt={`${text.name}. ${m.card.alt}`}
          className="h-full w-full object-contain"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
      <div className="flex items-start justify-between gap-3">
        <p className={`text-xs font-semibold text-coral-600 ${latinClass(locale)}`}>
          {text.trigger}
        </p>
        {featured && (
          <span className="rounded-full bg-berry-500 px-2.5 py-1 text-[11px] font-semibold text-white">
            {m.card.matched}
          </span>
        )}
      </div>
      <h3 className="mt-3 font-serif text-2xl leading-snug text-forest-900">{text.name}</h3>
      <p className="mt-3 text-sm leading-6 text-ink">{text.hook}</p>
      {reasons && reasons.length > 0 && (
        <ul className="mt-4 space-y-2 rounded-2xl bg-forest-50 px-4 py-3 text-sm leading-6 text-forest-900">
          {reasons.map((reason) => (
            <li key={reason}>{localizeReason(locale, reason)}</li>
          ))}
        </ul>
      )}
      <dl className="mt-4 grid grid-cols-4 gap-2 text-center">
        {[
          [m.card.energy, `~${product.kcal}`],
          [m.card.carbs, `${product.carbs}%`],
          [m.card.protein, `${product.protein}%`],
          [m.card.fat, `${product.fat}%`],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl bg-sand-50 px-2 py-2">
            <dt className={`text-[11px] text-mute ${latinClass(locale)}`}>{label}</dt>
            <dd className="mt-1 text-sm font-semibold text-forest-800">{value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 text-xs leading-5 text-mute">{text.sugarNote}</p>
      <div className="mt-4">
        <p className={`text-xs font-semibold text-mute ${latinClass(locale)}`}>{m.card.inBox}</p>
        <ul className="mt-2 space-y-1.5 text-sm leading-6 text-ink">
          {text.ingredients.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-coral-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4 space-y-2 text-sm leading-6 text-mute">
        <p>
          <span className="font-semibold text-ink">{m.card.forWhom} </span>
          {text.audience}
        </p>
        <p>
          <span className="font-semibold text-ink">{m.card.snag} </span>
          {text.pain}
        </p>
      </div>
      <div className="mt-4 space-y-2">
        <button
          type="button"
          onClick={() => dispatch({ type: "toggle-plan", id: product.id })}
          className={`w-full rounded-full px-4 py-3 text-sm font-semibold transition ${
            saved
              ? "bg-forest-700 text-white"
              : "border border-forest-700 text-forest-800 hover:bg-forest-50"
          }`}
        >
          {saved ? m.card.saved : m.card.add}
        </button>
        <button
          type="button"
          onClick={() => dispatch({ type: "open-booking", productId: product.id })}
          className="w-full rounded-full bg-coral-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-coral-600"
        >
          {m.card.book}
        </button>
      </div>
      </div>
    </article>
  );
}

export function ProductMatchList({ matches }: { matches: ProductMatch[] }) {
  if (matches.length === 0) return null;
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {matches.map((match) => (
        <ProductCard key={match.product.id} product={match.product} reasons={match.reasons} featured />
      ))}
    </div>
  );
}

export function Catalog() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {PRODUCTS.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
