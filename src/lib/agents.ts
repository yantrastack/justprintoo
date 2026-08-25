// Special Agents roster — designers on standby who accept urgent jobs
// dispatched from the JustPrint website. Each agent has a stable allotment
// ID and a WhatsApp number the customer is auto-connected to.

export type SpecialAgent = {
  id: string; // JP-SA-XXX allotment id
  name: string;
  role: string;
  specialty: string[];
  city: string;
  whatsapp: string; // international format, no +
  status: "online" | "busy" | "offline";
  rating: number;
  jobsDone: number;
  eta: string;
};

export const SPECIAL_AGENTS: SpecialAgent[] = [
  {
    id: "JP-SA-001",
    name: "Rakesh Varma",
    role: "Senior Design Agent",
    specialty: ["Visiting Cards", "Letterheads", "Rubber Stamps"],
    city: "Warangal",
    whatsapp: "918639736631",
    status: "online",
    rating: 4.9,
    jobsDone: 812,
    eta: "45 min",
  },
  {
    id: "JP-SA-002",
    name: "Anitha Reddy",
    role: "Wedding & Event Specialist",
    specialty: ["Wedding Cards", "Saree Function", "Photo Frames"],
    city: "Hanamkonda",
    whatsapp: "918639736631",
    status: "online",
    rating: 4.95,
    jobsDone: 540,
    eta: "1 hr",
  },
  {
    id: "JP-SA-003",
    name: "Mohd. Imran",
    role: "Hospital Stationery Lead",
    specialty: ["Hospital Files", "X-Ray Covers", "Prescription Pads"],
    city: "Kazipet",
    whatsapp: "918639736631",
    status: "busy",
    rating: 4.85,
    jobsDone: 388,
    eta: "2 hr",
  },
  {
    id: "JP-SA-004",
    name: "Sneha Palakurthi",
    role: "Apparel & Merch Designer",
    specialty: ["T-Shirts", "Caps", "Corporate Merch"],
    city: "Warangal",
    whatsapp: "918639736631",
    status: "online",
    rating: 4.88,
    jobsDone: 275,
    eta: "1.5 hr",
  },
  {
    id: "JP-SA-005",
    name: "Vinay Kumar",
    role: "Rush & Rapido Dispatch",
    specialty: ["Visiting Cards", "Pamphlets", "Bill Books"],
    city: "Warangal",
    whatsapp: "918639736631",
    status: "online",
    rating: 4.92,
    jobsDone: 611,
    eta: "30 min",
  },
];

export function assignRandomAgent(query?: string): SpecialAgent {
  const q = (query ?? "").toLowerCase();
  const eligible = SPECIAL_AGENTS.filter((a) => a.status === "online");
  const matched = q
    ? eligible.filter((a) => a.specialty.some((s) => q.includes(s.toLowerCase().split(" ")[0])))
    : [];
  const pool = matched.length > 0 ? matched : eligible;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function agentWhatsAppUrl(agent: SpecialAgent, requirement: string, location: string) {
  const msg =
    `Hi ${agent.name} (Agent ${agent.id}) — I was auto-assigned by JustPrint.com.\n\n` +
    `Requirement: ${requirement || "Urgent printing job"}\n` +
    `Location: ${location || "Warangal"}\n\n` +
    `Please share design options and delivery time via Rapido / transport.`;
  return `https://wa.me/${agent.whatsapp}?text=${encodeURIComponent(msg)}`;
}
