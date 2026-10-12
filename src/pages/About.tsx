import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, HeartHandshake, Scissors, Palette } from 'lucide-react';
import { storeConfig } from '../data/config';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Editorial Header */}
      <div className="relative bg-[#173D32] text-white py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1400&q=80"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/hero.jpg';
            }}
            alt="Fredo's Collection Heritage"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#173D32] via-[#173D32]/80 to-[#173D32]/90" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-semibold tracking-widest text-[#C6A36A] uppercase">
            Our Brand Story
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-white leading-tight">
            Fashion for Every Moment.
          </h1>
          <p className="text-base sm:text-lg text-white/85 max-w-2xl mx-auto font-normal leading-relaxed">
            Welcome to Fredo's Collection, your destination for elegant ladies' and gents' clothing. We believe great style should feel comfortable, look beautiful, and fit the moments that matter most.
          </p>
        </div>
      </div>

      {/* Main Philosophy Story */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C6A36A]">
              Our Philosophy
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-medium text-neutral-900 leading-tight">
              Honoring Heritage Craft With Modern Ease
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-neutral-600 leading-relaxed">
              <p>
                At Fredo's Collection, we design clothing for real Pakistani lives. We curate beautifully crafted 3-piece unstitched fabrics, heavily embroidered seasonal formal suits, and classic gentlemen’s Kurta Shalwar that transition effortlessly from daytime family gatherings to festive evening celebrations.
              </p>
              <p>
                Our philosophy is simple: fashion should never be overly complicated or inaccessible. By collaborating directly with textile weavers and embroidery craftspeople, we deliver premium fabrics—including heavy winter Dhanak, rich velvet, combed lawn, and pure Egyptian cotton—at honest, direct prices.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl overflow-hidden aspect-3/4 shadow-sm border border-[#E8E4DD]">
              <img
                src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/ladies_embroidered.jpg';
                }}
                alt="Ladies Embroidered Suit"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-xl overflow-hidden aspect-3/4 shadow-sm border border-[#E8E4DD] mt-6">
              <img
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/gents_kurta.jpg';
                }}
                alt="Gents Kurta Shalwar"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Pillars Strip */}
        <div className="mt-20 pt-16 border-t border-[#E8E4DD] grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-[#F8F6F2] rounded-xl border border-[#E8E4DD] space-y-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#173D32] shadow-xs">
              <Scissors className="w-5 h-5 text-[#C6A36A]" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-neutral-900">
              Authentic Pakistani Cuts
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              From traditional shalwar kameez proportions to modern straight-cut silhouettes, our patterns are made to flatter comfortably.
            </p>
          </div>

          <div className="p-6 bg-[#F8F6F2] rounded-xl border border-[#E8E4DD] space-y-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#173D32] shadow-xs">
              <Palette className="w-5 h-5 text-[#C6A36A]" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-neutral-900">
              Timeless Color Palettes
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              We specialize in deep jewel tones—regal emerald green, burgundy maroon, champagne gold—balanced with soft pastel lawns.
            </p>
          </div>

          <div className="p-6 bg-[#F8F6F2] rounded-xl border border-[#E8E4DD] space-y-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#173D32] shadow-xs">
              <HeartHandshake className="w-5 h-5 text-[#C6A36A]" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-neutral-900">
              Personal WhatsApp Service
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Connect directly with our sales team via WhatsApp for custom advice on fabric feel, color matching, and parcel tracking.
            </p>
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-20 p-8 sm:p-12 bg-[#173D32] text-white rounded-2xl text-center space-y-5">
          <h3 className="font-serif text-2xl sm:text-3xl font-medium">
            Explore the Latest Season with Fredo's Collection
          </h3>
          <p className="text-sm text-white/80 max-w-lg mx-auto">
            Discover our curated arrivals for women and men, or reach out to us directly for styling inquiries.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/shop"
              className="px-6 py-3 bg-[#C6A36A] hover:bg-[#d6b782] text-neutral-900 font-semibold text-xs rounded-lg transition-colors"
            >
              Shop Full Collection
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-lg border border-white/20 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
