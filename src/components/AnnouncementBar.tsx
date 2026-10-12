import React from 'react';
import { Phone, Globe } from 'lucide-react';
import { storeConfig } from '../data/config';
import { useLanguage } from '../context/LanguageContext';

export const AnnouncementBar: React.FC = () => {
  const { language, toggleLanguage, isUrdu } = useLanguage();

  return (
    <div className="bg-[#173D32] text-[#F8F6F2] text-xs font-medium py-2 px-4 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        {/* Contact direct link */}
        <div className="hidden sm:flex items-center gap-2 text-white/80 hover:text-white transition-colors">
          <Phone className="w-3.5 h-3.5 text-[#C6A36A]" />
          <a href={`tel:${storeConfig.phoneDisplay}`} className="tracking-wide">
            {storeConfig.phoneDisplay}
          </a>
        </div>

        {/* Center announcement text */}
        <div className="text-center tracking-wide font-normal flex-1">
          <span>{isUrdu ? storeConfig.announcement.ur : storeConfig.announcement.en}</span>
        </div>

        {/* Language switch */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 text-white/80 hover:text-white text-xs cursor-pointer tracking-wider font-medium"
            title="Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-[#C6A36A]" />
            <span>{language === 'en' ? 'اردو' : 'English'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
