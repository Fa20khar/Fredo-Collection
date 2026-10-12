import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { categories } from '../data/categories';

export const ShopByCategory: React.FC = () => {
  const [activeGender, setActiveGender] = useState<'all' | 'ladies' | 'gents'>('ladies');

  const filteredCategories = categories.filter((cat) => {
    if (activeGender === 'all') return true;
    return cat.gender === activeGender;
  });

  return (
    <section className="py-16 sm:py-24 bg-[#F8F6F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-10 border-b border-[#E8E4DD]">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-[#C6A36A]">
              Curated Wardrobe
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-medium text-[#171717] mt-1 text-balance">
              Find Your Perfect Style
            </h2>
            <p className="text-sm text-neutral-600 mt-2 max-w-xl">
              Explore bespoke Pakistani tailoring, from hand-embroidered Dhanak luxury suits to distinguished men's Kurta Shalwar and waistcoats.
            </p>
          </div>

          {/* Interactive Gender Filter Tabs */}
          <div className="flex items-center gap-1 p-1 bg-white rounded-lg border border-[#E8E4DD] shrink-0 self-start sm:self-auto">
            <button
              onClick={() => setActiveGender('ladies')}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-all ${
                activeGender === 'ladies'
                  ? 'bg-[#173D32] text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Ladies ({categories.filter((c) => c.gender === 'ladies').length})
            </button>
            <button
              onClick={() => setActiveGender('gents')}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-all ${
                activeGender === 'gents'
                  ? 'bg-[#173D32] text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Gents ({categories.filter((c) => c.gender === 'gents').length})
            </button>
            <button
              onClick={() => setActiveGender('all')}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-all ${
                activeGender === 'all'
                  ? 'bg-[#173D32] text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              All
            </button>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-10">
          {filteredCategories.map((category) => (
            <Link
              key={category.id}
              to={`/shop?category=${category.id}&gender=${category.gender}`}
              className="group relative flex flex-col bg-white rounded-lg border border-[#E8E4DD] overflow-hidden hover:border-[#173D32]/40 hover:shadow-lg transition-all duration-300"
            >
              <div className="relative aspect-4/3 w-full overflow-hidden bg-neutral-100">
                <img
                  src={category.image}
                  onError={(e) => {
                    const fallback =
                      category.gender === 'ladies'
                        ? '/images/ladies_bin_saeed.jpg'
                        : '/images/gents_wool_shadar.jpg';
                    (e.target as HTMLImageElement).src = fallback;
                  }}
                  alt={category.name}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Badge */}
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 bg-white/90 text-neutral-800 rounded-xs backdrop-blur-xs">
                    {category.gender === 'ladies' ? 'Ladies' : 'Gents'}
                  </span>
                </div>

                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <h3 className="font-serif text-lg sm:text-xl font-semibold text-white drop-shadow-xs">
                    {category.name}
                  </h3>
                </div>
              </div>

              <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-4">
                <p className="text-xs sm:text-sm text-neutral-600 line-clamp-2">
                  {category.description}
                </p>

                <div className="pt-2 border-t border-[#E8E4DD]/60 flex items-center justify-between text-xs font-semibold text-[#173D32] group-hover:text-[#C6A36A] transition-colors">
                  <span>Shop Collection</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
