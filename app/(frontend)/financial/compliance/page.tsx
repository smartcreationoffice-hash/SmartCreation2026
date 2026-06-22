import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CategoryHero } from "@/components/category-hero";
import {
  ServiceSection,
  type ServiceSectionData,
} from "@/components/service-section";

export const metadata: Metadata = {
  title: "Compliance Services in the UAE · AML, UBO, Structuring, Trademark",
  description:
    "AML compliance, UBO notification, business structuring and trademark registration for UAE companies — frameworks filed on time, brand and structure protected.",
  alternates: { canonical: "/financial/compliance" },
};

const sections: ServiceSectionData[] = [
  {
    id: "aml-compliance",
    index: "01",
    eyebrow: "Anti-money-laundering",
    title: "AML Compliance Services",
    icon: "badge-check",
    lede:
      "A real AML framework — policies, risk assessment, KYC and MLRO support — for the DNFBPs and regulated businesses that face fines without one. Built to satisfy the regulator, not just to sit in a folder.",
    image: { src: "/services/compliance/aml-esr-ubo.webp", alt: "AML compliance services" },
    good: [
      "DNFBPs: real estate, precious metals, accountants, advisors",
      "Companies registered on the goAML portal",
      "Businesses needing a documented AML framework, not a template",
      "Firms preparing for a regulator inspection",
    ],
    included: [
      "AML risk assessment and written policies",
      "KYC / customer due-diligence (CDD/EDD) framework",
      "MLRO support and goAML registration / reporting",
      "Staff awareness guidance and record-keeping setup",
      "Inspection and audit-readiness preparation",
    ],
    meta: [
      { label: "For", value: "DNFBPs & regulated firms" },
      { label: "Portal", value: "goAML" },
      { label: "Fines if missed", value: "AED 50k–5M" },
      { label: "Output", value: "Working framework" },
    ],
    highlight: {
      eyebrow: "Template AML won't save you",
      title: "Regulators check that it's real.",
      body: "An inspection tests whether your framework actually operates — risk assessments done, CDD performed, reports filed. We build one that holds up, not one that just exists on paper.",
    },
    steps: [
      "Risk-assess the business and its exposure.",
      "Draft policies, CDD and the MLRO setup.",
      "Register and report through goAML.",
      "Keep it audit-ready year-round.",
    ],
  },
  {
    id: "ubo-notification",
    index: "02",
    eyebrow: "Beneficial ownership",
    title: "UBO Notification",
    icon: "id-card",
    lede:
      "Every UAE company must declare its Ultimate Beneficial Owners and keep the register current. We file the declaration and maintain it through every ownership change — so a missed update never becomes a penalty.",
    image: { src: "/services/compliance/attestation.webp", alt: "UBO notification filing" },
    good: [
      "Newly incorporated companies completing UBO filings",
      "Businesses with layered or foreign ownership",
      "Companies that have changed shareholders or directors",
      "Owners unsure if their UBO register is up to date",
    ],
    included: [
      "Identification of ultimate beneficial owners",
      "UBO declaration filing with the registrar",
      "Real Beneficiary and Nominee register maintenance",
      "Change reporting within statutory deadlines",
      "Annual review to keep records current",
    ],
    meta: [
      { label: "Applies to", value: "Almost all UAE entities" },
      { label: "Filed with", value: "Licensing authority" },
      { label: "Trigger", value: "Setup + any change" },
      { label: "We keep", value: "The register current" },
    ],
    highlight: {
      eyebrow: "It's not a one-time form",
      title: "Every ownership change restarts the clock.",
      body: "UBO obligations are ongoing — change a shareholder and a new filing is due within days. We track it so the register is always accurate and penalty-free.",
    },
    steps: [
      "Map the ultimate beneficial owners.",
      "File the UBO declaration with the registrar.",
      "Maintain the beneficiary registers.",
      "Report every change on time.",
    ],
  },
  {
    id: "business-structuring",
    index: "03",
    eyebrow: "Group structuring",
    title: "Business Structuring Service",
    icon: "network",
    lede:
      "Design the right ownership structure — parent, subsidiaries, holding and operating entities — across mainland, free zone and offshore. Clean today, and built for tax, investment and an eventual exit.",
    image: { src: "/services/compliance/renewal.webp", alt: "Business structuring service" },
    good: [
      "Founders running several brands or business lines",
      "Investors with multiple verticals to ring-fence",
      "Companies separating IP, trading and real-estate arms",
      "Groups preparing for investment or acquisition",
    ],
    included: [
      "Group-structure design: parent, sub-holdings, operating subs",
      "Jurisdiction mix across mainland, free zone and offshore",
      "Shareholder and inter-company arrangements",
      "Corporate-tax grouping and transfer-pricing readiness",
      "Coordinated incorporation across all entities",
    ],
    meta: [
      { label: "Layers", value: "Holding → ops → IP / RE" },
      { label: "Jurisdictions", value: "Mainland · FZ · offshore" },
      { label: "Tax group", value: "Where eligible" },
      { label: "Built for", value: "Growth & exit" },
    ],
    highlight: {
      eyebrow: "Structure for the future, not just today",
      title: "A clean structure now saves a painful restructure later.",
      body: "We design with Corporate Tax, future investment and an eventual sale in mind, so your cap table and entities don't need unwinding under deal pressure.",
    },
    steps: [
      "Map the brands, IP and entities you need.",
      "Design the parent / holding / operating layers.",
      "Incorporate across jurisdictions in lockstep.",
      "Wire up agreements and CT grouping.",
    ],
  },
  {
    id: "trademark-registration",
    index: "04",
    eyebrow: "Brand protection",
    title: "Trademark Registration",
    icon: "copyright",
    lede:
      "Register your brand name, logo and word-marks in the UAE — and internationally via the Madrid System. Most disputes start because the mark was filed too late; we make sure yours isn't.",
    image: { src: "/services/compliance/trademark.webp", alt: "Trademark registration" },
    good: [
      "Founders launching a new brand or product line",
      "Companies expanding into new emirates or markets",
      "Businesses that received a copy-cat warning",
      "Anyone whose name is on contracts and invoices",
    ],
    included: [
      "Pre-filing similarity search across UAE, GCC and key markets",
      "Class selection across the 45 Nice classes",
      "Application drafting, filing and Ministry follow-up",
      "Publication, opposition window and certificate",
      "International filing via the Madrid Protocol",
    ],
    meta: [
      { label: "Authority", value: "MoE · Ministry of Economy" },
      { label: "Term", value: "10 years · renewable" },
      { label: "Timeline", value: "8–12 months" },
      { label: "International", value: "Madrid Protocol" },
    ],
    highlight: {
      eyebrow: "The classic mistake",
      title: "A trade licence is not a trademark.",
      body: "Your licence lets you operate; your trademark proves the brand is yours. File it while the brand is still small — disputes are far costlier than registration.",
    },
    steps: [
      "Run a similarity search across target markets.",
      "Pick the right classes and file with MoE.",
      "Respond to any office action.",
      "Clear opposition and receive the certificate.",
    ],
  },
];

