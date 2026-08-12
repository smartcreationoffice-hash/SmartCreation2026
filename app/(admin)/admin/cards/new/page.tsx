import { requireAdmin } from "@/lib/admin-auth";
import { CONTACT } from "@/lib/data";
import { AdminShell } from "../../_shell";
import { CardForm } from "../_form";

export const dynamic = "force-dynamic";

export default async function NewCardPage() {
  await requireAdmin();

  return (
    <AdminShell active="cards">
      <div className="mb-8">
        <div className="font-mono text-[0.66rem] uppercase tracking-[0.22em] text-stone mb-2">
          Team · New digital card
        </div>
        <h1 className="font-display text-[2rem] tracking-[-0.02em] text-ink">
          Create a card
        </h1>
        <p className="mt-2 text-[0.92rem] text-ink-mute max-w-xl">
          Fill in the details and save. The QR code and the download button
          appear straight after, on the edit screen.
        </p>
      </div>

      <CardForm
        data={{
          id: null,
          slug: "",
          name: "",
          chip: "",
          role: "Smart Creation Group of Companies",
          tagline: "",
          photo: null,
          phone: "",
          email: "",
          whatsapp: "",
          whatsapp_text: "",
          address1: CONTACT.address,
          address2: CONTACT.addressLine2,
          socials: [],
          active: true,
        }}
      />
    </AdminShell>
  );
}
