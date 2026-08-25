import { useState } from "react";
import { z } from "zod";
import { CalendarClock, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const WA_NUMBER = "918639736631";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  email: z.string().trim().email("Invalid email").max(160),
  phone: z.string().trim().min(7, "Enter a valid phone").max(20).regex(/^[\d+\-\s()]+$/, "Digits only"),
});

export function InquiryForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  function schedule() {
    const parsed = schema.safeParse({ name, email, phone });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    const msg =
      `Hi JustPrint.com — I'd like to schedule a call.\n\n` +
      `Name: ${parsed.data.name}\nEmail: ${parsed.data.email}\nPhone: ${parsed.data.phone}\n\n` +
      `I'm interested in a special design & printing job.`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
    toast.success("Opening WhatsApp with your details…");
  }

  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-6 text-primary-foreground shadow-elegant sm:p-10">
        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_80%_20%,white_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-teal" /> Let's collaborate
            </div>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-4xl">
              Ready to Build Special Design &amp; Printing Material?
            </h2>
            <p className="mt-3 max-w-md text-sm text-white/75">
              Tell us who you are and we'll ring you within business hours — or one tap opens WhatsApp so a
              JustPrint specialist can start your brief instantly.
            </p>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl">
            <div className="grid gap-3">
              <div>
                <label className="text-xs font-medium text-white/70">Name</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="mt-1 h-11 rounded-xl border-white/20 bg-white/10 text-white placeholder:text-white/50 focus-visible:ring-teal"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-white/70">Email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="mt-1 h-11 rounded-xl border-white/20 bg-white/10 text-white placeholder:text-white/50 focus-visible:ring-teal"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-white/70">Phone number</label>
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="mt-1 h-11 rounded-xl border-white/20 bg-white/10 text-white placeholder:text-white/50 focus-visible:ring-teal"
                />
              </div>
              <Button
                onClick={schedule}
                size="lg"
                className="mt-2 h-12 w-full rounded-xl bg-teal text-teal-foreground shadow-teal hover:bg-teal/90"
              >
                <CalendarClock className="mr-2 h-4 w-4" /> Schedule a Call With JustPrint
              </Button>
              <p className="text-center text-[11px] text-white/60">
                Clicking connects you to our WhatsApp service instantly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
