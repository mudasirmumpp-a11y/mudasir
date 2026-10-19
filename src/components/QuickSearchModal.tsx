import React, { useState } from 'react';
import { Product } from '../types.ts';
import { Search, X, ArrowRight, Star } from 'lucide-react';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onViewAllInShop: (query: string) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  onViewAllInShop,
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');

  const searchResults = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 5)
    : products.slice(0, 4);

  const POPULAR_SEARCHES = ['Ceramic Amphora', 'Textured Plaster', 'Stoneware Lamp', 'Soy Candle', 'Marble Tray'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#292824]/60 backdrop-blur-xs flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24 animate-fadeIn">
      <div
        className="relative bg-[#FFFFFF] rounded-2xl max-w-2xl w-full shadow-2xl border border-[#E8E1D8] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Bar Input */}
        <div className="p-4 sm:p-5 border-b border-[#E8E1D8] flex items-center gap-3 bg-[#F5EFE6]">
          <Search className="w-5 h-5 text-[#6B705C] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search home decor, vases, lamps, wall art..."
            className="w-full bg-transparent text-sm sm:text-base text-[#292824] placeholder-[#292824]/40 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#292824]/40 hover:text-[#292824] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[#E8E1D8] text-[#292824] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Suggested Searches Tag Bar */}
        <div className="px-5 py-3 bg-[#F5EFE6]/50 border-b border-[#E8E1D8] flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-[#292824]/60 shrink-0 font-medium">Trending:</span>
          {POPULAR_SEARCHES.map((term) => (
            <button
              key={term}
              onClick={() => setQuery(term)}
              className="px-2.5 py-1 bg-[#FFFFFF] rounded-md border border-[#E8E1D8] hover:border-[#6B705C] text-[#292824] shrink-0 cursor-pointer"
            >
              {term}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="p-4 sm:p-5 divide-y divide-[#E8E1D8] max-h-96 overflow-y-auto">
          {searchResults.length === 0 ? (
            <div className="text-center py-8 text-xs text-[#292824]/60">
              No matching pieces found for "{query}". Try another keyword or browse our curated categories.
            </div>
          ) : (
            searchResults.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onClose();
                  onSelectProduct(product);
                }}
                className="group py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-4 cursor-pointer hover:bg-[#F5EFE6]/40 px-2 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 rounded-lg object-cover bg-[#F5EFE6] shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <span className="text-[10px] font-semibold uppercase text-[#6B705C]">
                      {product.category}
                    </span>
                    <h4 className="font-serif text-xs sm:text-sm font-semibold text-[#292824] group-hover:text-[#6B705C] transition-colors line-clamp-1">
                      {product.name}
                    </h4>
                    <div className="flex items-center gap-2 text-[11px] text-[#292824]/60 mt-0.5">
                      <span className="font-bold text-[#292824] tabular-nums">
                        Rs. {product.pricePKR.toLocaleString()}
                      </span>
                      <span aria-hidden="true">·</span>
                      <div className="flex items-center gap-0.5 text-[#D8C3A5]">
                        <Star className="w-3 h-3 fill-[#D8C3A5]" />
                        <span className="text-[#292824] font-medium">{product.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-2 rounded-lg text-[#6B705C] group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {query && searchResults.length > 0 && (
          <div className="p-3 bg-[#F5EFE6] border-t border-[#E8E1D8] text-center">
            <button
              onClick={() => {
                onClose();
                onViewAllInShop(query);
              }}
              className="text-xs font-semibold text-[#6B705C] hover:text-[#292824] transition-colors cursor-pointer"
            >
              View all results in Shop ({products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase())).length})
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
