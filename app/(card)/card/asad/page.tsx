import type { Metadata } from "next";
import { DigitalCard } from "@/components/digital-card";

export const metadata: Metadata = {
  title: "Asad Hashmi · Smart Creation Group",
  description:
    "Connect with Asad Hashmi, Founder & C.E.O of Smart Creation Group of Companies. Save contact, call, WhatsApp or book a consultation.",
};

const ASAD_SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/asad-hashmi-650ba265/", icon: "linkedin" as const },
  { label: "Instagram", href: "https://www.instagram.com/asadhashmi.1/", icon: "instagram" as const },
  { label: "Facebook", href: "https://www.facebook.com/AsadQureshiHashmi", icon: "facebook" as const },
  { label: "TikTok", href: "https://www.tiktok.com/@asadhashmiofficial", icon: "tiktok" as const },
];

export default function AsadCardPage() {
  return (
    <DigitalCard
      name="Asad Hashmi"
      chip="Founder & C.E.O"
      role="Smart Creation Group of Companies"
      tagline="Helping founders set up, structure and scale their business across the U.A.E. — one accountable team, since 2020."
      avatar={{ src: "/ceo-asad-hashmi.webp", alt: "Asad Hashmi", shape: "round" }}
      vcf="/asad-hashmi.vcf"
      phone="+971 55 545 5831"
      phoneHref="tel:+971555455831"
      email="ceo@thesmartcreation.com"
      emailHref="mailto:ceo@thesmartcreation.com"
      whatsappHref={
        "https://wa.me/971555455831?text=" +
        encodeURIComponent("Hi Asad, I'd like to know more about Smart Creation's services.")
      }
      address1="19th Floor, Damac Executive Heights"
      address2="Barsha Heights (Tecom), Dubai, UAE."
      socials={ASAD_SOCIALS}
      source="Asad Hashmi — digital card"
    />
  );
}
