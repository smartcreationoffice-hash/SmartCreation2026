"use client";

import { useState } from "react";
import {
  Calendar,
  ChevronDown,
  Loader2,
  CheckCircle2,
  User,
  Mail,
} from "lucide-react";
import {
  PhoneInput,
  emptyPhoneValue,
  type PhoneInputValue,
} from "@/components/phone-input";

export function CardConsultation({ source = "Digital card" }: { source?: string }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);
  const [phone, setPhone] = useState<PhoneInputValue>(emptyPhoneValue());
  const [showPhoneError, setShowPhoneError] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!phone.valid) {
      setShowPhoneError(true);
      return;
    }
    setStatus("sending");
    setError(null);

    const data = new FormData(e.currentTarget);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: phone.e164,
      topic: source,
      message:
        String(data.get("message") ?? "").trim() ||
        `Consultation request from ${source}.`,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json: { ok?: boolean; error?: string } = await res
        .json()
        .catch(() => ({}));
      if (!res.ok || !json.ok) throw new Error(json.error || "Failed to send");
      setStatus("sent");
    } catch (err) {
      setStatus("idle");
      setError((err as Error).message || "Something went wrong. Please try again.");
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="group flex w-full items-center justify-between rounded-2xl border border-brand/40 bg-brand-wash px-5 py-3.5 transition-colors hover:border-brand hover:bg-brand/10"
      >
        <span className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand/15 text-brand-deep">
            <Calendar className="h-4 w-4" strokeWidth={1.9} />
          </span>
          <span className="text-[0.95rem] font-medium text-ink">
            Book a free consultation
          </span>
        </span>
        <ChevronDown
          className={
            "h-4 w-4 text-brand-deep transition-transform " + (open ? "rotate-180" : "")
          }
          strokeWidth={2}
        />
      </button>

      {open &&
        (status === "sent" ? (
          <div className="mt-2 flex items-start gap-3 rounded-2xl border border-brand/30 bg-brand-wash px-5 py-4">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-deep" strokeWidth={1.8} />
            <div>
              <p className="text-[0.95rem] font-medium text-ink">Request received</p>
              <p className="mt-0.5 text-[0.85rem] text-ink-mute">
                Thank you — we&apos;ll be in touch shortly.
              </p>
            </div>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            className="mt-2 space-y-2.5 rounded-2xl border border-ink/10 bg-paper-soft px-4 py-4"
          >
            <div className="relative">
              <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone" strokeWidth={1.8} />
              <input
                name="name"
                required
                placeholder="Full name"
                className="w-full rounded-xl border border-ink/15 bg-paper py-2.5 pl-9 pr-3 text-[0.95rem] text-ink placeholder:text-stone/80 outline-none transition-colors focus:border-brand-deep"
              />
            </div>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone" strokeWidth={1.8} />
              <input
                name="email"
                type="email"
                required
                placeholder="Email"
                className="w-full rounded-xl border border-ink/15 bg-paper py-2.5 pl-9 pr-3 text-[0.95rem] text-ink placeholder:text-stone/80 outline-none transition-colors focus:border-brand-deep"
              />
            </div>
            <PhoneInput value={phone} onChange={setPhone} showError={showPhoneError} />
            <textarea
              name="message"
              rows={3}
              placeholder="Message (optional)"
              className="w-full resize-none rounded-xl border border-ink/15 bg-paper px-3 py-2.5 text-[0.95rem] text-ink placeholder:text-stone/80 outline-none transition-colors focus:border-brand-deep"
            />
            {error && <p className="text-[0.82rem] text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={status === "sending"}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-night px-6 py-3.5 text-[0.95rem] font-medium text-paper transition-colors hover:bg-brand hover:text-ink disabled:opacity-70"
            >
              {status === "sending" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
                  Sending…
                </>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        ))}
    </div>
  );
}
