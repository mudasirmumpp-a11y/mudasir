import React, { useState } from 'react';
import { Product, ProductReview } from '../types.ts';
import { X, Heart, Star, ShoppingBag, Truck, ShieldCheck, Check, Sparkles, MessageSquare } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, color: string, size: string, quantity: number) => void;
  onBuyNow: (product: Product, color: string, size: string, quantity: number) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  relatedProducts: Product[];
  onSelectRelated: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  isWishlisted,
  relatedProducts,
  onSelectRelated,
}) => {
  if (!product) return null;

  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'Standard');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'reviews'>('details');

  // Review state simulation
  const [reviewsList, setReviewsList] = useState<ProductReview[]>(product.reviews || [
    {
      id: 'rev-default',
      author: 'Fatima Zafar',
      city: 'Lahore (Gulberg)',
      rating: 5,
      date: 'Recent Purchase',
      title: 'Remarkable finish and texture',
      comment: 'Arrived packaged in thick bubble wrap without a single flaw. The color harmonizes effortlessly with our living room.',
      verifiedPurchase: true,
    }
  ]);
  const [reviewName, setReviewName] = useState('');
  const [reviewCity, setReviewCity] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [showReviewSuccess, setShowReviewSuccess] = useState(false);

  const discountPercent = product.originalPricePKR
    ? Math.round(((product.originalPricePKR - product.pricePKR) / product.originalPricePKR) * 100)
    : 0;

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewText.trim()) return;

    const newRev: ProductReview = {
      id: `rev-${Date.now()}`,
      author: reviewName,
      city: reviewCity || 'Pakistan',
      rating: reviewRating,
      date: 'Just now',
      title: 'Customer Experience',
      comment: reviewText,
      verifiedPurchase: true,
    };
    setReviewsList([newRev, ...reviewsList]);
    setReviewName('');
    setReviewCity('');
    setReviewText('');
    setShowReviewSuccess(true);
    setTimeout(() => setShowReviewSuccess(false), 3000);
  };

  const imagesList = [product.image, ...(product.secondaryImages || [])];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#292824]/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 lg:p-6 animate-fadeIn">
      {/* Modal Dialog Container */}
      <div
        className="relative bg-[#FFFFFF] rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#E8E1D8] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-[#FFFFFF]/90 hover:bg-[#F5EFE6] text-[#292824] transition-colors border border-[#E8E1D8] shadow-xs cursor-pointer"
          aria-label="Close product details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Purchase Module Split */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 p-5 sm:p-8">
          {/* Left Column: Gallery & Thumbnails */}
          <div className="md:col-span-6 space-y-4">
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#F5EFE6] border border-[#E8E1D8] relative">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {discountPercent > 0 && (
                <span className="absolute top-3 left-3 bg-[#292824] text-[#F5EFE6] text-xs font-semibold px-2.5 py-1 rounded">
                  Save {discountPercent}%
                </span>
              )}
            </div>

            {/* Thumbnail Selector */}
            {imagesList.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {imagesList.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      activeImage === img ? 'border-[#6B705C] shadow-xs' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}

            {/* Guarantee Box */}
            <div className="p-3.5 rounded-xl bg-[#F5EFE6]/80 border border-[#E8E1D8] space-y-2 text-xs text-[#292824]">
              <div className="flex items-center gap-2 text-[#6B705C] font-semibold">
                <Truck className="w-4 h-4" />
                <span>Nationwide Shipping & Cash on Delivery</span>
              </div>
              <p className="text-[#292824]/70">
                Dispatched within 24 hours. Delivery in 2–4 business days across Pakistan via verified courier with safe doorstep parcel inspection.
              </p>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="md:col-span-6 flex flex-col justify-between space-y-5">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs text-[#292824]/60">
                <span className="font-semibold uppercase tracking-wider text-[#6B705C]">
                  {product.category}
                </span>
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center text-[#D8C3A5]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(product.rating) ? 'fill-[#D8C3A5] text-[#D8C3A5]' : 'text-[#E8E1D8]'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-bold text-xs text-[#292824] tabular-nums">{product.rating.toFixed(1)}</span>
                  <span className="text-[#292824]/50">({reviewsList.length} verified reviews)</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#292824] mt-2 leading-tight">
                {product.name}
              </h2>

              {/* Pricing in PKR */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-bold text-[#292824] tabular-nums">
                  Rs. {product.pricePKR.toLocaleString()}
                </span>
                {product.originalPricePKR && (
                  <span className="text-base text-[#292824]/40 line-through tabular-nums">
                    Rs. {product.originalPricePKR.toLocaleString()}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="text-xs font-semibold text-[#6B705C] bg-[#6B705C]/10 px-2 py-0.5 rounded">
                    You save Rs. {(product.originalPricePKR! - product.pricePKR).toLocaleString()}
                  </span>
                )}
              </div>

              {/* Stock status indicator */}
              <div className="mt-2 text-xs flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                <span className="font-medium text-emerald-800">
                  {product.inStock ? `In Stock (${product.stockCount} pieces available in studio)` : 'Sold Out'}
                </span>
              </div>

              {/* Color Selector */}
              {product.colors.length > 0 && (
                <div className="mt-5 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-[#292824]">
                      Selected Shade: <strong className="font-semibold text-[#6B705C]">{selectedColor}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`group relative flex items-center gap-2 p-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                          selectedColor === c.name
                            ? 'border-[#6B705C] bg-[#F5EFE6]'
                            : 'border-[#E8E1D8] hover:border-[#D8C3A5]'
                        }`}
                      >
                        <span
                          className="w-4 h-4 rounded-full border border-black/10 shrink-0"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span className="text-[11px] text-[#292824]">{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {product.sizes.length > 0 && (
                <div className="mt-4 space-y-2">
                  <span className="text-xs font-medium text-[#292824] block">Select Size / Variant:</span>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                          selectedSize === s
                            ? 'bg-[#292824] text-[#FFFFFF] border-[#292824]'
                            : 'bg-[#FFFFFF] text-[#292824] border-[#E8E1D8] hover:border-[#292824]'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper */}
              <div className="mt-5 flex items-center gap-4">
                <span className="text-xs font-medium text-[#292824]">Quantity:</span>
                <div className="flex items-center border border-[#E8E1D8] rounded-lg overflow-hidden bg-[#F5EFE6]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-sm font-semibold hover:bg-[#E8E1D8] transition-colors cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-sm font-semibold text-[#292824] tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                    className="px-3 py-1.5 text-sm font-semibold hover:bg-[#E8E1D8] transition-colors cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-[#292824]/60">
                  Subtotal: <strong className="text-[#292824] tabular-nums">Rs. {(product.pricePKR * quantity).toLocaleString()}</strong>
                </span>
              </div>
            </div>

            {/* Action Buttons: Add to Cart & Buy Now */}
            <div className="space-y-2.5 pt-4 border-t border-[#E8E1D8]">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onAddToCart(product, selectedColor, selectedSize, quantity)}
                  className="flex-1 py-3.5 px-4 bg-[#6B705C] hover:bg-[#565a4a] text-[#FFFFFF] rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-98"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart (Rs. {(product.pricePKR * quantity).toLocaleString()})</span>
                </button>

                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`p-3.5 rounded-xl border transition-colors cursor-pointer ${
                    isWishlisted
                      ? 'border-[#6B705C] bg-[#6B705C]/10 text-[#6B705C]'
                      : 'border-[#E8E1D8] hover:border-[#6B705C] text-[#292824]'
                  }`}
                  aria-label="Toggle wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-[#6B705C]' : ''}`} />
                </button>
              </div>

              <button
                onClick={() => onBuyNow(product, selectedColor, selectedSize, quantity)}
                className="w-full py-3 px-4 bg-[#292824] hover:bg-[#1a1917] text-[#FFFFFF] rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span>Buy Now with Cash on Delivery</span>
              </button>
            </div>
          </div>
        </div>

        {/* Secondary Accordion / Tabs: Description, Specs, Reviews */}
        <div className="border-t border-[#E8E1D8] bg-[#F5EFE6]/40 p-5 sm:p-8 space-y-6">
          <div className="flex items-center gap-2 border-b border-[#E8E1D8] pb-3">
            <button
              onClick={() => setActiveTab('details')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'details' ? 'bg-[#FFFFFF] text-[#292824] shadow-xs' : 'text-[#292824]/60 hover:text-[#292824]'
              }`}
            >
              Story & Craftsmanship
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'specs' ? 'bg-[#FFFFFF] text-[#292824] shadow-xs' : 'text-[#292824]/60 hover:text-[#292824]'
              }`}
            >
              Specifications & Care
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'reviews' ? 'bg-[#FFFFFF] text-[#292824] shadow-xs' : 'text-[#292824]/60 hover:text-[#292824]'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Reviews ({reviewsList.length})</span>
            </button>
          </div>

          {/* Details Tab */}
          {activeTab === 'details' && (
            <div className="space-y-3 text-sm text-[#292824]/80 leading-relaxed">
              <p>{product.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                <div className="p-3 bg-[#FFFFFF] rounded-lg border border-[#E8E1D8] flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#6B705C] shrink-0" />
                  <span className="text-xs text-[#292824]">Breakage Insurance Included</span>
                </div>
                <div className="p-3 bg-[#FFFFFF] rounded-lg border border-[#E8E1D8] flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#6B705C] shrink-0" />
                  <span className="text-xs text-[#292824]">Artisanal Hand-crafted Finish</span>
                </div>
              </div>
            </div>
          )}

          {/* Specifications Tab */}
          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-[#FFFFFF] rounded-lg border border-[#E8E1D8] space-y-1">
                <span className="text-[#292824]/50 uppercase font-semibold">Material</span>
                <p className="font-medium text-[#292824]">{product.specifications.material}</p>
              </div>
              <div className="p-3 bg-[#FFFFFF] rounded-lg border border-[#E8E1D8] space-y-1">
                <span className="text-[#292824]/50 uppercase font-semibold">Dimensions</span>
                <p className="font-medium text-[#292824]">{product.specifications.dimensions}</p>
              </div>
              <div className="p-3 bg-[#FFFFFF] rounded-lg border border-[#E8E1D8] space-y-1">
                <span className="text-[#292824]/50 uppercase font-semibold">Weight</span>
                <p className="font-medium text-[#292824]">{product.specifications.weight}</p>
              </div>
              <div className="p-3 bg-[#FFFFFF] rounded-lg border border-[#E8E1D8] space-y-1">
                <span className="text-[#292824]/50 uppercase font-semibold">Origin & Studio</span>
                <p className="font-medium text-[#292824]">{product.specifications.origin}</p>
              </div>
              <div className="sm:col-span-2 p-3 bg-[#FFFFFF] rounded-lg border border-[#E8E1D8] space-y-1">
                <span className="text-[#292824]/50 uppercase font-semibold">Care & Maintenance</span>
                <p className="font-medium text-[#292824]">{product.specifications.care}</p>
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              {/* Reviews List */}
              <div className="space-y-3">
                {reviewsList.map((rev) => (
                  <div key={rev.id} className="p-4 bg-[#FFFFFF] rounded-xl border border-[#E8E1D8] space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[#292824]">{rev.author}</span>
                        <span className="text-[#292824]/50">· {rev.city}</span>
                        {rev.verifiedPurchase && (
                          <span className="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded font-medium flex items-center gap-1">
                            <Check className="w-2.5 h-2.5" /> Verified Order
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-[#D8C3A5]">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${i < rev.rating ? 'fill-[#D8C3A5] text-[#D8C3A5]' : 'text-slate-200'}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-[#292824]/80 leading-relaxed">{rev.comment}</p>
                    <span className="text-[10px] text-[#292824]/40 block">{rev.date}</span>
                  </div>
                ))}
              </div>

              {/* Add a Review Form */}
              <div className="p-4 bg-[#FFFFFF] rounded-xl border border-[#E8E1D8] space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#292824]">
                  Write a Verified Review
                </h4>
                {showReviewSuccess && (
                  <div className="p-2.5 bg-emerald-50 text-emerald-800 text-xs rounded-lg flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Thank you! Your review has been recorded.</span>
                  </div>
                )}
                <form onSubmit={handleAddReview} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Your Full Name"
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                      required
                      className="px-3 py-2 text-xs bg-[#F5EFE6] border border-[#E8E1D8] rounded-lg focus:outline-none focus:border-[#6B705C]"
                    />
                    <input
                      type="text"
                      placeholder="Your City (e.g., Lahore, Karachi)"
                      value={reviewCity}
                      onChange={(e) => setReviewCity(e.target.value)}
                      className="px-3 py-2 text-xs bg-[#F5EFE6] border border-[#E8E1D8] rounded-lg focus:outline-none focus:border-[#6B705C]"
                    />
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-[#292824]/70">Rating:</span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewRating(star)}
                          className="cursor-pointer"
                        >
                          <Star
                            className={`w-4 h-4 ${
                              star <= reviewRating ? 'fill-[#D8C3A5] text-[#D8C3A5]' : 'text-slate-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <textarea
                    rows={2}
                    placeholder="Share your thoughts on the craftsmanship, delivery, or styling..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs bg-[#F5EFE6] border border-[#E8E1D8] rounded-lg focus:outline-none focus:border-[#6B705C]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#6B705C] text-[#FFFFFF] text-xs font-semibold rounded-lg hover:bg-[#575b4b] transition-colors cursor-pointer"
                  >
                    Submit Review
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Related Products Carousel / List */}
          {relatedProducts.length > 0 && (
            <div className="pt-4 border-t border-[#E8E1D8]">
              <h3 className="font-serif text-base font-bold text-[#292824] mb-3">
                Pair With Related Accents
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {relatedProducts.slice(0, 3).map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectRelated(rel)}
                    className="group cursor-pointer p-2 rounded-xl bg-[#FFFFFF] border border-[#E8E1D8] hover:border-[#D8C3A5] transition-all flex items-center gap-2.5"
                  >
                    <img
                      src={rel.image}
                      alt={rel.name}
                      className="w-12 h-12 rounded-lg object-cover shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="overflow-hidden">
                      <h4 className="text-xs font-medium text-[#292824] group-hover:text-[#6B705C] truncate">
                        {rel.name}
                      </h4>
                      <span className="text-[11px] font-bold text-[#292824] tabular-nums block">
                        Rs. {rel.pricePKR.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
