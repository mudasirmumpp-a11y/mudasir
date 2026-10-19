import React from 'react';
import { Truck, ShieldCheck, Sparkles } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-[#292824] text-[#F5EFE6] text-xs py-2 px-4 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden sm:flex items-center gap-2 text-[#D8C3A5]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>New Autumn/Winter Decor Collection Now Live</span>
        </div>

        <div className="mx-auto sm:mx-0 flex items-center gap-4 text-center">
          <span className="flex items-center gap-1.5 font-medium">
            <Truck className="w-3.5 h-3.5 text-[#D8C3A5]" />
            Free Nationwide Delivery on orders over Rs. 4,000
          </span>
          <span className="hidden md:inline text-[#D8C3A5]/60" aria-hidden="true">·</span>
          <span className="hidden md:flex items-center gap-1.5 text-[#F5EFE6]/90">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D8C3A5]" />
            Cash on Delivery (COD) Available
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-3 text-[#D8C3A5]">
          <span>Helpline: +92 300 8452910</span>
        </div>
      </div>
    </div>
  );
};
