import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { products, Product } from '../data/products';
import { formatPKR } from '../utils/currency';
import { QuickViewModal } from '../components/QuickViewModal';

export const WishlistPage: React.FC = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  const handleAddToCart = (product: Product) => {
    setQuickViewProduct(product);
  };

  if (wishlistProducts.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center bg-white">
        <div className="w-20 h-20 rounded-full bg-[#F8F6F2] flex items-center justify-center text-neutral-400 mb-4">
          <Heart className="w-10 h-10" />
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-neutral-900">
          Your Wishlist is Empty
        </h2>
        <p className="text-sm text-neutral-600 mt-2 max-w-sm">
          Save your favorite embroidered suits, kurtas, and festive shawls here to revisit later.
        </p>
        <Link
          to="/shop"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-[#173D32] hover:bg-[#122e25] text-white rounded-lg text-xs sm:text-sm font-semibold transition-colors"
        >
          <span>Explore Outfits</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-[#E8E4DD]">
          <div>
            <div className="text-xs uppercase font-semibold tracking-widest text-[#C6A36A]">
              Personal Curation
            </div>
            <h1 className="font-serif text-3xl font-semibold text-neutral-900 mt-0.5">
              Saved Outfits ({wishlistProducts.length})
            </h1>
          </div>
          <button
            onClick={clearWishlist}
            className="text-xs text-red-600 hover:text-red-700 font-semibold self-start sm:self-auto cursor-pointer"
          >
            Clear Wishlist
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {wishlistProducts.map((product) => (
            <div
              key={product.id}
              className="group relative flex flex-col bg-white rounded-lg border border-[#E8E4DD] overflow-hidden hover:border-[#173D32]/40 transition-all duration-300"
            >
              <div className="relative aspect-3/4 w-full overflow-hidden bg-[#F8F6F2]">
                <Link to={`/product/${product.id}`} className="block w-full h-full">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                </Link>

                <button
                  onClick={() => removeFromWishlist(product.id)}
                  aria-label="Remove from wishlist"
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white text-red-600 shadow-xs transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 flex flex-col flex-1 justify-between gap-2">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-neutral-500 font-medium">
                    {product.categoryName}
                  </div>
                  <Link
                    to={`/product/${product.id}`}
                    className="font-serif text-base font-semibold text-neutral-900 hover:text-[#173D32] transition-colors block mt-0.5 truncate"
                  >
                    {product.name}
                  </Link>
                  <div className="text-xs text-neutral-500 truncate mt-0.5">
                    {product.fabric}
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E8E4DD] flex items-center justify-between">
                  <span className="text-sm sm:text-base font-bold text-[#173D32] font-mono tabular-nums">
                    {formatPKR(product.price)}
                  </span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="px-3 py-1.5 bg-[#173D32] hover:bg-[#122e25] text-white rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Select Size</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};
