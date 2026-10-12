import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { X, Heart, ShoppingBag, MessageSquare, Check, ArrowRight, Ruler, ZoomIn } from 'lucide-react';
import { Product } from '../data/products';
import { formatPKR } from '../utils/currency';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { generateProductInquiryUrl } from '../utils/whatsapp';
import { SizeGuideModal } from './SizeGuideModal';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [validationError, setValidationError] = useState('');
  const [justAdded, setJustAdded] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [imageZoomPos, setImageZoomPos] = useState({ x: 50, y: 50 });
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.availableSizes[0] || '');
      setSelectedColor(product.availableColors[0] || '');
      setQuantity(1);
      setSelectedImageIndex(0);
      setValidationError('');
      setJustAdded(false);
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setValidationError('Please select a size before adding to bag.');
      return;
    }
    setValidationError('');
    addToCart(product, selectedSize, selectedColor, quantity);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      onClose();
    }, 900);
  };

  const handleWhatsAppInquiry = () => {
    const url = generateProductInquiryUrl(product.name, product.price, selectedSize);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-white rounded-xl shadow-2xl border border-[#E8E4DD] overflow-hidden z-10 my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-neutral-100 text-neutral-600 transition-colors shadow-xs"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: Image & Gallery */}
          <div className="bg-[#F8F6F2] p-6 flex flex-col justify-between">
            <div
              ref={imageContainerRef}
              onMouseMove={(e) => {
                if (!imageContainerRef.current) return;
                const rect = imageContainerRef.current.getBoundingClientRect();
                const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
                const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
                setImageZoomPos({ x, y });
              }}
              onMouseEnter={() => setIsImageHovered(true)}
              onMouseLeave={() => setIsImageHovered(false)}
              className="relative aspect-3/4 rounded-lg overflow-hidden bg-white shadow-xs cursor-crosshair select-none"
              title="Hover to zoom fabric detail"
            >
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                referrerPolicy="no-referrer"
                style={{
                  transformOrigin: `${imageZoomPos.x}% ${imageZoomPos.y}%`,
                  transform: isImageHovered ? 'scale(2.2)' : 'scale(1)',
                  transition: isImageHovered ? 'transform 0.08s ease-out' : 'transform 0.3s ease-out',
                }}
                className="w-full h-full object-cover object-top pointer-events-none will-change-transform"
              />

              <div
                className={`absolute bottom-2 left-2 inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium backdrop-blur-xs transition-opacity duration-200 pointer-events-none ${
                  isImageHovered ? 'bg-[#173D32]/90 text-white' : 'bg-black/50 text-white/90'
                }`}
              >
                <ZoomIn className="w-3 h-3 text-[#C6A36A]" />
                <span>{isImageHovered ? '2.2x Zoom' : 'Hover to zoom'}</span>
              </div>
            </div>

            {/* Thumbnail selector */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-14 h-16 rounded-md overflow-hidden border-2 transition-all shrink-0 ${
                      selectedImageIndex === idx ? 'border-[#173D32]' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Details & Actions */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <div className="text-xs uppercase tracking-wider text-neutral-500 font-medium">
                  {product.categoryName} · {product.gender === 'ladies' ? 'Ladies' : 'Gents'}
                </div>
                <h3 className="font-serif text-2xl font-semibold text-[#171717] mt-1">
                  {product.name}
                </h3>
                <div className="mt-2 flex items-baseline gap-3">
                  <span className="text-xl font-bold text-[#173D32] font-mono tabular-nums">
                    {formatPKR(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-neutral-400 line-through font-mono tabular-nums">
                      {formatPKR(product.originalPrice)}
                    </span>
                  )}
                  {product.onSale && (
                    <span className="text-xs font-semibold px-2 py-0.5 bg-[#B42318] text-white rounded-xs">
                      Special Offer
                    </span>
                  )}
                </div>
              </div>

              <div className="text-xs text-neutral-600 space-y-1 py-2 border-y border-[#E8E4DD]">
                <div><strong className="text-neutral-800">Fabric:</strong> {product.fabric}</div>
                <div><strong className="text-neutral-800">Pieces:</strong> {product.pieces}</div>
              </div>

              {/* Sizes Selection & Size Guide */}
              <div>
                <div className="flex items-center justify-between text-xs font-medium text-neutral-700 mb-2">
                  <span>Available Sizes: <strong className="text-[#173D32]">{selectedSize || 'Choose size'}</strong></span>
                  <button
                    type="button"
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#173D32] hover:text-[#C6A36A] underline underline-offset-2 transition-colors cursor-pointer"
                  >
                    <Ruler className="w-3 h-3" />
                    <span>Size Guide</span>
                  </button>
                </div>
                {validationError && (
                  <div className="text-[#B42318] font-semibold text-xs mb-2">{validationError}</div>
                )}
                <div className="flex flex-wrap gap-2">
                  {product.availableSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => {
                        setSelectedSize(size);
                        setValidationError('');
                      }}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-all ${
                        selectedSize === size
                          ? 'border-[#173D32] bg-[#173D32] text-white shadow-xs'
                          : 'border-[#E8E4DD] bg-white text-neutral-700 hover:border-neutral-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection if available */}
              {product.availableColors.length > 0 && (
                <div>
                  <div className="text-xs font-medium text-neutral-700 mb-2">
                    Color: <span className="font-semibold text-neutral-900">{selectedColor}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.availableColors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-3 py-1 text-xs rounded-md border transition-all ${
                          selectedColor === color
                            ? 'border-[#173D32] bg-[#F8F6F2] font-semibold text-[#173D32]'
                            : 'border-[#E8E4DD] text-neutral-600 hover:border-neutral-300'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-neutral-700">Quantity:</span>
                <div className="flex items-center border border-[#E8E4DD] rounded-md overflow-hidden bg-[#F8F6F2]">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-2.5 py-1 text-neutral-600 hover:bg-[#E8E4DD] transition-colors"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-xs font-semibold text-neutral-900 font-mono tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-2.5 py-1 text-neutral-600 hover:bg-[#E8E4DD] transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 mt-6 border-t border-[#E8E4DD] space-y-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={justAdded}
                  className="flex-1 py-3 px-4 bg-[#173D32] hover:bg-[#122e25] text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  {justAdded ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  aria-label="Toggle Wishlist"
                  className={`p-3 rounded-lg border transition-colors ${
                    inWishlist
                      ? 'border-red-200 bg-red-50 text-red-600'
                      : 'border-[#E8E4DD] text-neutral-600 hover:text-red-600 hover:bg-neutral-50'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Order on WhatsApp */}
              <button
                onClick={handleWhatsAppInquiry}
                className="w-full py-2.5 px-4 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] border border-[#25D366]/30 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                <span>Quick Inquiry via WhatsApp</span>
              </button>

              <div className="text-center">
                <Link
                  to={`/product/${product.id}`}
                  onClick={onClose}
                  className="inline-flex items-center gap-1 text-xs text-[#173D32] hover:text-[#C6A36A] font-semibold transition-colors"
                >
                  <span>View full product details & specifications</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sizing Measurement Table Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        defaultGender={product.gender}
      />
    </div>
  );
};
