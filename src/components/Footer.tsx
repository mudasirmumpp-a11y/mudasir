import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle, Palette, Instagram, Facebook, ArrowRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: 'home' | 'shop' | 'about', categoryFilter?: string) => void;
  onOpenDesignSystem: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenDesignSystem }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <footer className="bg-[#292824] text-[#F5EFE6] pt-16 pb-12 border-t border-[#292824]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Newsletter Section */}
        <div className="p-8 sm:p-10 rounded-2xl bg-[#F5EFE6]/5 border border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1 max-w-lg">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#D8C3A5]">
              Stay Inspired
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FFFFFF]">
              Subscribe to the Decora Journal
            </h3>
            <p className="text-xs sm:text-sm text-[#F5EFE6]/70 leading-relaxed">
              Receive seasonal styling guides, private exhibition invites, and first access to limited ceramic runs.
            </p>
          </div>

          <div className="w-full lg:max-w-md">
            {subscribed ? (
              <div className="p-3.5 bg-[#6B705C]/30 border border-[#6B705C] rounded-xl text-xs text-[#D8C3A5] flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#D8C3A5] shrink-0" />
                <span>Thank you for subscribing! Your welcome decor guide is on its way.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="px-4 py-3 bg-[#FFFFFF]/10 border border-white/20 rounded-xl text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#D8C3A5] flex-1"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#6B705C] hover:bg-[#585c4c] text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
            <span className="text-[10px] text-[#F5EFE6]/50 block mt-2">
              We respect your inbox. Unsubscribe at any time with one click.
            </span>
          </div>
        </div>

        {/* 4-Column Footer Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-xs">
          {/* Brand Info */}
          <div className="space-y-4">
            <h4 className="font-serif text-2xl font-bold text-[#FFFFFF]">Decora Home</h4>
            <p className="text-[#F5EFE6]/70 leading-relaxed">
              Timeless decorative pieces, hand-thrown ceramic vessels, and ambient lighting crafted for mindful, beautiful living spaces.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#6B705C] transition-colors flex items-center justify-center text-white"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#6B705C] transition-colors flex items-center justify-center text-white"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <button
                onClick={onOpenDesignSystem}
                className="px-3 py-1.5 rounded-full bg-[#D8C3A5]/20 hover:bg-[#D8C3A5]/30 text-[#D8C3A5] text-[11px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Design System & Colour Palette"
              >
                <Palette className="w-3.5 h-3.5" />
                <span>Color Palette</span>
              </button>
            </div>
          </div>

          {/* Quick Collections */}
          <div className="space-y-3">
            <h5 className="font-semibold text-sm text-[#FFFFFF] uppercase tracking-wider">
              Collections
            </h5>
            <ul className="space-y-2 text-[#F5EFE6]/70">
              <li>
                <button
                  onClick={() => onNavigate('shop', 'Decorative Vases')}
                  className="hover:text-[#FFFFFF] transition-colors cursor-pointer"
                >
                  Decorative Vases & Vessels
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', 'Wall Art & Wall Hangings')}
                  className="hover:text-[#FFFFFF] transition-colors cursor-pointer"
                >
                  Textured Plaster Wall Art
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', 'Decorative Lamps')}
                  className="hover:text-[#FFFFFF] transition-colors cursor-pointer"
                >
                  Stoneware Ambient Lamps
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', 'Candles & Candle Holders')}
                  className="hover:text-[#FFFFFF] transition-colors cursor-pointer"
                >
                  Pure Soy Scented Candles
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', 'Decorative Trays')}
                  className="hover:text-[#FFFFFF] transition-colors cursor-pointer"
                >
                  Fluted Marble & Acacia Trays
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', 'Gift Items')}
                  className="hover:text-[#FFFFFF] transition-colors cursor-pointer"
                >
                  Curated Housewarming Gifts
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care & Policies */}
          <div className="space-y-3">
            <h5 className="font-semibold text-sm text-[#FFFFFF] uppercase tracking-wider">
              Customer Care & Policies
            </h5>
            <ul className="space-y-2 text-[#F5EFE6]/70">
              <li className="flex items-center gap-1.5">
                <span>Nationwide Delivery: 2–4 Working Days</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span>Cash on Delivery (COD) Available</span>
              </li>
              <li>
                <span>7-Day Breakage Replacement Guarantee</span>
              </li>
              <li>
                <span>Eco-Friendly Bubble Wrap Packaging</span>
              </li>
              <li>
                <span>Privacy & Data Protection</span>
              </li>
              <li>
                <button
                  onClick={onOpenDesignSystem}
                  className="text-[#D8C3A5] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Brand Design System & Tokens</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact in Pakistan */}
          <div className="space-y-3">
            <h5 className="font-semibold text-sm text-[#FFFFFF] uppercase tracking-wider">
              Contact & Studio
            </h5>
            <div className="space-y-2.5 text-[#F5EFE6]/70">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D8C3A5] shrink-0 mt-0.5" />
                <span>MM Alam Road, Gulberg III, Lahore, Pakistan</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D8C3A5] shrink-0" />
                <span>+92 300 8452910 (WhatsApp Support)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D8C3A5] shrink-0" />
                <span>concierge@decorahome.pk</span>
              </div>
              <div className="pt-2 text-[11px] text-[#D8C3A5] border-t border-white/10">
                Support Hours: Mon – Sat (10:00 AM – 8:00 PM PKT)
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Information */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F5EFE6]/60">
          <div>
            © {new Date().getFullYear()} Decora Home (Private) Limited. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-xs text-[#D8C3A5]">
            <span>Cash on Delivery (COD)</span>
            <span aria-hidden="true">·</span>
            <span>Raast Instant Pay</span>
            <span aria-hidden="true">·</span>
            <span>Bank Alfalah / Meezan Bank</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
