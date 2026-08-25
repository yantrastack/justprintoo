import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState, useRef } from "react";
import { getProduct, computePrice, formatINR, PRODUCTS } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cart } from "@/lib/cart-store";
import { UploadCloud, CheckCircle2, FileText, ArrowLeft, ShieldCheck, Truck, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/products/$slug")({
  head: ({ params }) => {
    const p = PRODUCTS.find((x) => x.slug === params.slug);
    return {
      meta: [
        { title: p ? `${p.name} — Live pricing · JustPrint.com` : "Product · JustPrint.com" },
        { name: "description", content: p?.description ?? "Customise and price your print order." },
      ],
    };
  },
  component: CustomizerPage,
  notFoundComponent: () => (
    <div className="p-10 text-center text-muted-foreground">Product not found.</div>
  ),
});

function CustomizerPage() {
  const { slug } = Route.useParams();
  const product = getProduct(slug);
  const nav = useNavigate();

  const [quantity, setQuantity] = useState(product?.qtySteps[1] ?? product?.minQty ?? 100);
  const [activeImage, setActiveImage] = useState(product?.image ?? "");
  const [paperId, setPaperId] = useState(product?.papers[0].id ?? "");
  const [finishId, setFinishId] = useState(product?.finishes[0].id ?? "");
  const [turnaroundId, setTurnaroundId] = useState(product?.turnarounds[0].id ?? "");
  const [fileName, setFileName] = useState<string>();
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const opts = { quantity, paperId, finishId, turnaroundId };
  const price = useMemo(() => (product ? computePrice(product, opts) : 0), [product, quantity, paperId, finishId, turnaroundId]);

  if (!product) {
    return <div className="p-10 text-center text-muted-foreground">Product not found.</div>;
  }

  const unit = quantity ? (price / quantity) : 0;
  const turnaround = product.turnarounds.find((t) => t.id === turnaroundId);
  const paper = product.papers.find((p) => p.id === paperId);
  const finish = product.finishes.find((f) => f.id === finishId);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setFileName(files[0].name);
    toast.success("File ready for printing", { description: files[0].name });
  };

  const addToCart = () => {
    cart.add({
      id: crypto.randomUUID(),
      slug: product.slug,
      name: product.name,
      emoji: product.emoji,
      options: opts,
      unitLabel: `${quantity} × ${paper?.label} · ${finish?.label}`,
      price,
      fileName,
    });
    toast.success(`${product.name} added to cart`, { description: `${quantity} units · ${formatINR(price)}` });
    nav({ to: "/cart" });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10">
      <Link to="/products" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-teal">
        <ArrowLeft className="h-4 w-4" /> Back to catalog
      </Link>

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_400px]">
        {/* Left: product visual + config */}
        <div className="min-w-0 space-y-8">
          <div className={cn("relative aspect-[16/9] overflow-hidden rounded-3xl bg-gradient-to-br shadow-elegant", product.color)}>
            <img
              src={activeImage || product.image}
              alt={product.name}
              width={1600}
              height={900}
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent" />
            <div className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-navy shadow-sm backdrop-blur">
              {product.tagline}
            </div>
            <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full bg-navy/80 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
              <span className="text-base leading-none">{product.emoji}</span> Print-ready in minutes
            </div>
          </div>

          {product.gallery && product.gallery.length > 1 && (
            <div className="flex flex-wrap gap-3">
              {product.gallery.map((src, i) => {
                const isActive = (activeImage || product.image) === src;
                return (
                  <button
                    key={i}
                    onClick={() => setActiveImage(src)}
                    className={cn(
                      "h-20 w-28 overflow-hidden rounded-xl border-2 bg-muted transition",
                      isActive ? "border-teal shadow-teal" : "border-transparent hover:border-teal/40",
                    )}
                    aria-label={`View sample ${i + 1}`}
                  >
                    <img src={src} alt={`${product.name} sample ${i + 1}`} className="h-full w-full object-cover" />
                  </button>
                );
              })}
            </div>
          )}

          <div>
            <h1 className="font-display text-3xl font-semibold text-navy sm:text-4xl">{product.name}</h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">{product.description}</p>
          </div>

          {/* Quantity */}
          <ConfigCard title="Quantity" hint="Volume discounts unlock at 250, 500 and 1000 units.">
            <div className="flex flex-wrap gap-2">
              {product.qtySteps.map((q) => (
                <button
                  key={q}
                  onClick={() => setQuantity(q)}
                  className={cn(
                    "rounded-full border px-4 py-1.5 text-sm font-medium transition",
                    quantity === q
                      ? "border-teal bg-teal text-teal-foreground shadow-teal"
                      : "border-border bg-background hover:border-teal/50",
                  )}
                >
                  {q.toLocaleString()}
                </button>
              ))}
            </div>
            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
                <span>Fine-tune</span>
                <span className="font-medium text-navy">{quantity.toLocaleString()} units</span>
              </div>
              <Slider
                value={[quantity]}
                min={product.minQty}
                max={product.qtySteps[product.qtySteps.length - 1] * 2}
                step={Math.max(1, Math.round(product.minQty / 5))}
                onValueChange={(v) => setQuantity(v[0])}
              />
            </div>
          </ConfigCard>

          {/* Paper */}
          <ConfigCard title="Paper / Material" hint="Feel and weight matters — pick a stock that suits the occasion.">
            <RadioGroup value={paperId} onValueChange={setPaperId} className="grid gap-2 sm:grid-cols-3">
              {product.papers.map((p) => (
                <label
                  key={p.id}
                  className={cn(
                    "cursor-pointer rounded-2xl border p-4 transition",
                    paperId === p.id ? "border-teal bg-teal/5 shadow-teal" : "hover:border-teal/40",
                  )}
                >
                  <RadioGroupItem value={p.id} className="sr-only" />
                  <div className="text-sm font-medium text-navy">{p.label}</div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {p.multiplier === 1 ? "Included" : `×${p.multiplier.toFixed(2)}`}
                  </div>
                </label>
              ))}
            </RadioGroup>
          </ConfigCard>

          {/* Finish */}
          <ConfigCard title="Finish" hint="Optional coating for durability or wow-factor.">
            <RadioGroup value={finishId} onValueChange={setFinishId} className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {product.finishes.map((f) => (
                <label
                  key={f.id}
                  className={cn(
                    "cursor-pointer rounded-2xl border p-4 transition",
                    finishId === f.id ? "border-teal bg-teal/5 shadow-teal" : "hover:border-teal/40",
                  )}
                >
                  <RadioGroupItem value={f.id} className="sr-only" />
                  <div className="text-sm font-medium text-navy">{f.label}</div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {f.add === 0 ? "Included" : `+${Math.round(f.add * 100)}%`}
                  </div>
                </label>
              ))}
            </RadioGroup>
          </ConfigCard>

          {/* Turnaround */}
          <ConfigCard title="Turnaround" hint="Every order is auto-slotted into the press queue.">
            <div className="grid gap-2 sm:grid-cols-3">
              {product.turnarounds.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTurnaroundId(t.id)}
                  className={cn(
                    "rounded-2xl border p-4 text-left transition",
                    turnaroundId === t.id ? "border-teal bg-teal/5 shadow-teal" : "hover:border-teal/40",
                  )}
                >
                  <div className="text-sm font-medium text-navy">{t.label}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{t.days} · ×{t.multiplier}</div>
                </button>
              ))}
            </div>
          </ConfigCard>

          {/* Upload */}
          <ConfigCard title="Upload artwork" hint="Print-ready PDF, PNG, JPG or AI up to 50MB.">
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                handleFiles(e.dataTransfer.files);
              }}
              onClick={() => inputRef.current?.click()}
              className={cn(
                "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed p-8 text-center transition",
                dragOver ? "border-teal bg-teal/5" : "border-border hover:border-teal/50 hover:bg-muted/50",
                fileName && "border-teal/60 bg-teal/5",
              )}
            >
              <input
                ref={inputRef}
                type="file"
                className="hidden"
                accept=".pdf,.png,.jpg,.jpeg,.ai,.svg"
                onChange={(e) => handleFiles(e.target.files)}
              />
              {fileName ? (
                <>
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-teal text-teal-foreground shadow-teal">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-navy">
                    <FileText className="h-4 w-4 text-teal" /> {fileName}
                  </div>
                  <div className="text-xs text-muted-foreground">Passed automated preflight · click to replace</div>
                </>
              ) : (
                <>
                  <UploadCloud className="h-10 w-10 text-teal" />
                  <div className="text-sm font-medium text-navy">Drop your artwork here</div>
                  <div className="text-xs text-muted-foreground">or click to browse from your device</div>
                </>
              )}
            </div>
          </ConfigCard>
        </div>

        {/* Right: sticky price panel */}
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <div className="overflow-hidden rounded-3xl border bg-card shadow-elegant">
            <div className="bg-gradient-hero p-5 text-primary-foreground">
              <div className="text-xs uppercase tracking-widest text-white/70">Live estimate</div>
              <div className="mt-2 font-display text-5xl font-semibold text-white">
                {formatINR(price)}
              </div>
              <div className="mt-1 text-sm text-white/70">
                {formatINR(Math.round(unit * 100) / 100)} / unit · incl. GST
              </div>
            </div>
            <div className="space-y-3 p-5 text-sm">
              <Line k="Quantity" v={`${quantity.toLocaleString()} units`} />
              <Line k="Paper" v={paper?.label ?? ""} />
              <Line k="Finish" v={finish?.label ?? ""} />
              <Line k="Turnaround" v={`${turnaround?.label} · ${turnaround?.days}`} />
              <Line k="Artwork" v={fileName ? "Uploaded ✓" : "Pending"} />
              <div className="!mt-5 space-y-1.5 rounded-2xl bg-secondary p-3 text-xs text-muted-foreground">
                <Row icon={ShieldCheck}>Automated preflight & colour check</Row>
                <Row icon={Truck}>Free pan-India shipping over ₹1,000</Row>
                <Row icon={Sparkles}>Reprint guarantee on colour mismatch</Row>
              </div>
              <Button onClick={addToCart} size="lg" className="w-full rounded-full bg-teal text-teal-foreground shadow-teal hover:bg-teal/90">
                Add to cart · {formatINR(price)}
              </Button>
              <div className="text-center text-[11px] text-muted-foreground">You won't be charged until checkout.</div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function ConfigCard({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border bg-card p-5 sm:p-6">
      <div className="flex items-baseline justify-between gap-4">
        <Label className="font-display text-lg font-semibold text-navy">{title}</Label>
        {hint && <div className="hidden text-xs text-muted-foreground sm:block">{hint}</div>}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Line({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="text-muted-foreground">{k}</span>
      <span className="text-right font-medium text-navy">{v}</span>
    </div>
  );
}

function Row({ icon: Icon, children }: { icon: React.ComponentType<{ className?: string }>; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-3.5 w-3.5 text-teal" />
      <span>{children}</span>
    </div>
  );
}
