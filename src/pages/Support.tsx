import React, { useState } from 'react';
import { Ruler, Truck, RotateCcw, MessageSquare, Phone, Mail, ShieldCheck, ChevronRight, CheckCircle2 } from 'lucide-react';
import { FAQSection } from '../components/FAQSection';
import { SizeGuideModal } from '../components/SizeGuideModal';
import { storeConfig } from '../data/config';
import { generateSupportWhatsAppUrl } from '../utils/whatsapp';

export const Support: React.FC = () => {
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [sizeGuideGender, setSizeGuideGender] = useState<'ladies' | 'gents'>('ladies');

  const openSizeGuide = (gender: 'ladies' | 'gents') => {
    setSizeGuideGender(gender);
    setIsSizeGuideOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Banner */}
      <div className="bg-[#173D32] text-white py-14 sm:py-20 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#C6A36A]">
            Fredo's Collection Help Desk
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium mt-1">
            Customer Support & Sizing Guides
          </h1>
          <p className="text-sm sm:text-base text-white/80 mt-2 max-w-2xl mx-auto">
            Everything you need for confident shopping: accurate clothing dimensions, nationwide delivery timelines, hassle-free exchange policies, and direct assistance.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => openSizeGuide('ladies')}
              className="px-5 py-2.5 rounded-lg bg-[#C6A36A] hover:bg-[#d6b782] text-neutral-900 text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <Ruler className="w-4 h-4" />
              <span>Ladies Size Chart</span>
            </button>
            <button
              onClick={() => openSizeGuide('gents')}
              className="px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-semibold flex items-center gap-2 backdrop-blur-xs transition-colors cursor-pointer"
            >
              <Ruler className="w-4 h-4" />
              <span>Gents Size Chart</span>
            </button>
            <a
              href="#faqs-content"
              className="px-5 py-2.5 rounded-lg bg-white text-[#173D32] hover:bg-neutral-100 text-xs font-semibold transition-colors"
            >
              <span>Browse All FAQs ↓</span>
            </a>
          </div>
        </div>
      </div>

      {/* 3 Pillars Overview: Sizing, Delivery, Exchanges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Pillar 1: Sizing Confidence */}
          <div className="p-6 sm:p-8 bg-[#F8F6F2] rounded-2xl border border-[#E8E4DD] flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#173D32] text-white flex items-center justify-center">
                <Ruler className="w-6 h-6 text-[#C6A36A]" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-neutral-900">
                Sizing & Tailoring Guide
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Standard Pakistani ready-to-wear sizing in inches and centimeters, plus cut lengths for 3-piece unstitched fabrics.
              </p>
              <ul className="text-xs text-neutral-700 space-y-1.5 list-disc list-inside">
                <li>Ladies: Small, Medium, Large, Extra Large</li>
                <li>Gents: Chest 38 to 44 with collar sizes</li>
                <li>Unstitched: 3.0m shirt, 2.5m trouser, 4.5m gents</li>
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-[#E8E4DD] flex gap-2">
              <button
                onClick={() => openSizeGuide('ladies')}
                className="flex-1 py-2 px-3 text-center text-xs font-semibold rounded-lg bg-[#173D32] text-white hover:bg-[#122e25] transition-colors cursor-pointer"
              >
                Ladies Chart
              </button>
              <button
                onClick={() => openSizeGuide('gents')}
                className="flex-1 py-2 px-3 text-center text-xs font-semibold rounded-lg border border-[#E8E4DD] bg-white text-neutral-800 hover:bg-neutral-50 transition-colors cursor-pointer"
              >
                Gents Chart
              </button>
            </div>
          </div>

          {/* Pillar 2: Delivery & Shipping */}
          <div className="p-6 sm:p-8 bg-[#F8F6F2] rounded-2xl border border-[#E8E4DD] flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#173D32] text-white flex items-center justify-center">
                <Truck className="w-6 h-6 text-[#C6A36A]" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-neutral-900">
                Nationwide Delivery
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Reliable express courier service across Pakistan via TCS, Leopards Courier, and Trax with online tracking.
              </p>
              <ul className="text-xs text-neutral-700 space-y-1.5 list-disc list-inside">
                <li>3–5 days: Lahore, Karachi, Islamabad, Pindi</li>
                <li>4–6 days: Regional cities & towns</li>
                <li>Flat Rs. 250 (FREE on orders over Rs. 6,000)</li>
                <li>Cash on Delivery (COD) available</li>
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-[#E8E4DD]">
              <a
                href={generateSupportWhatsAppUrl('Salam! I want to check delivery status for my order.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 text-center text-xs font-semibold rounded-lg bg-[#25D366] text-white hover:bg-[#20ba59] inline-flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-current" />
                <span>Track via WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Pillar 3: 7-Day Exchange Policy */}
          <div className="p-6 sm:p-8 bg-[#F8F6F2] rounded-2xl border border-[#E8E4DD] flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#173D32] text-white flex items-center justify-center">
                <RotateCcw className="w-6 h-6 text-[#C6A36A]" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-neutral-900">
                7-Day Easy Exchange
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Customer satisfaction is our highest priority. If an outfit does not fit as expected or has a defect, exchange it seamlessly.
              </p>
              <ul className="text-xs text-neutral-700 space-y-1.5 list-disc list-inside">
                <li>7 calendar days from delivery date</li>
                <li>Unwashed, unworn, original tags attached</li>
                <li>WhatsApp proof photos for swift approval</li>
                <li>Doorstep replacement service available</li>
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-[#E8E4DD]">
              <a
                href={generateSupportWhatsAppUrl('Salam! I need to request an exchange for an item.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 text-center text-xs font-semibold rounded-lg border border-[#E8E4DD] bg-white text-neutral-800 hover:bg-neutral-50 inline-flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Initiate Exchange Request →</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Comprehensive FAQs Section */}
      <div id="faqs-content" className="border-t border-[#E8E4DD]">
        <FAQSection />
      </div>

      {/* Contact Support Channels Box */}
      <div className="border-t border-[#E8E4DD] bg-[#F8F6F2] py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#C6A36A]">
            Human Assistance
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-neutral-900">
            Still Have Questions? We're Here to Help
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 max-w-lg mx-auto">
            Our fashion stylists and order support team are active daily on WhatsApp and email to assist you.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <a
              href={generateSupportWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-lg text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>WhatsApp: {storeConfig.phoneDisplay}</span>
            </a>
            <a
              href={`mailto:${storeConfig.email}`}
              className="px-6 py-3 bg-[#173D32] hover:bg-[#122e25] text-white rounded-lg text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors"
            >
              <Mail className="w-4 h-4 text-[#C6A36A]" />
              <span>Email: {storeConfig.email}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Modal instance */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        defaultGender={sizeGuideGender}
      />
    </div>
  );
};
