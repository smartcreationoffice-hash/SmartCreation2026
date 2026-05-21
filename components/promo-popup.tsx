"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, X } from "lucide-react";
import { m, AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
import { popupMatchesPath, type PopupRow } from "@/lib/popup-shared";

export function PromoPopup({ popups }: { popups: PopupRow[] }) {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  // Pick first popup that matches the current path. Admin sets display_order
  // so the lowest-priority active popup wins when several match.
  const popup = useMemo(() => {
    return popups.find((p) => popupMatchesPath(p.target_pages, pathname)) ?? null;
  }, [popups, pathname]);

  // Session storage dismiss key — scoped to popup id so a *new* popup
  // re-prompts dismissers automatically.
  const dismissKey = popup ? `popup_dismissed_${popup.id}` : null;

  useEffect(() => {
    if (!popup || !dismissKey) return;
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(dismissKey) === "1") return;

    const delayMs = Math.max(0, (popup.delay_seconds ?? 6) * 1000);
    const t = setTimeout(() => setOpen(true), delayMs);
    return () => clearTimeout(t);
  }, [popup, dismissKey]);

  // Close on Esc.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Body scroll lock while open.
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  function close() {
    if (!dismissKey) return;
    try {
      sessionStorage.setItem(dismissKey, "1");
    } catch {
      /* ignore */
    }
    setClosing(true);
    // Let the exit animation finish before unmounting.
    setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 220);
  }

  if (!popup) return null;
  const hasImage = !!popup.image_url;
  const hasCta = !!popup.cta_label && !!popup.cta_href;
  const ctaIsExternal = !!popup.cta_href && /^https?:\/\//i.test(popup.cta_href);

  return (
    <LazyMotion features={domAnimation} strict>
      <AnimatePresence>
        {open && !closing && (
          <m.div
            key="popup"
            role="dialog"
            aria-modal="true"
            aria-labelledby="promo-popup-title"
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Scrim */}
            <button
              type="button"
              aria-label="Close popup"
              onClick={close}
              className="absolute inset-0 bg-ink/65 backdrop-blur-sm cursor-default"
            />

            {/* Card */}
            <m.div
              role="document"
              className="relative w-full max-w-[860px] overflow-hidden rounded-3xl bg-paper text-ink shadow-[0_40px_80px_-20px_rgba(0,0,0,0.45)] border border-ink/5"
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 6 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Close */}
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="absolute top-3.5 right-3.5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-paper/90 backdrop-blur border border-ink/10 text-ink/70 hover:text-ink hover:border-ink/30 transition-colors"
              >
                <X className="h-4 w-4" strokeWidth={2} />
              </button>

              <div className={hasImage ? "grid md:grid-cols-2" : ""}>
                {/* Image side */}
                {hasImage && (
                  <div className="relative bg-paper-soft aspect-[5/4] md:aspect-auto md:min-h-[420px]">
                    <Image
                      src={popup.image_url!}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                      priority={false}
                    />
                    {/* Subtle brand wash so the right-side text always reads */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-brand-night/30 via-transparent to-transparent"
                    />
                  </div>
                )}

                {/* Content side */}
                <div className="px-7 py-9 sm:px-10 sm:py-11 md:px-12 flex flex-col">
                  {popup.eyebrow && (
                    <div className="font-mono text-[0.66rem] uppercase tracking-[0.24em] text-brand-deep mb-4">
                      {popup.eyebrow}
                    </div>
                  )}
                  <h2
                    id="promo-popup-title"
                    className="font-display text-[1.6rem] sm:text-[1.95rem] leading-[1.1] tracking-[-0.02em] text-ink text-balance"
                  >
                    {popup.title}
                  </h2>
                  {popup.subtitle && (
                    <p className="mt-4 text-[0.98rem] leading-relaxed text-ink-mute text-pretty">
                      {popup.subtitle}
                    </p>
                  )}

                  {hasCta && (
                    <div className="mt-7 flex items-center gap-3">
                      {ctaIsExternal ? (
                        <a
                          href={popup.cta_href!}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={close}
                          className="group inline-flex items-center gap-2 rounded-full bg-ink text-paper px-5 py-3 text-[0.92rem] font-medium hover:bg-brand-night transition-colors shadow-[0_10px_24px_-12px_rgba(0,0,0,0.45)]"
                        >
                          {popup.cta_label}
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
                        </a>
                      ) : (
                        <Link
                          href={popup.cta_href!}
                          onClick={close}
                          className="group inline-flex items-center gap-2 rounded-full bg-ink text-paper px-5 py-3 text-[0.92rem] font-medium hover:bg-brand-night transition-colors shadow-[0_10px_24px_-12px_rgba(0,0,0,0.45)]"
                        >
                          {popup.cta_label}
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
                        </Link>
                      )}
                      <button
                        type="button"
                        onClick={close}
                        className="text-[0.86rem] text-ink-mute hover:text-ink transition-colors"
                      >
                        Maybe later
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}
