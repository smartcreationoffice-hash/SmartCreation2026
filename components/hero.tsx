"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { ArrowRight, Play, Star } from "lucide-react";
import { googleRating, trustpilotRating } from "@/lib/data";

const ServiceDonut = dynamic(
  () =>
    import("@/components/service-donut").then((m) => ({
      default: m.ServiceDonut,
    })),
  {
    ssr: false,
    loading: () => null,
  },
);

const trustItems = [
  { value: "6+", label: "Years in U.A.E.", meta: "Founded 2020" },
  { value: "6", label: "Business centers", meta: "Owned & operated, Dubai" },
  { value: "12", label: "Group companies", meta: "Across UAE, Canada & Pakistan" },
  { value: "10,000+", label: "Companies launched", meta: "Across every emirate" },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Cursor-following ambient glow. Uses CSS custom properties so the
  // radial gradient tracks the mouse without re-rendering React.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    // Skip on touch / coarse pointer
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0;
    let pendingX = 78;
    let pendingY = 25;

    const apply = () => {
      el.style.setProperty("--glow-x", `${pendingX}%`);
      el.style.setProperty("--glow-y", `${pendingY}%`);
      raf = 0;
    };

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      pendingX = ((e.clientX - rect.left) / rect.width) * 100;
      pendingY = ((e.clientY - rect.top) / rect.height) * 100;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      pendingX = 78;
      pendingY = 25;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    apply();

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      data-dark-hero
      className="relative overflow-hidden pt-32 md:pt-40 pb-20 md:pb-28 bg-ink text-paper"
      style={
        {
          "--glow-x": "78%",
          "--glow-y": "25%",
        } as React.CSSProperties
      }
    >
      {/* Cursor-following ambient glow — subtle */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(720px circle at var(--glow-x) var(--glow-y), rgba(72,168,219,0.25), transparent 60%)",
        }}
      />
      {/* Secondary soft pool on the left */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-40 h-[560px] w-[560px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(72,168,219,0.12), rgba(72,168,219,0) 70%)",
        }}
      />
      {/* Decorative grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #f6f3ec 1px, transparent 1px), linear-gradient(to bottom, #f6f3ec 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse at center, black 45%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 45%, transparent 80%)",
        }}
      />

      <div className="container-edit relative">
        {/* Masthead line — visible immediately for LCP/SI */}
        <div className="mb-10 flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-mist">
          <span className="h-px w-8 bg-paper/25" />
          <span>Smart Creation Group of Companies · UAE · Canada · Pakistan</span>
        </div>

        <div className="grid grid-cols-12 gap-x-4 md:gap-x-8 gap-y-14 items-center">
          {/* Left — headline + cta (no entrance fade so LCP fires on first paint) */}
          <div className="col-span-12 lg:col-span-7">
            <h1 className="font-display font-medium tracking-[-0.03em] leading-[0.98] text-[clamp(2.4rem,6.2vw,4.8rem)] text-paper text-balance">
              <span className="block">A group of companies</span>
              <span className="block">built around your</span>
              <span className="block text-brand">business success.</span>
            </h1>

            <p className="mt-7 max-w-[34rem] text-[1.05rem] md:text-[1.12rem] leading-relaxed text-paper/70 text-pretty">
              Smart Creation Group brings six Dubai business centers together with company formation, technology, real estate, holiday rentals, transport and contracting. One trusted partner since 2020.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3.5 text-[0.95rem] font-medium text-ink transition-colors hover:bg-paper shadow-[0_10px_30px_-10px_rgba(72,168,219,0.55)]"
              >
                Book a free consultation
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
              </Link>
              <Link
                href="#services"
                className="group inline-flex items-center gap-2 rounded-full border border-paper/20 bg-paper/5 backdrop-blur px-5 py-3 text-[0.9rem] text-paper hover:bg-paper/10 transition-colors"
              >
                <Play className="h-3 w-3 fill-brand text-brand" strokeWidth={0} />
                Explore services
              </Link>
            </div>

            {/* Rating chips */}
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
              <div
                className="inline-flex items-center gap-2.5"
                aria-label={`Google reviews · ${googleRating.average} out of 5`}
              >
                <HeroGoogleLogo className="h-5 w-5 shrink-0" />
                <div className="flex items-center gap-1.5">
                  <StarRow value={googleRating.average} />
                  <span className="text-[0.92rem] font-semibold text-paper tabular-nums">
                    {googleRating.average.toFixed(1)}
                  </span>
                  <span className="text-[0.85rem] text-paper/65">Google</span>
                </div>
              </div>

              <span aria-hidden className="hidden sm:block h-4 w-px bg-paper/15" />

              <div
                className="inline-flex items-center gap-2.5"
                aria-label={`Trustpilot · ${trustpilotRating.average} out of 5`}
              >
                <TrustpilotMark className="h-5 w-5 shrink-0" />
                <div className="flex items-center gap-1.5">
                  <StarRow value={trustpilotRating.average} variant="trustpilot" />
                  <span className="text-[0.92rem] font-semibold text-paper tabular-nums">
                    {trustpilotRating.average.toFixed(1)}
                  </span>
                  <span className="text-[0.85rem] text-paper/65">Trustpilot</span>
                </div>
              </div>
            </div>

            {/* Office status */}
            <div className="mt-12 flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-mist">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 inline-flex animate-ping rounded-full bg-brand opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
              </span>
              <span>Office open · Barsha Heights, Dubai</span>
            </div>
          </div>

          {/* Right — rotating services donut (desktop only; heavy SVG hurts mobile LCP) */}
          <div className="hidden lg:block lg:col-span-5 relative">
            <div className="relative mx-auto lg:mx-0 aspect-square max-w-md">
              <ServiceDonut className="h-full w-full" />
            </div>
          </div>
        </div>

        {/* Trust strip */}
        <div className="mt-20 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-y-10 border-t border-paper/15 pt-10">
          {trustItems.map((item, i) => (
            <div
              key={item.label}
              className={
                "px-1 md:px-6 relative " +
                (i > 0 ? "md:border-l md:border-paper/15" : "")
              }
            >
              <div className="font-display font-medium text-[2.2rem] md:text-[2.5rem] leading-none tracking-[-0.03em] text-paper">
                {item.value}
              </div>
              <div className="mt-3 text-[0.92rem] text-paper">
                {item.label}
              </div>
              <div className="mt-1 font-mono text-[0.68rem] uppercase tracking-[0.15em] text-mist">
                {item.meta}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StarRow({ value, variant = "google" }: { value: number; variant?: "google" | "trustpilot" }) {
  const full = Math.floor(value);
  const hasHalf = value - full >= 0.25 && value - full < 0.75;
  const filledCount = hasHalf ? full + 0.5 : Math.round(value);
  const color = variant === "trustpilot" ? "#00B67A" : "#FBBC04";

  return (
    <span className="inline-flex items-center gap-[2px]" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => {
        const isFull = i < Math.floor(filledCount);
        const isHalf = !isFull && hasHalf && i === full;
        return (
          <span key={i} className="relative inline-flex">
            <Star className="h-3.5 w-3.5 text-paper/25" strokeWidth={1.5} fill="currentColor" />
            {(isFull || isHalf) && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: isHalf ? "50%" : "100%" }}
              >
                <Star
                  className="h-3.5 w-3.5"
                  strokeWidth={1.5}
                  fill={color}
                  color={color}
                />
              </span>
            )}
          </span>
        );
      })}
    </span>
  );
}

