import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { freeZones, type FreeZone } from "@/lib/data";
import { SectionHeader } from "@/components/ui/section-header";

// Codes to hide from the homepage preview grid (no high-quality logo yet —
// they still appear on the full /free-zones/dubai and other-emirates pages).
const HOMEPAGE_HIDE = new Set(["DUBAI-SOUTH", "SPARK"]);
// Show exactly 2 rows on desktop (4 cols × 2 rows = 8 cards).
const PREVIEW_COUNT = 8;

export function FreeZones() {
  const previewZones = freeZones
    .filter((z) => !HOMEPAGE_HIDE.has(z.code))
    .slice(0, PREVIEW_COUNT);

  return (
    <section id="free-zones" className="relative py-14 md:py-20 bg-paper-soft">
      <div className="container-edit">
        <div className="grid grid-cols-12 gap-x-4 md:gap-x-8 gap-y-6 items-end mb-10 md:mb-14">
          <div className="col-span-12 lg:col-span-8">
            <SectionHeader
              section="§ 05 · Free Zones"
              title={
                <>
                  Every UAE free zone.{" "}
                  <span className="text-brand-deep">One honest recommendation.</span>
                </>
              }
              lede="Direct relationships with every major free zone in the U.A.E., and we're not paid more for sending you to any one of them. That is deliberate."
            />
          </div>
          <div className="col-span-12 lg:col-span-4 lg:text-right">
            <div className="inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-stone">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
              {freeZones.length} active partners
            </div>
          </div>
        </div>

        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {previewZones.map((zone) => (
            <li key={zone.code}>
              <ZoneCard zone={zone} />
            </li>
          ))}
        </ul>

        {/* CTA — see the full Dubai zone list */}
        <div className="mt-10 md:mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-ink/10 pt-8">
          <p className="max-w-xl text-[0.92rem] text-ink-mute">
            Still choosing? In a 45-minute call we model three jurisdictions
            side-by-side: total cost, visa quota, timeline and Corporate Tax
            impact.
          </p>
          <Link
            href="/free-zones/dubai"
            className="group inline-flex items-center gap-2 rounded-full bg-brand-night px-5 py-3 text-[0.92rem] font-medium text-paper hover:bg-brand transition-colors shrink-0"
          >
            More zones
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              strokeWidth={2}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ZoneCard({ zone }: { zone: FreeZone }) {
  const logoSrc = zone.logoSrc ?? `/free-zones/${zone.code.toLowerCase()}.png`;
  return (
    <Link
      href={zone.href}
      className="group relative flex h-full flex-col rounded-2xl border border-ink/10 bg-paper overflow-hidden transition-all hover:border-ink/25 hover:shadow-[0_14px_40px_-22px_rgba(13,16,19,0.3)]"
    >
      {/* Logo plate — brand blue background */}
      <div className="relative aspect-[16/9] bg-[#48a8db] overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #62b5df 0%, #48a8db 55%, #2e8ab8 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(246,243,236,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(246,243,236,0.6) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="relative h-[65%] w-[82%]">
            <Image
              src={logoSrc}
              alt={`${zone.name} logo`}
              fill
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
              className="object-contain drop-shadow-[0_2px_12px_rgba(0,0,0,0.25)]"
            />
          </div>
        </div>
        <div className="absolute top-2.5 left-2.5 font-mono text-[0.55rem] uppercase tracking-[0.22em] text-paper/80">
          {zone.emirate}
        </div>
        <div className="absolute bottom-2.5 right-3 font-mono text-[0.55rem] uppercase tracking-[0.22em] text-paper/55">
          {zone.code}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="text-[0.85rem] text-ink-mute line-clamp-2">{zone.focus}</div>
        <div className="mt-auto pt-3 flex items-center justify-between border-t border-ink/10">
          <span className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-stone">
            {zone.leadTime}
          </span>
          <ArrowUpRight
            className="h-3.5 w-3.5 text-ink-mute transition-all group-hover:text-brand-deep group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={1.8}
          />
        </div>
      </div>
    </Link>
  );
}
