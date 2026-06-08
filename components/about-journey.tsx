"use client";

import { useRef } from "react";
import { m, useScroll, useTransform } from "framer-motion";
import {
  Briefcase,
  Building2,
  Bus,
  Compass,
  Eye,
  HardHat,
  Home,
  Landmark,
  Laptop,
  Rocket,
  Sparkles,
  Trophy,
} from "lucide-react";

type Milestone = {
  year: string;
  title: string;
  body: string;
  tag: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
};

const milestones: Milestone[] = [
  {
    year: "2020",
    title: "Smart Creation Business Center.",
    body: "The Group is born at Damac Executive Heights, Tecom.",
    tag: "Founded · Tecom, Dubai",
    icon: Rocket,
  },
  {
    year: "2021",
    title: "MM Contractors goes live in Pakistan.",
    body: "Civil works, road development and general-order supplies across Punjab.",
    tag: "Construction · Pakistan",
    icon: HardHat,
  },
  {
    year: "2022",
    title: "Smart Place opens in Al Barsha.",
    body: "Second owned center: flexible serviced offices at Iridium Tower.",
    tag: "2nd owned center · Al Barsha 1",
    icon: Building2,
  },
  {
    year: "2023",
    title: "Intercity Bus crosses into Canada.",
    body: "Scheduled routes and charter services launch from London, Ontario.",
    tag: "Transport · Canada 🇨🇦",
    icon: Bus,
  },
  {
    year: "2024",
    title: "Abna Rashid Building joins the Group.",
    body: "Owned freehold commercial property in Naif, Deira.",
    tag: "Real estate · Deira",
    icon: Landmark,
  },
  {
    year: "2025",
    title: "Smart Business Creation goes flagship.",
    body: "Formation, PRO and banking-introductions spin out into their own brand.",
    tag: "Business setup · UAE",
    icon: Briefcase,
  },
  {
    year: "2025",
    title: "Smart Holiday Homes launches.",
    body: "End-to-end short-term rental management across Dubai.",
    tag: "Hospitality · UAE",
    icon: Home,
  },
  {
    year: "2025",
    title: "Immersion Social opens its doors.",
    body: "Social-media and digital-marketing agency for the Group and outside clients.",
    tag: "Social media & marketing",
    icon: Sparkles,
  },
  {
    year: "2025",
    title: "Next Journey Technology.",
    body: "Our tech arm: software, web, mobile, AI and ML services.",
    tag: "Technology · UAE",
    icon: Laptop,
  },
  {
    year: "2026",
    title: "Future Space comes online.",
    body: "Fourth owned center at Salah Al Din Street, Al Muraqabat.",
    tag: "4th owned center · Deira",
    icon: Compass,
  },
  {
    year: "2026",
    title: "Smart Founders opens at Umm Ramool.",
    body: "Fifth owned center, built for early-stage founders and small teams.",
    tag: "5th owned center · Umm Ramool",
    icon: Trophy,
  },
  {
    year: "2026",
    title: "Smart View completes the six.",
    body: "Sixth owned center at Al Hamriya, Bur Dubai.",
    tag: "6th owned center · Bur Dubai",
    icon: Eye,
  },
];

export function AboutJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 70%", "end 80%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      className="relative py-14 md:py-20 bg-paper-soft border-y border-ink/8 overflow-hidden"
    >
      {/* Soft brand pool */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-[-10%] h-[520px] w-[520px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(72,168,219,0.07), rgba(72,168,219,0) 70%)",
        }}
      />

      <div className="container-edit relative">
        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-3 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-stone mb-4">
            <span className="h-px w-8 bg-ink/25" />§ The journey
          </div>
          <h2 className="font-display font-semibold text-[clamp(1.75rem,3.2vw,2.5rem)] leading-[1.04] tracking-[-0.02em] text-ink text-balance">
            One floor in 2020,{" "}
            <span className="text-brand-deep">
              twelve companies by 2026.
            </span>
          </h2>
          <p className="mt-5 max-w-2xl text-[1.02rem] leading-relaxed text-ink-mute">
            Every entity below is a company we operate ourselves: real
            teams, real licences, real P&amp;Ls. Each one launched only
            after the practice it replaces was already running cleanly
            inside the Group.
          </p>
        </m.div>

        {/* Timeline */}
        <div className="relative mt-14 md:mt-20">
          {/* Track — soft background line */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-5 md:left-1/2 top-0 bottom-0 w-px -translate-x-px bg-ink/10"
          />
          {/* Progress — fills as you scroll */}
          <m.div
            aria-hidden
            style={{ height: lineHeight }}
            className="pointer-events-none absolute left-5 md:left-1/2 top-0 w-px -translate-x-px bg-gradient-to-b from-brand via-brand-deep to-brand origin-top"
          />

          <ol className="relative space-y-5 md:space-y-7">
            {milestones.map((milestone, i) => {
              const Icon = milestone.icon;
              const isRight = i % 2 === 0;
              return (
                <m.li
                  key={milestone.year}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.7,
                    delay: 0.04 * i,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative md:grid md:grid-cols-2 md:gap-10 items-start"
                >
                  {isRight ? <div className="hidden md:block" /> : null}

                  {/* Node */}
                  <m.span
                    aria-hidden
                    initial={{ scale: 0.6, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{
                      duration: 0.5,
                      delay: 0.04 * i + 0.15,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="absolute left-5 md:left-1/2 top-1.5 -translate-x-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 bg-paper shadow-[0_8px_24px_-12px_rgba(13,16,19,0.35)]"
                  >
                    <span
                      aria-hidden
                      className="absolute inset-0 rounded-full bg-brand/15 animate-pulse"
                    />
                    <Icon
                      className="relative h-4 w-4 text-brand-deep"
                      strokeWidth={1.8}
                    />
                  </m.span>

                  {/* Card */}
                  <article
                    className={
                      "relative ml-16 md:ml-0 group rounded-2xl border border-ink/10 bg-paper px-5 py-4 md:px-6 md:py-5 transition-all duration-500 hover:border-brand/40 hover:shadow-[0_18px_44px_-26px_rgba(72,168,219,0.45)] hover:-translate-y-0.5 " +
                      (isRight ? "md:col-start-2" : "md:col-start-1")
                    }
                  >
                    <span
                      aria-hidden
                      className="absolute inset-x-7 top-0 h-[2px] origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100"
                    />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -bottom-16 -right-16 h-44 w-44 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background:
                          "radial-gradient(closest-side, rgba(72,168,219,0.3), rgba(72,168,219,0) 70%)",
                      }}
                    />

                    <div className="flex items-baseline gap-3">
                      <span className="font-display font-semibold text-[1.25rem] md:text-[1.35rem] leading-none tracking-[-0.02em] text-brand-deep">
                        {milestone.year}
                      </span>
                      <h3 className="font-display font-semibold text-[1rem] md:text-[1.05rem] leading-[1.2] tracking-[-0.01em] text-ink">
                        {milestone.title}
                      </h3>
                    </div>
                    <p className="mt-1.5 text-[0.88rem] leading-snug text-ink-mute">
                      {milestone.body}
                    </p>
                    <div className="mt-2.5 inline-flex items-center gap-1.5 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-stone">
                      <span className="h-1 w-1 rounded-full bg-brand" />
                      {milestone.tag}
                    </div>
                  </article>
                </m.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
