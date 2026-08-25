import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import sbLogo from "@/assets/brand/sb-logo.png.asset.json";

export function AppFooter() {
  return (
    <footer className="mt-16 border-t bg-navy text-primary-foreground">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center overflow-hidden rounded-xl bg-white">
              <img src={sbLogo.url} alt="JustPrint SB logo" className="h-full w-full object-contain p-0.5" />
            </div>
            <div className="font-display text-lg font-semibold">JustPrint.com</div>
          </div>
          <p className="mt-3 text-sm text-white/70">
            India's most automated online printing press. Live pricing, file checks and same-day dispatch.
          </p>
        </div>

        <div>
          <div className="text-sm font-semibold text-white">Shop</div>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li><Link to="/products" className="hover:text-teal">All products</Link></li>
            <li><Link to="/products/bill-books" className="hover:text-teal">Bill books</Link></li>
            <li><Link to="/products/hospital-files" className="hover:text-teal">Hospital files</Link></li>
            <li><Link to="/products/plastic-patient-files" className="hover:text-teal">Plastic patient files</Link></li>
            <li><Link to="/products/xray-covers" className="hover:text-teal">X-ray covers</Link></li>
            <li><Link to="/products/wedding-cards" className="hover:text-teal">Wedding cards</Link></li>
            <li><Link to="/products/tshirt-printing" className="hover:text-teal">T-shirt printing</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-sm font-semibold text-white">Support</div>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li><Link to="/tracker" className="hover:text-teal">Track my order</Link></li>
            <li><Link to="/studio" className="hover:text-teal">Design studio</Link></li>
            <li><Link to="/profile" className="hover:text-teal">My profile</Link></li>
            <li>
              <a href="https://wa.me/918639736631" target="_blank" rel="noopener noreferrer" className="hover:text-teal">
                WhatsApp support
              </a>
            </li>
          </ul>
        </div>

        <div>
          <div className="text-sm font-semibold text-white">Office &amp; Press</div>
          <ul className="mt-3 space-y-3 text-sm text-white/70">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
              <span>
                JustPrint Press Pvt. Ltd.<br />
                Hunter Road, Hanamkonda,<br />
                Warangal, Telangana 506001,<br />
                India
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-teal" />
              <a href="tel:+918639736631" className="hover:text-teal">+91 86397 36631</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-teal" />
              <a href="mailto:hello@justprint.com" className="hover:text-teal">hello@justprint.com</a>
            </li>
            <li className="flex items-center gap-2">
              <Clock className="h-4 w-4 shrink-0 text-teal" />
              <span>Mon–Sat · 9:00 AM – 8:00 PM</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-4 text-xs text-white/60 sm:px-6">
          <span>© {new Date().getFullYear()} JustPrint.com — All rights reserved.</span>
          <span>Made with love in Warangal, Telangana</span>
        </div>
      </div>
    </footer>
  );
}
