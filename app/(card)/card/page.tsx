import { DigitalCard } from "@/components/digital-card";

export default function CardPage() {
  return (
    <DigitalCard
      name="Smart Creation Group"
      role="Business Setup · Centers · Financial"
      tagline="Your trusted partner in business success — one accountable team across the U.A.E., since 2020."
      avatar={{ src: "/sc-cube.png", alt: "Smart Creation Group", shape: "cube" }}
      vcf="/smart-creation.vcf"
    />
  );
}
