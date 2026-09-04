import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useCart, cart } from "@/lib/cart-store";
import { formatINR } from "@/lib/products";
import { orders, newOrderId } from "@/lib/orders";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Truck, CreditCard, QrCode, ShieldCheck, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — JustPrint" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: CheckoutPage,
});

const steps = ["Shipping", "Method", "Payment", "Confirm"] as const;

function CheckoutPage() {
  const { items, total } = useCart();
  const [step, setStep] = useState(0);
  const [address, setAddress] = useState({ name: "", line1: "", city: "", pincode: "", phone: "" });
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [payMethod, setPayMethod] = useState<"card" | "qr">("card");
  const [orderId, setOrderId] = useState<string>();
  const nav = useNavigate();

  const shipping = shippingMethod === "express" ? 149 : total > 1000 ? 0 : 60;
  const gst = Math.round(total * 0.18);
  const grand = total + shipping + gst;

  const placeOrder = () => {
    const id = newOrderId();
    orders.add({
      id,
      items,
      total: grand,
      address,
      shippingMethod: shippingMethod === "express" ? "Express Courier" : "Standard",
      createdAt: Date.now(),
      currentStage: "placed",
    });
    cart.clear();
    setOrderId(id);
    setStep(3);
    toast.success("Order placed", { description: id });
  };

  if (items.length === 0 && !orderId) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="font-display text-2xl font-semibold text-navy">Your cart is empty</h1>
        <Button asChild className="mt-4 rounded-full"><Link to="/products">Browse products</Link></Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <h1 className="font-display text-3xl font-semibold text-navy sm:text-4xl">Checkout</h1>

      {/* Stepper */}
      <ol className="mt-6 grid grid-cols-4 gap-2">
        {steps.map((s, i) => (
          <li key={s} className={cn(
            "flex items-center gap-2 rounded-full border px-3 py-2 text-xs sm:text-sm",
            i === step ? "border-teal bg-teal/10 text-teal" :
            i < step ? "border-navy/20 bg-navy/5 text-navy" :
            "border-border text-muted-foreground",
          )}>
            <span className={cn(
              "grid h-6 w-6 shrink-0 place-items-center rounded-full text-[11px] font-semibold",
              i < step ? "bg-navy text-navy-foreground" :
              i === step ? "bg-teal text-teal-foreground" :
              "bg-muted text-muted-foreground",
            )}>{i < step ? "✓" : i + 1}</span>
            <span className="truncate">{s}</span>
          </li>
        ))}
      </ol>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="rounded-3xl border bg-card p-5 sm:p-7">
          {step === 0 && (
            <div>
              <div className="font-display text-xl font-semibold text-navy">Shipping address</div>
              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Full name"><Input value={address.name} onChange={(e) => setAddress({ ...address, name: e.target.value })} /></Field>
                <Field label="Phone"><Input value={address.phone} onChange={(e) => setAddress({ ...address, phone: e.target.value })} /></Field>
                <Field label="Address" className="sm:col-span-2"><Input value={address.line1} onChange={(e) => setAddress({ ...address, line1: e.target.value })} /></Field>
                <Field label="City"><Input value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} /></Field>
                <Field label="Pincode"><Input value={address.pincode} onChange={(e) => setAddress({ ...address, pincode: e.target.value })} /></Field>
              </div>
              <Button className="mt-6 rounded-full bg-navy text-navy-foreground hover:bg-navy/90" onClick={() => setStep(1)} disabled={!address.name || !address.line1 || !address.pincode}>
                Continue
              </Button>
            </div>
          )}

          {step === 1 && (
            <div>
              <div className="font-display text-xl font-semibold text-navy">Shipping method</div>
              <div className="mt-5 grid gap-3">
                {[
                  { id: "standard", label: "Standard Delivery", days: "5-7 business days", price: total > 1000 ? "Free" : "₹60", icon: Package },
                  { id: "express", label: "Express Courier", days: "2-3 business days", price: "₹149", icon: Truck },
                ].map((m) => (
                  <label key={m.id} className={cn(
                    "flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition",
                    shippingMethod === m.id ? "border-teal bg-teal/5 shadow-teal" : "hover:border-teal/40",
                  )}>
                    <input type="radio" name="ship" className="sr-only" checked={shippingMethod === m.id} onChange={() => setShippingMethod(m.id)} />
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-navy"><m.icon className="h-5 w-5" /></div>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-navy">{m.label}</div>
                      <div className="text-xs text-muted-foreground">{m.days}</div>
                    </div>
                    <div className="font-display text-lg font-semibold text-navy">{m.price}</div>
                  </label>
                ))}
              </div>
              <div className="mt-6 flex gap-2">
                <Button variant="outline" className="rounded-full" onClick={() => setStep(0)}>Back</Button>
                <Button className="rounded-full bg-navy text-navy-foreground hover:bg-navy/90" onClick={() => setStep(2)}>Continue</Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="font-display text-xl font-semibold text-navy">Payment</div>
              <div className="mt-5 grid grid-cols-2 gap-2 text-sm">
                <button onClick={() => setPayMethod("card")} className={cn("flex items-center justify-center gap-2 rounded-full border py-3 font-medium", payMethod === "card" ? "border-teal bg-teal/10 text-teal" : "text-muted-foreground hover:border-teal/40")}>
                  <CreditCard className="h-4 w-4" /> Card
                </button>
                <button onClick={() => setPayMethod("qr")} className={cn("flex items-center justify-center gap-2 rounded-full border py-3 font-medium", payMethod === "qr" ? "border-teal bg-teal/10 text-teal" : "text-muted-foreground hover:border-teal/40")}>
                  <QrCode className="h-4 w-4" /> UPI / QR
                </button>
              </div>

              {payMethod === "card" ? (
                <div className="mt-5 rounded-2xl border bg-gradient-hero p-5 text-primary-foreground shadow-elegant">
                  <div className="flex items-center justify-between text-xs text-white/70">
                    <span>Debit / Credit Card</span>
                    <ShieldCheck className="h-4 w-4 text-teal" />
                  </div>
                  <div className="mt-8 font-mono text-lg tracking-widest">4242 4242 4242 4242</div>
                  <div className="mt-4 flex items-end justify-between text-xs text-white/70">
                    <div><div className="uppercase">Cardholder</div><div className="mt-1 font-medium text-white">{address.name || "YOUR NAME"}</div></div>
                    <div><div className="uppercase">Exp</div><div className="mt-1 font-medium text-white">12 / 28</div></div>
                    <div><div className="uppercase">CVV</div><div className="mt-1 font-medium text-white">•••</div></div>
                  </div>
                </div>
              ) : (
                <div className="mt-5 flex flex-col items-center gap-3 rounded-2xl border p-6">
                  <div className="grid h-40 w-40 grid-cols-8 grid-rows-8 gap-0.5 rounded-xl border-4 border-navy p-1">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div key={i} className={cn("rounded-[1px]", (i * 7 + (i % 5)) % 3 === 0 ? "bg-navy" : "bg-transparent")} />
                    ))}
                  </div>
                  <div className="text-sm font-medium text-navy">Scan with any UPI app</div>
                  <div className="text-xs text-muted-foreground">justprint@upi</div>
                </div>
              )}

              <div className="mt-6 flex gap-2">
                <Button variant="outline" className="rounded-full" onClick={() => setStep(1)}>Back</Button>
                <Button className="rounded-full bg-teal text-teal-foreground shadow-teal hover:bg-teal/90" onClick={placeOrder}>
                  Pay {formatINR(grand)}
                </Button>
              </div>
            </div>
          )}

          {step === 3 && orderId && (
            <div className="py-8 text-center">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-teal text-teal-foreground shadow-teal">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h2 className="mt-5 font-display text-3xl font-semibold text-navy">Order placed!</h2>
              <p className="mt-2 text-muted-foreground">We've queued your job on the press. You'll get email updates at every stage.</p>
              <div className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-2 text-sm font-medium text-navy">
                Order ID <span className="font-display text-base text-teal">{orderId}</span>
              </div>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <Button asChild className="rounded-full bg-navy text-navy-foreground hover:bg-navy/90">
                  <Link to="/tracker">Track order</Link>
                </Button>
                <Button variant="outline" className="rounded-full" onClick={() => nav({ to: "/products" })}>Continue shopping</Button>
              </div>
            </div>
          )}
        </div>

        <aside>
          <div className="rounded-2xl border bg-card p-5">
            <div className="font-display text-lg font-semibold text-navy">Summary</div>
            <div className="mt-4 space-y-3">
              {items.slice(0, 4).map((it) => (
                <div key={it.id} className="flex items-center gap-3 text-sm">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-secondary text-xl">{it.emoji}</div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-medium text-navy">{it.name}</div>
                    <div className="truncate text-xs text-muted-foreground">{it.options.quantity} units</div>
                  </div>
                  <div className="text-sm font-medium">{formatINR(it.price)}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-1.5 border-t pt-4 text-sm">
              <SumRow k="Subtotal" v={formatINR(total)} />
              <SumRow k="Shipping" v={shipping === 0 ? "Free" : formatINR(shipping)} />
              <SumRow k="GST (18%)" v={formatINR(gst)} />
              <div className="mt-3 flex items-baseline justify-between border-t pt-3">
                <span className="font-medium">Total</span>
                <span className="font-display text-xl font-semibold text-teal">{formatINR(grand)}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <Label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</Label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

function SumRow({ k, v }: { k: string; v: string }) {
  return <div className="flex justify-between"><span className="text-muted-foreground">{k}</span><span className="font-medium">{v}</span></div>;
}
