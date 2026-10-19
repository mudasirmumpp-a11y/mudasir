import React, { useState, useMemo } from 'react';
import { Product, FilterState } from '../types.ts';
import { ProductCard } from './ProductCard.tsx';
import { CATEGORIES } from '../data/products.ts';
import { Search, SlidersHorizontal, RotateCcw, X, Check, ArrowDownUp } from 'lucide-react';

interface ShopViewProps {
  products: Product[];
  filterState: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  onOpenDetails: (product: Product) => void;
  onAddToCart: (product: Product, e?: React.MouseEvent) => void;
  onToggleWishlist: (product: Product, e?: React.MouseEvent) => void;
  wishlistIds: string[];
}

export const ShopView: React.FC<ShopViewProps> = ({
  products,
  filterState,
  onFilterChange,
  onResetFilters,
  onOpenDetails,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
}) => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  // Available unique colors across catalog
  const AVAILABLE_COLORS = [
    { name: 'Cream / Off-White', hex: '#F5EFE6' },
    { name: 'Warm Beige / Sand', hex: '#D8C3A5' },
    { name: 'Sage Green', hex: '#6B705C' },
    { name: 'Charcoal / Black', hex: '#292824' },
    { name: 'Pure White', hex: '#FFFFFF' },
  ];

  // Filtering & Sorting Logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (filterState.category && filterState.category !== 'all' && p.category !== filterState.category) {
        return false;
      }

      // Search query
      if (filterState.searchQuery.trim()) {
        const query = filterState.searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesCat = p.category.toLowerCase().includes(query);
        const matchesDesc = p.shortDescription.toLowerCase().includes(query);
        const matchesTags = p.tags.some((t) => t.toLowerCase().includes(query));
        if (!matchesName && !matchesCat && !matchesDesc && !matchesTags) {
          return false;
        }
      }

      // Price filter
      if (p.pricePKR < filterState.minPrice || p.pricePKR > filterState.maxPrice) {
        return false;
      }

      // Color filter
      if (filterState.selectedColor) {
        const hasColor = p.colors.some((c) =>
          c.name.toLowerCase().includes(filterState.selectedColor.toLowerCase())
        );
        if (!hasColor) return false;
      }

      // Rating filter
      if (filterState.minRating > 0 && p.rating < filterState.minRating) {
        return false;
      }

      // Stock filter
      if (filterState.inStockOnly && !p.inStock) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      switch (filterState.sortBy) {
        case 'price-asc':
          return a.pricePKR - b.pricePKR;
        case 'price-desc':
          return b.pricePKR - a.pricePKR;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        case 'featured':
        default:
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      }
    });
  }, [products, filterState]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  // Check if any active filter is applied
  const hasActiveFilters =
    (filterState.category && filterState.category !== 'all') ||
    filterState.searchQuery !== '' ||
    filterState.minPrice > 0 ||
    filterState.maxPrice < 15000 ||
    filterState.selectedColor !== '' ||
    filterState.minRating > 0;

  return (
    <div className="bg-[#F5EFE6] min-h-screen py-8 sm:py-12 border-b border-[#E8E1D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb / Title Area */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-[#292824]/60 mb-1">
            <span>Decora Store</span>
            <span aria-hidden="true">·</span>
            <span className="font-semibold text-[#6B705C]">
              {filterState.category && filterState.category !== 'all' ? filterState.category : 'All Home Decor'}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#292824]">
                {filterState.category && filterState.category !== 'all' ? filterState.category : 'Home Decoration Pieces'}
              </h1>
              <p className="text-xs sm:text-sm text-[#292824]/70 mt-1 max-w-xl">
                Showing {filteredProducts.length} handcrafted decorative pieces priced in PKR with nationwide cash on delivery.
              </p>
            </div>

            {/* Mobile Filter Toggle & Sort selector */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="lg:hidden px-3.5 py-2 bg-[#FFFFFF] border border-[#E8E1D8] rounded-lg text-xs font-medium text-[#292824] flex items-center gap-2 cursor-pointer shadow-2xs"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#6B705C]" />
                <span>Filters {hasActiveFilters && '(Active)'}</span>
              </button>

              <div className="flex items-center gap-2 bg-[#FFFFFF] border border-[#E8E1D8] px-3 py-1.5 rounded-lg text-xs">
                <ArrowDownUp className="w-3.5 h-3.5 text-[#6B705C]" />
                <span className="text-[#292824]/60 hidden sm:inline">Sort by:</span>
                <select
                  value={filterState.sortBy}
                  onChange={(e) => onFilterChange({ sortBy: e.target.value as FilterState['sortBy'] })}
                  className="bg-transparent font-medium text-[#292824] focus:outline-none cursor-pointer"
                >
                  <option value="featured">Curated & Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest Arrivals</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Category Pill / Tab Navigation (Single line horizontal scroll) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          <button
            onClick={() => onFilterChange({ category: 'all' })}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              !filterState.category || filterState.category === 'all'
                ? 'bg-[#292824] text-[#FFFFFF]'
                : 'bg-[#FFFFFF] text-[#292824] border border-[#E8E1D8] hover:border-[#6B705C]'
            }`}
          >
            All Pieces ({products.length})
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => onFilterChange({ category: cat.name })}
              className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                filterState.category === cat.name
                  ? 'bg-[#6B705C] text-[#FFFFFF]'
                  : 'bg-[#FFFFFF] text-[#292824] border border-[#E8E1D8] hover:border-[#6B705C]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-6 p-3 bg-[#FFFFFF] rounded-xl border border-[#E8E1D8] text-xs">
            <span className="font-semibold text-[#292824]/70">Active Filters:</span>
            {filterState.category && filterState.category !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#F5EFE6] border border-[#E8E1D8] rounded-md text-[#292824]">
                Category: {filterState.category}
                <button
                  onClick={() => onFilterChange({ category: 'all' })}
                  className="hover:text-rose-600 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filterState.searchQuery && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#F5EFE6] border border-[#E8E1D8] rounded-md text-[#292824]">
                Search: "{filterState.searchQuery}"
                <button
                  onClick={() => onFilterChange({ searchQuery: '' })}
                  className="hover:text-rose-600 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filterState.selectedColor && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#F5EFE6] border border-[#E8E1D8] rounded-md text-[#292824]">
                Shade: {filterState.selectedColor}
                <button
                  onClick={() => onFilterChange({ selectedColor: '' })}
                  className="hover:text-rose-600 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filterState.maxPrice < 15000 && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#F5EFE6] border border-[#E8E1D8] rounded-md text-[#292824]">
                Up to Rs. {filterState.maxPrice.toLocaleString()}
                <button
                  onClick={() => onFilterChange({ maxPrice: 15000 })}
                  className="hover:text-rose-600 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filterState.minRating > 0 && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#F5EFE6] border border-[#E8E1D8] rounded-md text-[#292824]">
                {filterState.minRating}+ Stars
                <button
                  onClick={() => onFilterChange({ minRating: 0 })}
                  className="hover:text-rose-600 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            <button
              onClick={onResetFilters}
              className="ml-auto text-xs font-semibold text-[#6B705C] hover:text-[#292824] flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset All</span>
            </button>
          </div>
        )}

        {/* Main Content Layout: Sidebar Filters + Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Desktop Sidebar Filters */}
          <aside className={`lg:col-span-3 ${showMobileFilters ? 'block' : 'hidden lg:block'} space-y-6`}>
            <div className="bg-[#FFFFFF] rounded-2xl p-5 border border-[#E8E1D8] space-y-6 sticky top-28 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#E8E1D8] pb-3">
                <span className="font-serif font-bold text-sm text-[#292824] flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#6B705C]" />
                  Refine Collection
                </span>
                {hasActiveFilters && (
                  <button
                    onClick={onResetFilters}
                    className="text-[11px] font-semibold text-[#6B705C] hover:underline cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Search Within Shop */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#292824] uppercase tracking-wider">
                  Keywords
                </label>
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-[#292824]/40" />
                  <input
                    type="text"
                    value={filterState.searchQuery}
                    onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
                    placeholder="Search vases, lamps..."
                    className="w-full pl-9 pr-3 py-2 text-xs bg-[#F5EFE6] border border-[#E8E1D8] rounded-lg focus:outline-none focus:border-[#6B705C]"
                  />
                  {filterState.searchQuery && (
                    <button
                      onClick={() => onFilterChange({ searchQuery: '' })}
                      className="absolute right-2.5 top-2.5 text-[#292824]/40 hover:text-[#292824]"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Price Range Slider */}
              <div className="space-y-2.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-[#292824] uppercase tracking-wider">Max Price</span>
                  <span className="font-bold text-[#6B705C] tabular-nums">
                    Rs. {filterState.maxPrice.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="15000"
                  step="500"
                  value={filterState.maxPrice}
                  onChange={(e) => onFilterChange({ maxPrice: Number(e.target.value) })}
                  className="w-full accent-[#6B705C] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#292824]/50 tabular-nums">
                  <span>Rs. 2,000</span>
                  <span>Rs. 8,000</span>
                  <span>Rs. 15,000</span>
                </div>
              </div>

              {/* Color Swatch Filter */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-[#292824] uppercase tracking-wider block">
                  Color / Shade
                </span>
                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_COLORS.map((c) => (
                    <button
                      key={c.name}
                      onClick={() =>
                        onFilterChange({
                          selectedColor: filterState.selectedColor === c.name ? '' : c.name,
                        })
                      }
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] border transition-colors cursor-pointer ${
                        filterState.selectedColor === c.name
                          ? 'border-[#6B705C] bg-[#6B705C]/10 font-semibold text-[#6B705C]'
                          : 'border-[#E8E1D8] hover:border-[#D8C3A5] text-[#292824]'
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.name.split('/')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Customer Rating Filter */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-[#292824] uppercase tracking-wider block">
                  Customer Rating
                </span>
                <div className="space-y-1">
                  {[
                    { label: 'All Ratings', value: 0 },
                    { label: '4.8 Stars & Above', value: 4.8 },
                    { label: '4.5 Stars & Above', value: 4.5 },
                  ].map((r) => (
                    <button
                      key={r.value}
                      onClick={() => onFilterChange({ minRating: r.value })}
                      className={`w-full text-left px-2.5 py-1.5 text-xs rounded-md transition-colors flex items-center justify-between cursor-pointer ${
                        filterState.minRating === r.value
                          ? 'bg-[#F5EFE6] font-semibold text-[#6B705C]'
                          : 'text-[#292824]/70 hover:bg-[#F5EFE6]'
                      }`}
                    >
                      <span>{r.label}</span>
                      {filterState.minRating === r.value && <Check className="w-3.5 h-3.5 text-[#6B705C]" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* In-Stock Only Toggle */}
              <div className="pt-2 border-t border-[#E8E1D8] flex items-center justify-between text-xs">
                <span className="font-semibold text-[#292824]">In Stock Pieces Only</span>
                <input
                  type="checkbox"
                  checked={filterState.inStockOnly}
                  onChange={(e) => onFilterChange({ inStockOnly: e.target.checked })}
                  className="accent-[#6B705C] w-4 h-4 rounded cursor-pointer"
                />
              </div>
            </div>
          </aside>

          {/* Product Cards Grid Area */}
          <main className="lg:col-span-9 space-y-8">
            {displayedProducts.length === 0 ? (
              <div className="p-12 text-center bg-[#FFFFFF] rounded-2xl border border-[#E8E1D8] space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#F5EFE6] flex items-center justify-center mx-auto text-[#6B705C]">
                  <Search className="w-8 h-8 opacity-40" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-xl font-bold text-[#292824]">
                    No decorative pieces match your criteria
                  </h3>
                  <p className="text-xs text-[#292824]/60 max-w-sm mx-auto">
                    Try broadening your price limit, clearing search keywords, or selecting another category.
                  </p>
                </div>
                <button
                  onClick={onResetFilters}
                  className="px-5 py-2.5 bg-[#6B705C] text-[#FFFFFF] text-xs font-semibold rounded-lg hover:bg-[#575b4b] transition-colors cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
                  {displayedProducts.map((p) => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      onOpenDetails={onOpenDetails}
                      onAddToCart={onAddToCart}
                      onToggleWishlist={onToggleWishlist}
                      isWishlisted={wishlistIds.includes(p.id)}
                    />
                  ))}
                </div>

                {/* Load More Pagination */}
                {visibleCount < filteredProducts.length && (
                  <div className="text-center pt-6">
                    <button
                      onClick={() => setVisibleCount((prev) => prev + 6)}
                      className="px-8 py-3 bg-[#FFFFFF] border border-[#292824]/20 hover:border-[#292824] text-[#292824] rounded-xl text-xs font-semibold transition-all shadow-xs cursor-pointer"
                    >
                      Load More Decor Pieces ({filteredProducts.length - visibleCount} remaining)
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
