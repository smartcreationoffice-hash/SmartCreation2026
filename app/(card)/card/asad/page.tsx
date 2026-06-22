import type { Metadata } from "next";
import { DigitalCard } from "@/components/digital-card";

export const metadata: Metadata = {
  title: "Asad Hashmi · Smart Creation Group",
  description:
    "Connect with Asad Hashmi, Founder & C.E.O of Smart Creation Group of Companies. Save contact, call, WhatsApp or book a consultation.",
};

export default function AsadCardPage() {
  return (
    <DigitalCard
      name="Asad Hashmi"
      chip="Founder & C.E.O"
      role="Smart Creation Group of Companies"
      tagline="Helping founders set up, structure and scale their business across the U.A.E. — one accountable team, since 2020."
      avatar={{ src: "/ceo-asad-hashmi.webp", alt: "Asad Hashmi", shape: "round" }}
      vcf="/asad-hashmi.vcf"
      phoneHref="tel:+971555519459"
    />
  );
}
