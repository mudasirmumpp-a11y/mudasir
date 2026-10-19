import React from 'react';
import { IMAGES } from '../data/products.ts';
import { Sparkles, MapPin, ShieldCheck, HeartHandshake, Compass } from 'lucide-react';

interface AboutSectionProps {
  onShopClick: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onShopClick }) => {
  return (
    <div className="bg-[#F5EFE6] py-12 sm:py-20 border-b border-[#E8E1D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Intro Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#6B705C] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Our Story & Heritage
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#292824] leading-tight">
              Bringing Tactile Soul Back to Modern Homes
            </h1>
            <p className="text-sm sm:text-base text-[#292824]/80 leading-relaxed font-normal">
              Founded in Lahore with an atelier footprint in Karachi, <strong>Decora Home</strong> was born out of an appreciation for natural textures, honest stoneware, and understated luxury.
            </p>
            <p className="text-sm text-[#292824]/70 leading-relaxed">
              We collaborate closely with generations-old pottery masters in Gujrat, marble carvers in Rawalpindi, and brass casters in Lahore. By marrying traditional craftsmanship with refined Scandinavian architectural proportions, we create decor pieces that feel grounded, tranquil, and distinctly timeless.
            </p>

            <div className="pt-2">
              <button
                onClick={onShopClick}
                className="px-6 py-3 bg-[#6B705C] hover:bg-[#565a4a] text-white rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-xs"
              >
                Browse Our Collections
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden border border-[#E8E1D8] shadow-md bg-[#FFFFFF] aspect-[4/3]">
              <img
                src={IMAGES.vases}
                alt="Artisanal ceramics hand-thrown in studio"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Studio Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-[#E8E1D8]">
          <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E8E1D8] space-y-3">
            <div className="p-2.5 rounded-lg bg-[#D8C3A5]/30 text-[#6B705C] w-fit">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#292824]">Architectural Harmony</h3>
            <p className="text-xs text-[#292824]/75 leading-relaxed">
              Every curve, fluted groove, and matte texture is designed to complement natural window illumination and warm indoor ambient glow.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E8E1D8] space-y-3">
            <div className="p-2.5 rounded-lg bg-[#D8C3A5]/30 text-[#6B705C] w-fit">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#292824]">Empowering Local Artisans</h3>
            <p className="text-xs text-[#292824]/75 leading-relaxed">
              We provide ethical livelihoods and modern design tooling to master ceramicists, stone sculptors, and wood turners across Pakistan.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E8E1D8] space-y-3">
            <div className="p-2.5 rounded-lg bg-[#D8C3A5]/30 text-[#6B705C] w-fit">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#292824]">Sustainable Materials</h3>
            <p className="text-xs text-[#292824]/75 leading-relaxed">
              From natural soy wax and lead-free stoneware glazes to reclaimed packaging paper, we tread lightly on our earth.
            </p>
          </div>
        </div>

        {/* Physical Studios in Pakistan */}
        <div className="p-8 rounded-2xl bg-[#292824] text-[#F5EFE6] space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#D8C3A5]">
              Visit or Contact
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#FFFFFF]">
              Our Studio Locations
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-[#F5EFE6]/80">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-[#D8C3A5] font-semibold text-sm">
                <MapPin className="w-4 h-4" />
                <span>Lahore Design Studio & Dispatch Atelier</span>
              </div>
              <p>Suite 4B, Mezzanine Floor, MM Alam Road, Gulberg III, Lahore, Punjab</p>
              <p className="text-[#D8C3A5]">Studio Hours: Monday – Saturday, 11:00 AM – 8:00 PM</p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-[#D8C3A5] font-semibold text-sm">
                <MapPin className="w-4 h-4" />
                <span>Karachi Client Experience Lounge</span>
              </div>
              <p>Street 14, Khayaban-e-Seher, Phase 6 DHA, Karachi, Sindh</p>
              <p className="text-[#D8C3A5]">By Appointment: Contact via WhatsApp (+92 300 8452910)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
