"use client";

import { useConsultation } from "@/components/consultation-provider";

/**
 * Button that opens the shared consultation modal.
 * Drop-in replacement for the old `<Link href="/contact">Book consultation</Link>`
 * triggers — pass the same className and children.
 */
export function ConsultationButton({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const { open } = useConsultation();
  return (
    <button type="button" onClick={open} className={className}>
      {children}
    </button>
  );
}
