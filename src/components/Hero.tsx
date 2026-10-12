import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#173D32] text-white">
      {/* Background Image with Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero.jpg"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=80';
          }}
          alt="Fredo's Collection Pakistani Haute Couture"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-45 scale-102 transition-transform duration-1000 ease-out"
        />
        {/* Measured multi-stop gradient scrim to ensure WCAG AA contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#173D32]/95 via-[#173D32]/75 to-transparent sm:to-black/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36 flex flex-col justify-center min-h-[580px] lg:min-h-[640px]">
        <div className="max-w-2xl space-y-6">
          {/* Supporting label */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#C6A36A] uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>YOUR STYLE. YOUR STORY.</span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-[1.15] text-balance">
            Style That Speaks. <br />
            <span className="italic font-normal text-[#C6A36A]">Elegance That Lasts.</span>
          </h1>

          {/* Supporting text */}
          <p className="text-base sm:text-lg text-white/85 font-normal leading-relaxed max-w-xl">
            Discover timeless fashion for every occasion with Fredo's Collection. Explore beautifully designed outfits for women and men crafted with signature Pakistani artistry.
          </p>

          {/* CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              to="/shop?gender=ladies"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#C6A36A] text-[#171717] font-semibold text-sm hover:bg-[#d6b782] transition-colors shadow-sm whitespace-nowrap"
            >
              <span>Shop Ladies</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/shop?gender=gents"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur-xs border border-white/20 transition-colors whitespace-nowrap"
            >
              <span>Shop Gents</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Trust strip */}
          <div className="pt-6 border-t border-white/15 flex flex-wrap items-center gap-6 text-xs text-white/75">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6A36A]" />
              <span>Authentic Pakistani Fabrics</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6A36A]" />
              <span>Nationwide Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6A36A]" />
              <span>Direct WhatsApp Ordering</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
