import { notFound } from "next/navigation";
import QRCode from "qrcode";

import { requireAdmin } from "@/lib/admin-auth";
import { cardUrl, getCardByIdAdmin } from "@/lib/cards";
import { AdminShell } from "../../_shell";
import { CardForm } from "../_form";

export const dynamic = "force-dynamic";

export default async function EditCardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (!Number.isFinite(id)) notFound();

  const card = await getCardByIdAdmin(id);
  if (!card) notFound();

  const url = cardUrl(card.slug);
  // Error correction H leaves enough redundancy for the centre logo the
  // download composites in.
  const dataUrl = await QRCode.toDataURL(url, {
    errorCorrectionLevel: "H",
    margin: 2,
    width: 600,
    color: { dark: "#123a5eff", light: "#ffffffff" },
  });

  return (
    <AdminShell active="cards">
      <div className="mb-8">
        <div className="font-mono text-[0.66rem] uppercase tracking-[0.22em] text-stone mb-2">
          Team · Edit digital card
        </div>
        <h1 className="font-display text-[2rem] tracking-[-0.02em] text-ink">
          {card.name}
        </h1>
      </div>

      <CardForm
        data={{
          id: card.id,
          slug: card.slug,
          name: card.name,
          chip: card.chip ?? "",
          role: card.role,
          tagline: card.tagline,
          photo: card.photo,
          phone: card.phone ?? "",
          email: card.email ?? "",
          whatsapp: card.whatsapp ?? "",
          whatsapp_text: card.whatsapp_text ?? "",
          address1: card.address1 ?? "",
          address2: card.address2 ?? "",
          socials: card.socials,
          active: card.active,
        }}
        qr={{ url, dataUrl }}
      />
    </AdminShell>
  );
}
