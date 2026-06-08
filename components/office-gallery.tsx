"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { m, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Grid3X3, X } from "lucide-react";
import { cn } from "@/lib/utils";

type OfficeGalleryProps = {
  images: string[];
  title: string;
};

/**
 * Airbnb-style 5-image collage hero with a "Show all photos" overlay button.
 * Mobile shows the first photo full-width with the same button; both modes
 * open an in-page lightbox with prev/next nav and an uncropped image view.
 */
export function OfficeGallery({ images, title }: OfficeGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const thumbStripRef = useRef<HTMLUListElement>(null);

  const total = images.length;

  const openAt = useCallback((idx: number) => {
    setActiveIdx(idx);
    setZoomed(true);
  }, []);

  const next = useCallback(
    () => setActiveIdx((i) => (i + 1) % total),
    [total],
  );
  const prev = useCallback(
    () => setActiveIdx((i) => (i - 1 + total) % total),
    [total],
  );

  // Keyboard nav while zoomed
  useEffect(() => {
    if (!zoomed) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") setZoomed(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoomed, next, prev]);

  // Body scroll lock
  useEffect(() => {
    if (!zoomed) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [zoomed]);

  // Mobile thumb-strip: keep the active thumbnail visible as the user
  // taps prev/next chevrons.
  useEffect(() => {
    const strip = thumbStripRef.current;
    if (!strip) return;
    const active = strip.children[activeIdx] as HTMLElement | undefined;
    if (!active) return;
    active.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [activeIdx]);

  // Build a 5-slot collage. If we have fewer images, repeat or omit slots.
  // Index 0 = big left tile; 1–4 = small right tiles (top-l, top-r, btm-l, btm-r).
  const collage = [0, 1, 2, 3, 4].map((slot) => images[slot] ?? images[slot % total]);

  if (total === 0) return null;

  return (
    <div>
      {/* ── Mobile · classic hero + thumbnail strip ────────────────── */}
      <div className="md:hidden">
        <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-paper-deep border border-ink/10">
          <AnimatePresence initial={false} mode="wait">
            <m.div
              key={images[activeIdx]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={images[activeIdx]}
                alt={`${title} · photo ${activeIdx + 1} of ${total}`}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </m.div>
          </AnimatePresence>

          {/* Prev / Next */}
          {total > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                aria-label="Previous photo"
                className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-ink/55 backdrop-blur-md text-paper hover:bg-ink/80 transition-colors"
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={1.8} />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next photo"
                className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-ink/55 backdrop-blur-md text-paper hover:bg-ink/80 transition-colors"
              >
                <ChevronRight className="h-5 w-5" strokeWidth={1.8} />
              </button>
            </>
          )}

          {/* Counter */}
          <div className="absolute bottom-3 right-3 rounded-full bg-ink/65 backdrop-blur-md px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-paper">
            {activeIdx + 1} / {total}
          </div>

          {/* Tap-to-zoom — entire image area opens the lightbox */}
          <button
            type="button"
            onClick={() => openAt(activeIdx)}
            aria-label="Open photo full screen"
            className="absolute inset-0 cursor-zoom-in"
          />
        </div>

        {/* Thumbnail strip — single horizontal row, scrolls on overflow */}
        {total > 1 && (
          <ul
            ref={thumbStripRef}
            className="mt-3 flex gap-2 overflow-x-auto snap-x snap-mandatory pb-2 -mx-1 px-1 [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:bg-ink/20 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent"
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
                      "relative block w-[88px] aspect-[4/3] rounded-lg overflow-hidden border transition-all",
                      isActive
                        ? "border-brand ring-2 ring-brand/25"
                        : "border-ink/10 opacity-75 hover:opacity-100",
                    )}
                  >
                    <Image src={img} alt="" fill sizes="100px" className="object-cover" />
                    <span
                      className={cn(
                        "absolute top-1 left-1 rounded px-1 py-0.5 font-mono text-[0.55rem] uppercase tracking-[0.12em] transition-colors",
                        isActive ? "bg-brand text-ink" : "bg-ink/60 text-paper",
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
      </div>

      {/* ── Desktop · 5-image collage ─────────────────────────────── */}
      <div className="hidden md:block relative aspect-[2/1] rounded-3xl overflow-hidden">
        <div className="grid h-full w-full grid-cols-4 grid-rows-2 gap-2 lg:gap-3">
          {/* Big left tile */}
          <TileButton
            src={collage[0]}
            alt={`${title} · photo 1 of ${total}`}
            onClick={() => openAt(0)}
            priority
            className="col-span-2 row-span-2"
            sizes="(max-width: 1280px) 50vw, 700px"
          />
          {/* Top-right tiles */}
          <TileButton
            src={collage[1]}
            alt={`${title} · photo 2 of ${total}`}
            onClick={() => openAt(Math.min(1, total - 1))}
            sizes="(max-width: 1280px) 25vw, 350px"
          />
          <TileButton
            src={collage[2]}
            alt={`${title} · photo 3 of ${total}`}
            onClick={() => openAt(Math.min(2, total - 1))}
            sizes="(max-width: 1280px) 25vw, 350px"
          />
          {/* Bottom-right tiles */}
          <TileButton
            src={collage[3]}
            alt={`${title} · photo 4 of ${total}`}
            onClick={() => openAt(Math.min(3, total - 1))}
            sizes="(max-width: 1280px) 25vw, 350px"
          />
          <TileButton
            src={collage[4]}
            alt={`${title} · photo 5 of ${total}`}
            onClick={() => openAt(Math.min(4, total - 1))}
            sizes="(max-width: 1280px) 25vw, 350px"
          />
        </div>
        {/* Show-all overlay button — floats over the entire collage so
            it never depends on a single tile's layout. */}
        <button
          type="button"
          onClick={() => openAt(0)}
          className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-2 rounded-full bg-paper/95 backdrop-blur px-4 py-2 text-[0.82rem] font-medium text-ink shadow-[0_8px_24px_-12px_rgba(13,16,19,0.4)] hover:bg-paper transition-colors"
        >
          <Grid3X3 className="h-3.5 w-3.5" strokeWidth={2} />
          Show all {total} photos
        </button>
      </div>

      {/* ── Lightbox · uncropped browse ───────────────────────────── */}
      <AnimatePresence>
        {zoomed && (
          <m.div
            key="zoom"
            role="dialog"
            aria-modal="true"
            aria-label={`${title} · all photos`}
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
              {activeIdx + 1} / {total}
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

            {/* Prev / Next */}
            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous photo"
                  className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-10 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-paper/20 bg-paper/10 text-paper backdrop-blur hover:bg-paper/20 transition-colors"
                >
                  <ChevronLeft className="h-6 w-6" strokeWidth={2} />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next photo"
                  className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-10 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-paper/20 bg-paper/10 text-paper backdrop-blur hover:bg-paper/20 transition-colors"
                >
                  <ChevronRight className="h-6 w-6" strokeWidth={2} />
                </button>
              </>
            )}

            {/* Uncropped image */}
            <div className="relative z-[5] w-full h-full max-w-7xl max-h-[88vh] pointer-events-none">
              <Image
                key={images[activeIdx]}
                src={images[activeIdx]}
                alt={`${title} · photo ${activeIdx + 1} of ${total}`}
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

/* ────────────────────────────────────────────────────────────────── */

function TileButton({
  src,
  alt,
  onClick,
  className,
  sizes,
  priority,
}: {
  src: string;
  alt: string;
  onClick: () => void;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={alt}
      className={cn(
        "group relative overflow-hidden bg-paper-deep cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <span
        aria-hidden
        className="absolute inset-0 bg-ink/0 group-hover:bg-ink/15 transition-colors duration-300"
      />
    </button>
  );
}
