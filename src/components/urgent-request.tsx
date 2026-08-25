import { useState } from "react";
import { Zap, MapPin, Search, Send } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { assignRandomAgent, agentWhatsAppUrl } from "@/lib/agents";

export function UrgentRequestBar() {
  const [req, setReq] = useState("");
  const [loc, setLoc] = useState("Warangal");
  const [busy, setBusy] = useState(false);

  function dispatch() {
    if (!req.trim()) {
      toast.error("Type what you need — e.g. 'Need visiting cards emergency'");
      return;
    }
    setBusy(true);
    const agent = assignRandomAgent(req);
    toast.success(`Notifying agents… ${agent.name} (${agent.id}) accepted`, {
      description: `ETA ${agent.eta} · ${agent.city} · Opening WhatsApp`,
    });
    setTimeout(() => {
      window.open(agentWhatsAppUrl(agent, req, loc), "_blank", "noopener");
      setBusy(false);
    }, 900);
  }

  return (
    <div className="rounded-3xl border border-white/15 bg-white/95 p-4 shadow-elegant backdrop-blur">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-navy">
        <Zap className="h-3.5 w-3.5 text-teal" /> Special Agent · Urgent Dispatch
      </div>
      <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_auto]">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={req}
            onChange={(e) => setReq(e.target.value.slice(0, 140))}
            placeholder="Need visiting cards emergency"
            className="h-11 rounded-full border-muted bg-secondary pl-10"
            onKeyDown={(e) => e.key === "Enter" && dispatch()}
          />
        </div>
        <div className="relative">
          <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={loc}
            onChange={(e) => setLoc(e.target.value.slice(0, 60))}
            placeholder="Warangal"
            className="h-11 rounded-full border-muted bg-secondary pl-10"
            onKeyDown={(e) => e.key === "Enter" && dispatch()}
          />
        </div>
        <Button
          onClick={dispatch}
          disabled={busy}
          className="h-11 rounded-full bg-teal px-5 text-teal-foreground shadow-teal hover:bg-teal/90"
        >
          <Send className="mr-1.5 h-4 w-4" />
          {busy ? "Assigning…" : "Notify Agents"}
        </Button>
      </div>
      <p className="mt-2 text-[11px] text-muted-foreground">
        Auto-connects a random online Special Agent via WhatsApp · Rapido / transport at customer choice.
      </p>
    </div>
  );
}
