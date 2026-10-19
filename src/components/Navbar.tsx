import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, Menu, X, Palette } from 'lucide-react';

interface NavbarProps {
  currentView: 'home' | 'shop' | 'about';
  onNavigate: (view: 'home' | 'shop' | 'about', categoryFilter?: string) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onOpenDesignSystem: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onOpenDesignSystem,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view: 'home' | 'shop' | 'about', category?: string) => {
    onNavigate(view, category);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F5EFE6]/95 backdrop-blur-md border-b border-[#E8E1D8] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className="text-left group cursor-pointer shrink-0"
          >
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#292824] group-hover:text-[#6B705C] transition-colors whitespace-nowrap">
              Decora Home
            </span>
          </button>

          {/* Zone 2: Clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#292824]/80">
            <button
              onClick={() => handleNavClick('home')}
              className={`hover:text-[#292824] transition-colors whitespace-nowrap cursor-pointer py-1 ${
                currentView === 'home' ? 'text-[#292824] font-semibold border-b-2 border-[#6B705C]' : ''
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('shop')}
              className={`hover:text-[#292824] transition-colors whitespace-nowrap cursor-pointer py-1 ${
                currentView === 'shop' ? 'text-[#292824] font-semibold border-b-2 border-[#6B705C]' : ''
              }`}
            >
              Shop All
            </button>
            <button
              onClick={() => handleNavClick('shop', 'Decorative Vases')}
              className="hover:text-[#292824] transition-colors whitespace-nowrap cursor-pointer py-1"
            >
              Vases & Sculptures
            </button>
            <button
              onClick={() => handleNavClick('shop', 'Decorative Lamps')}
              className="hover:text-[#292824] transition-colors whitespace-nowrap cursor-pointer py-1"
            >
              Lighting
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`hover:text-[#292824] transition-colors whitespace-nowrap cursor-pointer py-1 ${
                currentView === 'about' ? 'text-[#292824] font-semibold border-b-2 border-[#6B705C]' : ''
              }`}
            >
              About Us
            </button>
            <button
              onClick={onOpenDesignSystem}
              className="flex items-center gap-1.5 text-xs tracking-wider uppercase text-[#6B705C] font-semibold hover:text-[#292824] px-2.5 py-1 rounded bg-[#D8C3A5]/25 border border-[#D8C3A5]/50 transition-colors whitespace-nowrap cursor-pointer"
              title="View Design System & Color Palette"
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Palette & Specs</span>
            </button>
          </nav>

          {/* Zone 3: Interactive functional affordances */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Quick Search */}
            <button
              onClick={onOpenSearch}
              className="p-2.5 rounded-full text-[#292824] hover:bg-[#E8E1D8]/60 transition-colors cursor-pointer"
              aria-label="Search products"
              title="Search products"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2.5 rounded-full text-[#292824] hover:bg-[#E8E1D8]/60 transition-colors cursor-pointer"
              aria-label="View wishlist"
              title="Saved Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#6B705C] text-[#F5EFE6] text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Drawer Toggle */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#6B705C] text-[#FFFFFF] rounded-lg hover:bg-[#5a5f4d] transition-all cursor-pointer shadow-xs active:scale-95"
              aria-label="View shopping cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="text-xs sm:text-sm font-medium hidden sm:inline">Cart</span>
              <span className="bg-[#FFFFFF]/25 text-[#FFFFFF] text-xs font-semibold px-1.5 py-0.5 rounded tabular-nums">
                {cartCount}
              </span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#292824] hover:bg-[#E8E1D8]/60 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F5EFE6] border-b border-[#E8E1D8] px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          <div className="flex flex-col space-y-2 text-base font-medium text-[#292824]">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left px-3 py-2 rounded-md hover:bg-[#E8E1D8]/50"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('shop')}
              className="text-left px-3 py-2 rounded-md hover:bg-[#E8E1D8]/50"
            >
              Shop All Products
            </button>
            <button
              onClick={() => handleNavClick('shop', 'Decorative Vases')}
              className="text-left px-3 py-2 rounded-md hover:bg-[#E8E1D8]/50 text-sm pl-6 text-[#292824]/80"
            >
              · Decorative Vases
            </button>
            <button
              onClick={() => handleNavClick('shop', 'Wall Art & Wall Hangings')}
              className="text-left px-3 py-2 rounded-md hover:bg-[#E8E1D8]/50 text-sm pl-6 text-[#292824]/80"
            >
              · Wall Art & Mirrors
            </button>
            <button
              onClick={() => handleNavClick('shop', 'Decorative Lamps')}
              className="text-left px-3 py-2 rounded-md hover:bg-[#E8E1D8]/50 text-sm pl-6 text-[#292824]/80"
            >
              · Lamps & Ambient Lighting
            </button>
            <button
              onClick={() => handleNavClick('shop', 'Candles & Candle Holders')}
              className="text-left px-3 py-2 rounded-md hover:bg-[#E8E1D8]/50 text-sm pl-6 text-[#292824]/80"
            >
              · Candles & Trays
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="text-left px-3 py-2 rounded-md hover:bg-[#E8E1D8]/50"
            >
              About Our Artisans
            </button>
            <button
              onClick={() => {
                onOpenDesignSystem();
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 rounded-md text-[#6B705C] font-semibold flex items-center gap-2"
            >
              <Palette className="w-4 h-4" />
              Design System & Color Palette
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