function HeroGoogleLogo({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden xmlns="http://www.w3.org/2000/svg">
      <path fill="#4285F4" d="M43.6 20.1H42V20H24v8h11.3c-1.6 4.7-6 8-11.3 8a12 12 0 1 1 0-24c3 0 5.8 1.1 7.9 2.9l5.7-5.7A20 20 0 1 0 44 24c0-1.3-.1-2.6-.4-3.9z" />
      <path fill="#34A853" d="M6.3 14.7l6.6 4.8A12 12 0 0 1 24 12c3 0 5.8 1.1 7.9 2.9l5.7-5.7A20 20 0 0 0 6.3 14.7z" />
      <path fill="#FBBC05" d="M24 44a20 20 0 0 0 13.5-5.2l-6.2-5.3a12 12 0 0 1-18-6.3l-6.6 5.1A20 20 0 0 0 24 44z" />
      <path fill="#EA4335" d="M43.6 20.1H42V20H24v8h11.3a12 12 0 0 1-4 5.5l6.2 5.3c-.4.4 6.6-4.9 6.6-14.8 0-1.3-.1-2.6-.5-3.9z" />
    </svg>
  );
}

function TrustpilotMark({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden xmlns="http://www.w3.org/2000/svg">
      <path fill="#00B67A" d="M12 0l2.95 8.55H24l-7.36 5.34L19.55 24 12 18.55 4.45 24l2.91-10.11L0 8.55h9.05z" />
    </svg>
  );
}
