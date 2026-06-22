"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ServicesAscentSteps } from "@/components/services-ascent-steps";
import { m, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Briefcase,
  Building2,
  Calculator,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  type LucideIcon,
} from "lucide-react";
import { services } from "@/lib/data";
import { SectionHeader } from "@/components/ui/section-header";

type Pillar = {
  id: string;
  index: string;
  title: string;
  short: string;
  tagline: string;
  bullets: string[];
  href: string;
  icon: LucideIcon;
};

const corePillars: Pillar[] = [
  {
    id: "business-setup",
    index: "01",
    title: "Business Setup & Formation",
    short: "Get set up",
    tagline:
      "Pick the right jurisdiction — mainland, free zone or offshore — then the trade licence, the bank account and the visas. One team owns the whole setup.",
    bullets: [
      "Mainland · free zone · offshore",
      "Trade licence & legal structure",
      "Corporate bank account",
      "Investor & employee visas · PRO",
    ],
    href: "/business-setup",
    icon: Briefcase,
  },
  {
    id: "financial-services",
    index: "02",
    title: "Financial Services",
    short: "Books, VAT & tax",
    tagline:
      "Accounting, bookkeeping and payroll kept on a calendar — VAT, Corporate Tax and audit-ready closes filed before the deadline, not under it.",
    bullets: [
      "Accounting & bookkeeping",
      "VAT registration & returns",
      "Corporate Tax registration & filing",
      "Payroll, audit & banking support",
    ],
    href: "/financial",
    icon: Calculator,
  },
  {
    id: "business-centres",
    index: "03",
    title: "Business Centers",
    short: "Office space, ready",
    tagline:
      "Move-in-ready offices, flexi-desks and meeting rooms across our UAE business centers — with the Ejari and licensed address your trade licence needs.",
    bullets: [
      "Move-in-ready private offices",
      "Flexi-desks & meeting rooms",
      "Ejari & licensed business address",
      "Prime locations across the UAE",
    ],
    href: "/business-centers",
    icon: Building2,
  },
];

const AUTO_INTERVAL_MS = 5000;

