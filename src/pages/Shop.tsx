import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, RotateCcw } from 'lucide-react';
import { products, Product } from '../data/products';
import { categories } from '../data/categories';
import { ProductCard } from '../components/ProductCard';
import { QuickViewModal } from '../components/QuickViewModal';
import { formatPKR } from '../utils/currency';

export const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL parameters sync
  const initialGender = (searchParams.get('gender') as 'ladies' | 'gents') || 'all';
  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || '';
  const initialFilter = searchParams.get('filter') || ''; // 'new' | 'sale'

  const [selectedGender, setSelectedGender] = useState<'all' | 'ladies' | 'gents'>(initialGender);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [sortBy, setSortBy] = useState<
    'featured' | 'price-low' | 'price-high' | 'newest' | 'name-asc' | 'name-desc' | 'discount'
  >('featured');
  const [priceMax, setPriceMax] = useState<number>(6000);
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Sync state if URL search params change
  useEffect(() => {
    const g = searchParams.get('gender') as 'ladies' | 'gents';
    if (g && (g === 'ladies' || g === 'gents')) {
      setSelectedGender(g);
    }
    const c = searchParams.get('category');
    if (c) setSelectedCategory(c);
    const s = searchParams.get('search');
    if (s) setSearchQuery(s);
    const f = searchParams.get('filter');
    if (f === 'new') setSortBy('newest');
    if (f === 'sale') setSortBy('discount');
  }, [searchParams]);

  // Available unique sizes in current inventory
  const allSizes = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => p.availableSizes.forEach((s) => set.add(s)));
    return Array.from(set);
  }, []);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Gender filter
      if (selectedGender !== 'all' && p.gender !== selectedGender) return false;

      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;

      // Special filter
      if (initialFilter === 'sale' && !p.onSale) return false;
      if (initialFilter === 'new' && !p.isNew) return false;

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          p.name.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // Price Filter
      if (p.price > priceMax) return false;

      // Size Filter
      if (selectedSize !== 'all' && !p.availableSizes.includes(selectedSize)) return false;

      // Availability Filter
      if (onlyInStock && !p.inStock) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
      if (sortBy === 'discount') {
        const discA = a.originalPrice ? (a.originalPrice - a.price) / a.originalPrice : 0;
        const discB = b.originalPrice ? (b.originalPrice - b.price) / b.originalPrice : 0;
        return discB - discA;
      }
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [selectedGender, selectedCategory, searchQuery, sortBy, priceMax, selectedSize, onlyInStock, initialFilter]);

  const handleResetFilters = () => {
    setSelectedGender('all');
    setSelectedCategory('all');
    setSearchQuery('');
    setPriceMax(6000);
    setSelectedSize('all');
    setOnlyInStock(false);
    setSortBy('featured');
    setSearchParams({});
  };

  const activeFiltersCount =
    (selectedGender !== 'all' ? 1 : 0) +
    (selectedCategory !== 'all' ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0) +
    (priceMax < 6000 ? 1 : 0) +
    (selectedSize !== 'all' ? 1 : 0) +
    (onlyInStock ? 1 : 0);

  // Available categories based on gender selection
  const relevantCategories = categories.filter((c) => {
    if (selectedGender === 'all') return true;
    return c.gender === selectedGender;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Shop Header Banner */}
      <div className="bg-[#F8F6F2] border-b border-[#E8E4DD] py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <div className="text-xs uppercase font-semibold tracking-widest text-[#C6A36A]">
            Catalogue
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#171717] mt-1">
            {selectedGender === 'ladies'
              ? "Ladies' Collection"
              : selectedGender === 'gents'
              ? "Gents' Collection"
              : 'All Fashion Collections'}
          </h1>
          <p className="text-sm text-neutral-600 mt-2 max-w-xl">
            Explore unstitched 3-piece suits, embroidered Dhanak formal wear, traditional Kurta Shalwar, and hand-loomed shawls.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Top Control Bar: Search & Sort */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-4 border-b border-[#E8E4DD]">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, fabrics, styles..."
              className="w-full pl-9 pr-9 py-2 text-xs sm:text-sm border border-[#E8E4DD] rounded-lg focus:outline-hidden focus:border-[#173D32] bg-[#F8F6F2]/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-neutral-400 hover:text-neutral-600"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 justify-between sm:justify-end">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="lg:hidden px-3.5 py-2 border border-[#E8E4DD] rounded-lg text-xs font-semibold text-neutral-700 flex items-center gap-2 hover:bg-neutral-50"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#173D32]" />
              <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-neutral-500 whitespace-nowrap hidden sm:inline">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 border border-[#E8E4DD] rounded-lg bg-white text-neutral-800 text-xs font-medium focus:outline-hidden focus:border-[#173D32] cursor-pointer shadow-xs"
              >
                <option value="featured">Featured & Curated</option>
                <option value="newest">Newest Drops</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="discount">Highest Discount (% Off)</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>
            </div>
          </div>
        </div>

        {/* Quick Sort & Quick Filter Chips Strip */}
        <div className="py-3 overflow-x-auto flex items-center gap-2 border-b border-[#E8E4DD]/60 mb-2">
          <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider shrink-0 mr-1">
            Quick Sort:
          </span>
          <button
            type="button"
            onClick={() => setSortBy('featured')}
            className={`px-3 py-1 text-xs rounded-full border transition-all shrink-0 cursor-pointer ${
              sortBy === 'featured'
                ? 'bg-[#173D32] text-white border-[#173D32] font-semibold'
                : 'bg-white text-neutral-600 border-[#E8E4DD] hover:border-neutral-400'
            }`}
          >
            Featured
          </button>
          <button
            type="button"
            onClick={() => setSortBy('newest')}
            className={`px-3 py-1 text-xs rounded-full border transition-all shrink-0 cursor-pointer ${
              sortBy === 'newest'
                ? 'bg-[#173D32] text-white border-[#173D32] font-semibold'
                : 'bg-white text-neutral-600 border-[#E8E4DD] hover:border-neutral-400'
            }`}
          >
            New Arrivals
          </button>
          <button
            type="button"
            onClick={() => setSortBy('price-low')}
            className={`px-3 py-1 text-xs rounded-full border transition-all shrink-0 cursor-pointer ${
              sortBy === 'price-low'
                ? 'bg-[#173D32] text-white border-[#173D32] font-semibold'
                : 'bg-white text-neutral-600 border-[#E8E4DD] hover:border-neutral-400'
            }`}
          >
            Price: Low to High
          </button>
          <button
            type="button"
            onClick={() => setSortBy('price-high')}
            className={`px-3 py-1 text-xs rounded-full border transition-all shrink-0 cursor-pointer ${
              sortBy === 'price-high'
                ? 'bg-[#173D32] text-white border-[#173D32] font-semibold'
                : 'bg-white text-neutral-600 border-[#E8E4DD] hover:border-neutral-400'
            }`}
          >
            Price: High to Low
          </button>
          <button
            type="button"
            onClick={() => setSortBy('discount')}
            className={`px-3 py-1 text-xs rounded-full border transition-all shrink-0 cursor-pointer ${
              sortBy === 'discount'
                ? 'bg-[#B42318] text-white border-[#B42318] font-semibold'
                : 'bg-white text-red-700 border-red-200 hover:border-red-300'
            }`}
          >
            Special Offers %
          </button>
          <button
            type="button"
            onClick={() => setSortBy('name-asc')}
            className={`px-3 py-1 text-xs rounded-full border transition-all shrink-0 cursor-pointer ${
              sortBy === 'name-asc'
                ? 'bg-[#173D32] text-white border-[#173D32] font-semibold'
                : 'bg-white text-neutral-600 border-[#E8E4DD] hover:border-neutral-400'
            }`}
          >
            A–Z
          </button>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-6">
          {/* Sidebar Filters (Desktop & Mobile Drawer) */}
          <aside
            className={`space-y-6 ${
              mobileFiltersOpen
                ? 'block p-4 bg-[#F8F6F2] rounded-xl border border-[#E8E4DD] mb-6 lg:mb-0 lg:p-0 lg:bg-transparent lg:border-none'
                : 'hidden lg:block'
            }`}
          >
            {/* Filter header with Reset */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E4DD]">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                Filter Catalogue
              </span>
              {activeFiltersCount > 0 && (
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-[#173D32] hover:text-[#C6A36A] flex items-center gap-1 font-semibold"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset ({activeFiltersCount})</span>
                </button>
              )}
            </div>

            {/* Gender Filter */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-2">
                Department
              </label>
              <div className="grid grid-cols-3 gap-1 bg-[#F8F6F2] p-1 rounded-lg border border-[#E8E4DD]">
                {(['all', 'ladies', 'gents'] as const).map((gender) => (
                  <button
                    key={gender}
                    onClick={() => {
                      setSelectedGender(gender);
                      setSelectedCategory('all');
                    }}
                    className={`py-1.5 text-xs font-semibold rounded-md transition-all capitalize ${
                      selectedGender === gender
                        ? 'bg-[#173D32] text-white shadow-xs'
                        : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    {gender}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-2">
                Category
              </label>
              <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center justify-between ${
                    selectedCategory === 'all'
                      ? 'bg-[#173D32] text-white'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  <span>All Categories</span>
                  <span className="text-[10px] opacity-75">{products.length}</span>
                </button>
                {relevantCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center justify-between ${
                      selectedCategory === cat.id
                        ? 'bg-[#173D32] text-white'
                        : 'text-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    <span className="truncate pr-2">{cat.name}</span>
                    <span className="text-[10px] opacity-75">{cat.itemCount}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div>
              <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-neutral-600 mb-2">
                <span>Max Price</span>
                <span className="text-[#173D32] font-mono tabular-nums">{formatPKR(priceMax)}</span>
              </div>
              <input
                type="range"
                min="2000"
                max="6000"
                step="200"
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full accent-[#173D32] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-400 mt-1 font-mono">
                <span>Rs. 2,000</span>
                <span>Rs. 6,000</span>
              </div>
            </div>

            {/* Size Filter */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-2">
                Size
              </label>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setSelectedSize('all')}
                  className={`px-2.5 py-1 text-xs rounded-md border transition-all ${
                    selectedSize === 'all'
                      ? 'border-[#173D32] bg-[#173D32] text-white'
                      : 'border-[#E8E4DD] bg-white text-neutral-700 hover:border-neutral-400'
                  }`}
                >
                  All
                </button>
                {allSizes.slice(0, 8).map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-2.5 py-1 text-xs rounded-md border transition-all ${
                      selectedSize === sz
                        ? 'border-[#173D32] bg-[#173D32] text-white'
                        : 'border-[#E8E4DD] bg-white text-neutral-700 hover:border-neutral-400'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* In Stock Only */}
            <div className="pt-2 border-t border-[#E8E4DD]">
              <label className="flex items-center gap-2 text-xs font-medium text-neutral-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="rounded-xs border-[#E8E4DD] text-[#173D32] focus:ring-[#173D32]"
                />
                <span>In Stock Outfits Only</span>
              </label>
            </div>

            {/* Mobile close button */}
            <div className="lg:hidden pt-2">
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full py-2 bg-[#173D32] text-white rounded-md text-xs font-semibold"
              >
                Apply Filters ({filteredProducts.length} Results)
              </button>
            </div>
          </aside>

          {/* Product Grid Area */}
          <main className="lg:col-span-3">
            {/* Active filter tags */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-6 text-xs">
                <span className="text-neutral-500 font-medium">Active filters:</span>
                {selectedGender !== 'all' && (
                  <span className="px-2.5 py-1 bg-[#F8F6F2] border border-[#E8E4DD] rounded-md text-neutral-800 flex items-center gap-1.5">
                    Gender: {selectedGender}
                    <X
                      className="w-3 h-3 cursor-pointer text-neutral-500 hover:text-neutral-900"
                      onClick={() => setSelectedGender('all')}
                    />
                  </span>
                )}
                {selectedCategory !== 'all' && (
                  <span className="px-2.5 py-1 bg-[#F8F6F2] border border-[#E8E4DD] rounded-md text-neutral-800 flex items-center gap-1.5">
                    Category: {categories.find((c) => c.id === selectedCategory)?.name || selectedCategory}
                    <X
                      className="w-3 h-3 cursor-pointer text-neutral-500 hover:text-neutral-900"
                      onClick={() => setSelectedCategory('all')}
                    />
                  </span>
                )}
                {searchQuery && (
                  <span className="px-2.5 py-1 bg-[#F8F6F2] border border-[#E8E4DD] rounded-md text-neutral-800 flex items-center gap-1.5">
                    Keyword: "{searchQuery}"
                    <X
                      className="w-3 h-3 cursor-pointer text-neutral-500 hover:text-neutral-900"
                      onClick={() => setSearchQuery('')}
                    />
                  </span>
                )}
                {selectedSize !== 'all' && (
                  <span className="px-2.5 py-1 bg-[#F8F6F2] border border-[#E8E4DD] rounded-md text-neutral-800 flex items-center gap-1.5">
                    Size: {selectedSize}
                    <X
                      className="w-3 h-3 cursor-pointer text-neutral-500 hover:text-neutral-900"
                      onClick={() => setSelectedSize('all')}
                    />
                  </span>
                )}
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-[#173D32] hover:underline font-semibold ml-1"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Results count header */}
            <div className="text-xs text-neutral-500 mb-4 font-medium">
              Showing <span className="text-neutral-900 font-semibold">{filteredProducts.length}</span> of {products.length} outfits
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center bg-[#F8F6F2] rounded-xl border border-[#E8E4DD] p-8">
                <Search className="w-10 h-10 text-neutral-400 mx-auto mb-3" />
                <h3 className="font-serif text-xl font-semibold text-neutral-900">
                  No matching outfits found
                </h3>
                <p className="text-xs sm:text-sm text-neutral-500 mt-1 max-w-md mx-auto">
                  We couldn't find any clothing matching your chosen filters. Try resetting the filters or searching for another fabric or style.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="mt-5 px-5 py-2.5 bg-[#173D32] hover:bg-[#122e25] text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={setQuickViewProduct}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};
