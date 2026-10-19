import React from 'react';
import { CartItem } from '../types.ts';
import { X, Trash2, ArrowRight, ShoppingBag, ShieldCheck, Truck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
  onContinueShopping: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onContinueShopping,
}) => {
  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 4000;
  const subtotal = items.reduce((sum, item) => sum + item.product.pricePKR * item.quantity, 0);
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingFee = items.length === 0 ? 0 : isFreeShipping ? 0 : 250;
  const total = subtotal + shippingFee;
  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#292824]/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      {/* Click outside to close */}
      <div className="flex-1" onClick={onClose} />

      {/* Drawer Container */}
      <div className="w-full max-w-md bg-[#FFFFFF] h-full shadow-2xl border-l border-[#E8E1D8] flex flex-col justify-between overflow-hidden animate-slideLeft">
        {/* Header */}
        <div className="p-5 border-b border-[#E8E1D8] flex items-center justify-between bg-[#F5EFE6]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#6B705C]" />
            <h2 className="font-serif text-lg font-bold text-[#292824]">
              Your Shopping Bag ({items.reduce((acc, i) => acc + i.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#E8E1D8] text-[#292824] transition-colors cursor-pointer"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-[#F5EFE6]/70 px-5 py-3 border-b border-[#E8E1D8] text-xs">
          <div className="flex items-center justify-between font-medium text-[#292824] mb-1.5">
            <span className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-[#6B705C]" />
              {isFreeShipping ? (
                <strong className="text-[#6B705C]">You unlocked Free Nationwide Delivery!</strong>
              ) : (
                <span>
                  Add <strong className="text-[#6B705C]">Rs. {amountNeededForFreeShipping.toLocaleString()}</strong> more for Free Delivery
                </span>
              )}
            </span>
            <span className="tabular-nums text-[#292824]/60">{freeShippingProgress}%</span>
          </div>
          <div className="w-full h-1.5 bg-[#E8E1D8] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#6B705C] transition-all duration-300 rounded-full"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#F5EFE6] flex items-center justify-center text-[#6B705C]">
                <ShoppingBag className="w-8 h-8 opacity-60" />
              </div>
              <div className="space-y-1">
                <p className="font-serif text-base font-semibold text-[#292824]">Your bag is empty</p>
                <p className="text-xs text-[#292824]/60 max-w-xs">
                  Discover timeless vases, ambient lamps, and modern decorative pieces for your home.
                </p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onContinueShopping();
                }}
                className="px-5 py-2.5 bg-[#6B705C] text-[#FFFFFF] text-xs font-semibold rounded-lg hover:bg-[#575b4b] transition-colors cursor-pointer"
              >
                Start Exploring
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-3.5 p-3 rounded-xl border border-[#E8E1D8] bg-[#FFFFFF] hover:border-[#D8C3A5] transition-all"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 rounded-lg object-cover bg-[#F5EFE6] shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-serif text-sm font-semibold text-[#292824] line-clamp-1">
                        {item.product.name}
                      </h3>
                      <p className="text-[11px] text-[#292824]/60">
                        {item.selectedColor} · {item.selectedSize}
                      </p>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-[#292824]/40 hover:text-rose-600 transition-colors p-1 cursor-pointer"
                      title="Remove item"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    {/* Quantity Stepper */}
                    <div className="flex items-center border border-[#E8E1D8] rounded-md overflow-hidden text-xs bg-[#F5EFE6]">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="px-2 py-0.5 hover:bg-[#E8E1D8] transition-colors font-bold cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="px-2.5 py-0.5 font-semibold text-[#292824] tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="px-2 py-0.5 hover:bg-[#E8E1D8] transition-colors font-bold cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-sm font-bold text-[#292824] tabular-nums">
                      Rs. {(item.product.pricePKR * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Summary */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#E8E1D8] bg-[#F5EFE6]/40 space-y-3">
            <div className="space-y-1.5 text-xs text-[#292824]">
              <div className="flex justify-between">
                <span className="text-[#292824]/70">Subtotal</span>
                <span className="font-semibold tabular-nums">Rs. {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#292824]/70">Estimated Delivery Across Pakistan</span>
                <span className="font-semibold tabular-nums">
                  {shippingFee === 0 ? (
                    <span className="text-emerald-700 font-bold uppercase text-[11px]">Free</span>
                  ) : (
                    `Rs. ${shippingFee}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#292824] pt-2 border-t border-[#E8E1D8]">
                <span>Total Amount</span>
                <span className="tabular-nums">Rs. {total.toLocaleString()}</span>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full py-3.5 px-4 bg-[#6B705C] hover:bg-[#565a4a] text-[#FFFFFF] rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-98"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  onClose();
                  onContinueShopping();
                }}
                className="w-full py-2.5 text-xs font-semibold text-[#292824]/80 hover:text-[#292824] transition-colors text-center cursor-pointer"
              >
                Continue Browsing Store
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] text-[#292824]/60 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#6B705C]" />
              <span>Cash on Delivery · Inspect Before Paying</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
