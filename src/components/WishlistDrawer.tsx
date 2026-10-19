import React from 'react';
import { Product } from '../types.ts';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onOpenProduct: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onAddToCart,
  onOpenProduct,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#292824]/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div className="flex-1" onClick={onClose} />

      <div className="w-full max-w-md bg-[#FFFFFF] h-full shadow-2xl border-l border-[#E8E1D8] flex flex-col justify-between overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-[#E8E1D8] flex items-center justify-between bg-[#F5EFE6]">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#6B705C] fill-[#6B705C]" />
            <h2 className="font-serif text-lg font-bold text-[#292824]">
              Saved Wishlist ({wishlistProducts.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#E8E1D8] text-[#292824] transition-colors cursor-pointer"
            aria-label="Close wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {wishlistProducts.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#F5EFE6] flex items-center justify-center text-[#6B705C]">
                <Heart className="w-8 h-8 opacity-40" />
              </div>
              <p className="font-serif text-base font-semibold text-[#292824]">No saved favorites yet</p>
              <p className="text-xs text-[#292824]/60 max-w-xs">
                Click the heart icon on any vase, lamp, or interior accent to save items for later.
              </p>
            </div>
          ) : (
            wishlistProducts.map((p) => (
              <div
                key={p.id}
                className="flex gap-3.5 p-3 rounded-xl border border-[#E8E1D8] bg-[#FFFFFF] hover:border-[#D8C3A5] transition-all"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  onClick={() => {
                    onClose();
                    onOpenProduct(p);
                  }}
                  className="w-20 h-20 rounded-lg object-cover bg-[#F5EFE6] cursor-pointer shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex items-start justify-between gap-1">
                    <div>
                      <span className="text-[10px] font-semibold uppercase text-[#6B705C]">{p.category}</span>
                      <h3
                        onClick={() => {
                          onClose();
                          onOpenProduct(p);
                        }}
                        className="font-serif text-xs sm:text-sm font-semibold text-[#292824] hover:text-[#6B705C] cursor-pointer line-clamp-1"
                      >
                        {p.name}
                      </h3>
                      <span className="text-xs font-bold text-[#292824] tabular-nums block mt-0.5">
                        Rs. {p.pricePKR.toLocaleString()}
                      </span>
                    </div>
                    <button
                      onClick={() => onRemoveFromWishlist(p.id)}
                      className="text-[#292824]/40 hover:text-rose-600 p-1 cursor-pointer"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        onAddToCart(p);
                      }}
                      className="w-full py-1.5 px-3 bg-[#6B705C] text-[#FFFFFF] rounded-lg text-xs font-medium hover:bg-[#575b4b] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Move to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {wishlistProducts.length > 0 && (
          <div className="p-4 border-t border-[#E8E1D8] bg-[#F5EFE6]/50 text-center">
            <button
              onClick={onClose}
              className="text-xs font-semibold text-[#6B705C] hover:text-[#292824] transition-colors cursor-pointer"
            >
              Continue Exploring Shop
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
