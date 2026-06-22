import Link from "next/link";
import { Instagram, ArrowUpRight } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/reveal";
import { DEFAULT_REELS, reelEmbedSrc } from "@/lib/reels-shared";

const IG_PROFILE = "https://www.instagram.com/smartcreationuae";

export function InstagramReels({ reels }: { reels?: string[] }) {
  const urls = reels && reels.length ? reels : DEFAULT_REELS;
  return (
    <section className="py-16 md:py-24 bg-paper border-t border-ink/8">
      <div className="container-edit">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
          <Reveal>
            <div className="flex items-center gap-3 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-stone mb-4">
              <span className="h-px w-8 bg-ink/25" />§ On Instagram
            </div>
            <h2 className="font-display font-semibold text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.04] tracking-[-0.02em] text-ink text-balance">
              The work, in motion.{" "}
              <span className="text-brand-deep">Straight from the team.</span>
            </h2>
            <p className="mt-5 max-w-xl text-[1.02rem] leading-relaxed text-ink-mute">
              Office walkthroughs, client wins and quick how-tos — a look behind
              the licence, the bank account and the visa.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <Link
              href={IG_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-ink/15 bg-paper-soft px-5 py-3 text-[0.9rem] font-medium text-ink transition-colors hover:border-brand/40 hover:text-brand-deep shrink-0"
            >
              <Instagram className="h-4 w-4" strokeWidth={1.8} />
              Follow @smartcreationuae
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.8}
              />
            </Link>
          </Reveal>
        </div>

        {/* Reels grid */}
        <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {urls.map((url, i) => (
            <StaggerItem key={url + i}>
              <div className="group relative overflow-hidden rounded-2xl border border-ink/10 bg-paper-soft shadow-[0_18px_50px_-30px_rgba(13,16,19,0.4)] transition-all hover:border-brand/40 hover:shadow-[0_24px_60px_-30px_rgba(72,168,219,0.45)] hover:-translate-y-1">
                {/* brand accent bar on hover */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-brand-deep via-brand to-transparent transition-transform duration-500 group-hover:scale-x-100"
                />
                <iframe
                  src={reelEmbedSrc(url)}
                  title={`Smart Creation Instagram reel ${i + 1}`}
                  loading="lazy"
                  scrolling="no"
                  allow="encrypted-media; clipboard-write; picture-in-picture; web-share"
                  allowFullScreen
                  className="block w-full h-[560px] sm:h-[600px] border-0 bg-paper-soft"
                />
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
