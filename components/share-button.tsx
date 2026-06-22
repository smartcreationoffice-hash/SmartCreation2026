"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Share button. Uses the native Web Share sheet when available (mobile),
 * and falls back to copy-to-clipboard ("Copied") on desktop.
 */
export function ShareButton({
  title,
  text,
  className,
}: {
  title?: string;
  text?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const onShare = async () => {
    if (typeof window === "undefined") return;
    const url = window.location.href;
    const shareData = { title: title ?? document.title, text, url };

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        return; // user cancelled the native sheet
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <button
      type="button"
      onClick={onShare}
      aria-label="Share this listing"
      title={copied ? "Link copied" : "Share"}
      className={cn(
        "group inline-flex items-center gap-2 rounded-full bg-brand-night px-4 py-2 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-paper transition-all hover:bg-brand hover:text-ink hover:-translate-y-0.5 shadow-[0_10px_25px_-12px_rgba(14,53,84,0.6)]",
        className,
      )}
    >
      {copied ? (
        <Check className="h-3.5 w-3.5" strokeWidth={2.2} />
      ) : (
        <Share2 className="h-3.5 w-3.5" strokeWidth={1.8} />
      )}
      {copied ? "Copied" : "Share"}
    </button>
  );
}
