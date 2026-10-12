import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Trash2, ShoppingBag, ArrowRight, MessageSquare, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPKR } from '../utils/currency';
import { WhatsAppOrderModal } from './WhatsAppOrderModal';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isDrawerOpen,
    closeDrawer,
    removeFromCart,
    updateQuantity,
    totalItemsCount,
    subtotal,
    deliveryFee,
    totalPrice,
    freeShippingRemaining,
  } = useCart();

  const [orderModalOpen, setOrderModalOpen] = useState(false);

  if (!isDrawerOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
          onClick={closeDrawer}
        />

        {/* Slide-over panel */}
        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-[#E8E4DD] animate-in slide-in-from-right duration-300">
            {/* Drawer Header */}
            <div className="p-5 border-b border-[#E8E4DD] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-[#173D32]" />
                <h3 className="font-serif text-lg font-semibold text-neutral-900">
                  Shopping Bag ({totalItemsCount})
                </h3>
              </div>
              <button
                onClick={closeDrawer}
                className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900 transition-colors"
                aria-label="Close cart drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free shipping progress strip */}
            <div className="bg-[#F8F6F2] px-5 py-3 border-b border-[#E8E4DD]">
              <div className="flex items-center gap-2 text-xs font-medium text-neutral-700">
                <Truck className="w-4 h-4 text-[#C6A36A] shrink-0" />
                {freeShippingRemaining === 0 ? (
                  <span className="text-emerald-700 font-semibold">
                    Congratulations! You qualify for Free Nationwide Delivery! 🎉
                  </span>
                ) : (
                  <span>
                    Add <strong className="text-neutral-900 font-mono tabular-nums">{formatPKR(freeShippingRemaining)}</strong> more for <strong className="text-[#173D32]">Free Delivery</strong>
                  </span>
                )}
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#E8E4DD]">
              {cart.length === 0 ? (
                <div className="py-20 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#F8F6F2] flex items-center justify-center mx-auto text-neutral-400">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-semibold text-neutral-800">
                      Your bag is empty
                    </h4>
                    <p className="text-xs text-neutral-500 mt-1 max-w-xs mx-auto">
                      Explore our handcrafted ladies' and gents' collections to find your perfect style.
                    </p>
                  </div>
                  <button
                    onClick={closeDrawer}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#173D32] hover:bg-[#122e25] text-white rounded-lg text-xs font-semibold transition-colors"
                  >
                    <span>Start Shopping</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.cartItemId} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-18 h-22 object-cover rounded-md bg-[#F8F6F2] shrink-0"
                    />
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-semibold text-neutral-900 truncate">
                            {item.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.cartItemId)}
                            className="text-neutral-400 hover:text-red-600 p-1 transition-colors"
                            aria-label={`Remove ${item.name} from bag`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="text-xs text-neutral-500 mt-0.5">
                          Size: <span className="font-medium text-neutral-800">{item.size}</span>
                          {item.color && (
                            <> · Color: <span className="font-medium text-neutral-800">{item.color}</span></>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-[#E8E4DD] rounded-md bg-[#F8F6F2]">
                          <button
                            onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                            className="px-2 py-0.5 text-xs text-neutral-600 hover:bg-[#E8E4DD] transition-colors"
                          >
                            -
                          </button>
                          <span className="px-2.5 py-0.5 text-xs font-semibold text-neutral-900 font-mono tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                            className="px-2 py-0.5 text-xs text-neutral-600 hover:bg-[#E8E4DD] transition-colors"
                          >
                            +
                          </button>
                        </div>

                        <span className="text-sm font-semibold text-[#173D32] font-mono tabular-nums">
                          {formatPKR(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Drawer Footer & Checkout */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-[#E8E4DD] bg-[#F8F6F2] space-y-4">
                <div className="space-y-1.5 text-xs text-neutral-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-mono tabular-nums font-semibold text-neutral-900">
                      {formatPKR(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Est. Delivery</span>
                    <span className="font-mono tabular-nums font-semibold text-neutral-900">
                      {deliveryFee === 0 ? 'FREE' : formatPKR(deliveryFee)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-neutral-900 pt-2 border-t border-[#E8E4DD]">
                    <span>Total Estimated</span>
                    <span className="text-[#173D32] font-mono tabular-nums">
                      {formatPKR(totalPrice)}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setOrderModalOpen(true);
                    }}
                    className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-lg text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 fill-current" />
                    <span>Proceed to WhatsApp Order</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <Link
                      to="/cart"
                      onClick={closeDrawer}
                      className="flex-1 py-2.5 px-3 bg-white hover:bg-neutral-50 text-neutral-800 border border-[#E8E4DD] rounded-lg text-xs font-semibold text-center transition-colors"
                    >
                      View Cart Page
                    </Link>
                    <button
                      onClick={closeDrawer}
                      className="flex-1 py-2.5 px-3 text-neutral-600 hover:text-neutral-900 text-xs font-medium text-center transition-colors"
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>

                <div className="text-[10px] text-center text-neutral-500">
                  Delivery charges are estimates and confirmed upon dispatch.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* WhatsApp Checkout Modal */}
      <WhatsAppOrderModal
        isOpen={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
      />
    </>
  );
};
