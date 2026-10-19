import React, { useState } from 'react';
import { CartItem, CustomerDetails, Order } from '../types.ts';
import { X, CheckCircle2, ShieldCheck, Truck, ArrowLeft, AlertCircle, ShoppingBag, Send } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderPlaced: (order: Order) => void;
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderPlaced,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 4000;
  const subtotal = items.reduce((sum, item) => sum + item.product.pricePKR * item.quantity, 0);
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 250;
  const total = subtotal + shippingFee;

  const [formData, setFormData] = useState<CustomerDetails>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: 'Lahore',
    postalCode: '',
    notes: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bank_transfer'>('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  const PAKISTAN_CITIES = [
    'Lahore',
    'Karachi',
    'Islamabad',
    'Rawalpindi',
    'Faisalabad',
    'Multan',
    'Peshawar',
    'Sialkot',
    'Gujranwala',
    'Quetta',
    'Hyderabad',
    'Bahawalpur',
    'Sargodha',
    'Other / Rural Tehsil',
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMessage('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      setErrorMessage('Please enter a valid Pakistani contact phone number (e.g. 0300 1234567).');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please enter a valid email address for order confirmation.');
      return;
    }
    if (!formData.address.trim()) {
      setErrorMessage('Please provide your complete delivery street address.');
      return;
    }

    setIsSubmitting(true);

    // Simulate reliable order dispatch & record
    setTimeout(() => {
      const orderId = `DEC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const newOrder: Order = {
        id: orderId,
        items: [...items],
        subtotal,
        deliveryFee: shippingFee,
        total,
        customer: { ...formData },
        paymentMethod,
        createdAt: new Date().toLocaleString(),
        status: 'Confirmed',
      };

      setConfirmedOrder(newOrder);
      onOrderPlaced(newOrder);
      onClearCart();
      setIsSubmitting(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#292824]/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 lg:p-6 animate-fadeIn">
      <div className="relative bg-[#FFFFFF] rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#E8E1D8]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-[#F5EFE6] hover:bg-[#E8E1D8] text-[#292824] transition-colors cursor-pointer"
          aria-label="Close checkout"
        >
          <X className="w-5 h-5" />
        </button>

        {confirmedOrder ? (
          /* Confirmation Receipt View */
          <div className="p-6 sm:p-10 space-y-6 text-center">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#6B705C]">
                Order Confirmed
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#292824]">
                Thank You, {confirmedOrder.customer.fullName}!
              </h2>
              <p className="text-sm text-[#292824]/70 max-w-md mx-auto">
                Your order <strong className="text-[#292824]">{confirmedOrder.id}</strong> has been booked and is being prepared with safe packaging by our studio artisans.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="p-5 rounded-xl bg-[#F5EFE6] border border-[#E8E1D8] text-left space-y-4 max-w-lg mx-auto text-xs">
              <div className="flex justify-between border-b border-[#E8E1D8] pb-3 font-medium">
                <div>
                  <span className="text-[#292824]/60 block">Order Number</span>
                  <span className="font-bold text-sm text-[#292824]">{confirmedOrder.id}</span>
                </div>
                <div className="text-right">
                  <span className="text-[#292824]/60 block">Payment Method</span>
                  <span className="font-bold text-[#6B705C]">
                    {confirmedOrder.paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 'Direct Bank Transfer'}
                  </span>
                </div>
              </div>

              {/* Items summary */}
              <div className="space-y-2 border-b border-[#E8E1D8] pb-3">
                <span className="font-semibold text-[#292824] block">Ordered Items ({confirmedOrder.items.length})</span>
                {confirmedOrder.items.map((i) => (
                  <div key={i.id} className="flex justify-between text-[#292824]/80">
                    <span>
                      {i.quantity}x {i.product.name} ({i.selectedColor})
                    </span>
                    <span className="font-medium tabular-nums">
                      Rs. {(i.product.pricePKR * i.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total & Delivery Address */}
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between">
                  <span>Shipping Address:</span>
                  <span className="font-medium text-right max-w-xs text-[#292824]">
                    {confirmedOrder.customer.address}, {confirmedOrder.customer.city}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Phone:</span>
                  <span className="font-medium">{confirmedOrder.customer.phone}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#292824] pt-2 border-t border-[#E8E1D8]">
                  <span>Total Payable:</span>
                  <span className="tabular-nums text-base text-[#292824]">
                    Rs. {confirmedOrder.total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href={`https://wa.me/923008452910?text=Hi%20Decora%20Home!%20I%20just%20placed%20order%20${confirmedOrder.id}%20for%20Rs.%20${confirmedOrder.total}.%20Please%20confirm%20my%20dispatch.`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-3 bg-[#25D366] text-white rounded-xl text-xs font-semibold hover:bg-[#20ba5a] transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Track on WhatsApp Helpline</span>
              </a>

              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3 bg-[#292824] text-white rounded-xl text-xs font-semibold hover:bg-[#6B705C] transition-colors cursor-pointer"
              >
                Back to Homepage
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form View */
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#6B705C]">
                Secure Step
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#292824] mt-0.5">
                Delivery Details & Checkout
              </h2>
              <p className="text-xs text-[#292824]/70 mt-1">
                Cash on delivery across all cities of Pakistan. Pay safely at your doorstep upon parcel receipt.
              </p>
            </div>

            {errorMessage && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#292824]">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g. Sarah Khan"
                    required
                    className="w-full px-3.5 py-2.5 text-xs bg-[#F5EFE6]/60 border border-[#E8E1D8] rounded-lg focus:outline-none focus:border-[#6B705C] focus:bg-[#FFFFFF]"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#292824]">
                    Mobile / WhatsApp Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. 0300 1234567"
                    required
                    className="w-full px-3.5 py-2.5 text-xs bg-[#F5EFE6]/60 border border-[#E8E1D8] rounded-lg focus:outline-none focus:border-[#6B705C] focus:bg-[#FFFFFF]"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#292824]">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. sarah@example.com"
                    required
                    className="w-full px-3.5 py-2.5 text-xs bg-[#F5EFE6]/60 border border-[#E8E1D8] rounded-lg focus:outline-none focus:border-[#6B705C] focus:bg-[#FFFFFF]"
                  />
                </div>

                {/* City Selection */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#292824]">
                    City (Pakistan) <span className="text-rose-500">*</span>
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#F5EFE6]/60 border border-[#E8E1D8] rounded-lg focus:outline-none focus:border-[#6B705C] focus:bg-[#FFFFFF]"
                  >
                    {PAKISTAN_CITIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Complete Address */}
                <div className="md:col-span-2 space-y-1">
                  <label className="text-xs font-semibold text-[#292824]">
                    Complete Street Address (House/Flat #, Street, Phase/Sector) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="House 24, Street 12, Phase 5 DHA"
                    required
                    className="w-full px-3.5 py-2.5 text-xs bg-[#F5EFE6]/60 border border-[#E8E1D8] rounded-lg focus:outline-none focus:border-[#6B705C] focus:bg-[#FFFFFF]"
                  />
                </div>

                {/* Postal Code */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#292824]">
                    Postal Code (Optional)
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    placeholder="e.g. 54000"
                    className="w-full px-3.5 py-2.5 text-xs bg-[#F5EFE6]/60 border border-[#E8E1D8] rounded-lg focus:outline-none focus:border-[#6B705C] focus:bg-[#FFFFFF]"
                  />
                </div>

                {/* Order Notes */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#292824]">
                    Special Delivery Instructions
                  </label>
                  <input
                    type="text"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="e.g. Call before delivery, handle with care"
                    className="w-full px-3.5 py-2.5 text-xs bg-[#F5EFE6]/60 border border-[#E8E1D8] rounded-lg focus:outline-none focus:border-[#6B705C] focus:bg-[#FFFFFF]"
                  />
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-2 pt-2 border-t border-[#E8E1D8]">
                <label className="text-xs font-bold uppercase tracking-wider text-[#292824] block">
                  Select Payment Option
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                      paymentMethod === 'cod'
                        ? 'border-[#6B705C] bg-[#F5EFE6]'
                        : 'border-[#E8E1D8] hover:border-[#D8C3A5]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="mt-1 accent-[#6B705C]"
                    />
                    <div>
                      <p className="font-semibold text-xs text-[#292824]">Cash on Delivery (COD)</p>
                      <p className="text-[11px] text-[#292824]/70 mt-0.5">
                        Pay cash to the courier representative when your package arrives at your home.
                      </p>
                    </div>
                  </div>

                  <div
                    onClick={() => setPaymentMethod('bank_transfer')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                      paymentMethod === 'bank_transfer'
                        ? 'border-[#6B705C] bg-[#F5EFE6]'
                        : 'border-[#E8E1D8] hover:border-[#D8C3A5]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'bank_transfer'}
                      onChange={() => setPaymentMethod('bank_transfer')}
                      className="mt-1 accent-[#6B705C]"
                    />
                    <div>
                      <p className="font-semibold text-xs text-[#292824]">Direct Bank Transfer</p>
                      <p className="text-[11px] text-[#292824]/70 mt-0.5">
                        Transfer via Meezan Bank, HBL or Raast. Account details provided on next step.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Breakdown Box */}
              <div className="p-4 rounded-xl bg-[#F5EFE6] border border-[#E8E1D8] space-y-2 text-xs">
                <div className="flex justify-between text-[#292824]">
                  <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                  <span className="font-semibold tabular-nums">Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#292824]">
                  <span>Nationwide Courier Shipping</span>
                  <span className="font-semibold tabular-nums">
                    {shippingFee === 0 ? <strong className="text-[#6B705C]">FREE</strong> : `Rs. ${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#292824] pt-2 border-t border-[#E8E1D8]">
                  <span>Total Amount (PKR)</span>
                  <span className="tabular-nums">Rs. {total.toLocaleString()}</span>
                </div>
              </div>

              {/* Submit Button */}
              <div className="space-y-2 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-4 bg-[#6B705C] hover:bg-[#565a4a] text-[#FFFFFF] rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Booking Your Order...</span>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Confirm Order (Rs. {total.toLocaleString()})</span>
                    </>
                  )}
                </button>

                <p className="text-center text-[11px] text-[#292824]/60">
                  By confirming, you agree to inspect your parcel upon delivery with our verified courier.
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
