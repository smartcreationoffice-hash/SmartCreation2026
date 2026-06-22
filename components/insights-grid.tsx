"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Clock,
  Search,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

type InsightCard = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  cover: string;
  date: string;
  readMinutes: number;
};

const PER_PAGE = 6; // 3 columns × 2 rows

export function InsightsGrid({ posts }: { posts: InsightCard[] }) {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const sectionRef = useRef<HTMLDivElement>(null);

  // Case-insensitive substring match across title, excerpt and category.
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter((p) =>
      [p.title, p.excerpt, p.category].some((field) =>
        field.toLowerCase().includes(q),
      ),
    );
  }, [posts, query]);

  // Reset to page 1 whenever the search query changes so the user doesn't
  // land on an empty page that no longer exists in the filtered set.
  useEffect(() => {
    setPage(1);
  }, [query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const clampedPage = Math.min(page, totalPages);
  const pageItems = useMemo(() => {
    const start = (clampedPage - 1) * PER_PAGE;
    return filtered.slice(start, start + PER_PAGE);
  }, [filtered, clampedPage]);

  function goTo(p: number) {
    const next = Math.max(1, Math.min(totalPages, p));
    setPage(next);
    requestAnimationFrame(() => {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  return (
    <div ref={sectionRef}>
      <div className="flex items-center justify-between gap-3 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-stone mb-6 flex-wrap">
        <span className="inline-flex items-center gap-3">
          <span className="h-px w-8 bg-ink/25" />All blogs
        </span>
        {totalPages > 1 && filtered.length > 0 && (
          <span className="shrink-0">
            Page {clampedPage} of {totalPages}
          </span>
        )}
      </div>

      {/* Search */}
      <div className="mb-8 flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[260px] max-w-xl">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-stone pointer-events-none"
            strokeWidth={2}
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search blogs by title, topic or keyword…"
            aria-label="Search blogs"
            className="w-full rounded-full border border-ink/15 bg-paper-soft pl-11 pr-12 py-3 text-[0.92rem] text-ink placeholder:text-stone focus:outline-none focus:border-ink/40 focus:bg-paper transition-colors"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full text-stone hover:text-ink hover:bg-ink/5 transition-colors"
            >
              <X className="h-3.5 w-3.5" strokeWidth={2} />
            </button>
          )}
        </div>
        {query && (
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-stone">
            {filtered.length}{" "}
            {filtered.length === 1 ? "match" : "matches"}
          </span>
        )}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-3xl border border-dashed border-ink/15 bg-paper p-10 md:p-14 text-center">
          <p className="text-ink font-medium">
            No blogs found for &ldquo;{query}&rdquo;.
          </p>
          <p className="mt-2 text-[0.92rem] text-ink-mute">
            Try a different keyword, or{" "}
            <button
              type="button"
              onClick={() => setQuery("")}
              className="underline underline-offset-4 decoration-brand/40 hover:decoration-brand text-brand-deep"
            >
              clear the search
            </button>{" "}
            to see everything.
          </p>
        </div>
      )}

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {pageItems.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/blogs/${p.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ink/10 bg-paper transition-all hover:border-brand/40 hover:shadow-[0_22px_60px_-30px_rgba(72,168,219,0.45)] hover:-translate-y-0.5"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={p.cover}
                  alt={p.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-tr from-ink/35 via-ink/0 to-transparent"
                />
                <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-paper/30 bg-ink/55 backdrop-blur-md px-3 py-1 font-mono text-[0.58rem] uppercase tracking-[0.22em] text-paper">
                  {p.category}
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6 md:p-7">
                <div className="flex items-center gap-3 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-stone mb-3">
                  <span>{p.date}</span>
                  <span className="text-stone/50">·</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" strokeWidth={1.8} />
                    {p.readMinutes} min
                  </span>
                </div>
                <h3 className="font-display font-semibold text-[1.25rem] leading-[1.2] tracking-[-0.015em] text-ink text-balance">
                  {p.title.split(":")[0]}
                  <span className="text-brand-deep">.</span>
                </h3>
                <p className="mt-3 text-[0.94rem] leading-relaxed text-ink-mute line-clamp-3">
                  {p.excerpt}
                </p>
                <div className="mt-auto pt-6 inline-flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-stone group-hover:text-brand-deep transition-colors">
                  Read on
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.8}
                  />
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {totalPages > 1 && (
        <nav
          aria-label="Blogs pagination"
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

function buildPageList(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const set = new Set<number>([1, total, current, current - 1, current + 1]);
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
