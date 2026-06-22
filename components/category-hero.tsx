"use client";

import Link from "next/link";
import { m } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Banknote,
  BadgeCheck,
  Building2,
  Calculator,
  Copyright,
  FileSearch,
  FileText,
  Globe2,
  IdCard,
  Landmark,
  Network,
  Percent,
  Receipt,
  Scale,
  ShieldCheck,
  Stamp,
  type LucideIcon,
} from "lucide-react";

export type CategoryIconKey =
  | "calculator"
  | "file-text"
  | "banknote"
  | "landmark"
  | "file-search"
  | "shield"
  | "badge-check"
  | "copyright"
  | "stamp"
  | "scale"
  | "building"
  | "globe"
  | "receipt"
  | "percent"
  | "id-card"
  | "network";

const ICONS: Record<CategoryIconKey, LucideIcon> = {
  calculator: Calculator,
  "file-text": FileText,
  banknote: Banknote,
  landmark: Landmark,
  "file-search": FileSearch,
  shield: ShieldCheck,
  "badge-check": BadgeCheck,
  copyright: Copyright,
  stamp: Stamp,
  scale: Scale,
  building: Building2,
  globe: Globe2,
  receipt: Receipt,
  percent: Percent,
  "id-card": IdCard,
  network: Network,
};

export type CategoryPillar = {
  id: string;
  index: string;
  label: string;
  desc: string;
  icon: CategoryIconKey;
};

type CategoryHeroProps = {
  /** Current page label, shown after "Home / Financial /". */
  breadcrumb: string;
  /** Small eyebrow pill text (without the §). */
  eyebrow: string;
  /** Hero headline. */
  title: React.ReactNode;
  lede: string;
  cta?: { label: string; href: string };
  /** In-page sections, rendered as the right-hand "jump to" picker. */
  pillars: CategoryPillar[];
};

/**
 * Reusable dark hero for the Financial category pages (Accounting, Audit,
 * Tax Consultation, etc.). Mirrors the FinancialHero design so every page
 * looks part of the same family: breadcrumb, eyebrow, headline, lede, CTA,
 * and a "choose a service" picker that anchor-links to the page sections.
 */
export function CategoryHero({
  breadcrumb,
  eyebrow,
  title,
  lede,
  cta,
  pillars,
}: CategoryHeroProps) {
  return (
    <section
      data-dark-hero
      className="relative overflow-hidden pt-32 md:pt-40 pb-20 md:pb-28 bg-ink text-paper"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(720px circle at 72% 30%, rgba(72,168,219,0.16), transparent 55%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-40 h-[560px] w-[560px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(72,168,219,0.12), rgba(72,168,219,0) 70%)",
        }}
      />
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
        {/* Breadcrumb */}
        <m.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 flex flex-wrap items-center gap-3 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-mist"
        >
          <span className="h-px w-8 bg-paper/25" />
          <Link href="/" className="hover:text-paper transition-colors">
            Home
          </Link>
          <span className="text-paper/30">/</span>
          <Link href="/financial" className="hover:text-paper transition-colors">
            Financial
          </Link>
          <span className="text-paper/30">/</span>
          <span className="text-paper">{breadcrumb}</span>
        </m.div>

        <div className="grid grid-cols-12 gap-x-4 md:gap-x-10 gap-y-14 items-center">
          {/* Left — copy */}
          <div className="col-span-12 lg:col-span-7">
            <m.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-paper/15 bg-paper/[0.04] px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-mist"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />§ {eyebrow}
            </m.div>

            <m.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-medium tracking-[-0.03em] leading-[1.0] text-[clamp(2.4rem,6vw,4.4rem)] text-paper text-balance"
            >
              {title}
            </m.h1>

            <m.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 max-w-[36rem] text-[1.04rem] md:text-[1.1rem] leading-relaxed text-paper/70 text-pretty"
            >
              {lede}
            </m.p>

            {cta && (
              <m.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="mt-9"
              >
                <Link
                  href={cta.href}
                  className="group inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3.5 text-[0.95rem] font-medium text-ink transition-colors hover:bg-paper shadow-[0_10px_30px_-10px_rgba(72,168,219,0.55)]"
                >
                  {cta.label}
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    strokeWidth={2}
                  />
                </Link>
              </m.div>
            )}
          </div>

          {/* Right — section picker */}
          <div className="col-span-12 lg:col-span-5">
            <m.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-mist">
                  Choose a service
                </span>
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-paper/40">
                  {pillars.length} {pillars.length === 1 ? "area" : "areas"}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {pillars.map((p, i) => {
                  const Icon = ICONS[p.icon] ?? Calculator;
                  return (
                    <m.div
                      key={p.id}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.55,
                        delay: 0.32 + i * 0.06,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <Link
                        href={`#${p.id}`}
                        className="group relative flex h-full flex-col rounded-2xl border border-paper/12 bg-paper/[0.04] backdrop-blur-sm p-5 overflow-hidden transition-all hover:border-brand/50 hover:bg-paper/[0.07] hover:-translate-y-0.5"
                      >
                        <span
                          aria-hidden
                          className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{
                            background:
                              "radial-gradient(closest-side, rgba(72,168,219,0.55), rgba(72,168,219,0) 70%)",
                          }}
                        />
                        <span
                          aria-hidden
                          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/60 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"
                        />

                        <div className="relative flex items-start justify-between">
                          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-paper/15 bg-paper/[0.05] text-brand-soft group-hover:bg-brand/15 group-hover:text-brand transition-colors">
                            <Icon className="h-4 w-4" strokeWidth={1.7} />
                          </span>
                          <span className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-mist">
                            {p.index}
                          </span>
                        </div>

                        <div className="relative mt-5">
                          <div className="font-display text-[1.1rem] leading-tight tracking-[-0.01em] text-paper">
                            {p.label}
                          </div>
                          <div className="mt-1.5 text-[0.82rem] leading-snug text-paper/55">
                            {p.desc}
                          </div>
                        </div>

                        <div className="relative mt-5 flex items-center justify-between font-mono text-[0.6rem] uppercase tracking-[0.22em] text-mist">
                          <span>Jump to</span>
                          <ArrowUpRight
                            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            strokeWidth={1.8}
                          />
                        </div>
                      </Link>
                    </m.div>
                  );
                })}
              </div>
            </m.div>
          </div>
        </div>
      </div>
    </section>
  );
}
