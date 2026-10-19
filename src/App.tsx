import React, { useState, useEffect } from 'react';
import { Product, CartItem, Order, FilterState } from './types.ts';
import { PRODUCTS } from './data/products.ts';
import { AnnouncementBar } from './components/AnnouncementBar.tsx';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { CategorySection } from './components/CategorySection.tsx';
import { ProductCard } from './components/ProductCard.tsx';
import { ShopView } from './components/ShopView.tsx';
import { ProductDetailModal } from './components/ProductDetailModal.tsx';
import { CartDrawer } from './components/CartDrawer.tsx';
import { CheckoutModal } from './components/CheckoutModal.tsx';
import { WishlistDrawer } from './components/WishlistDrawer.tsx';
import { DesignSystemModal } from './components/DesignSystemModal.tsx';
import { QuickSearchModal } from './components/QuickSearchModal.tsx';
import { PromotionalBanner } from './components/PromotionalBanner.tsx';
import { WhyChooseUs } from './components/WhyChooseUs.tsx';
import { ReviewsSection } from './components/ReviewsSection.tsx';
import { AboutSection } from './components/AboutSection.tsx';
import { Footer } from './components/Footer.tsx';
import { ArrowUpRight, Check, ShoppingBag, Heart } from 'lucide-react';

export default function App() {
  // Navigation View State
  const [currentView, setCurrentView] = useState<'home' | 'shop' | 'about'>('home');

  // Filter State for Shop
  const initialFilterState: FilterState = {
    category: 'all',
    searchQuery: '',
    minPrice: 0,
    maxPrice: 15000,
    selectedColor: '',
    minRating: 0,
    sortBy: 'featured',
    inStockOnly: false,
  };
  const [filterState, setFilterState] = useState<FilterState>(initialFilterState);

  // Cart & Wishlist State with LocalStorage Persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('decora_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('decora_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Recent Orders State
  const [, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('decora_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals & Drawers Visibility
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDesignSystemOpen, setIsDesignSystemOpen] = useState(false);

  // Transient Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Sync state to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('decora_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('decora_wishlist', JSON.stringify(wishlistIds));
    } catch (e) {
      console.error(e);
    }
  }, [wishlistIds]);

  // Cart Handlers
  const handleAddToCart = (
    product: Product,
    selectedColor?: string,
    selectedSize?: string,
    quantity: number = 1
  ) => {
    const color = selectedColor || product.colors[0]?.name || 'Standard';
    const size = selectedSize || product.sizes[0] || 'Standard';
    const cartItemId = `${product.id}-${color}-${size}`;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          product,
          selectedColor: color,
          selectedSize: size,
          quantity,
        },
      ];
    });

    showToast(`Added "${product.name}" to your shopping bag.`);
  };

  const handleUpdateCartQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Wishlist Handlers
  const handleToggleWishlist = (product: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setWishlistIds((prev) => {
      if (prev.includes(product.id)) {
        showToast(`Removed "${product.name}" from wishlist.`);
        return prev.filter((id) => id !== product.id);
      } else {
        showToast(`Saved "${product.name}" to wishlist.`);
        return [...prev, product.id];
      }
    });
  };

  const handleRemoveFromWishlist = (productId: string) => {
    setWishlistIds((prev) => prev.filter((id) => id !== productId));
  };

  // Buy Now direct flow
  const handleBuyNow = (
    product: Product,
    color: string,
    size: string,
    quantity: number
  ) => {
    handleAddToCart(product, color, size, quantity);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  // Order Placed Handler
  const handleOrderPlaced = (newOrder: Order) => {
    setOrders((prev) => {
      const updated = [newOrder, ...prev];
      try {
        localStorage.setItem('decora_orders', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  // Filter & Navigation Handlers
  const handleNavigate = (view: 'home' | 'shop' | 'about', categoryFilter?: string) => {
    setCurrentView(view);
    if (categoryFilter) {
      setFilterState((prev) => ({
        ...prev,
        category: categoryFilter,
        searchQuery: '',
      }));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilterState((prev) => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilterState(initialFilterState);
  };

  // Filtered lists for Homepage sections
  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);
  const newArrivals = PRODUCTS.filter((p) => p.isNew || p.featured).slice(0, 4);
  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="min-h-screen bg-[#F5EFE6] text-[#292824] flex flex-col font-sans">
      {/* 1. Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Top Navigation Header (Contract: Brand, Links, Primary Action) */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenDesignSystem={() => setIsDesignSystemOpen(true)}
      />

      {/* Main View Switching */}
      <main className="flex-1">
        {currentView === 'home' && (
          <div className="space-y-0">
            {/* 3. Hero Section */}
            <Hero
              onShopClick={() => handleNavigate('shop')}
              onNewArrivalsClick={() => handleNavigate('shop', 'all')}
            />

            {/* 4. Shop by Category */}
            <CategorySection
              onSelectCategory={(category) => {
                handleNavigate('shop', category);
              }}
            />

            {/* 5. Best Sellers Section */}
            <section className="py-16 sm:py-20 bg-[#FFFFFF] border-b border-[#E8E1D8]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#6B705C]">
                      Customer Favorites
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#292824] mt-1">
                      Best Sellers
                    </h2>
                    <p className="text-sm text-[#292824]/70 mt-1 max-w-lg">
                      Our most sought-after handcrafted pieces, adored for their organic silhouettes and tactile finishes.
                    </p>
                  </div>
                  <button
                    onClick={() => handleNavigate('shop')}
                    className="text-xs font-semibold uppercase tracking-wider text-[#6B705C] hover:text-[#292824] transition-colors flex items-center gap-1 self-start sm:self-auto cursor-pointer"
                  >
                    <span>View All Best Sellers</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {bestSellers.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onOpenDetails={(p) => setSelectedProduct(p)}
                      onAddToCart={(p, e) => {
                        if (e) e.stopPropagation();
                        handleAddToCart(p);
                      }}
                      onToggleWishlist={handleToggleWishlist}
                      isWishlisted={wishlistIds.includes(product.id)}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* 6. Promotional Banner */}
            <PromotionalBanner onShopClick={() => handleNavigate('shop')} />

            {/* 7. New Arrivals Grid */}
            <section className="py-16 sm:py-20 bg-[#F5EFE6] border-b border-[#E8E1D8]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#6B705C]">
                      Fresh From The Kiln
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#292824] mt-1">
                      New Arrivals
                    </h2>
                    <p className="text-sm text-[#292824]/70 mt-1 max-w-lg">
                      Recently sculpted vessels, fluted stone trays, and atmospheric accent lamps designed for the modern home.
                    </p>
                  </div>
                  <button
                    onClick={() => handleNavigate('shop')}
                    className="text-xs font-semibold uppercase tracking-wider text-[#6B705C] hover:text-[#292824] transition-colors flex items-center gap-1 self-start sm:self-auto cursor-pointer"
                  >
                    <span>Shop All New Releases</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {newArrivals.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onOpenDetails={(p) => setSelectedProduct(p)}
                      onAddToCart={(p, e) => {
                        if (e) e.stopPropagation();
                        handleAddToCart(p);
                      }}
                      onToggleWishlist={handleToggleWishlist}
                      isWishlisted={wishlistIds.includes(product.id)}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* 8. Why Choose Us */}
            <WhyChooseUs />

            {/* 9. Customer Testimonials */}
            <ReviewsSection />
          </div>
        )}

        {currentView === 'shop' && (
          <ShopView
            products={PRODUCTS}
            filterState={filterState}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
            onOpenDetails={(p) => setSelectedProduct(p)}
            onAddToCart={(p, e) => {
              if (e) e.stopPropagation();
              handleAddToCart(p);
            }}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
          />
        )}

        {currentView === 'about' && (
          <AboutSection onShopClick={() => handleNavigate('shop')} />
        )}
      </main>

      {/* 10. Footer with Newsletter & Studio Info */}
      <Footer
        onNavigate={handleNavigate}
        onOpenDesignSystem={() => setIsDesignSystemOpen(true)}
      />

      {/* Modals & Slide-over Drawers */}

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(p, color, size, qty) => {
          handleAddToCart(p, color, size, qty);
          setIsCartOpen(true);
        }}
        onBuyNow={handleBuyNow}
        onToggleWishlist={(p) => handleToggleWishlist(p)}
        isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
        relatedProducts={
          selectedProduct
            ? PRODUCTS.filter(
                (p) => p.category === selectedProduct.category && p.id !== selectedProduct.id
              )
            : []
        }
        onSelectRelated={(p) => setSelectedProduct(p)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        onContinueShopping={() => handleNavigate('shop')}
      />

      {/* Pakistani COD Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderPlaced={handleOrderPlaced}
        onClearCart={handleClearCart}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onAddToCart={(p) => {
          handleAddToCart(p);
          handleRemoveFromWishlist(p.id);
        }}
        onOpenProduct={(p) => setSelectedProduct(p)}
      />

      {/* Quick Search Modal */}
      <QuickSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onViewAllInShop={(query) => {
          handleNavigate('shop');
          setFilterState((prev) => ({ ...prev, searchQuery: query, category: 'all' }));
        }}
      />

      {/* Coordinated Color Palette & Design System Modal */}
      <DesignSystemModal
        isOpen={isDesignSystemOpen}
        onClose={() => setIsDesignSystemOpen(false)}
      />

      {/* Transient Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#292824] text-[#FFFFFF] px-4 py-3 rounded-xl shadow-xl border border-[#D8C3A5]/40 text-xs font-medium flex items-center gap-2.5 animate-slideUp">
          <Check className="w-4 h-4 text-[#D8C3A5] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
