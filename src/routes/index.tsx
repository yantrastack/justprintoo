import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Truck, ShieldCheck, Clock } from "lucide-react";
import { PRODUCTS, CATEGORIES, formatINR } from "@/lib/products";
import { Button } from "@/components/ui/button";
import founderImg from "@/assets/team/founder.jpg.asset.json";
import ceoImg from "@/assets/team/ceo.png.asset.json";
import sbLogo from "@/assets/brand/sb-logo.jpg";
import { UrgentRequestBar } from "@/components/urgent-request";
import { PressCarousel } from "@/components/press-carousel";
import { InquiryForm } from "@/components/inquiry-form";
import { canonical, socialMeta } from "@/lib/seo";

const HOME_TITLE = "JustPrint Warangal — Printing Shop for Visiting Cards, Bill Books & T-Shirts";
const HOME_DESCRIPTION =
  "JustPrint is a printing press in Hanamkonda, Warangal. Order visiting cards, business cards, bill books, wedding cards, hospital files, t-shirt printing, rubber stamps, pamphlets and flyers with live pricing and same-day rush dispatch.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: HOME_TITLE },
      { name: "description", content: HOME_DESCRIPTION },
      ...socialMeta({ title: HOME_TITLE, description: HOME_DESCRIPTION, path: "/" }),
    ],
    links: [canonical("/")],
  }),
  component: Home,
});

function Home() {
  const featured = PRODUCTS.slice(0, 6);

  return (
    <div className="min-w-0">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_20%_20%,white_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:py-20">
          <div className="min-w-0 text-primary-foreground">
            <div className="inline-flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-3 py-2 backdrop-blur">
              <div className="grid h-10 w-10 place-items-center overflow-hidden rounded-xl bg-white shadow-teal">
                <img src={sbLogo} alt="SB logo" className="h-full w-full object-contain p-0.5" />
              </div>
              <div className="leading-tight">
                <div className="font-display text-xl font-semibold tracking-tight text-gold sm:text-2xl">JustPrint</div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-white/60">Since Warangal · SB Group</div>
              </div>
            </div>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
              Printing that prices itself,<br />
              <span className="text-teal">in real time.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base text-white/75 sm:text-lg">
              Upload your artwork, pick paper &amp; finish, and watch the price update instantly.
              From bill books to wedding invites — dispatched from our fully-automated press.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full bg-teal text-teal-foreground shadow-teal hover:bg-teal/90">
                <Link to="/products">Start an order <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white">
                <Link to="/tracker">Track my order</Link>
              </Button>
            </div>
            <div className="mt-10 grid max-w-lg grid-cols-3 gap-4 text-xs text-white/70">
              {[
                { icon: Clock, k: "24hr", v: "Rush dispatch" },
                { icon: ShieldCheck, k: "100%", v: "Colour guarantee" },
                { icon: Truck, k: "Pan-India", v: "Delivery" },
              ].map((s) => (
                <div key={s.v} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <s.icon className="h-4 w-4 text-teal" />
                  <div className="mt-2 font-display text-lg font-semibold text-white">{s.k}</div>
                  <div>{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-w-0">
            <PressCarousel />
            <div className="mt-4">
              <UrgentRequestBar />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">Shop by category</h2>
            <p className="text-sm text-muted-foreground">Everything you can print with us, organised.</p>
          </div>
          <Button asChild variant="ghost" className="text-teal hover:text-teal">
            <Link to="/products">Browse all <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {CATEGORIES.map((c) => {
            const count = PRODUCTS.filter((p) => p.category === c.id).length;
            return (
              <Link
                key={c.id}
                to="/products"
                search={{ cat: c.id }}
                className="group rounded-3xl border bg-card p-6 transition hover:-translate-y-0.5 hover:border-teal/50 hover:shadow-elegant"
              >
                <div className="flex items-center justify-between">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-secondary text-navy">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <span className="text-xs text-muted-foreground">{count} products</span>
                </div>
                <div className="mt-5 font-display text-xl font-semibold text-navy">{c.label}</div>
                <p className="mt-1 text-sm text-muted-foreground">{c.blurb}</p>
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal">
                  Explore <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured products */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">Popular right now</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
          {featured.map((p) => (
            <Link
              key={p.slug}
              to="/products/$slug"
              params={{ slug: p.slug }}
              className="group overflow-hidden rounded-2xl border bg-card transition hover:-translate-y-0.5 hover:shadow-elegant"
            >
              <div className={`relative aspect-[5/4] w-full overflow-hidden bg-gradient-to-br ${p.color}`}>
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <div className="truncate font-medium text-navy">{p.name}</div>
                    <div className="truncate text-xs text-muted-foreground">{p.tagline}</div>
                  </div>
                  <div className="shrink-0 text-right text-xs text-muted-foreground">
                    from
                    <div className="font-display text-sm font-semibold text-teal">
                      {formatINR(Math.round(p.basePrice * Math.max(p.minQty, 50)))}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Leadership team — compact */}
      <section className="mx-auto max-w-4xl px-4 pb-14 sm:px-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-teal/10 px-3 py-1 text-[11px] font-medium text-teal">
            <Sparkles className="h-3 w-3" /> Our leadership
          </div>
          <h2 className="mt-2 font-display text-xl font-semibold text-navy sm:text-2xl">The people behind JustPrint</h2>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            { img: founderImg.url, name: "Ch. Shivaa Kumar", role: "Founder", blurb: "Two decades of print craftsmanship." },
            { img: ceoImg.url, name: "K. Ganesh", role: "Chief Executive Officer", blurb: "Leads operations & customer experience." },
          ].map((m) => (
            <div key={m.name} className="flex items-center gap-3 rounded-2xl border bg-card p-3 transition hover:shadow-elegant">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-secondary">
                <img
                  src={m.img}
                  alt={`${m.name}, ${m.role}`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-medium uppercase tracking-widest text-teal">{m.role}</div>
                <div className="truncate font-display text-sm font-semibold text-navy">{m.name}</div>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">{m.blurb}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <InquiryForm />
    </div>
  );
}
