import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { storeConfig } from '../data/config';
import { generateSupportWhatsAppUrl } from '../utils/whatsapp';

export const WhatsAppFloatingButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const handleWhatsAppClick = () => {
    const url = generateSupportWhatsAppUrl();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Friendly tooltip */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-white text-neutral-800 text-xs py-2 px-3.5 rounded-full shadow-lg border border-[#E8E4DD] animate-in fade-in slide-in-from-right duration-300">
          <span>Need help styling or sizing? Chat with us!</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-neutral-400 hover:text-neutral-700 p-0.5"
            aria-label="Dismiss tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={handleWhatsAppClick}
        aria-label={`Chat with Fredo's Collection on WhatsApp at ${storeConfig.phoneDisplay}`}
        className="w-14 h-14 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-106 focus:outline-hidden focus:ring-4 focus:ring-[#25D366]/30 cursor-pointer"
        title="Chat on WhatsApp"
      >
        <MessageSquare className="w-7 h-7 fill-current" />
      </button>
    </div>
  );
};
