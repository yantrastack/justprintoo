import { createFileRoute, Link } from "@tanstack/react-router";
import { Palette, Sparkles, Wand2, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { canonical } from "@/lib/seo";

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [
      { title: "Design Studio — JustPrint" },
      {
        name: "description",
        content:
          "The upcoming JustPrint Design Studio: a browser-based canvas to design cards, apparel and stationery with automatic bleed, safe-area and CMYK checks.",
      },
    ],
    links: [canonical("/studio")],
  }),
  component: StudioPage,
});

function StudioPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-8 text-primary-foreground sm:p-12">
        <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_80%_20%,white_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-teal" /> Coming soon
          </div>
          <h1 className="mt-5 font-display text-4xl font-semibold sm:text-5xl">Design Studio</h1>
          <p className="mt-4 max-w-xl text-white/75">
            A browser-based canvas to design your prints from scratch. Templates for cards, apparel and stationery — with automatic bleed, safe-area and CMYK checks.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              { icon: Layers, k: "500+", v: "Templates" },
              { icon: Wand2, k: "AI", v: "Layout assistant" },
              { icon: Palette, k: "1:1", v: "Print preview" },
            ].map((f) => (
              <div key={f.v} className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                <f.icon className="h-4 w-4 text-teal" />
                <div className="mt-2 font-display text-2xl font-semibold text-white">{f.k}</div>
                <div className="text-sm text-white/70">{f.v}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full bg-teal text-teal-foreground shadow-teal hover:bg-teal/90">
              <Link to="/products">Order with a ready file instead</Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white">
              Notify me at launch
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
