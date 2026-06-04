"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type GalleryItem = { url: string; caption?: string | null };

export function CentreGallery({
  items,
  centreName,
}: {
  items: GalleryItem[];
  centreName: string;
}) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const close = useCallback(() => setOpenIdx(null), []);
  const prev = useCallback(() => {
    setOpenIdx((cur) => (cur === null ? cur : (cur - 1 + items.length) % items.length));
  }, [items.length]);
  const next = useCallback(() => {
    setOpenIdx((cur) => (cur === null ? cur : (cur + 1) % items.length));
  }, [items.length]);

  // Keyboard navigation: Esc / ←  / →
  useEffect(() => {
    if (openIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIdx, close, prev, next]);

  // Lock body scroll while open
  useEffect(() => {
    if (openIdx === null) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [openIdx]);

  const current = openIdx !== null ? items[openIdx] : null;

  return (
    <>
      <ul className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {items.map((g, i) => {
          if (!g.url) return null;
          return (
            <li key={i}>
              <button
                type="button"
                onClick={() => setOpenIdx(i)}
                aria-label={
                  g.caption ? `Open ${g.caption}` : `Open image ${i + 1}`
                }
                className="group relative block w-full aspect-[4/3] overflow-hidden rounded-2xl bg-paper-deep cursor-zoom-in"
              >
                <Image
                  src={g.url}
                  alt={g.caption ?? `${centreName} · ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                {g.caption && (
                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-ink/70 to-transparent pointer-events-none">
                    <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-paper">
                      {g.caption}
                    </span>
                  </div>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      {current && openIdx !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.caption ?? `${centreName} image ${openIdx + 1}`}
          className="fixed inset-0 z-[100] flex items-center justify-center"
        >
          {/* Scrim — click to close */}
          <button
            type="button"
            aria-label="Close gallery"
            onClick={close}
            className="absolute inset-0 bg-ink/85 backdrop-blur-sm cursor-default"
          />

          {/* Close button */}
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-paper/20 bg-paper/10 text-paper backdrop-blur hover:bg-paper/20 transition-colors"
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 rounded-full bg-paper/10 backdrop-blur border border-paper/20 px-3 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-paper">
            {openIdx + 1} / {items.length}
          </div>

          {/* Prev */}
          {items.length > 1 && (
            <button
              type="button"
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-10 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-paper/20 bg-paper/10 text-paper backdrop-blur hover:bg-paper/20 transition-colors"
            >
              <ChevronLeft className="h-6 w-6" strokeWidth={2} />
            </button>
          )}

          {/* Next */}
          {items.length > 1 && (
            <button
              type="button"
              onClick={next}
              aria-label="Next image"
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-10 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-paper/20 bg-paper/10 text-paper backdrop-blur hover:bg-paper/20 transition-colors"
            >
              <ChevronRight className="h-6 w-6" strokeWidth={2} />
            </button>
          )}

          {/* Image stage */}
          <div className="relative z-[5] flex items-center justify-center w-full h-full px-4 sm:px-20 py-16 pointer-events-none">
            <div className="relative w-full h-full max-w-6xl max-h-[85vh]">
              <Image
                key={current.url}
                src={current.url}
                alt={current.caption ?? `${centreName} · ${openIdx + 1}`}
                fill
                sizes="(max-width: 1024px) 100vw, 1100px"
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Caption (bottom) */}
          {current.caption && (
            <div className="absolute bottom-4 sm:bottom-6 inset-x-0 flex justify-center pointer-events-none">
              <div className="rounded-full bg-paper/10 backdrop-blur border border-paper/20 px-4 py-2 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-paper text-center max-w-[90vw] truncate">
                {current.caption}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
