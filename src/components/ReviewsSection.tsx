import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const testimonials = [
    {
      name: 'Amina Khokhar',
      location: 'DHA Phase 6, Lahore',
      role: 'Home Stylist & Architect',
      rating: 5,
      date: 'October 2026',
      title: 'Transformed my client’s living room',
      quote:
        'The Sand Glaze Ceramic Amphora has genuine wabi-sabi weight and texture. Sourcing high-end decor locally in Pakistan used to be difficult, but Decora Home delivers boutique European quality with swift COD.',
    },
    {
      name: 'Dr. Shahmeer Khan',
      location: 'F-8/3, Islamabad',
      role: 'Interior Enthusiast',
      rating: 5,
      date: 'October 2026',
      title: 'Unbelievable packaging & safety',
      quote:
        'I was skeptical ordering heavy ceramic lamps and fluted marble trays online. The parcel arrived in custom triple bubble casing without a scratch. The ambient glow is wonderfully cozy.',
    },
    {
      name: 'Maryam & Bilal',
      location: 'Clifton Block 4, Karachi',
      role: 'Newly Married Homeowners',
      rating: 5,
      date: 'September 2026',
      title: 'The Sanctuary Gift Box is exquisite',
      quote:
        'We received the gift hamper for our housewarming and immediately ordered two more for friends. The sandalwood candle and brass snuffer look so luxurious on our console.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#F5EFE6] border-b border-[#E8E1D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#6B705C]">
              Real Customer Stories
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#292824] mt-1">
              Loved by Home Lovers Across Pakistan
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#292824]/80">
            <div className="flex text-[#D8C3A5]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#D8C3A5]" />
              ))}
            </div>
            <span className="font-bold tabular-nums">4.9 / 5</span>
            <span className="text-[#292824]/60">(Over 840 verified deliveries)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-2xl bg-[#FFFFFF] border border-[#E8E1D8] space-y-4 shadow-2xs hover:border-[#D8C3A5] transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-[#D8C3A5]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#D8C3A5]" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-[#D8C3A5]/40" />
                </div>
                <h3 className="font-serif text-base font-bold text-[#292824]">
                  "{t.title}"
                </h3>
                <p className="text-xs text-[#292824]/75 leading-relaxed">
                  {t.quote}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E8E1D8] flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-[#292824]">{t.name}</h4>
                  <p className="text-[11px] text-[#292824]/60">{t.location} · {t.role}</p>
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-semibold">
                  <CheckCircle className="w-3 h-3 text-emerald-600" />
                  Verified Buyer
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
