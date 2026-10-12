import React, { useState } from 'react';
import { X, Ruler, MessageSquare, Check, Sparkles } from 'lucide-react';
import { storeConfig } from '../data/config';
import { generateSupportWhatsAppUrl } from '../utils/whatsapp';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultGender?: 'ladies' | 'gents';
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({
  isOpen,
  onClose,
  defaultGender = 'ladies',
}) => {
  const [activeTab, setActiveTab] = useState<'ladies' | 'gents' | 'unstitched'>(
    defaultGender === 'gents' ? 'gents' : 'ladies'
  );
  const [unit, setUnit] = useState<'in' | 'cm'>('in');

  if (!isOpen) return null;

  // Conversion helper
  const formatVal = (inches: number) => {
    if (unit === 'in') {
      return `${inches}"`;
    }
    const cm = Math.round(inches * 2.54);
    return `${cm} cm`;
  };

  const formatRange = (minIn: number, maxIn: number) => {
    if (unit === 'in') {
      return `${minIn}"–${maxIn}"`;
    }
    return `${Math.round(minIn * 2.54)}–${Math.round(maxIn * 2.54)} cm`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-[#E8E4DD] overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#173D32] text-white p-5 sm:p-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#C6A36A] shrink-0 border border-white/10">
              <Ruler className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-semibold text-white">
                Clothing Size & Measurement Guide
              </h3>
              <p className="text-xs text-white/80">
                Official Pakistani standard sizing dimensions for Fredo's Collection
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close size guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub-header: Category Tabs & Unit Switcher */}
        <div className="p-4 sm:px-6 bg-[#F8F6F2] border-b border-[#E8E4DD] flex flex-wrap items-center justify-between gap-3 shrink-0">
          {/* Department Tabs */}
          <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-[#E8E4DD]">
            <button
              onClick={() => setActiveTab('ladies')}
              className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'ladies'
                  ? 'bg-[#173D32] text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Ladies' Stitched
            </button>
            <button
              onClick={() => setActiveTab('gents')}
              className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'gents'
                  ? 'bg-[#173D32] text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Gents' Kurta & Suits
            </button>
            <button
              onClick={() => setActiveTab('unstitched')}
              className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'unstitched'
                  ? 'bg-[#173D32] text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Unstitched Fabrics
            </button>
          </div>

          {/* Unit Toggle: Inches vs CM */}
          <div className="flex items-center gap-1.5 text-xs text-neutral-600 font-medium">
            <span className="hidden sm:inline">Unit:</span>
            <div className="flex items-center bg-white p-0.5 rounded-md border border-[#E8E4DD]">
              <button
                onClick={() => setUnit('in')}
                className={`px-2.5 py-1 rounded text-xs font-bold transition-colors cursor-pointer ${
                  unit === 'in'
                    ? 'bg-[#173D32] text-white'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Inches (in)
              </button>
              <button
                onClick={() => setUnit('cm')}
                className={`px-2.5 py-1 rounded text-xs font-bold transition-colors cursor-pointer ${
                  unit === 'cm'
                    ? 'bg-[#173D32] text-white'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Centimeters (cm)
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {/* 1. Ladies Stitched Table */}
          {activeTab === 'ladies' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-base font-semibold text-neutral-900">
                    Ladies' Stitched Suits & Kurtis
                  </h4>
                  <p className="text-xs text-neutral-500">
                    Measurements shown represent the garment's outer finished dimensions.
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-[#E8E4DD] shadow-xs">
                <table className="min-w-full divide-y divide-[#E8E4DD] text-xs font-mono">
                  <thead className="bg-[#F8F6F2]">
                    <tr>
                      <th className="px-4 py-3 font-bold text-neutral-900 uppercase font-sans text-left">Size</th>
                      <th className="px-4 py-3 font-bold text-neutral-800 uppercase text-center">Bust / Chest</th>
                      <th className="px-4 py-3 font-bold text-neutral-800 uppercase text-center">Waist</th>
                      <th className="px-4 py-3 font-bold text-neutral-800 uppercase text-center">Hips</th>
                      <th className="px-4 py-3 font-bold text-neutral-800 uppercase text-center">Shoulder</th>
                      <th className="px-4 py-3 font-bold text-neutral-800 uppercase text-center">Sleeve Length</th>
                      <th className="px-4 py-3 font-bold text-neutral-800 uppercase text-center">Shirt Length</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-[#E8E4DD]">
                    <tr className="hover:bg-[#F8F6F2]/50">
                      <td className="px-4 py-3 font-semibold text-neutral-900 font-sans">Small (S)</td>
                      <td className="px-4 py-3 text-center tabular-nums">{formatVal(38)}</td>
                      <td className="px-4 py-3 text-center tabular-nums">{formatVal(34)}</td>
                      <td className="px-4 py-3 text-center tabular-nums">{formatVal(40)}</td>
                      <td className="px-4 py-3 text-center tabular-nums">{formatVal(14.5)}</td>
                      <td className="px-4 py-3 text-center tabular-nums font-semibold text-[#173D32]">{formatVal(21.5)}</td>
                      <td className="px-4 py-3 text-center tabular-nums">{formatVal(39)}</td>
                    </tr>
                    <tr className="hover:bg-[#F8F6F2]/50 bg-[#F8F6F2]/30">
                      <td className="px-4 py-3 font-semibold text-neutral-900 font-sans">Medium (M)</td>
                      <td className="px-4 py-3 text-center tabular-nums">{formatVal(40)}</td>
                      <td className="px-4 py-3 text-center tabular-nums">{formatVal(36)}</td>
                      <td className="px-4 py-3 text-center tabular-nums">{formatVal(43)}</td>
                      <td className="px-4 py-3 text-center tabular-nums">{formatVal(15)}</td>
                      <td className="px-4 py-3 text-center tabular-nums font-semibold text-[#173D32]">{formatVal(22)}</td>
                      <td className="px-4 py-3 text-center tabular-nums">{formatVal(40)}</td>
                    </tr>
                    <tr className="hover:bg-[#F8F6F2]/50">
                      <td className="px-4 py-3 font-semibold text-neutral-900 font-sans">Large (L)</td>
                      <td className="px-4 py-3 text-center tabular-nums">{formatVal(43)}</td>
                      <td className="px-4 py-3 text-center tabular-nums">{formatVal(40)}</td>
                      <td className="px-4 py-3 text-center tabular-nums">{formatVal(47)}</td>
                      <td className="px-4 py-3 text-center tabular-nums">{formatVal(15.5)}</td>
                      <td className="px-4 py-3 text-center tabular-nums font-semibold text-[#173D32]">{formatVal(22.5)}</td>
                      <td className="px-4 py-3 text-center tabular-nums">{formatVal(41)}</td>
                    </tr>
                    <tr className="hover:bg-[#F8F6F2]/50 bg-[#F8F6F2]/30">
                      <td className="px-4 py-3 font-semibold text-neutral-900 font-sans">Extra Large (XL)</td>
                      <td className="px-4 py-3 text-center tabular-nums">{formatVal(46)}</td>
                      <td className="px-4 py-3 text-center tabular-nums">{formatVal(43)}</td>
                      <td className="px-4 py-3 text-center tabular-nums">{formatVal(50)}</td>
                      <td className="px-4 py-3 text-center tabular-nums">{formatVal(16.5)}</td>
                      <td className="px-4 py-3 text-center tabular-nums font-semibold text-[#173D32]">{formatVal(23)}</td>
                      <td className="px-4 py-3 text-center tabular-nums">{formatVal(42)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-[#F8F6F2] p-3.5 rounded-lg border border-[#E8E4DD] text-xs text-neutral-600 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-[#C6A36A] shrink-0 mt-0.5" />
                <span>
                  <strong>Fit Tip:</strong> If your body measurements fall between two sizes, choose the larger size for a relaxed traditional drape or the smaller size for a contemporary fitted silhouette.
                </span>
              </div>
            </div>
          )}

          {/* 2. Gents Stitched Table */}
          {activeTab === 'gents' && (
            <div className="space-y-4">
              <div>
                <h4 className="font-serif text-base font-semibold text-neutral-900">
                  Men's Kurta Shalwar & Waistcoats
                </h4>
                <p className="text-xs text-neutral-500">
                  Carefully tailored according to classic Pakistani gentleman cuts and band collar standards.
                </p>
              </div>

              <div className="overflow-x-auto rounded-xl border border-[#E8E4DD] shadow-xs">
                <table className="min-w-full divide-y divide-[#E8E4DD] text-xs font-mono">
                  <thead className="bg-[#F8F6F2]">
                    <tr>
                      <th className="px-4 py-3 font-bold text-neutral-900 uppercase font-sans text-left">Size</th>
                      <th className="px-4 py-3 font-bold text-neutral-800 uppercase text-center">Chest</th>
                      <th className="px-4 py-3 font-bold text-neutral-800 uppercase text-center">Collar / Band</th>
                      <th className="px-4 py-3 font-bold text-neutral-800 uppercase text-center">Shoulder</th>
                      <th className="px-4 py-3 font-bold text-neutral-800 uppercase text-center">Sleeve Length</th>
                      <th className="px-4 py-3 font-bold text-neutral-800 uppercase text-center">Kurta Length</th>
                      <th className="px-4 py-3 font-bold text-neutral-800 uppercase text-center">Shalwar Length</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-[#E8E4DD]">
                    <tr className="hover:bg-[#F8F6F2]/50">
                      <td className="px-4 py-3 font-semibold text-neutral-900 font-sans">Small (38)</td>
                      <td className="px-4 py-3 text-center tabular-nums">{formatRange(38, 39)}</td>
                      <td className="px-4 py-3 text-center tabular-nums">{formatVal(14.5)}</td>
                      <td className="px-4 py-3 text-center tabular-nums">{formatVal(17.5)}</td>
                      <td className="px-4 py-3 text-center tabular-nums font-semibold text-[#173D32]">{formatVal(23.5)}</td>
                      <td className="px-4 py-3 text-center tabular-nums">{formatVal(40)}</td>
                      <td className="px-4 py-3 text-center tabular-nums">{formatVal(40)}</td>
                    </tr>
                    <tr className="hover:bg-[#F8F6F2]/50 bg-[#F8F6F2]/30">
                      <td className="px-4 py-3 font-semibold text-neutral-900 font-sans">Medium (40)</td>
                      <td className="px-4 py-3 text-center tabular-nums">{formatRange(40, 41)}</td>
                      <td className="px-4 py-3 text-center tabular-nums">{formatVal(15)}</td>
                      <td className="px-4 py-3 text-center tabular-nums">{formatVal(18)}</td>
                      <td className="px-4 py-3 text-center tabular-nums font-semibold text-[#173D32]">{formatVal(24.5)}</td>
                      <td className="px-4 py-3 text-center tabular-nums">{formatVal(42)}</td>
                      <td className="px-4 py-3 text-center tabular-nums">{formatVal(42)}</td>
                    </tr>
                    <tr className="hover:bg-[#F8F6F2]/50">
                      <td className="px-4 py-3 font-semibold text-neutral-900 font-sans">Large (42)</td>
                      <td className="px-4 py-3 text-center tabular-nums">{formatRange(42, 44)}</td>
                      <td className="px-4 py-3 text-center tabular-nums">{formatVal(15.5)}</td>
                      <td className="px-4 py-3 text-center tabular-nums">{formatVal(19)}</td>
                      <td className="px-4 py-3 text-center tabular-nums font-semibold text-[#173D32]">{formatVal(25.5)}</td>
                      <td className="px-4 py-3 text-center tabular-nums">{formatVal(44)}</td>
                      <td className="px-4 py-3 text-center tabular-nums">{formatVal(43)}</td>
                    </tr>
                    <tr className="hover:bg-[#F8F6F2]/50 bg-[#F8F6F2]/30">
                      <td className="px-4 py-3 font-semibold text-neutral-900 font-sans">XL (44)</td>
                      <td className="px-4 py-3 text-center tabular-nums">{formatRange(45, 47)}</td>
                      <td className="px-4 py-3 text-center tabular-nums">{formatVal(16)}</td>
                      <td className="px-4 py-3 text-center tabular-nums">{formatVal(20)}</td>
                      <td className="px-4 py-3 text-center tabular-nums font-semibold text-[#173D32]">{formatVal(26)}</td>
                      <td className="px-4 py-3 text-center tabular-nums">{formatVal(45)}</td>
                      <td className="px-4 py-3 text-center tabular-nums">{formatVal(44)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-[#F8F6F2] p-3.5 rounded-lg border border-[#E8E4DD] text-xs text-neutral-600">
                <strong>Waistcoats:</strong> Order the same chest size as your Kurta. Our waistcoats include internal back adjustment buckles for custom waist tapering.
              </div>
            </div>
          )}

          {/* 3. Unstitched Fabric Guide */}
          {activeTab === 'unstitched' && (
            <div className="space-y-4">
              <div>
                <h4 className="font-serif text-base font-semibold text-neutral-900">
                  Unstitched Fabric Length Specifications
                </h4>
                <p className="text-xs text-neutral-500">
                  Generous fabric yards accommodating any custom master-tailor styling.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-[#F8F6F2] rounded-xl border border-[#E8E4DD] space-y-2">
                  <h5 className="font-semibold text-neutral-900 text-xs uppercase tracking-wider text-[#173D32]">
                    Ladies' 3-Piece Unstitched Cuts
                  </h5>
                  <ul className="text-xs text-neutral-700 space-y-1.5 list-disc list-inside">
                    <li><strong>Shirt Fabric:</strong> 3.0 Meters (Accommodates straight, flared or peplum cuts up to 45" length)</li>
                    <li><strong>Trouser Fabric:</strong> 2.5 Meters (Supports shalwar, cigarette pants, or culottes)</li>
                    <li><strong>Dupatta / Shawl:</strong> 2.5 Meters standard length with embroidered pallu borders</li>
                  </ul>
                </div>

                <div className="p-4 bg-[#F8F6F2] rounded-xl border border-[#E8E4DD] space-y-2">
                  <h5 className="font-semibold text-neutral-900 text-xs uppercase tracking-wider text-[#173D32]">
                    Men's Unstitched Suit Cuts
                  </h5>
                  <ul className="text-xs text-neutral-700 space-y-1.5 list-disc list-inside">
                    <li><strong>Full Suit Length:</strong> 4.5 Meters standard length</li>
                    <li><strong>Loom Width (Arz):</strong> 54–56 Inches (Large double width)</li>
                    <li><strong>Suitable For:</strong> Height up to 6'4" with matching traditional shalwar or pajama</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* How to Measure Yourself */}
          <div className="pt-4 border-t border-[#E8E4DD]">
            <h4 className="font-serif text-sm font-semibold text-neutral-900 mb-3">
              How to Measure Accurately at Home:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-neutral-600">
              <div className="p-3 bg-neutral-50 rounded-lg border border-[#E8E4DD]/80">
                <strong className="text-neutral-900 block mb-0.5">1. Chest / Bust</strong>
                Measure around the fullest part of your chest, keeping the measuring tape parallel to the floor.
              </div>
              <div className="p-3 bg-neutral-50 rounded-lg border border-[#E8E4DD]/80">
                <strong className="text-neutral-900 block mb-0.5">2. Waist</strong>
                Measure around your natural waistline, where your trousers or shalwar comfortably sits.
              </div>
              <div className="p-3 bg-neutral-50 rounded-lg border border-[#E8E4DD]/80">
                <strong className="text-neutral-900 block mb-0.5">3. Shirt Length</strong>
                Measure straight down from the highest point of your shoulder to your desired hemline.
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:px-6 bg-[#F8F6F2] border-t border-[#E8E4DD] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-neutral-600 flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span>Need personalized tailoring advice?</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={generateSupportWhatsAppUrl('Salam! I need assistance choosing the right size for an outfit.')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none px-4 py-2 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-current" />
              <span>Ask Stylist on WhatsApp</span>
            </a>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 rounded-lg text-xs font-semibold transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
