"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Eye,
  Maximize2,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Office = {
  id: string;
  slug: string;
  officeNo: string;
  title: string;
  category: string;
  availability: string;
  availabilityAccent: string;
  image?: string | null;
  featured?: boolean;
  sqft?: string | null;
  capacity: string;
  view?: string | null;
  price: { amount: string; period?: string | null; note?: string | null };
};

const PER_PAGE = 9;

export function CentreProperties({
  centerKey,
  centreName,
  offices,
}: {
  centerKey: string;
  centreName: string;
  offices: Office[];
}) {
  const [page, setPage] = useState(1);
  const sectionRef = useRef<HTMLDivElement>(null);

  const totalPages = Math.max(1, Math.ceil(offices.length / PER_PAGE));
  const clampedPage = Math.min(page, totalPages);
  const pageItems = useMemo(() => {
    const start = (clampedPage - 1) * PER_PAGE;
    return offices.slice(start, start + PER_PAGE);
  }, [offices, clampedPage]);

  function goTo(p: number) {
    const next = Math.max(1, Math.min(totalPages, p));
    setPage(next);
    // Scroll the section heading back into view so the user sees the new page.
    requestAnimationFrame(() => {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  return (
    <div ref={sectionRef}>
      <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
        <div>
          <div className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-stone mb-3">
            Available properties
          </div>
          <h2 className="font-display font-medium text-[clamp(1.7rem,3vw,2.4rem)] tracking-[-0.02em] leading-tight text-ink">
            {offices.length} {offices.length === 1 ? "office" : "offices"} at{" "}
            {centreName}
          </h2>
        </div>
        {totalPages > 1 && (
          <div className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-stone shrink-0">
            Page {clampedPage} of {totalPages}
          </div>
        )}
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6">
        {pageItems.map((o) => {
          const isUpcoming = o.availabilityAccent === "upcoming";
          return (
            <li key={o.id}>
              <Link
                href={`/business-centers/${centerKey}/${o.slug}`}
                className="group flex flex-col h-full rounded-3xl border border-ink/10 bg-paper overflow-hidden transition-all hover:border-ink/25 hover:shadow-[0_22px_60px_-30px_rgba(13,16,19,0.28)]"
              >
                <div className="relative h-[200px] overflow-hidden bg-paper-deep">
                  {o.image && (
                    <Image
                      src={o.image}
                      alt={`${o.officeNo} · ${o.title}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  )}
                  <div className="absolute inset-x-0 top-0 p-4 flex items-start justify-between pointer-events-none">
                    <span className="rounded-full bg-ink/70 backdrop-blur-md px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-paper">
                      {o.category}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-paper/95 backdrop-blur-md px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-ink">
                      <span
                        className={cn(
                          "h-1.5 w-1.5 rounded-full",
                          isUpcoming ? "bg-amber-500" : "bg-emerald-500",
                        )}
                      />
                      {o.availability}
                    </span>
                  </div>
                  {o.featured && (
                    <div className="absolute bottom-4 left-5">
                      <span className="rounded-full bg-brand px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-ink">
                        ★ Featured
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col flex-1 p-6">
                  <div className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-stone mb-2">
                    {o.officeNo}
                  </div>
                  <h3 className="font-display text-[1.3rem] leading-[1.1] tracking-[-0.02em] text-ink">
                    {o.title}
                  </h3>
                  <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[0.84rem] text-ink-mute">
                    {o.sqft && (
                      <li className="inline-flex items-center gap-1.5">
                        <Maximize2 className="h-3.5 w-3.5 text-stone" strokeWidth={1.6} />
                        {o.sqft}
                      </li>
                    )}
                    <li className="inline-flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5 text-stone" strokeWidth={1.6} />
                      {o.capacity}
                    </li>
                    {o.view && (
                      <li className="inline-flex items-center gap-1.5">
                        <Eye className="h-3.5 w-3.5 text-stone" strokeWidth={1.6} />
                        {o.view}
                      </li>
                    )}
                  </ul>
                  <div className="mt-auto pt-5 border-t border-ink/10 flex items-end justify-between gap-3">
                    <div>
                      {o.price.note && (
                        <div className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-stone mb-0.5">
                          {o.price.note}
                        </div>
                      )}
                      <div className="flex items-baseline gap-1">
                        <span className="font-display text-[1.5rem] font-medium text-ink tracking-[-0.02em]">
                          {o.price.amount}
                        </span>
                        <span className="text-[0.82rem] text-ink-mute">
                          {o.price.period}
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight
                      className="h-4 w-4 text-ink-mute group-hover:text-brand-deep group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                      strokeWidth={1.8}
                    />
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      {totalPages > 1 && (
        <nav
          aria-label="Properties pagination"
          className="mt-12 flex flex-wrap items-center justify-center gap-2"
        >
          <PageButton
            kind="prev"
            disabled={clampedPage === 1}
            onClick={() => goTo(clampedPage - 1)}
          />
          {buildPageList(clampedPage, totalPages).map((p, idx) =>
            p === "…" ? (
              <span
                key={`ellipsis-${idx}`}
                aria-hidden
                className="px-2 text-stone select-none"
              >
                …
              </span>
            ) : (
              <PageButton
                key={p}
                kind="page"
                number={p}
                active={p === clampedPage}
                onClick={() => goTo(p)}
              />
            ),
          )}
          <PageButton
            kind="next"
            disabled={clampedPage === totalPages}
            onClick={() => goTo(clampedPage + 1)}
          />
        </nav>
      )}
    </div>
  );
}

function PageButton(
  props:
    | {
        kind: "prev" | "next";
        disabled: boolean;
        onClick: () => void;
        number?: undefined;
        active?: undefined;
      }
    | {
        kind: "page";
        number: number;
        active: boolean;
        onClick: () => void;
        disabled?: undefined;
      },
) {
  const isArrow = props.kind !== "page";
  if (isArrow) {
    return (
      <button
        type="button"
        onClick={props.onClick}
        disabled={props.disabled}
        aria-label={props.kind === "prev" ? "Previous page" : "Next page"}
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-full border bg-paper text-ink transition-colors",
          props.disabled
            ? "border-ink/10 text-ink-mute/40 cursor-not-allowed"
            : "border-ink/15 hover:border-ink/40 hover:text-ink",
        )}
      >
        {props.kind === "prev" ? (
          <ChevronLeft className="h-4 w-4" strokeWidth={2} />
        ) : (
          <ChevronRight className="h-4 w-4" strokeWidth={2} />
        )}
      </button>
    );
  }
  return (
    <button
      type="button"
      onClick={props.onClick}
      aria-current={props.active ? "page" : undefined}
      aria-label={`Go to page ${props.number}`}
      className={cn(
        "h-10 min-w-[2.5rem] px-3 rounded-full border font-mono text-[0.82rem] tabular-nums transition-colors",
        props.active
          ? "bg-ink text-paper border-ink"
          : "bg-paper text-ink border-ink/15 hover:border-ink/40",
      )}
    >
      {props.number}
    </button>
  );
}

/**
 * Build a compact page list with ellipses, e.g. for 12 pages on page 6:
 *   [1, "…", 5, 6, 7, "…", 12]
 */
function buildPageList(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const set = new Set<number>([1, total, current, current - 1, current + 1]);
  // Show one extra on each end so user never sees 1 … 4 (covers near-edge case)
  if (current <= 3) {
    set.add(2);
    set.add(3);
    set.add(4);
  }
  if (current >= total - 2) {
    set.add(total - 1);
    set.add(total - 2);
    set.add(total - 3);
  }
  const sorted = [...set].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b);
  const out: (number | "…")[] = [];
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) out.push("…");
    out.push(sorted[i]);
  }
  return out;
}
