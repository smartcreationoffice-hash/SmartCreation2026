"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { m, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";

type OfficeGalleryProps = {
  images: string[];
  title: string;
};

/**
 * Hero-and-thumbnails gallery. Click a thumbnail to swap the main image.
 * Arrow keys and the on-image chevrons cycle through the set.
 */
export function OfficeGallery({ images, title }: OfficeGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const thumbStripRef = useRef<HTMLUListElement>(null);

  const next = useCallback(
    () => setActiveIdx((i) => (i + 1) % images.length),
    [images.length]
  );
  const prev = useCallback(
    () => setActiveIdx((i) => (i - 1 + images.length) % images.length),
    [images.length]
  );

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") setZoomed(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  // Lock body scroll while the zoom lightbox is open
  useEffect(() => {
    if (!zoomed) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [zoomed]);

  // Keep the active thumbnail visible in the scrollable strip whenever
  // activeIdx changes (arrow keys, chevrons, or direct thumb click).
  useEffect(() => {
    const strip = thumbStripRef.current;
    if (!strip) return;
    const active = strip.children[activeIdx] as HTMLElement | undefined;
    if (!active) return;
    active.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [activeIdx]);

  return (
    <div>
      {/* Main / hero — fills the 16:10 box (object-cover). Use the zoom
          button in the corner to open a full uncropped view. */}
      <div className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-paper-deep border border-ink/10 group">
        <AnimatePresence initial={false} mode="wait">
          <m.div
            key={images[activeIdx]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={images[activeIdx]}
              alt={`${title} · photo ${activeIdx + 1} of ${images.length}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 80vw"
              className="object-cover"
            />
          </m.div>
        </AnimatePresence>

        {/* Zoom button — opens uncropped lightbox */}
        <button
          type="button"
          onClick={() => setZoomed(true)}
          aria-label="View full image"
          className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-ink/55 backdrop-blur-md text-paper hover:bg-ink/80 transition-all opacity-80 hover:opacity-100"
        >
          <ZoomIn className="h-4 w-4" strokeWidth={1.8} />
        </button>

        {/* Prev / next */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous photo"
              className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-ink/55 backdrop-blur-md text-paper hover:bg-ink/80 transition-colors"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={1.8} />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next photo"
              className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-ink/55 backdrop-blur-md text-paper hover:bg-ink/80 transition-colors"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={1.8} />
            </button>
          </>
        )}

        {/* Counter */}
        <div className="absolute bottom-4 right-4 rounded-full bg-ink/65 backdrop-blur-md px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-paper">
          {activeIdx + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail strip — single horizontal row, scrolls on overflow */}
      {images.length > 1 && (
        <ul
          ref={thumbStripRef}
          className="mt-3 md:mt-4 flex gap-2 md:gap-3 overflow-x-auto snap-x snap-mandatory pb-2 -mx-1 px-1 [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:bg-ink/20 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent"
          role="group"
          aria-label={`${title} photos`}
        >
          {images.map((img, i) => {
            const isActive = i === activeIdx;
            return (
              <li key={img} className="shrink-0 snap-start">
                <button
                  type="button"
                  aria-pressed={isActive}
                  aria-label={`Show photo ${i + 1}`}
                  onClick={() => setActiveIdx(i)}
                  className={cn(
                    "group relative block w-[96px] sm:w-[110px] aspect-[4/3] rounded-lg overflow-hidden border transition-all",
                    isActive
                      ? "border-brand ring-2 ring-brand/25 shadow-[0_6px_20px_-10px_rgba(72,168,219,0.5)]"
                      : "border-ink/10 opacity-75 hover:opacity-100 hover:border-ink/30"
                  )}
                >
                  <Image
                    src={img}
                    alt=""
                    fill
                    sizes="120px"
                    className={cn(
                      "object-cover transition-transform duration-300",
                      !isActive && "group-hover:scale-[1.04]"
                    )}
                  />
                  {/* Number badge */}
                  <span
                    className={cn(
                      "absolute top-1 left-1 rounded px-1 py-0.5 font-mono text-[0.55rem] uppercase tracking-[0.12em] transition-colors",
                      isActive
                        ? "bg-brand text-ink"
                        : "bg-ink/60 text-paper"
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {/* Zoom lightbox — uncropped view of the active photo. Closes on
          scrim click, X button, or Esc key. */}
      <AnimatePresence>
        {zoomed && (
          <m.div
            key="zoom"
            role="dialog"
            aria-modal="true"
            aria-label={`${title} · full photo`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setZoomed(false)}
              className="absolute inset-0 bg-ink/85 backdrop-blur-sm cursor-zoom-out"
            />

            {/* Counter */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 rounded-full bg-paper/10 backdrop-blur border border-paper/20 px-3 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-paper">
              {activeIdx + 1} / {images.length}
            </div>

            {/* Close */}
            <button
              type="button"
              onClick={() => setZoomed(false)}
              aria-label="Close"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-paper/20 bg-paper/10 text-paper backdrop-blur hover:bg-paper/20 transition-colors"
            >
              <X className="h-5 w-5" strokeWidth={2} />
            </button>

            {/* Prev */}
            {images.length > 1 && (
              <button
                type="button"
                onClick={prev}
                aria-label="Previous photo"
                className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-10 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-paper/20 bg-paper/10 text-paper backdrop-blur hover:bg-paper/20 transition-colors"
              >
                <ChevronLeft className="h-6 w-6" strokeWidth={2} />
              </button>
            )}

            {/* Next */}
            {images.length > 1 && (
              <button
                type="button"
                onClick={next}
                aria-label="Next photo"
                className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-10 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-paper/20 bg-paper/10 text-paper backdrop-blur hover:bg-paper/20 transition-colors"
              >
                <ChevronRight className="h-6 w-6" strokeWidth={2} />
              </button>
            )}

            {/* Full-bleed image */}
            <div className="relative z-[5] w-full h-full max-w-7xl max-h-[88vh] pointer-events-none">
              <Image
                key={images[activeIdx]}
                src={images[activeIdx]}
                alt={`${title} · photo ${activeIdx + 1} of ${images.length}`}
                fill
                sizes="(max-width: 1024px) 100vw, 1400px"
                className="object-contain"
                priority
              />
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
