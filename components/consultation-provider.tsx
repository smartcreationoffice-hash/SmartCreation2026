"use client";

import {
  createContext,
  lazy,
  Suspense,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

// React.lazy (not next/dynamic) so the modal chunk + libphonenumber-js
// dependency only download when something actually opens the modal.
const ConsultationModal = lazy(() =>
  import("@/components/consultation-modal").then((m) => ({ default: m.ConsultationModal }))
);

type ConsultationContextValue = {
  open: () => void;
  close: () => void;
};

const ConsultationContext = createContext<ConsultationContextValue | null>(null);

/**
 * Wrap the app tree with this provider once (in the root frontend layout)
 * and any descendant client component can call `useConsultation().open()`
 * to pop the consultation modal — no prop drilling, no duplicate modals.
 */
export function ConsultationProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [everOpened, setEverOpened] = useState(false);

  const open = useCallback(() => {
    setEverOpened(true);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ open, close }), [open, close]);

  return (
    <ConsultationContext.Provider value={value}>
      {children}
      {everOpened && (
        <Suspense fallback={null}>
          <ConsultationModal open={isOpen} onClose={close} />
        </Suspense>
      )}
    </ConsultationContext.Provider>
  );
}

export function useConsultation(): ConsultationContextValue {
  const ctx = useContext(ConsultationContext);
  if (!ctx) {
    // Soft fallback so a page outside the provider tree doesn't crash —
    // log once in dev and no-op.
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.warn("useConsultation called outside <ConsultationProvider>");
    }
    return { open: () => {}, close: () => {} };
  }
  return ctx;
}
