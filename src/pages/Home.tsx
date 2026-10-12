import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Shield, HeartHandshake, Truck, SlidersHorizontal } from 'lucide-react';
import { Hero } from '../components/Hero';
import { ShopByCategory } from '../components/ShopByCategory';
import { FeaturedCollections } from '../components/FeaturedCollections';
import { ProductCard } from '../components/ProductCard';
import { QuickViewModal } from '../components/QuickViewModal';
import { NewsletterSection } from '../components/NewsletterSection';
import { products, Product } from '../data/products';

export const Home: React.FC = () => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [homeCategory, setHomeCategory] = useState<'all' | 'ladies' | 'gents' | 'sale' | 'new'>('all');
  const [homeSort, setHomeSort] = useState<'featured' | 'price-low' | 'price-high' | 'newest'>('featured');

  // Filtered and sorted products for Homepage
  const displayedArrivals = useMemo(() => {
    return products
      .filter((p) => {
        if (homeCategory === 'ladies') return p.gender === 'ladies';
        if (homeCategory === 'gents') return p.gender === 'gents';
        if (homeCategory === 'sale') return p.onSale;
        if (homeCategory === 'new') return p.isNew;
        return true;
      })
      .sort((a, b) => {
        if (homeSort === 'price-low') return a.price - b.price;
        if (homeSort === 'price-high') return b.price - a.price;
        if (homeSort === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      })
      .slice(0, 8);
  }, [homeCategory, homeSort]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <Hero />

      {/* Trust Highlights Strip */}
      <section className="border-b border-[#E8E4DD] bg-[#F8F6F2] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#173D32] border border-[#E8E4DD] shadow-xs">
                <Sparkles className="w-5 h-5 text-[#C6A36A]" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-neutral-900">Artisanal Craftsmanship</h4>
                <p className="text-[11px] text-neutral-500">Fine resham & tilla embroidery</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#173D32] border border-[#E8E4DD] shadow-xs">
                <Truck className="w-5 h-5 text-[#C6A36A]" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-neutral-900">Nationwide Delivery</h4>
                <p className="text-[11px] text-neutral-500">Safe courier dispatch across Pakistan</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#173D32] border border-[#E8E4DD] shadow-xs">
                <Shield className="w-5 h-5 text-[#C6A36A]" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-neutral-900">Premium Fabrics</h4>
                <p className="text-[11px] text-neutral-500">Pure Dhanak, Lawn, Wool & Silk</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#173D32] border border-[#E8E4DD] shadow-xs">
                <HeartHandshake className="w-5 h-5 text-[#C6A36A]" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-neutral-900">WhatsApp Support</h4>
                <p className="text-[11px] text-neutral-500">Personalized fitting & sizing advice</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <ShopByCategory />

      {/* Fresh Arrivals (Section 9) with Category Tabs & Sorting */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#C6A36A]">
                Curated Collection
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-medium text-[#171717] mt-1">
                Fresh Arrivals & Best Sellers
              </h2>
              <p className="text-sm text-neutral-600 mt-1 max-w-lg">
                Discover our latest season drop featuring embroidered Dhanak suits, luxury shawls, and tailored men's kurta wear.
              </p>
            </div>

            <Link
              to="/shop?filter=new"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#173D32] hover:text-[#C6A36A] transition-colors self-start sm:self-auto"
            >
              <span>Explore Complete Storefront</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Interactive Category Tabs & Sort Bar */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#E8E4DD]">
            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 bg-[#F8F6F2] p-1.5 rounded-xl border border-[#E8E4DD]">
              {[
                { id: 'all', label: 'All Items' },
                { id: 'ladies', label: "Ladies' Collection" },
                { id: 'gents', label: "Gents' Wear" },
                { id: 'sale', label: 'Special Offers %' },
                { id: 'new', label: 'New In' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setHomeCategory(tab.id as any)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    homeCategory === tab.id
                      ? 'bg-[#173D32] text-white shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-white/60'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs self-end md:self-auto">
              <span className="text-neutral-500 whitespace-nowrap">Sort by:</span>
              <select
                value={homeSort}
                onChange={(e) => setHomeSort(e.target.value as any)}
                className="px-3 py-1.5 border border-[#E8E4DD] rounded-lg bg-white text-neutral-800 text-xs font-medium focus:outline-hidden focus:border-[#173D32] cursor-pointer shadow-xs"
              >
                <option value="featured">Featured & Curated</option>
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {displayedArrivals.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>

          {displayedArrivals.length === 0 && (
            <div className="py-16 text-center bg-[#F8F6F2] rounded-xl border border-[#E8E4DD]">
              <p className="text-sm text-neutral-600">No items match the chosen filter.</p>
              <button
                onClick={() => setHomeCategory('all')}
                className="mt-3 text-xs font-semibold text-[#173D32] underline"
              >
                Show All Items
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Featured Collections Section */}
      <FeaturedCollections />

      {/* Brand Story Editorial Highlight */}
      <section className="py-16 sm:py-24 bg-[#F8F6F2] border-t border-[#E8E4DD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative aspect-4/3 sm:aspect-16/10 lg:aspect-4/3 rounded-xl overflow-hidden shadow-md">
              <img
                src="/images/hero.jpg"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80';
                }}
                alt="Fredo's Collection Brand Story"
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            <div className="space-y-6">
              <div className="text-xs font-semibold uppercase tracking-widest text-[#C6A36A]">
                About Fredo's Collection
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#171717] leading-tight">
                Fashion for Every Moment.
              </h2>
              <div className="space-y-4 text-sm text-neutral-600 leading-relaxed">
                <p>
                  Welcome to Fredo's Collection, your destination for elegant ladies' and gents' clothing. We believe great style should feel comfortable, look beautiful, and fit the moments that matter most.
                </p>
                <p>
                  From festive gatherings to everyday routines, our hand-selected seasonal fabrics celebrate Pakistan’s rich heritage with contemporary grace and exceptional value.
                </p>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <Link
                  to="/about"
                  className="px-6 py-3 bg-[#173D32] hover:bg-[#122e25] text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  Read Our Story
                </Link>
                <Link
                  to="/contact"
                  className="px-6 py-3 bg-white hover:bg-neutral-50 text-neutral-800 border border-[#E8E4DD] rounded-lg text-xs font-semibold transition-colors"
                >
                  Contact Our Stylists
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <NewsletterSection />

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};
