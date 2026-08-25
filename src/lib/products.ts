import billBooksImg from "@/assets/products/bill-books.jpg";
import letterheadsImg from "@/assets/products/letterheads.jpg";
import pamphletsImg from "@/assets/products/pamphlets.jpg";
import rubberStampsImg from "@/assets/products/rubber-stamps.jpg";
import tshirtImg from "@/assets/products/tshirt.jpg";
import capsImg from "@/assets/products/caps.jpg";
import weddingCardsImg from "@/assets/products/wedding-cards.jpg";
import birthdayCardsImg from "@/assets/products/birthday-cards.jpg";
import sareeCardsImg from "@/assets/products/saree-cards.jpg";
import memorialCardsImg from "@/assets/products/memorial-cards.jpg";
import hospitalFilesImg from "@/assets/products/hospital-files.jpg";
import plasticPatientFilesImg from "@/assets/products/plastic-patient-files.jpg";
import xrayCoversImg from "@/assets/products/xray-covers.jpg";
import hospitalSample1 from "@/assets/products/hospital/hospital-file-1.jpg.asset.json";
import hospitalSample2 from "@/assets/products/hospital/hospital-file-2.jpg.asset.json";
import hospitalSample3 from "@/assets/products/hospital/hospital-file-3.jpg.asset.json";
import photoFrame1 from "@/assets/products/photo-frames/photo-frame-1.jpg.asset.json";
import photoFrame2 from "@/assets/products/photo-frames/photo-frame-2.jpg.asset.json";
import photoFrame3 from "@/assets/products/photo-frames/photo-frame-3.jpg.asset.json";

export type Category = "corporate" | "apparel" | "life-events";

export type PaperOption = { id: string; label: string; multiplier: number };
export type FinishOption = { id: string; label: string; add: number };
export type TurnaroundOption = { id: string; label: string; multiplier: number; days: string };

export type Product = {
  slug: string;
  name: string;
  category: Category;
  tagline: string;
  description: string;
  basePrice: number; // per unit at qty=100, standard paper, no finish, standard turnaround
  minQty: number;
  qtySteps: number[];
  papers: PaperOption[];
  finishes: FinishOption[];
  turnarounds: TurnaroundOption[];
  emoji: string;
  color: string; // tailwind gradient stops
  image: string;
  gallery?: string[];
};

const commonTurnaround: TurnaroundOption[] = [
  { id: "standard", label: "Standard", multiplier: 1, days: "5-7 days" },
  { id: "express", label: "Express", multiplier: 1.4, days: "2-3 days" },
  { id: "rush", label: "Rush", multiplier: 1.85, days: "24 hours" },
];

const paperTiers: PaperOption[] = [
  { id: "standard", label: "Standard 80 GSM", multiplier: 1 },
  { id: "premium", label: "Premium 130 GSM", multiplier: 1.35 },
  { id: "luxury", label: "Luxury 300 GSM", multiplier: 1.85 },
];

const finishOptions: FinishOption[] = [
  { id: "none", label: "None", add: 0 },
  { id: "matte", label: "Matte Lamination", add: 0.6 },
  { id: "glossy", label: "Glossy Lamination", add: 0.7 },
  { id: "uv", label: "Spot UV", add: 1.2 },
];

export const CATEGORIES: { id: Category; label: string; blurb: string }[] = [
  { id: "corporate", label: "Corporate", blurb: "Stationery & office essentials" },
  { id: "apparel", label: "Apparel & Merch", blurb: "Wearables and branded goods" },
  { id: "life-events", label: "Life Events", blurb: "Cards for every occasion" },
];

