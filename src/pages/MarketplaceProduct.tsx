import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { GlassCard, Button } from "@/components/UI";
import { ArrowLeft, Star, ShoppingBag, CheckCircle, Truck, Shield } from "lucide-react";
import { marketplaceProducts } from "@/data/appContent";
import { useStore } from "@/store/useStore";
import { localizedProduct } from "@/lib/localizedData";

const MarketplaceProduct = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useStore();
  const { t, i18n } = useTranslation();
  const raw = marketplaceProducts.find((p) => p.id === id);
  const product = useMemo(() => (raw ? localizedProduct(t, raw) : undefined), [raw, t, i18n.language]);

  if (!product || !raw) {
    return (
      <div className="space-y-4">
        <Link to="/marketplace" className="text-primary font-medium inline-flex items-center gap-2">
          <ArrowLeft size={18} /> {t("marketplaceProduct.backMarketplace")}
        </Link>
        <GlassCard className="p-8 text-slate-500">{t("notFound.product")}</GlassCard>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl">
      <Link to="/marketplace" className="text-primary font-medium inline-flex items-center gap-2">
        <ArrowLeft size={18} /> {t("marketplaceProduct.backCatalog")}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <GlassCard className="p-6 flex items-center justify-center bg-white min-h-[320px]">
          <img src={product.image} alt={product.name} className="max-h-96 w-full object-contain" referrerPolicy="no-referrer" />
        </GlassCard>

        <div className="space-y-6">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/15 text-primary text-xs font-bold">{product.category}</div>
          <h1 className="text-3xl font-bold leading-tight">{product.name}</h1>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star size={20} fill="currentColor" />
              {product.rating}
            </div>
            <span className="text-slate-400 text-sm">
              {product.reviews} {t("common.verifiedRatings")}
            </span>
            <span className="text-slate-500 text-sm">
              {t("common.brand")}: {product.brand}
            </span>
          </div>
          <p className="text-slate-600 leading-relaxed">{product.description}</p>
          <div className="text-4xl font-bold text-primary">₹{product.price.toLocaleString("en-IN")}</div>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => addToCart(raw)} className="rounded-2xl px-8">
              <ShoppingBag size={20} className="mr-2 inline" /> {t("marketplaceProduct.addToCart")}
            </Button>
            <a
              href="mailto:support@sheshark.app?subject=Bulk%20quote%20request"
              className="btn-secondary flex items-center justify-center rounded-2xl px-8 py-3 font-semibold"
            >
              {t("marketplaceProduct.requestBulk")}
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-600">
            {product.warranty && (
              <div className="flex gap-2 items-start">
                <Shield className="text-primary shrink-0 mt-0.5" size={18} />
                <span>{product.warranty}</span>
              </div>
            )}
            {product.shipping && (
              <div className="flex gap-2 items-start">
                <Truck className="text-primary shrink-0 mt-0.5" size={18} />
                <span>{product.shipping}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {product.specs && product.specs.length > 0 && (
        <GlassCard className="p-6">
          <h2 className="text-xl font-bold mb-4">{t("common.specifications")}</h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {product.specs.map((s) => (
              <div key={`${s.label}-${s.value}`} className="flex justify-between gap-4 border-b border-slate-100 pb-2">
                <dt className="text-slate-500">{s.label}</dt>
                <dd className="font-semibold text-right">{s.value}</dd>
              </div>
            ))}
          </dl>
        </GlassCard>
      )}

      <GlassCard className="p-6 space-y-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <CheckCircle className="text-primary" /> {t("marketplaceProduct.whatWeOffer")}
        </h2>
        <ul className="space-y-4">
          {product.offers.map((o) => (
            <li key={o.title} className="rounded-2xl bg-slate-50 p-4">
              <div className="font-bold text-slate-800">{o.title}</div>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">{o.detail}</p>
            </li>
          ))}
        </ul>
      </GlassCard>
    </div>
  );
};

export default MarketplaceProduct;
