import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  ShoppingBag,
  MessageSquare,
  Truck,
  ShieldCheck,
  RotateCcw,
  Check,
  ChevronRight,
  Sparkles,
  Ruler,
} from 'lucide-react';
import { products, Product } from '../data/products';
import { storeConfig } from '../data/config';
import { formatPKR } from '../utils/currency';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { ProductCard } from '../components/ProductCard';
import { QuickViewModal } from '../components/QuickViewModal';
import { SizeGuideModal } from '../components/SizeGuideModal';
import { ProductGallery } from '../components/ProductGallery';
import { generateProductInquiryUrl } from '../utils/whatsapp';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === id);

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [validationError, setValidationError] = useState('');
  const [activeTab, setActiveTab] = useState<'description' | 'care' | 'delivery'>('description');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [justAdded, setJustAdded] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (product) {
      setSelectedSize(product.availableSizes[0] || '');
      setSelectedColor(product.availableColors[0] || '');
      setQuantity(1);
      setValidationError('');
      setJustAdded(false);
    }
  }, [id, product]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-serif text-2xl font-semibold text-neutral-900">
          Outfit Not Found
        </h2>
        <p className="text-sm text-neutral-600 mt-2">
          The requested clothing piece is not currently in our active collection.
        </p>
        <Link
          to="/shop"
          className="mt-6 px-6 py-2.5 bg-[#173D32] text-white text-xs font-semibold rounded-lg hover:bg-[#122e25] transition-colors"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setValidationError('Please select your preferred size or fabric type before proceeding.');
      return;
    }
    setValidationError('');
    addToCart(product, selectedSize, selectedColor, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const handleWhatsAppInstantOrder = () => {
    if (!selectedSize) {
      setValidationError('Please select a size first.');
      return;
    }
    const url = generateProductInquiryUrl(product.name, product.price, selectedSize);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Related products from the same gender/category
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.gender === product.gender))
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb strip */}
      <div className="border-b border-[#E8E4DD] bg-[#F8F6F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <nav className="flex items-center gap-2 text-xs text-neutral-500 overflow-x-auto whitespace-nowrap">
            <Link to="/" className="hover:text-neutral-900 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 text-neutral-400 shrink-0" />
            <Link to="/shop" className="hover:text-neutral-900 transition-colors">
              Shop
            </Link>
            <ChevronRight className="w-3 h-3 text-neutral-400 shrink-0" />
            <Link
              to={`/shop?gender=${product.gender}`}
              className="hover:text-neutral-900 transition-colors capitalize"
            >
              {product.gender}
            </Link>
            <ChevronRight className="w-3 h-3 text-neutral-400 shrink-0" />
            <span className="text-neutral-900 font-medium truncate max-w-xs">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
        {/* Main PDP Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left Column: Enhanced Image Gallery with Hover-to-Zoom */}
          <ProductGallery
            images={product.images}
            productName={product.name}
            onSale={product.onSale}
            gender={product.gender}
          />

          {/* Right Column: Contiguous Purchase Module */}
          <div className="space-y-6">
            <div>
              <div className="text-xs uppercase tracking-widest text-[#C6A36A] font-semibold">
                {product.categoryName} · {product.gender === 'ladies' ? "Ladies' Collection" : "Gents' Collection"}
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#171717] mt-1.5 leading-tight">
                {product.name}
              </h1>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-bold text-[#173D32] font-mono tabular-nums">
                  {formatPKR(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-base sm:text-lg text-neutral-400 line-through font-mono tabular-nums">
                    {formatPKR(product.originalPrice)}
                  </span>
                )}
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  Inclusive of all taxes
                </span>
              </div>
            </div>

            {/* Quick Specs strip */}
            <div className="bg-[#F8F6F2] p-4 rounded-lg border border-[#E8E4DD] space-y-1.5 text-xs text-neutral-700">
              <div className="flex justify-between">
                <span className="text-neutral-500">Fabric Composition:</span>
                <span className="font-semibold text-neutral-900">{product.fabric}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Outfit Type:</span>
                <span className="font-semibold text-neutral-900">{product.pieces}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Stock Status:</span>
                <span className="font-semibold text-emerald-700">Available In Stock</span>
              </div>
            </div>

            {/* Size Selector & Size Guide */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-medium text-neutral-800">
                <span>Select Size / Cut: <span className="font-bold text-[#173D32]">{selectedSize || 'None chosen'}</span></span>
                <button
                  type="button"
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#173D32] hover:text-[#C6A36A] transition-colors underline underline-offset-4 cursor-pointer"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size Guide & Table</span>
                </button>
              </div>
              {validationError && (
                <span className="text-[#B42318] font-semibold text-xs block">{validationError}</span>
              )}

              <div className="flex flex-wrap gap-2">
                {product.availableSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      setSelectedSize(size);
                      setValidationError('');
                    }}
                    className={`px-4 py-2.5 text-xs font-semibold rounded-lg border transition-all ${
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

            {/* Color Selector */}
            {product.availableColors.length > 0 && (
              <div className="space-y-2">
                <div className="text-xs font-medium text-neutral-800">
                  Select Color: <span className="font-semibold text-[#173D32]">{selectedColor}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.availableColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-1.5 text-xs rounded-md border transition-all ${
                        selectedColor === color
                          ? 'border-[#173D32] bg-[#F8F6F2] font-semibold text-[#173D32]'
                          : 'border-[#E8E4DD] text-neutral-700 hover:border-neutral-400'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector & Actions */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-[#E8E4DD] rounded-lg bg-[#F8F6F2] overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-2 text-neutral-600 hover:bg-[#E8E4DD] transition-colors"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-sm font-bold text-neutral-900 font-mono tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-2 text-neutral-600 hover:bg-[#E8E4DD] transition-colors"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag Button */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-6 bg-[#173D32] hover:bg-[#122e25] text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                >
                  {justAdded ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Added to Your Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>

                {/* Wishlist Button */}
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

              {/* Instant WhatsApp Inquiry Button */}
              <button
                onClick={handleWhatsAppInstantOrder}
                className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-lg text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Instant WhatsApp Inquiry for this Outfit</span>
              </button>
            </div>

            {/* Delivery & Trust highlights */}
            <div className="pt-4 border-t border-[#E8E4DD] space-y-2.5 text-xs text-neutral-600">
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-[#C6A36A] shrink-0" />
                <span>Standard Delivery: Rs. 250 (Free on orders above Rs. 6,000)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#C6A36A] shrink-0" />
                <span>100% Genuine Fabric Guarantee & Safe Packaging</span>
              </div>
              <div className="flex items-center gap-2.5">
                <RotateCcw className="w-4 h-4 text-[#C6A36A] shrink-0" />
                <span>Easy 7-day exchange window for sizing or defects</span>
              </div>
            </div>

            {/* Tabs: Description, Care, Delivery */}
            <div className="pt-6 border-t border-[#E8E4DD]">
              <div className="flex items-center gap-6 border-b border-[#E8E4DD] text-xs font-semibold">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`pb-2.5 transition-colors relative ${
                    activeTab === 'description'
                      ? 'text-[#173D32]'
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  Description
                  {activeTab === 'description' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#173D32]" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('care')}
                  className={`pb-2.5 transition-colors relative ${
                    activeTab === 'care'
                      ? 'text-[#173D32]'
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  Fabric & Care
                  {activeTab === 'care' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#173D32]" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('delivery')}
                  className={`pb-2.5 transition-colors relative ${
                    activeTab === 'delivery'
                      ? 'text-[#173D32]'
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  Delivery & Returns
                  {activeTab === 'delivery' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#173D32]" />
                  )}
                </button>
              </div>

              <div className="pt-4 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                {activeTab === 'description' && (
                  <p>{product.description}</p>
                )}
                {activeTab === 'care' && (
                  <ul className="space-y-1.5 list-disc list-inside">
                    {product.careInstructions.map((instruction, i) => (
                      <li key={i}>{instruction}</li>
                    ))}
                  </ul>
                )}
                {activeTab === 'delivery' && (
                  <div className="space-y-2">
                    <p>• Estimated nationwide delivery time: <strong>{storeConfig.deliveryEstimatedDays}</strong>.</p>
                    <p>• Parcels are sent through registered courier services with live tracking SMS.</p>
                    <p>• Cash on Delivery available at your doorstep.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-[#E8E4DD]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#C6A36A]">
                  Complete The Look
                </span>
                <h3 className="font-serif text-2xl font-semibold text-neutral-900 mt-0.5">
                  Related Outfits
                </h3>
              </div>
              <Link
                to={`/shop?category=${product.category}`}
                className="text-xs font-semibold text-[#173D32] hover:text-[#C6A36A]"
              >
                View Category
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard
                  key={rel.id}
                  product={rel}
                  onQuickView={setQuickViewProduct}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      {/* Sizing Measurement Table Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        defaultGender={product.gender}
      />
    </div>
  );
};