export default function CompliancePage() {
  return (
    <>
      <CategoryHero
        breadcrumb="Compliance"
        eyebrow="Compliance"
        title={
          <>
            <span className="block">Compliant, structured</span>
            <span className="block text-brand">and protected.</span>
          </>
        }
        lede="AML frameworks, UBO filings, group structuring and trademark registration — the compliance and protection layer that keeps your company clean, current and yours."
        cta={{ label: "Book a consultation", href: "/contact" }}
        pillars={[
          { id: "aml-compliance", index: "01", label: "AML Compliance Services", desc: "Anti-money-laundering", icon: "badge-check" },
          { id: "ubo-notification", index: "02", label: "UBO Notification", desc: "Beneficial ownership", icon: "id-card" },
          { id: "business-structuring", index: "03", label: "Business Structuring", desc: "Group structuring", icon: "globe" },
          { id: "trademark-registration", index: "04", label: "Trademark Registration", desc: "Brand protection", icon: "copyright" },
        ]}
      />

      {sections.map((s, idx) => (
        <ServiceSection key={s.id} section={s} idx={idx} />
      ))}

      <section className="py-20 md:py-28 bg-ink text-paper border-t border-paper/10">
        <div className="container-edit">
          <div className="grid grid-cols-12 gap-x-4 md:gap-x-10 gap-y-10 items-center">
            <div className="col-span-12 lg:col-span-7">
              <div className="flex items-center gap-3 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-mist mb-4">
                <span className="h-px w-8 bg-mist/40" />§ Next step
              </div>
              <h2 className="font-display text-[clamp(1.9rem,4vw,3rem)] leading-[1.05] tracking-[-0.02em] text-paper text-balance max-w-3xl">
                Stay compliant, stay protected.{" "}
                <span className="text-brand-soft">We'll handle the filings.</span>
              </h2>
              <p className="mt-5 max-w-2xl text-[1.02rem] leading-relaxed text-paper/75">
                AML, UBO, structuring or trademark — one accountable team to keep
                your obligations met and your brand secured. Free, 30-minute
                consultation.
              </p>
            </div>
            <div className="col-span-12 lg:col-span-5 lg:text-right">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-[0.95rem] font-medium text-ink hover:bg-paper transition-colors"
              >
                Book a consultation
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.8} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
