import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageSquare, X, ShieldCheck } from 'lucide-react';
import { storeConfig } from '../data/config';

export const Footer: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'faq' | 'shipping' | 'returns' | null>(null);

  return (
    <footer className="bg-[#171717] text-[#F8F6F2] pt-16 pb-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-neutral-800">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-semibold tracking-tight text-white">
              Fredo's Collection
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Curating affordable luxury in Pakistani ethnic fashion. Distinctive unstitched suits, festive embroidery, and contemporary gents' attire designed for enduring style.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://wa.me/923051367640"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-[#25D366] text-white flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
                title="WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href="mailto:umeryjutt345@gmail.com"
                className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-[#C6A36A] text-white flex items-center justify-center transition-colors"
                aria-label="Email"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Shop */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-widest uppercase text-[#C6A36A]">
              Shop Collections
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-neutral-400">
              <li>
                <Link to="/shop?gender=ladies" className="hover:text-white transition-colors">
                  Ladies Collection
                </Link>
              </li>
              <li>
                <Link to="/shop?gender=gents" className="hover:text-white transition-colors">
                  Gents Collection
                </Link>
              </li>
              <li>
                <Link to="/shop?filter=new" className="hover:text-white transition-colors">
                  New Season Arrivals
                </Link>
              </li>
              <li>
                <Link to="/shop?filter=sale" className="text-red-400 hover:text-red-300 transition-colors">
                  Special Sale Offers
                </Link>
              </li>
              <li>
                <Link to="/shop?category=unstitched-suits" className="hover:text-white transition-colors">
                  Unstitched Fabrics
                </Link>
              </li>
              <li>
                <Link to="/shop?category=shawls-and-dupattas" className="hover:text-white transition-colors">
                  Velvet & Pashmina Shawls
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-widest uppercase text-[#C6A36A]">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-neutral-400">
              <li>
                <Link to="/support" className="hover:text-white transition-colors">
                  Customer Support & FAQs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact & Inquiries
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-white transition-colors">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-white transition-colors">
                  Saved Wishlist
                </Link>
              </li>
              <li>
                <Link
                  to="/support"
                  className="hover:text-white transition-colors text-left"
                >
                  Size & Measurement Guides
                </Link>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal('shipping')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Shipping & Delivery Info
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal('returns')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Exchange & Return Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-widest uppercase text-[#C6A36A]">
              Direct Contact
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm text-neutral-400">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#C6A36A] shrink-0 mt-0.5" />
                <div>
                  <a
                    href={`tel:${storeConfig.phoneDisplay}`}
                    className="hover:text-white transition-colors block text-white font-medium"
                  >
                    {storeConfig.phoneDisplay}
                  </a>
                  <span className="text-[11px] text-neutral-500">Call or WhatsApp 10 AM – 10 PM</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#C6A36A] shrink-0 mt-0.5" />
                <a
                  href={`mailto:${storeConfig.email}`}
                  className="hover:text-white transition-colors break-all"
                >
                  {storeConfig.email}
                </a>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C6A36A] shrink-0 mt-0.5" />
                <span>{storeConfig.addressSummary}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © {new Date().getFullYear()} Fredo's Collection. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-neutral-600">PKR Currency</span>
            <span aria-hidden="true">·</span>
            <span className="text-neutral-600">Authentic Pakistani Fashion</span>
          </div>
        </div>
      </div>

      {/* Policy Modals */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setActiveModal(null)}
          />
          <div className="relative w-full max-w-xl bg-white text-neutral-900 rounded-xl shadow-2xl p-6 sm:p-8 z-10 border border-[#E8E4DD] max-h-[80vh] overflow-y-auto">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-1.5 text-neutral-500 hover:text-neutral-900"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {activeModal === 'faq' && (
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-semibold text-[#173D32]">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-3 text-xs sm:text-sm text-neutral-700">
                  <div>
                    <h5 className="font-semibold text-neutral-900">How do I place an order?</h5>
                    <p className="text-neutral-600 mt-0.5">Add your desired outfits to your bag, click "Proceed to WhatsApp Order", provide your delivery address, and tap send in WhatsApp. Our team will promptly confirm stock and prepare dispatch.</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-neutral-900">What payment methods are supported?</h5>
                    <p className="text-neutral-600 mt-0.5">We offer Cash on Delivery (COD) across Pakistan as well as direct bank transfer / EasyPaisa / JazzCash upon WhatsApp confirmation.</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-neutral-900">Are these fabrics original?</h5>
                    <p className="text-neutral-600 mt-0.5">Yes, all suits are crafted using genuine premium fabrics including pure Dhanak, combed lawn, micro-velvet, and heavy handloom Khaddar.</p>
                  </div>
                </div>
              </div>
            )}

            {activeModal === 'shipping' && (
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-semibold text-[#173D32]">
                  Shipping Information
                </h3>
                <div className="space-y-2 text-xs sm:text-sm text-neutral-700 leading-relaxed">
                  <p>• <strong>Delivery Time:</strong> Orders are dispatched via trusted courier services (TCS, Leopards, Trax) within 24-48 hours. Estimated delivery is 3–5 working days nationwide.</p>
                  <p>• <strong>Delivery Charges:</strong> Standard flat rate of Rs. 250 across Pakistan. Orders over Rs. 6,000 qualify for <strong>FREE Delivery</strong>.</p>
                  <p>• <strong>Order Tracking:</strong> A courier tracking number will be shared with you on WhatsApp once the parcel is handed over.</p>
                </div>
              </div>
            )}

            {activeModal === 'returns' && (
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-semibold text-[#173D32]">
                  Exchange & Return Policy
                </h3>
                <div className="space-y-2 text-xs sm:text-sm text-neutral-700 leading-relaxed">
                  <p>• We offer a <strong>7-Day Exchange Window</strong> if the delivered item has any defect, wrong size delivered, or transit damage.</p>
                  <p>• Items must be unwashed, unworn, and have all original tags and packing intact.</p>
                  <p>• For any return or exchange queries, simply reach out to us at 03051367640 with your order photo.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </footer>
  );
};
