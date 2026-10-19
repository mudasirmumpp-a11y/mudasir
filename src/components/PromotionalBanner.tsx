import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { IMAGES } from '../data/products.ts';

interface PromotionalBannerProps {
  onShopClick: () => void;
}

export const PromotionalBanner: React.FC<PromotionalBannerProps> = ({ onShopClick }) => {
  return (
    <section className="py-14 sm:py-20 bg-[#F5EFE6] border-b border-[#E8E1D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden bg-[#292824] text-[#F5EFE6] shadow-xl border border-[#D8C3A5]/20">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D8C3A5]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Limited Seasonal Release</span>
              </div>

              <div className="space-y-3">
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FFFFFF] leading-tight">
                  Refresh Your Space — Discover Something Beautiful
                </h2>
                <p className="text-sm sm:text-base text-[#F5EFE6]/80 max-w-lg leading-relaxed">
                  Elevate your coffee table vignettes, bedside nooks, and entryway consoles with hand-thrown ceramic amphoras, sculpted marble catchalls, and soothing amber candlelight.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
                <button
                  onClick={onShopClick}
                  className="px-6 py-3.5 bg-[#6B705C] hover:bg-[#565a4a] text-[#FFFFFF] rounded-xl font-medium text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer shadow-md group"
                >
                  <span>Explore Featured Pieces</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <span className="text-xs text-[#D8C3A5]">
                  Free delivery across Pakistan over Rs. 4,000
                </span>
              </div>
            </div>

            {/* Right Media Preview */}
            <div className="lg:col-span-5 h-72 lg:h-full min-h-[300px] relative overflow-hidden bg-[#292824]">
              <img
                src={IMAGES.candlesTrays}
                alt="Styled ceramic candles and marble trays"
                className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#292824] via-transparent to-transparent hidden lg:block" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
