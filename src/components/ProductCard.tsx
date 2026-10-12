import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingBag } from 'lucide-react';
import { Product } from '../data/products';
import { formatPKR } from '../utils/currency';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const inWishlist = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    } else {
      const defaultSize = product.availableSizes[0] || 'Standard';
      addToCart(product, defaultSize);
    }
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) onQuickView(product);
  };

  return (
    <div className="group relative flex flex-col bg-white rounded-lg border border-[#E8E4DD] hover:border-[#173D32]/30 hover:shadow-md transition-all duration-300 overflow-hidden">
      {/* Image container */}
      <div className="relative aspect-3/4 w-full overflow-hidden bg-[#F8F6F2]">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={product.images[0]}
            alt={product.name}
            referrerPolicy="no-referrer"
            loading="lazy"
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-104"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.onSale && (
            <span className="text-[11px] font-semibold tracking-wider uppercase px-2 py-0.5 bg-[#B42318] text-white rounded-xs">
              Sale
            </span>
          )}
          {product.isNew && !product.onSale && (
            <span className="text-[11px] font-semibold tracking-wider uppercase px-2 py-0.5 bg-[#173D32] text-white rounded-xs">
              New
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-xs transition-colors z-10 ${
            inWishlist
              ? 'bg-red-50 text-red-600'
              : 'bg-white/80 text-neutral-700 hover:text-red-600 hover:bg-white'
          }`}
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
        </button>

        {/* Quick action overlay buttons on desktop hover */}
        <div className="absolute inset-x-3 bottom-3 hidden sm:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <button
            onClick={handleQuickViewClick}
            className="flex-1 py-2 px-3 bg-white/95 hover:bg-white text-neutral-900 rounded-md text-xs font-semibold shadow-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-[#173D32]" />
            <span>Quick View</span>
          </button>
          <button
            onClick={handleQuickAdd}
            className="py-2 px-3 bg-[#173D32] hover:bg-[#122e25] text-white rounded-md text-xs font-semibold shadow-xs flex items-center justify-center gap-1.5 transition-colors"
            title="Add to Cart"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-2.5">
        <div>
          {/* Unboxed metadata */}
          <div className="text-[11px] tracking-wider uppercase text-neutral-500 font-medium flex items-center gap-1.5">
            <span>{product.categoryName}</span>
            <span aria-hidden="true">·</span>
            <span>{product.gender === 'ladies' ? "Ladies" : "Gents"}</span>
          </div>

          {/* Product Name */}
          <Link
            to={`/product/${product.id}`}
            className="mt-1 block font-serif text-base font-semibold text-[#171717] hover:text-[#173D32] transition-colors line-clamp-1"
          >
            {product.name}
          </Link>

          {/* Fabric subtitle */}
          <p className="text-xs text-neutral-500 line-clamp-1 mt-0.5">
            {product.fabric}
          </p>
        </div>

        {/* Price & Sizes */}
        <div className="pt-2 border-t border-[#E8E4DD]/60 flex items-baseline justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <span className="text-sm sm:text-base font-semibold text-[#173D32] font-mono tabular-nums">
              {formatPKR(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-neutral-400 line-through font-mono tabular-nums">
                {formatPKR(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Sizes preview */}
          <div className="text-[10px] text-neutral-500 font-medium">
            {product.availableSizes.length > 2
              ? `${product.availableSizes.length} sizes`
              : product.availableSizes[0]}
          </div>
        </div>

        {/* Mobile quick add button */}
        <div className="sm:hidden pt-1">
          <button
            onClick={handleQuickAdd}
            className="w-full py-2 px-3 bg-[#F8F6F2] hover:bg-[#E8E4DD] text-[#173D32] rounded-md text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Select & Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
