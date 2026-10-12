import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  fallbackSrc,
  alt = "Fredo's Collection",
  className = '',
  ...props
}) => {
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(src);
  const [hasError, setHasError] = useState(false);

  // Default elegant South Asian fashion fallback
  const defaultFallback =
    fallbackSrc ||
    'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80';

  const handleError = () => {
    if (currentSrc !== defaultFallback) {
      setCurrentSrc(defaultFallback);
    } else {
      setHasError(true);
    }
  };

  if (hasError || !currentSrc) {
    return (
      <div
        className={`bg-gradient-to-br from-[#173D32] to-[#0f2922] text-[#F8F6F2] flex flex-col items-center justify-center p-4 text-center ${className}`}
      >
        <Sparkles className="w-6 h-6 text-[#C6A36A] mb-1 opacity-80" />
        <span className="font-serif text-xs font-semibold tracking-wide text-white/90">
          Fredo's Collection
        </span>
        <span className="text-[10px] text-[#C6A36A] mt-0.5 line-clamp-1">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      onError={handleError}
      referrerPolicy="no-referrer"
      className={className}
      {...props}
    />
  );
};
