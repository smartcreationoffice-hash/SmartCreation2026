"use client";

import { ArrowUpRight } from "lucide-react";
import { useConsultation } from "@/components/consultation-provider";

/**
 * Reusable CTA that opens the global consultation modal — used as the
 * "Book a viewing" button on center + property pages so visitors can
 * book without leaving the page they're already on.
 */
export function BookViewingButton({
  label = "Book a viewing",
  className,
}: {
  label?: string;
  className?: string;
}) {
  const { open } = useConsultation();
  return (
    <button
      type="button"
      onClick={open}
      aria-haspopup="dialog"
      className={
        className ??
        "group flex items-center justify-center gap-2 rounded-full bg-brand-night px-5 py-3.5 text-[0.92rem] font-medium text-paper hover:bg-brand transition-colors w-full"
      }
    >
      {label}
      <ArrowUpRight
        className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        strokeWidth={1.8}
      />
    </button>
  );
}
