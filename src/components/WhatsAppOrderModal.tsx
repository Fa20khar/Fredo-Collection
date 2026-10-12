import React, { useState } from 'react';
import { X, Send, AlertCircle, CheckCircle2, ShieldCheck, MapPin, Phone, User, MessageSquare } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPKR } from '../utils/currency';
import { generateWhatsAppOrderUrl } from '../utils/whatsapp';
import { storeConfig } from '../data/config';

interface WhatsAppOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WhatsAppOrderModal: React.FC<WhatsAppOrderModalProps> = ({ isOpen, onClose }) => {
  const { cart, subtotal, deliveryFee, totalPrice } = useCart();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [hasLaunchedWhatsApp, setHasLaunchedWhatsApp] = useState(false);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!customerName.trim()) {
      errs.customerName = 'Please enter your full name';
    }
    if (!customerPhone.trim() || customerPhone.replace(/\D/g, '').length < 10) {
      errs.customerPhone = 'Please provide a valid Pakistani contact number (e.g. 03051234567)';
    }
    if (!city.trim()) {
      errs.city = 'Please enter your city';
    }
    if (!address.trim() || address.trim().length < 8) {
      errs.address = 'Please provide a complete delivery street address';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleProceedToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const url = generateWhatsAppOrderUrl({
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      city: city.trim(),
      address: address.trim(),
      notes: notes.trim(),
      items: cart.map((i) => ({
        name: i.name,
        size: i.size,
        color: i.color,
        quantity: i.quantity,
        unitPrice: i.price,
      })),
      subtotal,
      deliveryFee,
      total: totalPrice,
    });

    setHasLaunchedWhatsApp(true);
    // Open official WhatsApp click-to-chat
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-[#E8E4DD] overflow-hidden z-10 my-8">
        {/* Header */}
        <div className="bg-[#173D32] text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white shrink-0 shadow-xs">
              <MessageSquare className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-semibold">
                Order via WhatsApp
              </h3>
              <p className="text-xs text-white/80">
                Official ordering via {storeConfig.phoneDisplay}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 max-h-[75vh] overflow-y-auto">
          {hasLaunchedWhatsApp ? (
            <div className="py-6 text-center space-y-4">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-xl font-semibold text-neutral-900">
                WhatsApp Chat Initiated!
              </h4>
              <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
                We have generated your order message and opened WhatsApp. 
                <strong className="text-neutral-900 block mt-2">
                  Please tap "Send" in WhatsApp to submit your order request to Fredo's Collection.
                </strong>
              </p>
              <div className="bg-[#F8F6F2] p-4 rounded-lg text-xs text-neutral-600 max-w-md mx-auto text-left space-y-1.5 border border-[#E8E4DD]">
                <div className="font-semibold text-neutral-900">What happens next?</div>
                <div>1. Our sales representative will check current fabric & size availability.</div>
                <div>2. We will confirm your delivery address and dispatch timeline.</div>
                <div>3. You will receive tracking details once your parcel is booked.</div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleProceedToWhatsApp}
                  className="w-full sm:w-auto px-5 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>Re-open WhatsApp Message</span>
                </button>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleProceedToWhatsApp} className="space-y-6">
              {/* Important notice */}
              <div className="p-3.5 bg-amber-50 border border-amber-200/80 rounded-lg flex items-start gap-3 text-xs text-amber-900">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <span className="font-semibold">How WhatsApp ordering works:</span> Filling this form creates a pre-formatted message. When you click proceed, WhatsApp will open with your order details prefilled. <em>You must tap send in WhatsApp to submit the inquiry to our team.</em>
                </div>
              </div>

              {/* Order Summary Strip */}
              <div className="bg-[#F8F6F2] p-4 rounded-lg border border-[#E8E4DD] space-y-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-neutral-600">
                  Cart Summary ({cart.reduce((a, b) => a + b.quantity, 0)} Items)
                </div>
                <div className="max-h-28 overflow-y-auto space-y-1 text-xs divide-y divide-[#E8E4DD]">
                  {cart.map((item) => (
                    <div key={item.cartItemId} className="pt-1 flex justify-between">
                      <span className="truncate pr-2">
                        {item.name} ({item.size}) × {item.quantity}
                      </span>
                      <span className="font-mono tabular-nums text-neutral-800 shrink-0 font-medium">
                        {formatPKR(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="pt-2 border-t border-[#E8E4DD] flex justify-between text-xs font-semibold text-neutral-900">
                  <span>Estimated Total (incl. delivery):</span>
                  <span className="text-[#173D32] font-mono tabular-nums font-bold text-sm">
                    {formatPKR(totalPrice)}
                  </span>
                </div>
              </div>

              {/* Customer Delivery Fields */}
              <div className="space-y-4">
                <div className="text-sm font-semibold text-neutral-900 border-b border-[#E8E4DD] pb-1">
                  Customer & Delivery Details
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => {
                          setCustomerName(e.target.value);
                          if (errors.customerName) setErrors({ ...errors, customerName: '' });
                        }}
                        placeholder="e.g. Muhammad Umer"
                        className="w-full text-xs pl-9 pr-3 py-2 border border-[#E8E4DD] rounded-md focus:outline-hidden focus:border-[#173D32]"
                      />
                    </div>
                    {errors.customerName && (
                      <p className="text-[11px] text-[#B42318] mt-1">{errors.customerName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">
                      WhatsApp / Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
                      <input
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => {
                          setCustomerPhone(e.target.value);
                          if (errors.customerPhone) setErrors({ ...errors, customerPhone: '' });
                        }}
                        placeholder="e.g. 03051234567"
                        className="w-full text-xs pl-9 pr-3 py-2 border border-[#E8E4DD] rounded-md focus:outline-hidden focus:border-[#173D32]"
                      />
                    </div>
                    {errors.customerPhone && (
                      <p className="text-[11px] text-[#B42318] mt-1">{errors.customerPhone}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-1">
                    <label className="block text-xs font-medium text-neutral-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => {
                        setCity(e.target.value);
                        if (errors.city) setErrors({ ...errors, city: '' });
                      }}
                      placeholder="e.g. Lahore, Karachi, Islamabad"
                      className="w-full text-xs px-3 py-2 border border-[#E8E4DD] rounded-md focus:outline-hidden focus:border-[#173D32]"
                    />
                    {errors.city && (
                      <p className="text-[11px] text-[#B42318] mt-1">{errors.city}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-neutral-700 mb-1">
                      Delivery Address *
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => {
                          setAddress(e.target.value);
                          if (errors.address) setErrors({ ...errors, address: '' });
                        }}
                        placeholder="House / Flat No, Street, Sector / Area"
                        className="w-full text-xs pl-9 pr-3 py-2 border border-[#E8E4DD] rounded-md focus:outline-hidden focus:border-[#173D32]"
                      />
                    </div>
                    {errors.address && (
                      <p className="text-[11px] text-[#B42318] mt-1">{errors.address}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    Special Instructions / Fitting Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Urgent dispatch requested, or specific color shade preference..."
                    className="w-full text-xs p-2.5 border border-[#E8E4DD] rounded-md focus:outline-hidden focus:border-[#173D32]"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2 border-t border-[#E8E4DD]">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Proceed to WhatsApp & Review Message</span>
                </button>
                <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-500 mt-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>No payment charged now · Cash on delivery confirmed on WhatsApp</span>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
