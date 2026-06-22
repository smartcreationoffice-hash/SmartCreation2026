import { requireAdmin } from "@/lib/admin-auth";
import { AdminShell } from "../../_shell";
import { ReelForm } from "../_form";

export const dynamic = "force-dynamic";

export default async function NewReelPage() {
  await requireAdmin();
  return (
    <AdminShell active="reels">
      <div className="mb-8">
        <div className="font-mono text-[0.66rem] uppercase tracking-[0.22em] text-stone mb-2">
          Marketing · New reel
        </div>
        <h1 className="font-display text-[2rem] tracking-[-0.02em] text-ink">
          Add reel
        </h1>
      </div>

      <ReelForm
        data={{
          id: null,
          url: "",
          caption: "",
          active: true,
          display_order: 100,
        }}
      />
    </AdminShell>
  );
}
