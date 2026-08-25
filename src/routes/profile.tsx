import { createFileRoute } from "@tanstack/react-router";
import { useOrders } from "@/lib/orders";
import { formatINR } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, CreditCard, Award } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile · JustPrint.com" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const list = useOrders();
  const spent = list.reduce((s, o) => s + o.total, 0);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="rounded-3xl border bg-card p-6 text-center">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-hero font-display text-2xl font-semibold text-primary-foreground shadow-elegant">
            AS
          </div>
          <div className="mt-4 font-display text-xl font-semibold text-navy">Anika Sharma</div>
          <div className="text-sm text-muted-foreground">Member since Mar 2024</div>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-teal/10 px-3 py-1 text-xs font-medium text-teal">
            <Award className="h-3.5 w-3.5" /> Gold tier · 12% off
          </div>
          <div className="mt-6 space-y-2 text-left text-sm">
            <Row icon={Mail}>anika@example.com</Row>
            <Row icon={Phone}>+91 98xxx xxxxx</Row>
            <Row icon={MapPin}>12 MG Road, Bengaluru 560001</Row>
            <Row icon={CreditCard}>Card ending 4242</Row>
          </div>
          <Button variant="outline" className="mt-6 w-full rounded-full">Edit profile</Button>
        </aside>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { k: list.length.toString(), v: "Orders" },
              { k: formatINR(spent), v: "Lifetime spend" },
              { k: "4.9★", v: "Print quality" },
              { k: "12%", v: "Loyalty saving" },
            ].map((s) => (
              <div key={s.v} className="rounded-2xl border bg-card p-4">
                <div className="font-display text-2xl font-semibold text-navy">{s.k}</div>
                <div className="text-xs text-muted-foreground">{s.v}</div>
              </div>
            ))}
          </div>

          <div className="rounded-3xl border bg-card p-5 sm:p-7">
            <div className="font-display text-xl font-semibold text-navy">Recent orders</div>
            <div className="mt-4 divide-y">
              {list.length === 0 && <div className="py-6 text-sm text-muted-foreground">No orders yet.</div>}
              {list.map((o) => (
                <div key={o.id} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 py-4">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-secondary text-lg">{o.items[0]?.emoji}</div>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium text-navy">{o.id} · {o.items.map((i) => i.name).join(", ")}</div>
                    <div className="text-xs capitalize text-muted-foreground">Status: {o.currentStage.replace("-", " ")}</div>
                  </div>
                  <div className="text-right text-sm font-medium">{formatINR(o.total)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ icon: Icon, children }: { icon: React.ComponentType<{ className?: string }>; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      <Icon className="h-4 w-4 text-teal" />
      <span className="truncate">{children}</span>
    </div>
  );
}
