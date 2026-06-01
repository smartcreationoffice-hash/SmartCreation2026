"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { groupCompanies } from "@/lib/data";

/**
 * Group of Companies ticker — JS-driven scroll loop. Auto-marquees infinitely,
 * pauses on hover, and supports click-and-drag scrubbing with the mouse.
 */

const LOGO_SCALE: Record<string, string> = {
  "mm-contractor": "scale-[1.4]",
  "intercity-bus": "scale-125",
};

export function ZonesTicker() {
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const lastTsRef = useRef<number>(0);
  const halfWidthRef = useRef<number>(0);

  const hoverPausedRef = useRef<boolean>(false);
  const dragPausedRef = useRef<boolean>(false);

  const draggingRef = useRef<boolean>(false);
  const dragStartXRef = useRef<number>(0);
  const dragStartScrollRef = useRef<number>(0);
  const dragMovedRef = useRef<boolean>(false);

  // Doubled list so the loop is seamless.
  const items = [...groupCompanies, ...groupCompanies];

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const measure = () => {
      // Half width = width of one full copy (we render 2× the list).
      halfWidthRef.current = el.scrollWidth / 2;
    };
    measure();

    // Re-measure whenever images/layout settle. ResizeObserver fires when
    // an image loads and changes the track's intrinsic width.
    const ro = new ResizeObserver(() => measure());
    ro.observe(el);

    // pixels per second
    const SPEED = 36;

    const step = (ts: number) => {
      if (!lastTsRef.current) lastTsRef.current = ts;
      const dt = ts - lastTsRef.current;
      lastTsRef.current = ts;

      const paused = hoverPausedRef.current || dragPausedRef.current;
      if (!paused && halfWidthRef.current > 0) {
        let next = el.scrollLeft + (SPEED * dt) / 1000;
        if (next >= halfWidthRef.current) next -= halfWidthRef.current;
        el.scrollLeft = next;
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);

    // Keep manual scroll inside the first half so the loop never hits an end.
    const onScroll = () => {
      const hw = halfWidthRef.current;
      if (hw <= 0) return;
      if (el.scrollLeft >= hw * 2 - 1) el.scrollLeft -= hw;
      else if (el.scrollLeft <= 0) el.scrollLeft += hw;
    };
    el.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      el.removeEventListener("scroll", onScroll);
    };
  }, []);

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const el = trackRef.current;
    if (!el) return;
    draggingRef.current = true;
    dragPausedRef.current = true;
    dragMovedRef.current = false;
    dragStartXRef.current = e.clientX;
    dragStartScrollRef.current = el.scrollLeft;
    el.setPointerCapture(e.pointerId);
    el.style.cursor = "grabbing";
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!draggingRef.current) return;
    const el = trackRef.current;
    if (!el) return;
    const dx = e.clientX - dragStartXRef.current;
    if (Math.abs(dx) > 3) dragMovedRef.current = true;
    el.scrollLeft = dragStartScrollRef.current - dx;
    e.preventDefault();
  }

  function endDrag(e?: React.PointerEvent<HTMLDivElement>) {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    dragPausedRef.current = false;
    const el = trackRef.current;
    if (el) {
      el.style.cursor = "grab";
      if (e) {
        try {
          el.releasePointerCapture(e.pointerId);
        } catch {
          /* noop */
        }
      }
    }
  }

  // Block clicks that follow a real drag so logos don't accidentally trigger
  // text selection or any future link wrapping them.
  function onClickCapture(e: React.MouseEvent<HTMLDivElement>) {
    if (dragMovedRef.current) {
      e.preventDefault();
      e.stopPropagation();
      dragMovedRef.current = false;
    }
  }

  return (
    <section
      aria-label="Smart Creation Group of Companies"
      onMouseEnter={() => {
        hoverPausedRef.current = true;
      }}
      onMouseLeave={() => {
        hoverPausedRef.current = false;
        endDrag();
      }}
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
      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        className="flex items-center gap-10 md:gap-14 overflow-x-auto whitespace-nowrap will-change-scroll cursor-grab select-none touch-pan-x [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        style={{ scrollBehavior: "auto" }}
      >
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
                className={
                  "object-contain object-left pointer-events-none select-none " +
                  (LOGO_SCALE[company.id] ?? "")
                }
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
