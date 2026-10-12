import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight } from 'lucide-react';
import { products, Product } from '../data/products';
import { formatPKR } from '../utils/currency';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      setResults([]);
      return;
    }

    const filtered = products.filter((p) => {
      return (
        p.name.toLowerCase().includes(trimmed) ||
        p.categoryName.toLowerCase().includes(trimmed) ||
        p.fabric.toLowerCase().includes(trimmed) ||
        p.description.toLowerCase().includes(trimmed) ||
        p.gender.toLowerCase().includes(trimmed) ||
        p.collection.toLowerCase().includes(trimmed)
      );
    });

    setResults(filtered.slice(0, 6));
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'Enter' && query.trim()) {
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  const handleSelectProduct = (product: Product) => {
    navigate(`/product/${product.id}`);
    onClose();
  };

  const handleViewAllResults = () => {
    if (query.trim()) {
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative w-full max-w-2xl bg-white shadow-2xl rounded-xl border border-[#E8E4DD] overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        <div className="p-4 border-b border-[#E8E4DD] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#173D32]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search by name, fabric, category (e.g. Dhanak, Kurta, Velvet)..."
            className="w-full text-base focus:outline-hidden text-[#171717] placeholder:text-neutral-400"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-neutral-400 hover:text-neutral-600 p-1"
              aria-label="Clear query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-600 p-1 border-l border-[#E8E4DD] pl-3"
            aria-label="Close search modal"
          >
            <span className="text-xs uppercase tracking-wider font-medium">ESC</span>
          </button>
        </div>

        {/* Search Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4">
          {query.trim() === '' ? (
            <div className="py-8 text-center text-sm text-neutral-500">
              <p className="font-medium text-[#171717] mb-1">Popular searches</p>
              <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
                {['Embroidered Dhanak', 'Men Kurta Shalwar', 'Velvet Shawl', 'Lawn 3-Piece', 'Waistcoat'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="text-xs px-3 py-1 bg-[#F8F6F2] hover:bg-[#E8E4DD] text-neutral-700 rounded-md transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-3">
              <div className="text-xs text-neutral-500 uppercase tracking-wider px-2 font-medium">
                Matching Outfits ({results.length})
              </div>
              <div className="divide-y divide-[#E8E4DD]">
                {results.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleSelectProduct(product)}
                    className="flex items-center gap-4 py-2.5 px-2 hover:bg-[#F8F6F2] rounded-lg cursor-pointer transition-colors group"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-16 object-cover rounded-md bg-neutral-100 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-[#737373] uppercase tracking-wider">
                        {product.categoryName} · {product.gender === 'ladies' ? "Ladies" : "Gents"}
                      </div>
                      <div className="text-sm font-semibold text-[#171717] truncate group-hover:text-[#173D32] transition-colors">
                        {product.name}
                      </div>
                      <div className="text-xs text-neutral-500 truncate mt-0.5">
                        {product.fabric}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-sm font-semibold text-[#173D32]">
                        {formatPKR(product.price)}
                      </div>
                      {product.originalPrice && (
                        <div className="text-xs text-neutral-400 line-through">
                          {formatPKR(product.originalPrice)}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-center">
                <button
                  onClick={handleViewAllResults}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#173D32] hover:text-[#C6A36A] transition-colors py-2"
                >
                  <span>View all results in Shop</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-neutral-500 text-sm">
              <p className="font-semibold text-[#171717] text-base mb-1">No products found</p>
              <p>We couldn't find any clothing matching "{query}". Try checking the spelling or browse our collections.</p>
              <button
                onClick={() => {
                  navigate('/shop');
                  onClose();
                }}
                className="mt-4 px-4 py-2 text-xs font-medium bg-[#173D32] text-white rounded-md hover:bg-[#122e25] transition-colors"
              >
                Browse Full Shop
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
