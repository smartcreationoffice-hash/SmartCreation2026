import { requireAdmin } from "@/lib/admin-auth";
import { AdminShell } from "../../_shell";
import { PopupForm } from "../_form";

export const dynamic = "force-dynamic";

export default async function NewPopupPage() {
  await requireAdmin();
  return (
    <AdminShell active="popups">
      <div className="mb-8">
        <div className="font-mono text-[0.66rem] uppercase tracking-[0.22em] text-stone mb-2">
          Marketing · New popup
        </div>
        <h1 className="font-display text-[2rem] tracking-[-0.02em] text-ink">
          Create popup
        </h1>
      </div>

      <PopupForm
        data={{
          id: null,
          title: "",
          subtitle: "",
          eyebrow: "",
          image_url: null,
          cta_label: "",
          cta_href: "",
          target_pages: "*",
          delay_seconds: 6,
          active: false,
          display_order: 100,
        }}
      />
    </AdminShell>
  );
}
