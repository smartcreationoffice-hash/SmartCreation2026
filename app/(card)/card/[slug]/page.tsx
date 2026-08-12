import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DigitalCard } from "@/components/digital-card";
import { CONTACT } from "@/lib/data";
import { cardUrl, dialDigits, getCard } from "@/lib/cards";

// Cards are edited from the admin panel; regenerate quickly so an edit is
// live within a minute without a redeploy.
export const revalidate = 60;

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const card = await getCard(slug);
  if (!card) return {};

  const title = `${card.name} · Smart Creation Group`;
  const description =
    card.tagline ||
    `Connect with ${card.name}${card.chip ? `, ${card.chip}` : ""} at Smart Creation Group of Companies. Save contact, call, WhatsApp or book a consultation.`;

  return {
    title,
    description,
    alternates: { canonical: `/card/${card.slug}` },
    // A personal card has no business in search results or AI crawlers.
    robots: { index: false, follow: false },
    openGraph: {
      title,
      description,
      url: cardUrl(card.slug),
      type: "profile",
      images: card.photo ? [{ url: card.photo, alt: card.name }] : undefined,
    },
  };
}

export default async function CardPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const card = await getCard(slug);
  if (!card) notFound();

  const phoneDigits = dialDigits(card.phone);
  const waDigits = dialDigits(card.whatsapp) || phoneDigits;
  const waText =
    card.whatsapp_text ||
    `Hi ${card.name.split(" ")[0]}, I'd like to know more about Smart Creation's services.`;

  return (
    <DigitalCard
      name={card.name}
      chip={card.chip ?? undefined}
      role={card.role}
      tagline={card.tagline}
      avatar={
        card.photo
          ? { src: card.photo, alt: card.name, shape: "round" }
          : { src: "/sc-cube.png", alt: "Smart Creation Group", shape: "cube" }
      }
      vcf={`/card/${card.slug}/vcard`}
      phone={card.phone ?? undefined}
      phoneHref={phoneDigits ? `tel:+${phoneDigits}` : undefined}
      email={card.email ?? undefined}
      emailHref={card.email ? `mailto:${card.email}` : undefined}
      whatsappHref={
        waDigits
          ? `https://wa.me/${waDigits}?text=${encodeURIComponent(waText)}`
          : CONTACT.whatsappHref
      }
      address1={card.address1 ?? undefined}
      address2={card.address2 ?? undefined}
      socials={card.socials.length > 0 ? card.socials : undefined}
      source={`${card.name} — digital card`}
      cardSlug={card.slug}
      ownerName={card.name.split(" ")[0]}
      ownerWhatsapp={waDigits || undefined}
    />
  );
}
