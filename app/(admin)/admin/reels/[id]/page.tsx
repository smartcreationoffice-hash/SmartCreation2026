import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin-auth";
import { getReelByIdAdmin } from "@/lib/reels";
import { AdminShell } from "../../_shell";
import { ReelForm } from "../_form";

export const dynamic = "force-dynamic";

export default async function EditReelPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (!Number.isFinite(id)) notFound();

  const row = await getReelByIdAdmin(id);
  if (!row) notFound();

  return (
    <AdminShell active="reels">
      <div className="mb-8">
        <div className="font-mono text-[0.66rem] uppercase tracking-[0.22em] text-stone mb-2">
          Marketing · Edit reel
        </div>
        <h1 className="font-display text-[2rem] tracking-[-0.02em] text-ink line-clamp-1">
          {row.caption || "Reel"}
        </h1>
      </div>

      <ReelForm
        data={{
          id: row.id,
          url: row.url,
          caption: row.caption ?? "",
          active: row.active,
          display_order: row.display_order ?? 100,
        }}
      />
    </AdminShell>
  );
}
