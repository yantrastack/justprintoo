import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart, cart } from "@/lib/cart-store";
import { formatINR } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Trash2, ShoppingBag, ArrowRight, FileText, Minus, Plus } from "lucide-react";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your cart · JustPrint.com" }] }),
  component: CartPage,
});

function CartPage() {
  const { items, total } = useCart();
  const shipping = total > 1000 || total === 0 ? 0 : 60;
  const gst = Math.round(total * 0.18);
  const grand = total + shipping + gst;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-secondary text-navy">
          <ShoppingBag className="h-7 w-7" />
        </div>
        <h1 className="mt-6 font-display text-3xl font-semibold text-navy">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">Browse the catalog and add your first print job.</p>
        <Button asChild className="mt-6 rounded-full bg-teal text-teal-foreground hover:bg-teal/90">
          <Link to="/products">Browse products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="font-display text-3xl font-semibold text-navy sm:text-4xl">Your cart</h1>
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="space-y-3">
          {items.map((it) => (
            <div key={it.id} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 rounded-2xl border bg-card p-4">
              <div className="grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-secondary text-3xl">{it.emoji}</div>
              <div className="min-w-0">
                <div className="truncate font-display text-lg font-semibold text-navy">{it.name}</div>
                <div className="truncate text-xs text-muted-foreground">{it.unitLabel}</div>
                {it.fileName && (
                  <div className="mt-1 inline-flex items-center gap-1 text-[11px] text-teal">
                    <FileText className="h-3 w-3" /> {it.fileName}
                  </div>
                )}
                <div className="mt-2 flex items-center gap-1">
                  <Button size="icon" variant="outline" className="h-7 w-7 rounded-full" onClick={() => cart.updateQty(it.id, Math.max(1, it.options.quantity - 10))}>
                    <Minus className="h-3 w-3" />
                  </Button>
                  <div className="min-w-16 text-center text-sm font-medium">{it.options.quantity}</div>
                  <Button size="icon" variant="outline" className="h-7 w-7 rounded-full" onClick={() => cart.updateQty(it.id, it.options.quantity + 10)}>
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <div className="shrink-0 text-right">
                <div className="font-display text-lg font-semibold text-navy">{formatINR(it.price)}</div>
                <button onClick={() => cart.remove(it.id)} className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive">
                  <Trash2 className="h-3 w-3" /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <div className="rounded-2xl border bg-card p-5 shadow-elegant">
            <div className="font-display text-lg font-semibold text-navy">Order summary</div>
            <div className="mt-4 space-y-2 text-sm">
              <Row k="Subtotal" v={formatINR(total)} />
              <Row k="Shipping" v={shipping === 0 ? "Free" : formatINR(shipping)} />
              <Row k="GST (18%)" v={formatINR(gst)} />
              <div className="my-3 border-t" />
              <div className="flex items-baseline justify-between">
                <span className="font-medium">Total</span>
                <span className="font-display text-2xl font-semibold text-teal">{formatINR(grand)}</span>
              </div>
            </div>
            <Button asChild size="lg" className="mt-5 w-full rounded-full bg-navy text-navy-foreground hover:bg-navy/90">
              <Link to="/checkout">Checkout <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
            <div className="mt-3 text-center text-xs text-muted-foreground">Secure payments · Free reprint on colour issues</div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between text-sm">
      <span className="text-muted-foreground">{k}</span>
      <span className="font-medium text-navy">{v}</span>
    </div>
  );
}
