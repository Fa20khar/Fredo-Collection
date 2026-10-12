export interface StoreConfig {
  brandName: string;
  tagline: string;
  phoneDisplay: string;
  whatsappNumber: string; // international format without + or 0
  email: string;
  announcement: {
    en: string;
    ur: string;
  };
  currency: string;
  estimatedDeliveryFee: number;
  freeDeliveryThreshold: number;
  deliveryEstimatedDays: string;
  addressSummary: string;
}

export const storeConfig: StoreConfig = {
  brandName: "Fredo's Collection",
  tagline: "Style That Speaks. Elegance That Lasts.",
  phoneDisplay: "03051367640",
  whatsappNumber: "923051367640",
  email: "umeryjutt345@gmail.com",
  announcement: {
    en: "Discover Your Style with Fredo's Collection — Free Nationwide Delivery on Orders Over Rs. 6,000",
    ur: "فریڈوز کلیکشن کے ساتھ اپنا انداز تلاش کریں — 6,000 روپے سے زائد آرڈر پر ملک گیر مفت ڈلیوری",
  },
  currency: "Rs.",
  estimatedDeliveryFee: 250,
  freeDeliveryThreshold: 6000,
  deliveryEstimatedDays: "3–5 Business Days across Pakistan",
  addressSummary: "Lahore, Punjab, Pakistan",
};
