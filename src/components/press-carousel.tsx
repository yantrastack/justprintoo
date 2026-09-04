import { useEffect, useState } from "react";
import slide1 from "@/assets/references/Gemini_Generated_Image_6xs8s06xs8s06xs8.png";
import slide2 from "@/assets/references/Gemini_Generated_Image_fv4uogfv4uogfv4u.png";
import slide3 from "@/assets/references/Gemini_Generated_Image_rmo5xyrmo5xyrmo5.png";
import slide4 from "@/assets/references/corporate-business-card-design_684261-473.jpg";
import slide5 from "@/assets/references/corporate-invoice-receipt-book-design-template-vector.jpg";
import slide6 from "@/assets/references/poster-flyer-pamphlet-brochure-cover-layout-annual-report-vector.jpg";
import slide7 from "@/assets/references/rounded-corner-business-card-templates-cover.jpg";
import slide8 from "@/assets/references/rubberstamps.png";
import slide9 from "@/assets/references/t-shirt-printing-services-2221319599-ww791lu7.jpg";

const SLIDES = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8, slide9];

// One accurate description per slide, in the same order as SLIDES.
const SLIDE_ALTS = [
  "Shopkeeper stamping a customer's bill from a printed duplicate bill book at a shop counter",
  "Customer receiving a carbonless bill book receipt, with a stack of printed bill books on the counter",
  "Doctor showing a printed hospital patient file folder with patient detail fields to a patient",
  "Front and back of a corporate visiting card design with logo and QR code",
  "Invoice and bill book page layout templates with itemised billing columns",
  "Corporate business flyer and brochure cover layout designs",
  "Stacks of printed rounded-corner business cards showing the front and back design",
  "A range of self-inking and pre-inked rubber stamps in round and rectangular styles",
  "Blue, white and yellow t-shirts printed with a custom front design",
];

const INTERVAL_MS = 4000;

export function PressCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/10 shadow-elegant backdrop-blur-xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative aspect-[4/3] w-full">
        {SLIDES.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={SLIDE_ALTS[i]}
            loading={i === 0 ? "eager" : "lazy"}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/90 to-transparent p-5">
        <div className="text-xs uppercase tracking-widest text-teal">Our press &amp; storefront</div>
        <div className="mt-1 font-display text-xl font-semibold text-white">Hunter Road, Hanamkonda · Warangal</div>
        <div className="text-xs text-white/70">DTG t-shirts, offset press, hospital file binding — all under one roof.</div>
      </div>
    </div>
  );
}
