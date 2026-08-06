"use client";

import Image from "next/image";
import Link from "next/link";
import { m } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

/**
 * "The wider Group" band on /about — the entry point to /group-companies,
 * which until now had no inbound link anywhere on the site.
 *
 * The ids below are the section anchors on /group-companies, so each card
 * lands the reader on that company's write-up rather than the top of the
 * page. Keep them in sync with the `sections` array in
 * app/(frontend)/group-companies/page.tsx.
 */
type GroupEntry = {
  id: string;
  index: string;
  name: string;
  sector: string;
  logo: string;
  /** Per-logo optical sizing — same tweaks the detail page applies. */
  logoClass?: string;
};

const companies: GroupEntry[] = [
  {
    id: "smart-business-creation",
    index: "01",
    name: "Smart Business Creation",
    sector: "Business setup · UAE 🇦🇪",
    logo: "/group-logos/smart-business-creation.webp",
  },
  {
    id: "smart-accounting-bookkeeping",
    index: "02",
    name: "Smart Accounting & Bookkeeping",
    sector: "Accounting · UAE 🇦🇪",
    logo: "/group-logos/smart-accounting-bookkeeping.webp",
    logoClass: "scale-[1.35]",
  },
  {
    id: "smart-typing-center",
    index: "03",
    name: "Smart Typing Center",
    sector: "Typing services · UAE 🇦🇪",
    logo: "/group-logos/smart-typing-center.webp",
    logoClass: "scale-[1.35]",
  },
  {
    id: "next-journey",
    index: "04",
    name: "Next Journey Technology",
    sector: "Technology · UAE 🇦🇪",
    logo: "/group-logos/next-journey.webp",
  },
  {
    id: "smart-holiday-homes",
    index: "05",
    name: "Smart Holiday Homes",
    sector: "Hospitality · UAE 🇦🇪",
    logo: "/group-logos/smart-holiday-homes.webp",
  },
  {
    id: "intercity-bus",
    index: "06",
    name: "Intercity Bus Service",
    sector: "Transport · Canada 🇨🇦",
    logo: "/group-logos/intercity-bus.webp",
  },
  {
    id: "mm-contractor",
    index: "07",
    name: "MM Contractor",
    sector: "Construction · Pakistan 🇵🇰",
    logo: "/group-logos/mm-contractor-square.webp",
    // The emblem only fills 44% of its (square, heavily padded) canvas, so it
    // needs roughly 2.2× to read at the same size as the other marks. The
    // overspill is transparent padding.
    logoClass: "scale-[2.2]",
  },
  {
    id: "immersion-social",
    index: "08",
    name: "Immersion Social",
    sector: "Social media · UAE 🇦🇪",
    logo: "/group-logos/immersion.webp",
  },
];

export function AboutGroup() {
  return (
    <section className="relative py-20 md:py-28 bg-paper-soft border-t border-ink/8 overflow-hidden">
      {/* Soft brand pool, mirrored from <AboutPresence/> so the two bands read
          as a pair */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(72,168,219,0.09), rgba(72,168,219,0) 70%)",
        }}
      />

      <div className="container-edit relative">
        {/* Header */}
        <div className="grid grid-cols-12 gap-x-4 md:gap-x-10 gap-y-8 items-end">
          <m.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-12 lg:col-span-8"
          >
            <div className="flex items-center gap-3 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-stone mb-4">
              <span className="h-px w-8 bg-ink/25" />§ The wider Group
            </div>
            <h2 className="font-display font-semibold text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.04] tracking-[-0.02em] text-ink text-balance">
              Business setup is where most clients meet us.{" "}
              <span className="text-brand-deep">
                It isn&rsquo;t everything we run.
              </span>
            </h2>
            <p className="mt-5 max-w-2xl text-[1.02rem] leading-relaxed text-ink-mute">
              Alongside the six business centers sit eight specialist companies:
              accounting, typing and PRO, technology, hospitality, transport,
              contracting and social. Same owners, same team, same standard. Open
              any one below to read what it does and who it&rsquo;s for.
            </p>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-12 lg:col-span-4 lg:text-right"
          >
            <Link
              href="/group-companies"
              className="group inline-flex items-center gap-2 rounded-full bg-brand-night px-5 py-3 text-[0.92rem] font-medium text-paper hover:bg-brand hover:text-ink transition-colors"
            >
              Explore the group companies
              <ArrowUpRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2}
              />
            </Link>
          </m.div>
        </div>

        {/* Company cards — each deep-links to its section on /group-companies */}
        <ul className="mt-12 md:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
          {companies.map((c, i) => (
            <m.li
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: 0.04 * i,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link
                href={`/group-companies#${c.id}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-paper transition-all hover:border-brand/45 hover:shadow-[0_22px_60px_-30px_rgba(72,168,219,0.5)] hover:-translate-y-0.5"
              >
                {/* Dark logo plate — these brand marks are drawn for dark
                    backgrounds, same treatment as the detail page uses */}
                <div className="relative h-[104px] md:h-[124px] overflow-hidden bg-ink">
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(140% 90% at 50% 110%, rgba(72,168,219,0.28) 0%, rgba(46,138,184,0.14) 35%, rgba(13,16,19,1) 75%)",
                    }}
                  />
                  {/* Grid texture — same one the detail page and the homepage
                      circuit use, scaled down for the smaller plate */}
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-[0.09]"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, rgba(141,194,221,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(141,194,221,0.5) 1px, transparent 1px)",
                      backgroundSize: "24px 24px",
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center p-5 md:p-6">
                    <div className="relative h-[78%] w-[86%]">
                      <Image
                        src={c.logo}
                        alt={`${c.name} logo`}
                        fill
                        sizes="(max-width: 768px) 45vw, 22vw"
                        className={`object-contain drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)] ${c.logoClass ?? ""}`}
                      />
                    </div>
                  </div>
                  <span className="absolute left-3 top-3 font-mono text-[0.55rem] uppercase tracking-[0.22em] text-mist">
                    {c.index}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-4 md:p-5">
                  <h3 className="font-display font-semibold text-[0.98rem] md:text-[1.05rem] leading-[1.2] tracking-[-0.015em] text-ink text-balance">
                    {c.name}
                  </h3>
                  <div className="mt-2 font-mono text-[0.58rem] md:text-[0.6rem] uppercase tracking-[0.18em] text-stone">
                    {c.sector}
                  </div>
                  <div className="mt-auto pt-4 inline-flex items-center gap-1.5 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-stone group-hover:text-brand-deep transition-colors">
                    Read more
                    <ArrowUpRight
                      className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={1.8}
                    />
                  </div>
                </div>
              </Link>
            </m.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
