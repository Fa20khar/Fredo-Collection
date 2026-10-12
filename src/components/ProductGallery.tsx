import React, { useState, useRef, useEffect } from 'react';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
  RotateCw,
} from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  productName: string;
  onSale?: boolean;
  gender?: 'ladies' | 'gents';
  className?: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  images,
  productName,
  onSale = false,
  gender = 'ladies',
  className = '',
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [zoomScale, setZoomScale] = useState(2.4); // 2.4x high-res inspection
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const [fullscreenZoom, setFullscreenZoom] = useState(1);
  const [fullscreenPan, setFullscreenPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const imageList = images.length > 0 ? images : [
    gender === 'ladies'
      ? 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80'
      : 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80',
  ];

  const currentImage = imageList[selectedIndex] || imageList[0];

  // Reset selected image when images prop changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [images]);

  // Handle keyboard navigation for fullscreen modal
  useEffect(() => {
    if (!isFullscreenOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFullscreenOpen(false);
      } else if (e.key === 'ArrowRight') {
        setSelectedIndex((prev) => (prev + 1) % imageList.length);
        setFullscreenZoom(1);
        setFullscreenPan({ x: 0, y: 0 });
      } else if (e.key === 'ArrowLeft') {
        setSelectedIndex((prev) => (prev - 1 + imageList.length) % imageList.length);
        setFullscreenZoom(1);
        setFullscreenPan({ x: 0, y: 0 });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreenOpen, imageList.length]);

  // Calculate mouse position relative to image container for hover-to-zoom
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setZoomPos({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handlePrevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev - 1 + imageList.length) % imageList.length);
  };

  const handleNextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev + 1) % imageList.length);
  };

  const openFullscreen = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsFullscreenOpen(true);
    setFullscreenZoom(1);
    setFullscreenPan({ x: 0, y: 0 });
  };

  // Fullscreen pan/drag handlers
  const handleFullscreenMouseDown = (e: React.MouseEvent) => {
    if (fullscreenZoom <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - fullscreenPan.x, y: e.clientY - fullscreenPan.y });
  };

  const handleFullscreenMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || fullscreenZoom <= 1) return;
    setFullscreenPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleFullscreenMouseUp = () => {
    setIsDragging(false);
  };

  const toggleFullscreenZoom = () => {
    if (fullscreenZoom === 1) {
      setFullscreenZoom(2.2);
    } else if (fullscreenZoom === 2.2) {
      setFullscreenZoom(3.2);
    } else {
      setFullscreenZoom(1);
      setFullscreenPan({ x: 0, y: 0 });
    }
  };

  const fallbackUrl =
    gender === 'ladies'
      ? 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85'
      : 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85';

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main Image Stage with Hover-to-Zoom */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={openFullscreen}
        className="group relative aspect-3/4 rounded-xl overflow-hidden bg-[#F8F6F2] border border-[#E8E4DD] shadow-sm select-none cursor-crosshair"
        title="Hover to magnify fabric detail · Click for full resolution"
      >
        {/* Main High-Resolution Image */}
        <div className="w-full h-full overflow-hidden">
          <img
            src={currentImage}
            onError={(e) => {
              (e.target as HTMLImageElement).src = fallbackUrl;
            }}
            alt={`${productName} view ${selectedIndex + 1}`}
            referrerPolicy="no-referrer"
            style={{
              transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
              transform: isHovered ? `scale(${zoomScale})` : 'scale(1)',
              transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.3s ease-out',
            }}
            className="w-full h-full object-cover object-top will-change-transform pointer-events-none"
          />
        </div>

        {/* Sale / Offer Badge */}
        {onSale && (
          <div className="absolute top-4 left-4 z-10 pointer-events-none">
            <span className="text-xs font-semibold px-2.5 py-1 bg-[#B42318] text-white rounded-xs uppercase tracking-wider shadow-xs">
              Special Offer
            </span>
          </div>
        )}

        {/* Interactive Top-Right Action Controls */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
          {/* Zoom Level Switcher (2x / 2.8x) visible on hover */}
          <div
            className={`flex items-center gap-1 bg-black/60 backdrop-blur-xs text-white rounded-lg p-1 text-[11px] transition-all duration-200 ${
              isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setZoomScale(2.0)}
              className={`px-1.5 py-0.5 rounded text-[10px] font-semibold transition-colors ${
                zoomScale === 2.0 ? 'bg-[#C6A36A] text-black' : 'text-neutral-300 hover:text-white'
              }`}
            >
              2x
            </button>
            <button
              type="button"
              onClick={() => setZoomScale(2.6)}
              className={`px-1.5 py-0.5 rounded text-[10px] font-semibold transition-colors ${
                zoomScale === 2.6 ? 'bg-[#C6A36A] text-black' : 'text-neutral-300 hover:text-white'
              }`}
            >
              2.6x
            </button>
            <button
              type="button"
              onClick={() => setZoomScale(3.2)}
              className={`px-1.5 py-0.5 rounded text-[10px] font-semibold transition-colors ${
                zoomScale === 3.2 ? 'bg-[#C6A36A] text-black' : 'text-neutral-300 hover:text-white'
              }`}
            >
              3.2x
            </button>
          </div>

          {/* Fullscreen Expand Button */}
          <button
            type="button"
            onClick={openFullscreen}
            className="p-2 rounded-lg bg-black/60 hover:bg-black/85 text-white backdrop-blur-xs transition-colors shadow-xs"
            aria-label="Expand image to high resolution"
            title="Expand to Fullscreen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Previous / Next Arrow Controls */}
        {imageList.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-neutral-800 shadow-md backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-105"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-neutral-800 shadow-md backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-105"
              aria-label="Next photo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Bottom Status / Instructions Bar */}
        <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
          {/* Zoom Instruction Badge */}
          <div
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium backdrop-blur-xs transition-all duration-300 ${
              isHovered
                ? 'bg-[#173D32]/90 text-[#F8F6F2] shadow-sm'
                : 'bg-black/45 text-white/90'
            }`}
          >
            {isHovered ? (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-[#C6A36A] animate-ping" />
                <span>{zoomScale}x Fabric Magnifier · Pan with cursor</span>
              </>
            ) : (
              <>
                <ZoomIn className="w-3.5 h-3.5 text-[#C6A36A]" />
                <span className="hidden sm:inline">Hover to zoom fabric detail</span>
                <span className="sm:hidden">Tap to inspect fabric</span>
              </>
            )}
          </div>

          {/* Photo Counter Pill */}
          {imageList.length > 1 && (
            <span className="text-[11px] font-medium bg-black/55 text-white/90 px-2.5 py-0.5 rounded-md backdrop-blur-xs font-mono">
              {selectedIndex + 1} / {imageList.length}
            </span>
          )}
        </div>
      </div>

      {/* Thumbnails Row */}
      {imageList.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-1.5 pt-0.5 scrollbar-thin">
          {imageList.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              onMouseEnter={() => setSelectedIndex(idx)}
              className={`relative w-20 h-24 rounded-lg overflow-hidden border-2 transition-all shrink-0 bg-[#F8F6F2] group ${
                selectedIndex === idx
                  ? 'border-[#173D32] ring-2 ring-[#173D32]/25 shadow-xs'
                  : 'border-[#E8E4DD] opacity-75 hover:opacity-100 hover:border-neutral-400'
              }`}
              aria-label={`View photo ${idx + 1}`}
            >
              <img
                src={img}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = fallbackUrl;
                }}
                alt={`${productName} thumbnail ${idx + 1}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {selectedIndex === idx && (
                <div className="absolute inset-0 bg-[#173D32]/10 pointer-events-none" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* High-Resolution Fullscreen Lightbox Modal */}
      {isFullscreenOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsFullscreenOpen(false)}
        >
          {/* Top Header Bar */}
          <div
            className="flex items-center justify-between px-6 py-4 border-b border-white/10 z-20 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="font-serif text-lg font-medium tracking-wide">
                {productName}
              </span>
              <span className="text-xs text-neutral-400 font-mono">
                ({selectedIndex + 1} of {imageList.length})
              </span>
            </div>

            {/* Action Bar */}
            <div className="flex items-center gap-2">
              {/* Zoom In/Out Toggle */}
              <button
                type="button"
                onClick={toggleFullscreenZoom}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-colors"
                title="Toggle zoom level (1x, 2.2x, 3.2x)"
              >
                {fullscreenZoom > 1 ? (
                  <>
                    <ZoomOut className="w-3.5 h-3.5" />
                    <span>{fullscreenZoom}x (Reset)</span>
                  </>
                ) : (
                  <>
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>Zoom In</span>
                  </>
                )}
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsFullscreenOpen(false)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors ml-2"
                aria-label="Close fullscreen view"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Fullscreen Stage */}
          <div
            className={`flex-1 relative flex items-center justify-center p-4 overflow-hidden select-none ${
              fullscreenZoom > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-zoom-in'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              if (fullscreenZoom === 1) toggleFullscreenZoom();
            }}
            onMouseDown={handleFullscreenMouseDown}
            onMouseMove={handleFullscreenMouseMove}
            onMouseUp={handleFullscreenMouseUp}
          >
            <img
              src={currentImage}
              onError={(e) => {
                (e.target as HTMLImageElement).src = fallbackUrl;
              }}
              alt={productName}
              referrerPolicy="no-referrer"
              style={{
                transform: `scale(${fullscreenZoom}) translate(${fullscreenPan.x / fullscreenZoom}px, ${fullscreenPan.y / fullscreenZoom}px)`,
                transition: isDragging ? 'none' : 'transform 0.2s ease-out',
                maxHeight: '82vh',
              }}
              className="max-w-full object-contain will-change-transform shadow-2xl rounded-sm"
              draggable={false}
            />

            {/* Navigation Arrows */}
            {imageList.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrevImage}
                  className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/15 hover:bg-white/30 text-white backdrop-blur-md transition-all z-20"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={handleNextImage}
                  className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/15 hover:bg-white/30 text-white backdrop-blur-md transition-all z-20"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Bottom Thumbnails Strip */}
          {imageList.length > 1 && (
            <div
              className="py-3 px-6 border-t border-white/10 flex items-center justify-center gap-3 overflow-x-auto z-20 bg-black/50"
              onClick={(e) => e.stopPropagation()}
            >
              {imageList.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setSelectedIndex(idx);
                    setFullscreenZoom(1);
                    setFullscreenPan({ x: 0, y: 0 });
                  }}
                  className={`w-14 h-16 rounded-md overflow-hidden border-2 transition-all shrink-0 ${
                    selectedIndex === idx
                      ? 'border-[#C6A36A] ring-2 ring-[#C6A36A]/40 scale-105'
                      : 'border-white/20 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = fallbackUrl;
                    }}
                    alt={`Thumb ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
