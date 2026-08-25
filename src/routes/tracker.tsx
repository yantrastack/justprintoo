import { createFileRoute, Link } from "@tanstack/react-router";
import { useOrders, ORDER_STAGES, stageIndex, orders } from "@/lib/orders";
import { formatINR } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle, Clock, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/tracker")({
  head: () => ({ meta: [{ title: "Order tracker · JustPrint.com" }] }),
  component: TrackerPage,
});

function TrackerPage() {
  const list = useOrders();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="text-xs font-medium uppercase tracking-widest text-teal">Live pipeline</div>
          <h1 className="mt-1 font-display text-3xl font-semibold text-navy sm:text-4xl">Order tracker</h1>
          <p className="mt-1 text-sm text-muted-foreground">Every job in your account, updated automatically as it moves through the press.</p>
        </div>
      </div>

      {list.length === 0 && (
        <div className="mt-10 rounded-3xl border border-dashed p-12 text-center text-muted-foreground">
          No orders yet. <Link to="/products" className="text-teal underline">Place your first order</Link>.
        </div>
      )}

      <div className="mt-8 space-y-6">
        {list.map((o) => {
          const active = stageIndex(o.currentStage);
          return (
            <div key={o.id} className="rounded-3xl border bg-card p-5 shadow-sm sm:p-7">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:flex-wrap sm:justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    {new Date(o.createdAt).toLocaleString("en-IN", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}
                  </div>
                  <div className="mt-1 font-display text-xl font-semibold text-navy">Order {o.id}</div>
                  <div className="text-sm text-muted-foreground">
                    {o.items.length} item{o.items.length > 1 ? "s" : ""} · {o.shippingMethod} · {o.address.city}
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <div className="font-display text-2xl font-semibold text-teal">{formatINR(o.total)}</div>
                  <Button size="sm" variant="outline" className="mt-2 rounded-full" onClick={() => orders.advance(o.id)}>
                    Advance stage <ChevronRight className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              {/* Timeline */}
              <div className="mt-6 overflow-x-auto">
                <div className="relative flex min-w-[560px] items-start justify-between gap-4 px-2">
                  <div className="absolute left-8 right-8 top-4 h-0.5 bg-border" />
                  <div
                    className="absolute left-8 top-4 h-0.5 bg-teal transition-all"
                    style={{ width: `calc((100% - 64px) * ${active / (ORDER_STAGES.length - 1)})` }}
                  />
                  {ORDER_STAGES.map((s, i) => {
                    const done = i < active;
                    const current = i === active;
                    return (
                      <div key={s.id} className="relative z-10 flex flex-col items-center gap-2 text-center">
                        <div className={cn(
                          "grid h-8 w-8 place-items-center rounded-full border-2 transition",
                          done && "border-teal bg-teal text-teal-foreground shadow-teal",
                          current && "border-teal bg-white text-teal shadow-teal animate-pulse",
                          !done && !current && "border-border bg-white text-muted-foreground",
                        )}>
                          {done ? <CheckCircle2 className="h-4 w-4" /> : current ? <Circle className="h-3 w-3 fill-current" /> : <Circle className="h-3 w-3" />}
                        </div>
                        <div className={cn(
                          "text-[11px] font-medium",
                          (done || current) ? "text-navy" : "text-muted-foreground",
                        )}>
                          {s.label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Items */}
              <div className="mt-6 grid gap-2 sm:grid-cols-2">
                {o.items.map((it) => (
                  <div key={it.id} className="flex items-center gap-3 rounded-2xl bg-secondary/60 p-3">
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-white text-2xl">{it.emoji}</div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium text-navy">{it.name}</div>
                      <div className="truncate text-xs text-muted-foreground">{it.unitLabel}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
