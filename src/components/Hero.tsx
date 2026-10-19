import React from 'react';
import { ArrowRight, Compass, Sparkles, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { IMAGES } from '../data/products.ts';

interface HeroProps {
  onShopClick: () => void;
  onNewArrivalsClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopClick, onNewArrivalsClick }) => {
  return (
    <section className="relative overflow-hidden bg-[#F5EFE6] pt-6 pb-12 sm:pt-10 sm:pb-16 border-b border-[#E8E1D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 2-Column Balanced Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#6B705C]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Autumn / Winter Architectural Decor</span>
            </div>

            <div className="space-y-4">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#292824] leading-[1.12] text-balance">
                Make Every Corner Feel Like Home
              </h1>
              <p className="text-base sm:text-lg text-[#292824]/80 max-w-xl leading-relaxed font-normal">
                Discover timeless decorative pieces that bring warmth, beauty, and personality to your space. Handcrafted ceramic vessels, sculptural lighting, and curated interior accents.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onShopClick}
                className="px-7 py-3.5 bg-[#6B705C] text-[#FFFFFF] rounded-lg font-medium text-sm hover:bg-[#585c4c] transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs group"
              >
                <span>Shop Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onNewArrivalsClick}
                className="px-6 py-3.5 bg-transparent border border-[#292824]/30 text-[#292824] rounded-lg font-medium text-sm hover:bg-[#D8C3A5]/20 hover:border-[#292824] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Compass className="w-4 h-4 text-[#6B705C]" />
                <span>Explore New Arrivals</span>
              </button>
            </div>

            {/* Trust Quote / Origin proof */}
            <div className="pt-4 border-t border-[#E8E1D8] flex items-center gap-4 text-xs text-[#292824]/70">
              <span className="font-medium text-[#292824]">Handcrafted in Pakistan</span>
              <span aria-hidden="true">·</span>
              <span>Cash on Delivery</span>
              <span aria-hidden="true">·</span>
              <span>Safe Breakage-Free Guarantee</span>
            </div>
          </div>

          {/* Right Column: Hero High-Fidelity Architectural Photography */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-md border border-[#E8E1D8] aspect-[16/10] sm:aspect-[16/10] bg-[#E8E1D8]/40">
              <img
                src={IMAGES.hero}
                alt="Minimalist living room decorated with Decora Home ceramic vases and linen accents"
                className="w-full h-full object-cover transform hover:scale-102 transition-transform duration-700"
                referrerPolicy="no-referrer"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#292824]/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 p-3 bg-[#FFFFFF]/90 backdrop-blur-md rounded-xl border border-[#E8E1D8] flex items-center justify-between text-xs">
                <div>
                  <p className="font-medium text-[#292824]">Featured: Sand Glaze Amphora & Linen Sofa</p>
                  <p className="text-[#6B705C]">Interior styling by Decora Home Studio</p>
                </div>
                <button
                  onClick={onShopClick}
                  className="px-3 py-1.5 bg-[#292824] text-[#FFFFFF] rounded-md text-xs font-medium hover:bg-[#6B705C] transition-colors whitespace-nowrap cursor-pointer"
                >
                  View Look
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Proof / Benefits Strip below hero split */}
        <div className="mt-12 pt-8 border-t border-[#E8E1D8] grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-[#D8C3A5]/30 text-[#6B705C] shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#292824]">Nationwide Delivery</h4>
              <p className="text-xs text-[#292824]/70 mt-0.5">Free delivery across Pakistan on orders over Rs. 4,000</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-[#D8C3A5]/30 text-[#6B705C] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#292824]">Cash on Delivery</h4>
              <p className="text-xs text-[#292824]/70 mt-0.5">Pay safely at your doorstep with verified parcel inspection</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-[#D8C3A5]/30 text-[#6B705C] shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#292824]">Artisanal Quality</h4>
              <p className="text-xs text-[#292824]/70 mt-0.5">Hand-thrown ceramics, raw stone & solid brass materials</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-[#D8C3A5]/30 text-[#6B705C] shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#292824]">7-Day Easy Exchange</h4>
              <p className="text-xs text-[#292824]/70 mt-0.5">Safe break-proof packaging with hassle-free replacement</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