export function Services() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [progressKey, setProgressKey] = useState(0); // bump to restart progress bar animation
  const touchStartX = useRef<number | null>(null);

  const active = corePillars[activeIdx];
  const ActiveIcon = active.icon;
  const total = corePillars.length;

  // Jump to a step. Interaction no longer pauses autoplay — the deck always
  // keeps cycling every AUTO_INTERVAL_MS; only the Pause button stops it.
  const goTo = useCallback(
    (i: number) => {
      setActiveIdx(((i % total) + total) % total);
      setProgressKey((k) => k + 1);
    },
    [total],
  );
  const next = useCallback(() => goTo(activeIdx + 1), [activeIdx, goTo]);
  const prev = useCallback(() => goTo(activeIdx - 1), [activeIdx, goTo]);

  // Auto-advance — restarts whenever activeIdx or autoplay changes
  useEffect(() => {
    if (!autoplay) return;
    const t = setTimeout(next, AUTO_INTERVAL_MS);
    return () => clearTimeout(t);
  }, [activeIdx, autoplay, next]);

  // Swipe handlers (mobile)
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) {
      if (dx < 0) next();
      else prev();
    }
    touchStartX.current = null;
  };

  return (
    <section id="services" className="relative pt-10 md:pt-16 pb-16 md:pb-24">
      <div className="container-edit">
        {/* ── Section header (left-aligned) + bespoke ascent vector ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-y-6 gap-x-8 lg:gap-x-8">
          <div className="lg:col-span-7">
            <SectionHeader
              align="left"
              section="§ 01 · Services"
              title={
                <>
                  Built for every step of building{" "}
                  <span className="text-brand-deep">a UAE business.</span>
                </>
              }
              lede="From your first day in Dubai to your tenth — one accountable team handles the licence, the books, the tax, the visas, and every signature in between."
            />
          </div>
          <div className="lg:col-span-5 hidden lg:flex items-center justify-center lg:justify-end">
            <div className="w-full max-w-[18rem] lg:max-w-[26rem]">
              <ServicesAscentSteps />
            </div>
          </div>
        </div>

        {/* ── Interactive showcase · 3 steps ───────────────────────── */}
        <div className="mt-4 md:mt-6 relative">
          {/* TAB STRIP — all three steps fit as a clean grid on every size */}
          <div className="relative">
            <ul
              role="tablist"
              aria-label="Core services"
              className="grid grid-cols-3 border-y border-ink/15"
            >
              {corePillars.map((p, i) => {
                const isActive = i === activeIdx;
                return (
                  <li
                    key={p.id}
                    className={i > 0 ? "border-l border-ink/12" : ""}
                  >
                    <button
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onMouseEnter={() => {
                        if (window.matchMedia("(pointer: fine)").matches) goTo(i);
                      }}
                      onFocus={() => goTo(i)}
                      onClick={() => goTo(i)}
                      className="group relative flex h-full w-full flex-col items-start gap-1 md:gap-1.5 px-2.5 py-3.5 md:px-5 md:py-6 text-left transition-colors hover:bg-paper-soft focus:outline-none focus-visible:bg-paper-soft"
                    >
                      {/* Top progress / hover bar */}
                      {isActive ? (
                        <m.span
                          aria-hidden
                          key={"prog-" + progressKey}
                          initial={{ width: "0%" }}
                          animate={{
                            width: autoplay ? "100%" : `${(1 / 1) * 100}%`,
                          }}
                          transition={{
                            duration: autoplay ? AUTO_INTERVAL_MS / 1000 : 0.35,
                            ease: "linear",
                          }}
                          className="absolute top-0 left-0 h-[2px] bg-brand"
                        />
                      ) : (
                        <span
                          aria-hidden
                          className="absolute top-0 left-0 h-[2px] w-0 bg-brand/60 group-hover:w-1/3 transition-all duration-500"
                        />
                      )}
                      <span
                        className={
                          "font-display font-medium leading-none tracking-[-0.02em] transition-colors " +
                          (isActive ? "text-brand-deep" : "text-ink/40 group-hover:text-ink/70")
                        }
                        style={{ fontSize: "clamp(1.3rem,5.5vw,2rem)" }}
                      >
                        {p.index}
                      </span>
                      <span className="block font-display text-[0.8rem] md:text-[1rem] font-semibold leading-tight tracking-[-0.015em] text-ink text-balance">
                        {p.title}
                      </span>
                      <span className="hidden md:block font-mono text-[0.58rem] uppercase tracking-[0.18em] text-stone truncate w-full">
                        {p.short}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* SPOTLIGHT PANE */}
          <div
            role="tabpanel"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            className="relative overflow-hidden bg-ink text-paper border-x border-b border-ink/15"
          >
            {/* Dual radial washes that shift when active changes */}
            <m.div
              aria-hidden
              key={"wash-" + activeIdx}
              initial={{ opacity: 0, scale: 0.94, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none absolute -top-40 -right-40 h-[560px] w-[560px] rounded-full"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(72,168,219,0.32), rgba(72,168,219,0) 70%)",
              }}
            />
            <m.div
              aria-hidden
              key={"wash2-" + activeIdx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.05 }}
              className="pointer-events-none absolute -bottom-40 -left-40 h-[460px] w-[460px] rounded-full"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(72,168,219,0.18), rgba(72,168,219,0) 70%)",
              }}
            />

            {/* Faint editorial grid */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.05]"
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

            <div className="relative grid grid-cols-12 content-center gap-x-4 md:gap-x-10 gap-y-10 px-6 sm:px-8 md:px-12 lg:px-14 py-12 md:py-16 lg:py-20 md:min-h-[480px] lg:min-h-[520px]">
              {/* GHOST INDEX in the corner */}
              <m.div
                aria-hidden
                key={"idx-" + activeIdx}
                initial={{ opacity: 0, x: -16, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-none absolute top-6 right-6 md:top-10 md:right-12"
              >
                <span
                  className="font-display font-medium leading-none tracking-[-0.045em] text-paper/[0.08]"
                  style={{ fontSize: "clamp(6rem,16vw,16rem)" }}
                >
                  {active.index}
                </span>
              </m.div>

              {/* LEFT · Title + tagline + CTA */}
              <div className="relative col-span-12 lg:col-span-7">
                <AnimatePresence mode="wait">
                  <m.div
                    key={"title-" + activeIdx}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="inline-flex items-center gap-2 rounded-full border border-paper/15 bg-paper/[0.04] px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-mist mb-6">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
                      Step {active.index} / {String(total).padStart(2, "0")}
                    </div>
                    <h3 className="font-display font-semibold tracking-[-0.025em] leading-[1.02] text-[clamp(1.9rem,4.4vw,3.4rem)] text-paper text-balance">
                      {active.title}.
                    </h3>
                    <p className="mt-6 max-w-[34rem] text-[1.04rem] md:text-[1.12rem] leading-relaxed text-paper/75 text-pretty">
                      {active.tagline}
                    </p>

                    <div className="mt-9 flex flex-wrap items-center gap-3">
                      <Link
                        href={active.href}
                        className="group inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3.5 text-[0.95rem] font-medium text-ink transition-colors hover:bg-paper shadow-[0_10px_30px_-10px_rgba(72,168,219,0.55)]"
                      >
                        Explore {active.short.toLowerCase()}
                        <ArrowUpRight
                          className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          strokeWidth={2}
                        />
                      </Link>
                      <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-mist hidden sm:inline-flex">
                        Or hover the tabs above
                      </span>
                    </div>
                  </m.div>
                </AnimatePresence>
              </div>

              {/* RIGHT · Icon plate + included list */}
              <div className="relative col-span-12 lg:col-span-5">
                <AnimatePresence mode="wait">
                  <m.div
                    key={"bullets-" + activeIdx}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{
                      duration: 0.55,
                      delay: 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <div className="flex items-center justify-center md:justify-start mb-6">
                      <span className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-paper/15 bg-paper/[0.06] text-brand-soft">
                        <span
                          aria-hidden
                          className="absolute inset-0 rounded-2xl bg-brand/25 blur-xl opacity-80"
                        />
                        <ActiveIcon className="relative h-7 w-7" strokeWidth={1.6} />
                      </span>
                    </div>

                    <div className="font-mono text-[0.66rem] uppercase tracking-[0.22em] text-mist mb-4">
                      What's included
                    </div>
                    <ul className="space-y-2.5">
                      {active.bullets.map((b, i) => (
                        <m.li
                          key={b}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.45,
                            delay: 0.14 + i * 0.08,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="flex items-start gap-3 text-[0.96rem] leading-snug text-paper/90"
                        >
                          <CheckCircle2
                            className="h-4 w-4 text-brand shrink-0 mt-0.5"
                            strokeWidth={1.8}
                          />
                          <span>{b}</span>
                        </m.li>
                      ))}
                    </ul>
                  </m.div>
                </AnimatePresence>
              </div>
            </div>

            {/* CONTROL BAR — prev / pause / next + dots */}
            <div className="relative border-t border-paper/10 px-4 sm:px-8 md:px-12 lg:px-14 py-4 flex items-center justify-between gap-3">
              {/* Dots */}
              <div className="flex items-center gap-1.5">
                {corePillars.map((p, i) => {
                  const isActive = i === activeIdx;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      aria-label={`Show ${p.title}`}
                      onClick={() => goTo(i)}
                      className={
                        "relative h-1.5 rounded-full transition-all " +
                        (isActive
                          ? "w-10 bg-brand"
                          : "w-1.5 bg-paper/25 hover:bg-paper/45")
                      }
                    >
                      {isActive && autoplay && (
                        <m.span
                          aria-hidden
                          key={"dot-prog-" + progressKey}
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{
                            duration: AUTO_INTERVAL_MS / 1000,
                            ease: "linear",
                          }}
                          className="absolute inset-y-0 left-0 rounded-full bg-paper/40"
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => prev()}
                  aria-label="Previous service"
                  className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-paper/15 bg-paper/[0.04] text-paper/80 hover:bg-paper/10 hover:text-paper transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" strokeWidth={1.8} />
                </button>
                <button
                  type="button"
                  onClick={() => setAutoplay((v) => !v)}
                  aria-label={autoplay ? "Pause autoplay" : "Resume autoplay"}
                  className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-paper/15 bg-paper/[0.04] text-paper/80 hover:bg-paper/10 hover:text-paper transition-colors"
                >
                  {autoplay ? (
                    <Pause className="h-3.5 w-3.5" strokeWidth={1.8} />
                  ) : (
                    <Play className="h-3.5 w-3.5" strokeWidth={1.8} />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => next()}
                  aria-label="Next service"
                  className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-paper/15 bg-paper/[0.04] text-paper/80 hover:bg-paper/10 hover:text-paper transition-colors"
                >
                  <ChevronRight className="h-4 w-4" strokeWidth={1.8} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Plus everything else — full 12-service catalog ────────── */}
        <m.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 md:mt-28"
        >
          <div className="flex items-end justify-between gap-6 flex-wrap mb-8 md:mb-10">
            <div>
              <div className="font-mono text-[0.66rem] uppercase tracking-[0.22em] text-stone mb-3">
                — and the rest of the stack
              </div>
              <h3 className="font-display font-medium text-[clamp(1.4rem,2.4vw,1.9rem)] tracking-[-0.02em] text-ink">
                Every service we deliver, in one catalog.
              </h3>
            </div>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.2em] text-ink hover:text-brand-deep transition-colors"
            >
              Talk to us
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.8}
              />
            </Link>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <li key={service.id} className="h-full">
                  <Link
                    href={service.href}
                    className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-paper-soft/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:bg-paper-soft hover:shadow-[0_24px_50px_-24px_rgba(31,110,149,0.45)]"
                  >
                    {/* brand accent bar — grows in on hover */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-brand-deep via-brand to-transparent transition-transform duration-500 group-hover:scale-x-100"
                    />

                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[0.66rem] uppercase tracking-[0.22em] text-stone">
                        {service.index}
                      </span>
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-brand-deep/15 bg-brand-wash text-brand-deep transition-colors duration-300 group-hover:bg-brand-deep group-hover:text-paper">
                        <Icon className="h-[1.05rem] w-[1.05rem]" strokeWidth={1.6} />
                      </span>
                    </div>

                    <h4 className="font-display mt-6 text-[1.14rem] leading-[1.12] tracking-[-0.015em] text-ink">
                      {service.title}
                    </h4>
                    <p className="mt-2.5 text-[0.86rem] leading-relaxed text-ink-mute">
                      {service.summary}
                    </p>

                    <div className="mt-auto pt-6 flex items-center gap-2 font-mono text-[0.64rem] uppercase tracking-[0.18em] text-stone transition-colors group-hover:text-brand-deep">
                      Explore
                      <ArrowUpRight
                        className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        strokeWidth={1.8}
                      />
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </m.div>
      </div>
    </section>
  );
}
