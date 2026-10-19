import React from 'react';
import { Product } from '../types.ts';
import { Heart, Star, ShoppingBag, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
  onAddToCart: (product: Product, e?: React.MouseEvent) => void;
  onToggleWishlist: (product: Product, e?: React.MouseEvent) => void;
  isWishlisted: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenDetails,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}) => {
  const discountPercent = product.originalPricePKR
    ? Math.round(((product.originalPricePKR - product.pricePKR) / product.originalPricePKR) * 100)
    : 0;

  return (
    <div
      onClick={() => onOpenDetails(product)}
      className="group relative bg-[#FFFFFF] rounded-xl overflow-hidden border border-[#E8E1D8] hover:border-[#D8C3A5] transition-all hover:shadow-md flex flex-col cursor-pointer"
    >
      {/* Product Image Box */}
      <div className="relative aspect-[4/3] bg-[#E8E1D8]/30 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Subtle Discount / Tag (Clean text pill or subtle badge) */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
          {discountPercent > 0 && (
            <span className="bg-[#292824] text-[#F5EFE6] text-[10px] font-semibold px-2 py-0.5 rounded tracking-wide">
              SAVE {discountPercent}%
            </span>
          )}
          {product.isNew && (
            <span className="bg-[#6B705C] text-[#FFFFFF] text-[10px] font-semibold px-2 py-0.5 rounded tracking-wide">
              NEW ARRIVAL
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product, e);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full transition-all cursor-pointer ${
            isWishlisted
              ? 'bg-[#FFFFFF] text-[#6B705C] shadow-sm'
              : 'bg-[#FFFFFF]/85 text-[#292824] hover:bg-[#FFFFFF] hover:text-[#6B705C]'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          title={isWishlisted ? 'In Wishlist' : 'Save to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#6B705C]' : ''}`} />
        </button>

        {/* Quick View Hover Strip */}
        <div className="absolute inset-x-2 bottom-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails(product);
            }}
            className="flex-1 py-2 bg-[#FFFFFF]/95 hover:bg-[#FFFFFF] text-[#292824] text-xs font-medium rounded-lg shadow-sm backdrop-blur-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col justify-between grow space-y-3">
        <div>
          {/* Category & Rating (Unboxed metadata with typographic separator) */}
          <div className="flex items-center justify-between text-xs text-[#292824]/60 mb-1">
            <span className="font-medium tracking-wide uppercase text-[11px] text-[#6B705C]">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-[#292824]">
              <Star className="w-3 h-3 fill-[#D8C3A5] text-[#D8C3A5]" />
              <span className="font-semibold text-xs tabular-nums">{product.rating.toFixed(1)}</span>
              <span className="text-[11px] text-[#292824]/50 tabular-nums">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="font-serif text-base font-semibold text-[#292824] group-hover:text-[#6B705C] transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-[#292824]/70 line-clamp-2 mt-1 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Color & Size Swatches Preview */}
          <div className="flex items-center gap-1.5 mt-2.5">
            <div className="flex items-center -space-x-1">
              {product.colors.map((c) => (
                <span
                  key={c.name}
                  className="w-3.5 h-3.5 rounded-full border border-[#FFFFFF] shadow-2xs"
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
            <span className="text-[11px] text-[#292824]/50">
              · {product.sizes[0]}
            </span>
          </div>
        </div>

        {/* Footer: Price in PKR & Add to Cart button */}
        <div className="pt-3 border-t border-[#E8E1D8] flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-[#292824] tabular-nums">
                Rs. {product.pricePKR.toLocaleString()}
              </span>
              {product.originalPricePKR && (
                <span className="text-xs text-[#292824]/40 line-through tabular-nums">
                  Rs. {product.originalPricePKR.toLocaleString()}
                </span>
              )}
            </div>
            <span className="text-[10px] text-[#6B705C] font-medium block">
              {product.inStock ? `In Stock (${product.stockCount} left)` : 'Backorder'}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product, e);
            }}
            className="p-2 sm:px-3 sm:py-2 bg-[#6B705C] hover:bg-[#575b4b] text-[#FFFFFF] rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95 shrink-0"
            title="Add to cart"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
