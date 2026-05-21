"use client";

import Image from "next/image";
import { groupCompanies } from "@/lib/data";

/**
 * Group of Companies ticker — pure CSS marquee. Doubled list for a seamless
 * loop; pauses on hover via the .marquee-track:hover rule in globals.css.
 */
export function ZonesTicker() {
  // Doubled so translating -50% lands on an identical frame.
  const items = [...groupCompanies, ...groupCompanies];

  return (
    <section
      aria-label="Smart Creation Group of Companies"
      className="relative overflow-hidden border-y border-ink/10 bg-ink text-paper py-5 md:py-6"
    >
      {/* Edge fades */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-20 z-10 bg-gradient-to-r from-ink to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-20 z-10 bg-gradient-to-l from-ink to-transparent"
      />

      {/* Track */}
      <div className="overflow-hidden">
        <div className="marquee-track flex items-center gap-10 md:gap-14 w-max">
          {items.map((company, idx) => (
            <div
              key={`${company.id}-${idx}`}
              className="flex items-center gap-3 shrink-0"
              aria-hidden={idx >= groupCompanies.length || undefined}
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand shrink-0" />
              <div className="relative h-9 w-[140px] shrink-0">
                <Image
                  src={company.logo ?? "/group-logos/smart-creation-bc.webp"}
                  alt={company.name}
                  fill
                  sizes="200px"
                  draggable={false}
                  className="object-contain object-left pointer-events-none select-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
