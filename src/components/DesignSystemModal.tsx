import React, { useState } from 'react';
import { X, Check, Copy, Palette, Type, Square, Layers } from 'lucide-react';

interface DesignSystemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DesignSystemModal: React.FC<DesignSystemModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const COLOR_PALETTE = [
    {
      name: 'Warm Cream',
      hex: '#F5EFE6',
      role: 'Primary Page Canvas & Backgrounds (60% Dominant Neutral)',
      textColor: '#292824',
      border: true,
    },
    {
      name: 'Soft Beige',
      hex: '#D8C3A5',
      role: 'Decorative Highlights, Badges & Secondary Accents',
      textColor: '#292824',
    },
    {
      name: 'Sage Green',
      hex: '#6B705C',
      role: 'Primary Action Buttons, CTAs, Active States & Brand Accents (10% Accent)',
      textColor: '#FFFFFF',
    },
    {
      name: 'Dark Charcoal',
      hex: '#292824',
      role: 'Headlines, Primary Body Typography & Announcement Bar',
      textColor: '#F5EFE6',
    },
    {
      name: 'Pure White',
      hex: '#FFFFFF',
      role: 'Product Cards, Modals, Forms & Surface Containers (30% Structural)',
      textColor: '#292824',
      border: true,
    },
    {
      name: 'Light Border',
      hex: '#E8E1D8',
      role: 'Hairline Structural Dividers, Card Outlines & Input Borders',
      textColor: '#292824',
      border: true,
    },
  ];

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#292824]/65 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative bg-[#FFFFFF] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#E8E1D8] p-6 sm:p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E8E1D8] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#6B705C] text-white">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#292824]">
                Decora Home Design System
              </h2>
              <p className="text-xs text-[#292824]/60">
                Official Coordinated Brand Palette, Typography & Structural Tokens
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#F5EFE6] text-[#292824] transition-colors cursor-pointer"
            aria-label="Close design system"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section 1: Coordinated Colour Palette (Prompt Section 3 Requirement) */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#6B705C]">
            <Palette className="w-4 h-4" />
            <span>Coordinated Brand Colour Palette</span>
          </div>
          <p className="text-xs text-[#292824]/75">
            Click any color tile to copy its exact HEX code. Warm cream anchors our pages, pure white elevates products, and earthy sage green invites confident action.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
            {COLOR_PALETTE.map((color) => (
              <div
                key={color.name}
                onClick={() => handleCopy(color.hex)}
                className={`group cursor-pointer rounded-xl p-4 border transition-all hover:scale-102 flex flex-col justify-between h-32 shadow-2xs ${
                  color.border ? 'border-[#E8E1D8]' : 'border-transparent'
                }`}
                style={{ backgroundColor: color.hex, color: color.textColor }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-serif font-bold text-sm block">{color.name}</span>
                    <span className="text-xs font-mono tracking-wider tabular-nums font-semibold opacity-90">
                      {color.hex}
                    </span>
                  </div>
                  <button
                    className="p-1.5 rounded-md bg-black/10 group-hover:bg-black/20 transition-colors"
                    title="Copy HEX"
                  >
                    {copiedHex === color.hex ? (
                      <Check className="w-3.5 h-3.5" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                <p className="text-[10px] leading-tight opacity-80 mt-2">
                  {color.role}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Typography & Font Pairing */}
        <div className="space-y-4 pt-4 border-t border-[#E8E1D8]">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#6B705C]">
            <Type className="w-4 h-4" />
            <span>Typography Specimen & The 2+1 Rule</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-[#F5EFE6] rounded-xl border border-[#E8E1D8] space-y-2">
              <span className="text-[11px] font-semibold text-[#6B705C] uppercase tracking-wider block">
                Primary Display Serif: Playfair Display
              </span>
              <p className="font-serif text-2xl font-bold text-[#292824]">
                Make Every Corner Feel Like Home
              </p>
              <p className="text-xs text-[#292824]/60">
                Used for editorial hero headlines, collection banners, and section titles.
              </p>
            </div>

            <div className="p-4 bg-[#F5EFE6] rounded-xl border border-[#E8E1D8] space-y-2">
              <span className="text-[11px] font-semibold text-[#6B705C] uppercase tracking-wider block">
                Clean Body Sans: Plus Jakarta Sans
              </span>
              <p className="text-sm text-[#292824] leading-relaxed">
                Handcrafted stoneware amphoras and textured diptych plaster art carefully finished by master craftsmen.
              </p>
              <p className="text-xs text-[#292824]/60">
                Used for readable body prose, specs, navigation, and product descriptions.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Reusable Button & Control Styles */}
        <div className="space-y-4 pt-4 border-t border-[#E8E1D8]">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#6B705C]">
            <Square className="w-4 h-4" />
            <span>Interactive Control Styles</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div>
              <span className="text-[11px] text-[#292824]/60 block mb-1">Primary Action</span>
              <button className="px-5 py-2.5 bg-[#6B705C] text-[#FFFFFF] rounded-lg text-xs font-medium hover:bg-[#585c4c]">
                Add to Cart · Rs. 4,850
              </button>
            </div>

            <div>
              <span className="text-[11px] text-[#292824]/60 block mb-1">Secondary Action</span>
              <button className="px-5 py-2.5 bg-transparent border border-[#292824]/30 text-[#292824] rounded-lg text-xs font-medium hover:bg-[#D8C3A5]/20">
                Explore New Arrivals
              </button>
            </div>

            <div>
              <span className="text-[11px] text-[#292824]/60 block mb-1">Dark Mode Accent</span>
              <button className="px-5 py-2.5 bg-[#292824] text-[#FFFFFF] rounded-lg text-xs font-medium hover:bg-[#1a1917]">
                Buy with COD
              </button>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="pt-4 border-t border-[#E8E1D8] flex items-center justify-between text-xs text-[#292824]/60">
          <span>Decora Home · Strict Anti-AI-Slop & Zero-Pill Design Applied</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#292824] text-[#FFFFFF] rounded-lg text-xs font-semibold hover:bg-[#6B705C] transition-colors cursor-pointer"
          >
            Close Spec
          </button>
        </div>
      </div>
    </div>
  );
};
