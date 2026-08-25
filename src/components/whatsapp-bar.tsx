import { MessageCircle, Phone } from "lucide-react";

const WA_NUMBER = "918639736631";
const WA_MSG = encodeURIComponent(
  "Hi JustPrint.com team! I'd like a quick quote for a printing order."
);
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MSG}`;

export function WhatsAppTopBar() {
  return (
    <div className="bg-navy text-primary-foreground">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-1.5 text-xs sm:px-6">
        <span className="hidden sm:inline text-white/80">
          Free shipping on orders above ₹999 · Same-day dispatch on rush orders
        </span>
        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-teal/20 px-3 py-1 font-medium text-teal transition hover:bg-teal/30"
        >
          <MessageCircle className="h-3.5 w-3.5" />
          WhatsApp us: +91 86397 36631
        </a>
      </div>
    </div>
  );
}

export function WhatsAppFloat() {
  return (
    <a
      href={WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-elegant transition hover:scale-105 hover:bg-[#1ebe57]"
    >
      <Phone className="h-4 w-4" />
      <span className="hidden sm:inline">Chat on WhatsApp</span>
    </a>
  );
}
