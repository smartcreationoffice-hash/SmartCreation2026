import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin-auth";
import { getPopupByIdAdmin } from "@/lib/popup";
import { AdminShell } from "../../_shell";
import { PopupForm } from "../_form";

export const dynamic = "force-dynamic";

export default async function EditPopupPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (!Number.isFinite(id)) notFound();

  const row = await getPopupByIdAdmin(id);
  if (!row) notFound();

  return (
    <AdminShell active="popups">
      <div className="mb-8">
        <div className="font-mono text-[0.66rem] uppercase tracking-[0.22em] text-stone mb-2">
          Marketing · Edit popup
        </div>
        <h1 className="font-display text-[2rem] tracking-[-0.02em] text-ink line-clamp-2">
          {row.title}
        </h1>
      </div>

      <PopupForm
        data={{
          id: row.id,
          title: row.title,
          subtitle: row.subtitle ?? "",
          eyebrow: row.eyebrow ?? "",
          image_url: row.image_url,
          cta_label: row.cta_label ?? "",
          cta_href: row.cta_href ?? "",
          target_pages: row.target_pages ?? "*",
          delay_seconds: row.delay_seconds ?? 6,
          active: row.active,
          display_order: row.display_order ?? 100,
        }}
      />
    </AdminShell>
  );
}
