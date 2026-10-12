import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, X, ArrowUpRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { SearchModal } from './SearchModal';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const { totalItemsCount, openDrawer } = useCart();
  const { wishlistCount } = useWishlist();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Ladies', path: '/shop?gender=ladies' },
    { label: 'Gents', path: '/shop?gender=gents' },
    { label: 'New Arrivals', path: '/shop?filter=new' },
    { label: 'Sale', path: '/shop?filter=sale' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && (location.pathname + location.search).includes(path)) return true;
    return false;
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 bg-white/95 backdrop-blur-md ${
          isScrolled ? 'shadow-xs border-b border-[#E8E4DD] py-3' : 'border-b border-[#E8E4DD]/60 py-4.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-1.5 -ml-1.5 text-neutral-700 hover:text-[#173D32] transition-colors"
              aria-label="Open mobile menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <Link
              to="/"
              className="group flex flex-col items-start whitespace-nowrap shrink-0"
            >
              <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-[#171717] group-hover:text-[#173D32] transition-colors">
                Fredo's Collection
              </span>
            </Link>
          </div>

          {/* Zone 2: Primary Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-neutral-700">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors ${
                    active
                      ? 'text-[#173D32] font-semibold'
                      : 'hover:text-[#173D32]'
                  } ${link.label === 'Sale' ? 'text-[#B42318] hover:text-[#901c13]' : ''}`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#173D32] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Search, Wishlist, Cart Actions */}
          <div className="flex items-center gap-4 sm:gap-5 shrink-0">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="p-2 text-neutral-700 hover:text-[#173D32] transition-colors"
              aria-label="Search clothing catalogue"
              title="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              className="relative p-2 text-neutral-700 hover:text-[#173D32] transition-colors"
              aria-label={`Wishlist with ${wishlistCount} items`}
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-[#C6A36A] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Bag Drawer Trigger */}
            <button
              onClick={openDrawer}
              className="relative p-2 text-neutral-700 hover:text-[#173D32] transition-colors"
              aria-label={`Shopping bag with ${totalItemsCount} items`}
              title="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-[#173D32] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-white shadow-xl z-50 flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="p-5 flex items-center justify-between border-b border-[#E8E4DD]">
                <span className="font-serif text-xl font-semibold text-[#171717]">
                  Fredo's Collection
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-neutral-500 hover:text-neutral-900"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation links */}
              <div className="py-4 px-3 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
                      isActive(link.path)
                        ? 'bg-[#F8F6F2] text-[#173D32] font-semibold'
                        : 'text-neutral-700 hover:bg-neutral-50'
                    } ${link.label === 'Sale' ? 'text-[#B42318]' : ''}`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Bottom info */}
            <div className="p-5 border-t border-[#E8E4DD] bg-[#F8F6F2] space-y-3">
              <div className="text-xs text-neutral-500">Customer Support / WhatsApp:</div>
              <a
                href="https://wa.me/923051367640"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between w-full py-2.5 px-4 bg-[#173D32] text-white rounded-lg text-sm font-medium hover:bg-[#122e25] transition-colors"
              >
                <span>Chat on WhatsApp</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <div className="text-[11px] text-center text-neutral-500">
                03051367640 · umeryjutt345@gmail.com
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Instant Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />
    </>
  );
};
