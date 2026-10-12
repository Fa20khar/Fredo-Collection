import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { collections } from '../data/collections';

export const FeaturedCollections: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#C6A36A]">
            Curated Themes
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#171717] mt-1 text-balance">
            Discover Our Collections
          </h2>
          <p className="text-sm text-neutral-600 mt-2">
            Every stitch reflects our dedication to heritage craft, contemporary aesthetics, and affordable luxury.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((col) => {
            const linkHref = col.categoryFilter
              ? `/shop?category=${col.categoryFilter}`
              : col.genderFilter && col.genderFilter !== 'all'
              ? `/shop?gender=${col.genderFilter}`
              : `/shop?collection=${col.id}`;

            return (
              <div
                key={col.id}
                className="group relative flex flex-col rounded-lg border border-[#E8E4DD] overflow-hidden bg-[#F8F6F2] hover:border-[#173D32]/40 transition-all duration-300"
              >
                <div className="relative aspect-16/10 w-full overflow-hidden">
                  <img
                    src={col.image}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/ladies_bin_saeed.jpg';
                    }}
                    alt={col.title}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[11px] font-medium uppercase tracking-wider text-[#C6A36A]">
                      {col.subtitle}
                    </span>
                    <h3 className="font-serif text-xl font-semibold mt-0.5 text-white">
                      {col.title}
                    </h3>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                  <p className="text-xs sm:text-sm text-neutral-600">
                    {col.description}
                  </p>

                  <Link
                    to={linkHref}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-[#173D32] hover:text-[#C6A36A] transition-colors pt-2 border-t border-[#E8E4DD]"
                  >
                    <span>Explore Collection</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
