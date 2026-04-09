import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { GlassCard, Button } from "@/components/UI";
import { ShoppingBag, Search, Star, Heart, Plus, ArrowRight } from "lucide-react";
import { useStore } from "@/store/useStore";
import { marketplaceProducts, womenBrands } from "@/data/appContent";
import { localizedProduct, localizedBrand, marketplaceCategoryLabel } from "@/lib/localizedData";

const CATEGORY_VALUES = ["All", "Solar Inverter", "Solar Battery", "Solar Lighting", "Solar Accessories"] as const;

const Marketplace = () => {
  const { addToCart } = useStore();
  const { t, i18n } = useTranslation();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof CATEGORY_VALUES)[number]>("All");

  const products = useMemo(
    () => marketplaceProducts.map((p) => localizedProduct(t, p)),
    [t, i18n.language],
  );
  const brands = useMemo(() => womenBrands.map((b) => localizedBrand(t, b)), [t, i18n.language]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const raw = marketplaceProducts.find((x) => x.id === p.id)!;
      const okCat = cat === "All" || raw.category === cat;
      const qq = q.trim().toLowerCase();
      const okQ =
        !qq ||
        raw.name.toLowerCase().includes(qq) ||
        raw.brand.toLowerCase().includes(qq) ||
        raw.category.toLowerCase().includes(qq);
      return okCat && okQ;
    });
  }, [q, cat, products]);

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold">{t("marketplace.title")}</h1>
          <p className="text-slate-500">{t("marketplace.subtitle")}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t("marketplace.searchPlaceholder")}
              className="glass pl-12 pr-6 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 w-64 max-w-full"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {CATEGORY_VALUES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCat(c)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              cat === c ? "bg-primary text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {marketplaceCategoryLabel(t, c)}
          </button>
        ))}
      </div>

      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <ShoppingBag className="text-primary" /> {t("marketplace.solarEquipment")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((product) => (
            <GlassCard key={product.id} className="p-0 overflow-hidden group flex flex-col">
              <Link to={`/marketplace/${product.id}`} className="relative h-56 overflow-hidden bg-white block">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-4 left-4 px-3 py-1 bg-primary text-white text-xs font-bold rounded-full pointer-events-none">
                  {product.category}
                </span>
              </Link>
              <div className="p-6 flex-1 flex flex-col">
                <Link to={`/marketplace/${product.id}`} className="group/title">
                  <h3 className="text-lg font-bold leading-tight group-hover/title:text-primary transition-colors flex items-start justify-between gap-2">
                    {product.name}
                    <ArrowRight size={18} className="text-slate-300 group-hover/title:text-primary shrink-0 mt-1" />
                  </h3>
                </Link>
                <div className="flex items-center gap-1 text-amber-500 font-bold text-sm my-2">
                  <Star size={16} fill="currentColor" />
                  {product.rating}
                  <span className="text-slate-400 font-normal ml-1">
                    {product.reviews} {t("common.reviews")}
                  </span>
                </div>
                <p className="text-sm text-slate-500 line-clamp-2 mb-4">{product.description}</p>
                <div className="flex items-center justify-between mt-auto gap-2">
                  <div className="text-2xl font-bold text-primary">₹{product.price.toLocaleString("en-IN")}</div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="p-3 rounded-xl bg-slate-100 text-slate-400 hover:text-primary"
                      aria-label={t("marketplace.saveAria")}
                    >
                      <Heart size={20} />
                    </button>
                    <Button
                      onClick={() => {
                        const raw = marketplaceProducts.find((x) => x.id === product.id);
                        if (raw) addToCart(raw);
                      }}
                      className="rounded-xl p-3"
                      aria-label={t("marketplace.addCartAria")}
                    >
                      <Plus size={20} />
                    </Button>
                  </div>
                </div>
                <Link to={`/marketplace/${product.id}`} className="text-xs text-primary font-semibold mt-3 inline-block">
                  {t("marketplace.viewOffers")}
                </Link>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Heart className="text-rose-500" /> {t("marketplace.womenBrands")}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {brands.map((brand) => (
            <a
              key={brand.id}
              href={brand.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass p-6 rounded-3xl flex flex-col gap-3 hover:scale-[1.02] transition-transform"
            >
              <div className="w-full aspect-square rounded-2xl overflow-hidden bg-white flex items-center justify-center p-3">
                <img src={brand.image} alt={brand.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
              </div>
              <div>
                <div className="font-bold">{brand.name}</div>
                <div className="text-xs text-slate-400">{brand.category}</div>
                <p className="text-xs text-slate-500 mt-2 leading-snug line-clamp-3">{brand.description}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Marketplace;