export const PRODUCTS: Product[] = [
  {
    slug: "bill-books",
    name: "Bill Books",
    category: "corporate",
    tagline: "Duplicate & triplicate invoice books",
    description: "Numbered carbonless bill books with your logo, GST fields and custom columns. Perfect for retail, wholesale and service businesses.",
    basePrice: 2.4,
    minQty: 50,
    qtySteps: [50, 100, 250, 500, 1000],
    papers: paperTiers,
    finishes: [{ id: "none", label: "None", add: 0 }, { id: "matte", label: "Matte Cover", add: 0.4 }],
    turnarounds: commonTurnaround,
    emoji: "📒",
    color: "from-indigo-500/20 to-teal-400/20",
    image: billBooksImg,
  },
  {
    slug: "letterheads",
    name: "Letterheads",
    category: "corporate",
    tagline: "A4 branded stationery",
    description: "Crisp offset-printed letterheads on premium paper. Ideal for legal, medical and executive correspondence.",
    basePrice: 1.8,
    minQty: 100,
    qtySteps: [100, 250, 500, 1000, 2500],
    papers: paperTiers,
    finishes: finishOptions,
    turnarounds: commonTurnaround,
    emoji: "📄",
    color: "from-sky-400/20 to-teal-300/20",
    image: letterheadsImg,
  },
  {
    slug: "pamphlets",
    name: "Pamphlets & Flyers",
    category: "corporate",
    tagline: "A5 / A4 full-colour flyers",
    description: "Vibrant, full-colour pamphlets printed on both sides. Great for promotions, launches and door drops.",
    basePrice: 1.2,
    minQty: 100,
    qtySteps: [100, 500, 1000, 2500, 5000],
    papers: paperTiers,
    finishes: finishOptions,
    turnarounds: commonTurnaround,
    emoji: "📰",
    color: "from-teal-400/20 to-cyan-300/20",
    image: pamphletsImg,
  },
  {
    slug: "hospital-files",
    name: "Hospital Files",
    category: "corporate",
    tagline: "Patient records, OPD & case sheets",
    description: "Custom hospital and clinic stationery — patient case files, OPD cards, prescription pads, lab report folders and discharge summaries. Branded with your hospital logo and department colour codes.",
    basePrice: 14,
    minQty: 100,
    qtySteps: [100, 250, 500, 1000, 2500],
    papers: [
      { id: "standard", label: "Standard 100 GSM", multiplier: 1 },
      { id: "premium", label: "Premium 170 GSM Folder", multiplier: 1.45 },
      { id: "luxury", label: "Hard Cover 300 GSM", multiplier: 2.1 },
    ],
    finishes: [
      { id: "none", label: "None", add: 0 },
      { id: "matte", label: "Matte Lamination", add: 0.5 },
      { id: "index", label: "Index Tabs + Punching", add: 0.8 },
    ],
    turnarounds: commonTurnaround,
    emoji: "🏥",
    color: "from-blue-400/20 to-teal-300/20",
    image: hospitalSample1.url,
    gallery: [hospitalSample1.url, hospitalSample2.url, hospitalSample3.url, hospitalFilesImg],
  },
  {
    slug: "plastic-patient-files",
    name: "Plastic Patient Files",
    category: "corporate",
    tagline: "Durable transparent PP patient folders",
    description: "Waterproof polypropylene patient files with clip fasteners, tear-proof pockets and colour-coded department strips. Perfect for OPD, IPD and ICU record management.",
    basePrice: 45,
    minQty: 50,
    qtySteps: [50, 100, 250, 500, 1000],
    papers: [
      { id: "clear", label: "Clear PP 350 Micron", multiplier: 1 },
      { id: "frosted", label: "Frosted PP 500 Micron", multiplier: 1.35 },
      { id: "rigid", label: "Rigid PP 700 Micron", multiplier: 1.75 },
    ],
    finishes: [
      { id: "clip", label: "Metal Clip", add: 0 },
      { id: "elastic", label: "Elastic Closure", add: 0.35 },
      { id: "button", label: "Button + String", add: 0.5 },
    ],
    turnarounds: commonTurnaround,
    emoji: "🗂️",
    color: "from-cyan-400/20 to-blue-300/20",
    image: plasticPatientFilesImg,
  },
  {
    slug: "xray-covers",
    name: "X-Ray Covers & Jackets",
    category: "corporate",
    tagline: "Radiology film envelopes with hospital branding",
    description: "Large-format X-ray and radiology film jackets in Kraft or coated paper, printed with your hospital logo, patient info window and department code. Standard 15x18 in and custom sizes available.",
    basePrice: 22,
    minQty: 100,
    qtySteps: [100, 250, 500, 1000, 2500],
    papers: [
      { id: "kraft", label: "Kraft 150 GSM", multiplier: 1 },
      { id: "coated", label: "Coated Art 170 GSM", multiplier: 1.3 },
      { id: "waterproof", label: "Waterproof Laminated", multiplier: 1.7 },
    ],
    finishes: [
      { id: "window", label: "Patient Info Window", add: 0 },
      { id: "double", label: "Double Pocket", add: 0.4 },
      { id: "handle", label: "Carry Handle Punch", add: 0.55 },
    ],
    turnarounds: commonTurnaround,
    emoji: "🩻",
    color: "from-slate-400/20 to-cyan-300/20",
    image: xrayCoversImg,
  },
  {
    slug: "rubber-stamps",
    name: "Rubber Stamps",
    category: "corporate",
    tagline: "Self-inking & wooden stamps",
    description: "Laser-engraved rubber stamps with sharp impressions. Choose self-inking, pre-inked or classic wooden handles.",
    basePrice: 180,
    minQty: 1,
    qtySteps: [1, 2, 5, 10, 25],
    papers: [
      { id: "wood", label: "Wooden Handle", multiplier: 1 },
      { id: "selfink", label: "Self-Inking", multiplier: 1.6 },
      { id: "preink", label: "Pre-Inked Pro", multiplier: 2.2 },
    ],
    finishes: [{ id: "none", label: "Standard", add: 0 }, { id: "dater", label: "With Dater", add: 0.5 }],
    turnarounds: commonTurnaround,
    emoji: "🖊️",
    color: "from-amber-400/20 to-orange-300/20",
    image: rubberStampsImg,
  },
  {
    slug: "tshirt-printing",
    name: "T-Shirt Printing",
    category: "apparel",
    tagline: "DTG, screen & sublimation",
    description: "Premium cotton tees printed with vivid, wash-proof inks. Team jerseys, event tees and merch drops made easy.",
    basePrice: 349,
    minQty: 1,
    qtySteps: [1, 10, 25, 50, 100, 250],
    papers: [
      { id: "cotton", label: "180 GSM Cotton", multiplier: 1 },
      { id: "biopique", label: "220 GSM Bio-Pique", multiplier: 1.35 },
      { id: "drifit", label: "Dri-Fit Polyester", multiplier: 1.5 },
    ],
    finishes: [
      { id: "single", label: "Single Side", add: 0 },
      { id: "double", label: "Front + Back", add: 0.35 },
      { id: "allover", label: "All-Over Print", add: 0.85 },
    ],
    turnarounds: commonTurnaround,
    emoji: "👕",
    color: "from-teal-500/20 to-emerald-300/20",
    image: tshirtImg,
  },
  {
    slug: "cap-printing",
    name: "Cap Printing",
    category: "apparel",
    tagline: "Embroidered & printed caps",
    description: "Structured baseball caps with embroidered or printed logos. Perfect for teams, cafes and giveaways.",
    basePrice: 249,
    minQty: 5,
    qtySteps: [5, 10, 25, 50, 100],
    papers: [
      { id: "cotton", label: "Cotton Twill", multiplier: 1 },
      { id: "trucker", label: "Trucker Mesh", multiplier: 1.15 },
      { id: "premium", label: "Premium Structured", multiplier: 1.4 },
    ],
    finishes: [
      { id: "print", label: "Vinyl Print", add: 0 },
      { id: "embroidery", label: "Embroidery", add: 0.5 },
    ],
    turnarounds: commonTurnaround,
    emoji: "🧢",
    color: "from-cyan-400/20 to-blue-300/20",
    image: capsImg,
  },
  {
    slug: "wedding-cards",
    name: "Wedding Cards",
    category: "life-events",
    tagline: "Luxury invites with foil & UV",
    description: "Hand-finished wedding invites with foil stamping, embossing and bespoke envelopes. Curate an unforgettable first impression.",
    basePrice: 24,
    minQty: 50,
    qtySteps: [50, 100, 250, 500, 1000],
    papers: [
      { id: "matte", label: "Matte 300 GSM", multiplier: 1 },
      { id: "pearl", label: "Pearl Shimmer", multiplier: 1.4 },
      { id: "handmade", label: "Handmade Cotton", multiplier: 1.85 },
    ],
    finishes: [
      { id: "none", label: "None", add: 0 },
      { id: "foil", label: "Gold Foil", add: 1.1 },
      { id: "emboss", label: "Emboss + Foil", add: 1.6 },
    ],
    turnarounds: commonTurnaround,
    emoji: "💍",
    color: "from-rose-300/20 to-amber-300/20",
    image: weddingCardsImg,
  },
  {
    slug: "birthday-cards",
    name: "Birthday Cards",
    category: "life-events",
    tagline: "Colourful invites for every age",
    description: "Playful, vibrant birthday invites with matching envelopes and RSVP inserts. Personalise with photos and themes.",
    basePrice: 12,
    minQty: 25,
    qtySteps: [25, 50, 100, 200, 500],
    papers: paperTiers,
    finishes: [
      { id: "none", label: "None", add: 0 },
      { id: "glossy", label: "Glossy", add: 0.4 },
      { id: "glitter", label: "Glitter Accent", add: 0.9 },
    ],
    turnarounds: commonTurnaround,
    emoji: "🎂",
    color: "from-pink-400/20 to-yellow-300/20",
    image: birthdayCardsImg,
  },
  {
    slug: "saree-function-cards",
    name: "Saree Function Cards",
    category: "life-events",
    tagline: "Traditional half-saree invites",
    description: "Elegant invitation cards for half-saree ceremonies with traditional motifs, gold accents and matching envelopes.",
    basePrice: 18,
    minQty: 50,
    qtySteps: [50, 100, 200, 500],
    papers: paperTiers,
    finishes: [
      { id: "none", label: "None", add: 0 },
      { id: "foil", label: "Gold Foil", add: 0.9 },
    ],
    turnarounds: commonTurnaround,
    emoji: "🥻",
    color: "from-fuchsia-400/20 to-rose-300/20",
    image: sareeCardsImg,
  },
  {
    slug: "death-ceremony-cards",
    name: "Death Ceremony Cards",
    category: "life-events",
    tagline: "Respectful memorial cards",
    description: "Discreet, tasteful ceremony cards printed with same-day dispatch. Available in traditional and modern layouts.",
    basePrice: 9,
    minQty: 50,
    qtySteps: [50, 100, 200, 500],
    papers: [
      { id: "standard", label: "Standard White", multiplier: 1 },
      { id: "ivory", label: "Ivory Textured", multiplier: 1.25 },
    ],
    finishes: [{ id: "none", label: "None", add: 0 }],
    turnarounds: commonTurnaround,
    emoji: "🕊️",
    color: "from-slate-400/20 to-slate-300/20",
    image: memorialCardsImg,
  },
  {
    slug: "photo-frames",
    name: "Photo Frames",
    category: "life-events",
    tagline: "Personalised framed prints & wall sets",
    description: "Museum-grade photo prints in premium wooden and synthetic frames — single portraits, couple frames with artistic overlays, and multi-frame wall collage sets. Ideal for weddings, anniversaries and home décor.",
    basePrice: 349,
    minQty: 1,
    qtySteps: [1, 2, 5, 10, 25],
    papers: [
      { id: "synthetic", label: "Synthetic Black Frame", multiplier: 1 },
      { id: "wooden", label: "Premium Wooden Frame", multiplier: 1.5 },
      { id: "collage", label: "12-Piece Collage Set", multiplier: 3.2 },
    ],
    finishes: [
      { id: "glossy", label: "Glossy Photo Print", add: 0 },
      { id: "matte", label: "Matte Fine-Art Print", add: 0.25 },
      { id: "canvas", label: "Canvas Texture", add: 0.55 },
    ],
    turnarounds: commonTurnaround,
    emoji: "🖼️",
    color: "from-amber-400/20 to-rose-300/20",
    image: photoFrame2.url,
    gallery: [photoFrame2.url, photoFrame3.url, photoFrame1.url],
  },
];

export type SelectedOptions = {
  quantity: number;
  paperId: string;
  finishId: string;
  turnaroundId: string;
};

export function computePrice(product: Product, opts: SelectedOptions): number {
  const paper = product.papers.find((p) => p.id === opts.paperId) ?? product.papers[0];
  const finish = product.finishes.find((f) => f.id === opts.finishId) ?? product.finishes[0];
  const turnaround = product.turnarounds.find((t) => t.id === opts.turnaroundId) ?? product.turnarounds[0];
  const unit = product.basePrice * paper.multiplier * (1 + finish.add) * turnaround.multiplier;
  // Volume discount for larger runs
  const volumeDiscount = opts.quantity >= 1000 ? 0.82 : opts.quantity >= 500 ? 0.9 : opts.quantity >= 250 ? 0.95 : 1;
  return Math.round(unit * opts.quantity * volumeDiscount);
}

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function formatINR(n: number): string {
  return "₹" + n.toLocaleString("en-IN");
}
