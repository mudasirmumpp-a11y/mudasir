import React from 'react';
import { Award, ShieldCheck, Truck, HeadphonesIcon } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: <Award className="w-6 h-6 text-[#6B705C]" />,
      title: 'Quality Products',
      description:
        'Crafted using high-fire ceramics, solid Banswara marble, seasoned acacia wood, and unbleached Belgian linen.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#6B705C]" />,
      title: 'Secure Checkout & COD',
      description:
        'Convenient Cash on Delivery nationwide. Inspect your package before handing payment to the delivery rider.',
    },
    {
      icon: <Truck className="w-6 h-6 text-[#6B705C]" />,
      title: 'Reliable Delivery',
      description:
        'Dispatched from Lahore & Karachi studios. Triple-layered bubble wrap ensuring zero breakage during transit.',
    },
    {
      icon: <HeadphonesIcon className="w-6 h-6 text-[#6B705C]" />,
      title: 'Attentive Customer Support',
      description:
        'Dedicated WhatsApp styling assistance, order tracking, and 7-day hassle-free damage replacements.',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#FFFFFF] border-b border-[#E8E1D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#6B705C]">
            The Decora Promise
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#292824] mt-1">
            Why Choose Decora Home
          </h2>
          <p className="text-xs sm:text-sm text-[#292824]/70 mt-2">
            Every piece is curated with obsessive attention to tactile finish, structural balance, and enduring aesthetic harmony.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#F5EFE6]/60 border border-[#E8E1D8] space-y-3.5 hover:border-[#D8C3A5] transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-[#FFFFFF] border border-[#E8E1D8] flex items-center justify-center shadow-2xs">
                {feat.icon}
              </div>
              <h3 className="font-serif text-base font-bold text-[#292824]">
                {feat.title}
              </h3>
              <p className="text-xs text-[#292824]/75 leading-relaxed">
                {feat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
