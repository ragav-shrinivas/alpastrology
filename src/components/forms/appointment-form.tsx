"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { whatsappLink } from "@/lib/utils";
import { BUSINESS_WHATSAPP } from "@/lib/constants";

const MODES = ["Online", "Physical"];
const SERVICES = [
  "ALP Astrology",
  "ALP Thirumana Porutham",
  "ALP Numerology",
  "ALP Gemology",
  "ALP Prasannam",
  "ALP Vastu",
];

const inputCls =
  "w-full rounded-xl border border-border bg-surface/60 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-primary/60";

export function AppointmentForm() {
  const [services, setServices] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const toggle = (s: string) =>
    setServices((cur) =>
      cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s],
    );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const email = String(fd.get("email") || "").trim();
    if (!name || !phone) {
      toast.error("Please enter your name and phone number.");
      return;
    }
    const message = [
      "Consultation appointment request",
      `Name: ${name}`,
      `Phone: ${phone}`,
      email ? `Email: ${email}` : null,
      `Date: ${fd.get("date") || "-"}`,
      `Time: ${fd.get("time") || "-"}`,
      `City/Country: ${fd.get("city") || "-"}`,
      `Mode: ${fd.get("mode") || "-"}`,
      `Services: ${services.join(", ") || "-"}`,
    ]
      .filter((l) => l !== null)
      .join("\n");

    setSubmitting(true);
    // Open WhatsApp now (still inside the click gesture) so it isn't blocked;
    // fall back to same-tab navigation if a pop-up blocker stops the new tab.
    const url = whatsappLink(BUSINESS_WHATSAPP, message);
    const win = window.open(url, "_blank", "noopener,noreferrer");

    // Backup copy to the admin inbox — non-blocking; never lose a lead.
    const supabase = createClient();
    void supabase
      .from("contacts")
      .insert({
        name,
        phone,
        email: email || null,
        subject: "Consultation Appointment",
        message,
      })
      .then(() => {}, () => {});

    if (!win) {
      window.location.assign(url);
      return;
    }
    setDone(true);
    toast.success("Opening WhatsApp to confirm your appointment…");
  }

  if (done) {
    return (
      <div className="border-border bg-surface/60 rounded-2xl border p-8 text-center">
        <h3 className="text-xl font-semibold text-white">Thank you!</h3>
        <p className="text-muted mt-2 text-sm">
          Your appointment request has been sent. Our office will contact you
          shortly to schedule your consultation.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="border-border bg-surface/40 mx-auto max-w-2xl space-y-4 rounded-2xl border p-6 md:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-muted mb-1.5 block text-xs">Select the Date</label>
          <input type="date" name="date" className={inputCls} />
        </div>
        <div>
          <label className="text-muted mb-1.5 block text-xs">Select the Time</label>
          <input type="time" name="time" className={inputCls} />
        </div>
      </div>
      <input name="name" placeholder="Name" className={inputCls} required />
      <input name="phone" placeholder="Phone Number" className={inputCls} required />
      <input name="email" type="email" placeholder="Email" className={inputCls} />
      <input name="city" placeholder="City/Country" className={inputCls} />
      <select name="mode" className={inputCls} defaultValue="">
        <option value="" disabled>
          Mode of Consultation
        </option>
        {MODES.map((m) => (
          <option key={m} value={m} className="bg-surface text-white">
            {m}
          </option>
        ))}
      </select>

      <div>
        <p className="mb-2 text-sm font-semibold text-white">Select Services</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {SERVICES.map((s) => (
            <label
              key={s}
              className="border-border bg-surface/50 hover:border-primary/50 flex cursor-pointer items-center justify-between gap-2 rounded-xl border px-4 py-3 text-sm text-white/90"
            >
              <span>{s}</span>
              <input
                type="checkbox"
                checked={services.includes(s)}
                onChange={() => toggle(s)}
                className="accent-primary size-4"
              />
            </label>
          ))}
        </div>
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={submitting}>
        {submitting ? "Sending…" : "Request Appointment"}
      </Button>
    </form>
  );
}
