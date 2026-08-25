import { Link, useNavigate } from "@tanstack/react-router";
import { Search, ShoppingCart, Bell } from "lucide-react";
import { useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/cart-store";
import { PRODUCTS } from "@/lib/products";

export function AppHeader() {
  const { count } = useCart();
  const [q, setQ] = useState("");
  const nav = useNavigate();

  const matches = q.trim()
    ? PRODUCTS.filter((p) => p.name.toLowerCase().includes(q.toLowerCase())).slice(0, 5)
    : [];

  return (
    <header className="sticky top-0 z-30 border-b bg-background/85 backdrop-blur">
      <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-3 py-3 sm:gap-4 sm:px-5">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="text-foreground" />
        </div>

        <div className="relative min-w-0">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search bill books, wedding cards, t-shirts…"
            className="h-10 rounded-full border-transparent bg-muted pl-10 pr-4 focus-visible:ring-teal"
          />
          {matches.length > 0 && (
            <div className="absolute left-0 right-0 top-12 z-40 overflow-hidden rounded-2xl border bg-popover shadow-elegant">
              {matches.map((m) => (
                <button
                  key={m.slug}
                  onClick={() => {
                    setQ("");
                    nav({ to: "/products/$slug", params: { slug: m.slug } });
                  }}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm hover:bg-muted"
                >
                  <span className="text-xl">{m.emoji}</span>
                  <span className="flex-1">
                    <span className="block font-medium">{m.name}</span>
                    <span className="block text-xs text-muted-foreground">{m.tagline}</span>
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <Button variant="ghost" size="icon" className="hidden rounded-full sm:inline-flex">
            <Bell className="h-4 w-4" />
          </Button>
          <Button asChild variant="ghost" className="relative h-10 gap-2 rounded-full px-3">
            <Link to="/cart">
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">Cart</span>
              {count > 0 && (
                <Badge className="ml-1 h-5 min-w-5 rounded-full bg-teal px-1.5 text-[11px] text-teal-foreground shadow-teal">
                  {count}
                </Badge>
              )}
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
