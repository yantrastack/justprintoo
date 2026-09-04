import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { BadgeCheck, MapPin, Star, Zap, MessageCircle, Shuffle } from "lucide-react";
import { SPECIAL_AGENTS, assignRandomAgent, agentWhatsAppUrl } from "@/lib/agents";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export const Route = createFileRoute("/agents")({
  head: () => ({
    meta: [
      { title: "Special Agents Workspace — JustPrint" },
      { name: "description", content: "JustPrint's Special Agents workspace — designers on standby with allotment IDs, auto-routed via WhatsApp for urgent print jobs." },
      { name: "robots", content: "noindex, follow" },
    ],
  }),
  component: AgentsPage,
});

function AgentsPage() {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return SPECIAL_AGENTS;
    return SPECIAL_AGENTS.filter(
      (a) =>
        a.name.toLowerCase().includes(t) ||
        a.id.toLowerCase().includes(t) ||
        a.city.toLowerCase().includes(t) ||
        a.specialty.some((s) => s.toLowerCase().includes(t)),
    );
  }, [q]);

  function autoAssign() {
    const a = assignRandomAgent(q);
    toast.success(`${a.name} (${a.id}) auto-assigned`, { description: `${a.city} · ETA ${a.eta}` });
    window.open(agentWhatsAppUrl(a, q || "New print job", "Warangal"), "_blank", "noopener");
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-teal/10 px-3 py-1 text-xs font-medium text-teal">
            <Zap className="h-3.5 w-3.5" /> Workspace · Auto-routing enabled
          </div>
          <h1 className="mt-3 font-display text-3xl font-semibold text-navy sm:text-4xl">Special Agents</h1>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            Specialist designers with a stable JustPrint allotment ID. When a customer files an urgent
            requirement, the system picks a random online agent whose speciality matches — they connect via
            WhatsApp and dispatch by Rapido or transport per the customer's choice.
          </p>
        </div>
        <Button onClick={autoAssign} className="rounded-full bg-teal text-teal-foreground shadow-teal hover:bg-teal/90">
          <Shuffle className="mr-1.5 h-4 w-4" /> Auto-assign a job
        </Button>
      </div>

      <div className="mt-6 max-w-md">
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by name, ID, city or speciality…"
          className="h-11 rounded-full bg-secondary"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((a) => {
          const online = a.status === "online";
          return (
            <div key={a.id} className="rounded-3xl border bg-card p-5 transition hover:-translate-y-0.5 hover:shadow-elegant">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-teal">
                    <BadgeCheck className="h-3.5 w-3.5" /> {a.id}
                  </div>
                  <div className="mt-1 font-display text-lg font-semibold text-navy">{a.name}</div>
                  <div className="text-xs text-muted-foreground">{a.role}</div>
                </div>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${
                    online ? "bg-emerald-100 text-emerald-700" : a.status === "busy" ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${online ? "bg-emerald-500" : a.status === "busy" ? "bg-amber-500" : "bg-slate-400"}`} />
                  {a.status}
                </span>
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {a.specialty.map((s) => (
                  <span key={s} className="rounded-full bg-secondary px-2 py-0.5 text-[11px] text-navy">{s}</span>
                ))}
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                <div className="rounded-xl bg-secondary p-2">
                  <div className="flex items-center gap-1 text-muted-foreground"><MapPin className="h-3 w-3" /> City</div>
                  <div className="mt-0.5 font-medium text-navy">{a.city}</div>
                </div>
                <div className="rounded-xl bg-secondary p-2">
                  <div className="flex items-center gap-1 text-muted-foreground"><Star className="h-3 w-3" /> Rating</div>
                  <div className="mt-0.5 font-medium text-navy">{a.rating}</div>
                </div>
                <div className="rounded-xl bg-secondary p-2">
                  <div className="flex items-center gap-1 text-muted-foreground"><Zap className="h-3 w-3" /> ETA</div>
                  <div className="mt-0.5 font-medium text-navy">{a.eta}</div>
                </div>
              </div>

              <a
                href={agentWhatsAppUrl(a, "Direct connect from JustPrint workspace", a.city)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1ebe57]"
              >
                <MessageCircle className="h-4 w-4" /> Connect on WhatsApp
              </a>
              <div className="mt-1 text-center text-[11px] text-muted-foreground">{a.jobsDone} jobs delivered</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
