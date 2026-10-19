import React from 'react';
import { CATEGORIES } from '../data/products.ts';
import { ArrowUpRight } from 'lucide-react';

interface CategorySectionProps {
  onSelectCategory: (categoryName: string) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({ onSelectCategory }) => {
  return (
    <section className="py-16 sm:py-20 bg-[#F5EFE6] border-b border-[#E8E1D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#6B705C]">
              Curated Collections
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#292824] mt-1">
              Shop by Category
            </h2>
            <p className="text-sm text-[#292824]/70 mt-1 max-w-lg">
              Explore 10 distinctive interior decor categories designed to elevate every tabletop, corner, and gallery wall.
            </p>
          </div>
          <button
            onClick={() => onSelectCategory('all')}
            className="text-xs font-semibold uppercase tracking-wider text-[#6B705C] hover:text-[#292824] transition-colors flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>View All Categories</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Responsive Grid for Categories */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.slug}
              onClick={() => onSelectCategory(cat.name)}
              className="group cursor-pointer bg-[#FFFFFF] rounded-xl overflow-hidden border border-[#E8E1D8] hover:border-[#D8C3A5] transition-all hover:shadow-md flex flex-col"
            >
              <div className="relative aspect-square overflow-hidden bg-[#E8E1D8]/40">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#292824]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-3.5 flex flex-col justify-between grow">
                <div>
                  <h3 className="font-medium text-sm text-[#292824] group-hover:text-[#6B705C] transition-colors line-clamp-1">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-[#292824]/60 mt-0.5 line-clamp-1">
                    {cat.description}
                  </p>
                </div>
                <div className="mt-2.5 flex items-center justify-between text-[11px] text-[#6B705C] font-medium pt-2 border-t border-[#E8E1D8]/60">
                  <span>Explore items</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
