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
  { value: "7+", label: "Years in U.A.E.", meta: "Founded 2020" },
  { value: "6", label: "Business centers", meta: "Owned & operated, Dubai" },
  { value: "12", label: "Group companies", meta: "Across UAE, Canada & Pakistan" },
  { value: "3,000+", label: "Companies launched", meta: "Across every emirate" },
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

            {/* Ratings — full logos + stars */}
            <div className="mt-8 flex flex-wrap items-center gap-x-9 gap-y-6">
              <div
                className="flex flex-col items-start gap-2"
                aria-label={`Google rating ${googleRating.average} out of 5 from ${googleRating.count} reviews`}
              >
                <GoogleWordmark className="h-[1.4rem] w-auto" />
                <div className="flex items-center gap-2">
                  <StarRow value={googleRating.average} />
                  <span className="text-[0.82rem] text-paper/65">
                    <span className="font-semibold text-paper tabular-nums">
                      {googleRating.average.toFixed(1)}
                    </span>
                    <span className="text-paper/40"> / 5</span>
                  </span>
                </div>
              </div>

              <span aria-hidden className="hidden sm:block h-11 w-px bg-paper/15" />

              <div
                className="flex flex-col items-start gap-2"
                aria-label={`Trustpilot rating ${trustpilotRating.average} out of 5 from ${trustpilotRating.count} reviews`}
              >
                <TrustpilotLogo />
                <div className="flex items-center gap-2">
                  <TrustpilotStars value={trustpilotRating.average} />
                  <span className="text-[0.82rem] text-paper/65">
                    <span className="font-semibold text-paper tabular-nums">
                      {trustpilotRating.average.toFixed(1)}
                    </span>
                    <span className="text-paper/40"> / 5</span>
                  </span>
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

/** Full multicolour "Google" wordmark (official 2015 logo). */
function GoogleWordmark({ className = "h-5 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 272 92" className={className} aria-hidden xmlns="http://www.w3.org/2000/svg">
      <path fill="#EA4335" d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" />
      <path fill="#FBBC05" d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" />
      <path fill="#4285F4" d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z" />
      <path fill="#34A853" d="M225 3v65h-9.5V3h9.5z" />
      <path fill="#EA4335" d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.06zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z" />
      <path fill="#4285F4" d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z" />
    </svg>
  );
}

/** Full Trustpilot logo — signature green star + wordmark. */
function TrustpilotLogo() {
  return (
    <span className="inline-flex items-center gap-1.5">
      <svg viewBox="0 0 24 24" className="h-[1.25rem] w-[1.25rem]" aria-hidden xmlns="http://www.w3.org/2000/svg">
        <path fill="#00B67A" d="M12 0l2.95 8.55H24l-7.36 5.34L19.55 24 12 18.55 4.45 24l2.91-10.11L0 8.55h9.05z" />
      </svg>
      <span className="font-display text-[1.18rem] font-semibold leading-none tracking-[-0.01em] text-paper">
        Trustpilot
      </span>
    </span>
  );
}

/** Trustpilot's boxed green star rating (partial fill on the last box). */
function TrustpilotStars({ value }: { value: number }) {
  return (
    <span className="inline-flex items-center gap-[3px]" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = Math.max(0, Math.min(1, value - i));
        return (
          <span
            key={i}
            className="relative inline-flex h-[17px] w-[17px] items-center justify-center overflow-hidden rounded-[3px] bg-paper/25"
          >
            {fill > 0 && (
              <span
                className="absolute inset-y-0 left-0 bg-[#00B67A]"
                style={{ width: `${fill * 100}%` }}
              />
            )}
            <svg viewBox="0 0 24 24" className="relative h-[11px] w-[11px]" aria-hidden xmlns="http://www.w3.org/2000/svg">
              <path fill="#fff" d="M12 0l2.95 8.55H24l-7.36 5.34L19.55 24 12 18.55 4.45 24l2.91-10.11L0 8.55h9.05z" />
            </svg>
          </span>
        );
      })}
    </span>
  );
}
