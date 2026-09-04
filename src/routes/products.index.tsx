import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { z } from "zod";
import { PRODUCTS, CATEGORIES, formatINR, type Category } from "@/lib/products";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { canonical, socialMeta } from "@/lib/seo";

const searchSchema = z.object({
  cat: z.enum(["corporate", "apparel", "life-events"]).optional(),
});

const PRODUCTS_TITLE = "All Printing Services & Products — JustPrint Warangal";
const PRODUCTS_DESCRIPTION =
  "Every JustPrint printing service in one place: bill books, letterheads, pamphlets and flyers, hospital and patient files, X-ray covers, rubber stamps, t-shirt and cap printing, wedding, birthday, saree-function and memorial cards, and photo frames — each with live pricing.";

export const Route = createFileRoute("/products/")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: PRODUCTS_TITLE },
      { name: "description", content: PRODUCTS_DESCRIPTION },
      ...socialMeta({ title: PRODUCTS_TITLE, description: PRODUCTS_DESCRIPTION, path: "/products" }),
    ],
    links: [canonical("/products")],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const { cat } = Route.useSearch();
  const nav = Route.useNavigate();
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => (cat ? p.category === cat : true))
      .filter((p) => (q ? (p.name + p.tagline).toLowerCase().includes(q.toLowerCase()) : true));
  }, [cat, q]);

  const setCat = (c?: Category) => nav({ search: c ? { cat: c } : {} });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:flex sm:flex-wrap sm:items-end sm:justify-between">
        <div className="min-w-0">
          <div className="text-xs font-medium uppercase tracking-widest text-teal">Catalog</div>
          <h1 className="mt-1 font-display text-3xl font-semibold text-navy sm:text-4xl">Every product, live-priced</h1>
          <p className="mt-1 text-sm text-muted-foreground">Pick a product to customise, upload artwork and see the price update instantly.</p>
        </div>
        <div className="relative w-full max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter products" className="h-10 rounded-full bg-muted pl-10" />
        </div>
      </div>

      {/* Category tabs */}
      <div className="mt-6 flex flex-wrap gap-2">
        <TabButton active={!cat} onClick={() => setCat(undefined)}>All</TabButton>
        {CATEGORIES.map((c) => (
          <TabButton key={c.id} active={cat === c.id} onClick={() => setCat(c.id)}>
            {c.label}
          </TabButton>
        ))}
      </div>

      {/* Grid */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <Link
            key={p.slug}
            to="/products/$slug"
            params={{ slug: p.slug }}
            className="group overflow-hidden rounded-3xl border bg-card transition hover:-translate-y-0.5 hover:border-teal/40 hover:shadow-elegant"
          >
            <div className={`relative aspect-[5/3] w-full overflow-hidden bg-gradient-to-br ${p.color}`}>
              <img
                src={p.image}
                alt={p.name}
                loading="lazy"
                width={1024}
                height={1024}
                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <span className="absolute left-4 top-4 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-navy shadow-sm backdrop-blur">
                {CATEGORIES.find((c) => c.id === p.category)?.label}
              </span>
              <span className="absolute right-4 top-4 rounded-full bg-navy/85 px-2 py-1 text-base leading-none text-white shadow-sm backdrop-blur">
                {p.emoji}
              </span>
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate font-display text-lg font-semibold text-navy">{p.name}</div>
                  <div className="mt-0.5 truncate text-sm text-muted-foreground">{p.tagline}</div>
                </div>
                <div className="shrink-0 text-right">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">from</div>
                  <div className="font-display text-base font-semibold text-teal">
                    {formatINR(Math.round(p.basePrice * Math.max(p.minQty, 50)))}
                  </div>
                </div>
              </div>
              <div className="mt-4 inline-flex text-sm font-medium text-teal">Customise & price →</div>
            </div>
          </Link>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full rounded-2xl border border-dashed p-10 text-center text-muted-foreground">
            No products match your filters.
          </div>
        )}
      </div>
    </div>
  );
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full px-4 py-2 text-sm font-medium transition",
        active
          ? "bg-navy text-navy-foreground shadow-elegant"
          : "bg-secondary text-secondary-foreground hover:bg-secondary/70",
      )}
    >
      {children}
    </button>
  );
}
