import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, Truck, MessageSquare, ShieldCheck, User, Phone, MapPin, Send, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPKR } from '../utils/currency';
import { storeConfig } from '../data/config';
import { generateWhatsAppOrderUrl } from '../utils/whatsapp';

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    deliveryFee,
    totalPrice,
    freeShippingRemaining,
  } = useCart();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [orderSent, setOrderSent] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!customerName.trim()) errs.customerName = 'Please enter your full name';
    if (!customerPhone.trim() || customerPhone.replace(/\D/g, '').length < 10) {
      errs.customerPhone = 'Please provide a valid Pakistani contact number (e.g. 03051234567)';
    }
    if (!city.trim()) errs.city = 'Please enter your city';
    if (!address.trim() || address.trim().length < 8) {
      errs.address = 'Please enter a complete delivery address';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleWhatsAppCheckout = (e: React.FormEvent) => {
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

    setOrderSent(true);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center bg-white">
        <div className="w-20 h-20 rounded-full bg-[#F8F6F2] flex items-center justify-center text-[#173D32] mb-4">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-neutral-900">
          Your Shopping Bag is Empty
        </h2>
        <p className="text-sm text-neutral-600 mt-2 max-w-sm">
          You haven't added any clothing pieces yet. Explore our handcrafted collections for ladies and gents.
        </p>
        <Link
          to="/shop"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-[#173D32] hover:bg-[#122e25] text-white rounded-lg text-xs sm:text-sm font-semibold transition-colors"
        >
          <span>Explore Collections</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F6F2] py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs uppercase font-semibold tracking-widest text-[#C6A36A]">
              Checkout Flow
            </div>
            <h1 className="font-serif text-3xl font-semibold text-neutral-900 mt-0.5">
              Your Shopping Bag
            </h1>
          </div>
          <button
            onClick={clearCart}
            className="text-xs text-red-600 hover:text-red-700 font-semibold self-start sm:self-auto cursor-pointer"
          >
            Clear Entire Bag
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Itemized Cart */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-[#E8E4DD] p-6 shadow-xs space-y-6">
            {/* Free shipping banner */}
            <div className="p-3.5 bg-[#F8F6F2] rounded-lg border border-[#E8E4DD] flex items-center gap-3 text-xs">
              <Truck className="w-4 h-4 text-[#C6A36A] shrink-0" />
              {freeShippingRemaining === 0 ? (
                <span className="text-emerald-700 font-semibold">
                  You qualify for Free Delivery across Pakistan! 🎉
                </span>
              ) : (
                <span className="text-neutral-700">
                  Add <strong className="text-neutral-900 font-mono">{formatPKR(freeShippingRemaining)}</strong> more to unlock <strong className="text-[#173D32]">Free Nationwide Shipping</strong>
                </span>
              )}
            </div>

            {/* Items list */}
            <div className="divide-y divide-[#E8E4DD]">
              {cart.map((item) => (
                <div key={item.cartItemId} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-26 object-cover rounded-md bg-[#F8F6F2] shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          to={`/product/${item.productId}`}
                          className="text-sm sm:text-base font-semibold text-neutral-900 hover:text-[#173D32] transition-colors truncate"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="text-neutral-400 hover:text-red-600 p-1"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-xs text-neutral-500 mt-1">
                        Selected Size: <span className="font-semibold text-neutral-800">{item.size}</span>
                        {item.color && (
                          <> · Color: <span className="font-semibold text-neutral-800">{item.color}</span></>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity stepper */}
                      <div className="flex items-center border border-[#E8E4DD] rounded-md bg-[#F8F6F2]">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          className="px-2.5 py-1 text-xs text-neutral-600 hover:bg-[#E8E4DD]"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 text-xs font-bold text-neutral-900 font-mono tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="px-2.5 py-1 text-xs text-neutral-600 hover:bg-[#E8E4DD]"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="text-sm sm:text-base font-bold text-[#173D32] font-mono tabular-nums">
                          {formatPKR(item.price * item.quantity)}
                        </div>
                        <div className="text-[10px] text-neutral-400 font-mono tabular-nums">
                          {item.quantity} × {formatPKR(item.price)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#E8E4DD] flex justify-between">
              <Link
                to="/shop"
                className="text-xs font-semibold text-[#173D32] hover:text-[#C6A36A] flex items-center gap-1.5"
              >
                <span>← Continue Shopping</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Checkout Details Form & WhatsApp Order */}
          <div className="lg:col-span-5 bg-white rounded-xl border border-[#E8E4DD] p-6 shadow-xs space-y-6">
            <h3 className="font-serif text-lg font-semibold text-neutral-900 border-b border-[#E8E4DD] pb-3">
              Delivery Details & Order Confirmation
            </h3>

            {/* Financial Summary */}
            <div className="space-y-2 text-xs text-neutral-600 bg-[#F8F6F2] p-4 rounded-lg border border-[#E8E4DD]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums font-semibold text-neutral-900">
                  {formatPKR(subtotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Delivery Fee</span>
                <span className="font-mono tabular-nums font-semibold text-neutral-900">
                  {deliveryFee === 0 ? 'FREE' : formatPKR(deliveryFee)}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-neutral-900 pt-2 border-t border-[#E8E4DD]">
                <span>Total Estimated</span>
                <span className="text-[#173D32] font-mono tabular-nums">
                  {formatPKR(totalPrice)}
                </span>
              </div>
              <p className="text-[10px] text-neutral-500 pt-1">
                *Estimated nationwide delivery. Final delivery charges confirmed on WhatsApp.
              </p>
            </div>

            {/* Checkout Form */}
            <form onSubmit={handleWhatsAppCheckout} className="space-y-4">
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
                    placeholder="e.g. Umer Jutt"
                    className="w-full text-xs pl-9 pr-3 py-2.5 border border-[#E8E4DD] rounded-md focus:outline-hidden focus:border-[#173D32]"
                  />
                </div>
                {errors.customerName && (
                  <p className="text-[11px] text-[#B42318] mt-1">{errors.customerName}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">
                  WhatsApp Contact Number *
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
                    placeholder="03051367640"
                    className="w-full text-xs pl-9 pr-3 py-2.5 border border-[#E8E4DD] rounded-md focus:outline-hidden focus:border-[#173D32]"
                  />
                </div>
                {errors.customerPhone && (
                  <p className="text-[11px] text-[#B42318] mt-1">{errors.customerPhone}</p>
                )}
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-1">
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
                    placeholder="Lahore"
                    className="w-full text-xs px-3 py-2.5 border border-[#E8E4DD] rounded-md focus:outline-hidden focus:border-[#173D32]"
                  />
                  {errors.city && (
                    <p className="text-[11px] text-[#B42318] mt-1">{errors.city}</p>
                  )}
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    Complete Street Address *
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
                      placeholder="House/Plot #, Block, Area"
                      className="w-full text-xs pl-9 pr-3 py-2.5 border border-[#E8E4DD] rounded-md focus:outline-hidden focus:border-[#173D32]"
                    />
                  </div>
                  {errors.address && (
                    <p className="text-[11px] text-[#B42318] mt-1">{errors.address}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">
                  Fitting / Special Instructions (Optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any tailoring details or preferred delivery slot..."
                  className="w-full text-xs p-2.5 border border-[#E8E4DD] rounded-md focus:outline-hidden focus:border-[#173D32]"
                />
              </div>

              {/* Notice */}
              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200/80 flex items-start gap-2 text-xs text-amber-900">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span className="text-[11px] leading-relaxed">
                  Clicking will open WhatsApp with your prefilled order message for official confirmation. <strong>Please send the WhatsApp message to complete your order request.</strong>
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Order on WhatsApp (03051367640)</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-neutral-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Cash on Delivery · Verified Pakistani Merchant</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
