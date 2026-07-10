import type { Metadata } from "next";
import { ConsultationButton } from "@/components/consultation-button";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CategoryHero } from "@/components/category-hero";
import {
  ServiceSection,
  type ServiceSectionData,
} from "@/components/service-section";

export const metadata: Metadata = {
  title: "Tax Consultation Services in the UAE",
  description:
    "Corporate Tax, double-taxation, transfer pricing, permanent establishment, tax residency, withholding tax and more — UAE tax advisory by one accountable team.",
  alternates: { canonical: "/financial/tax-consultation" },
};

const sections: ServiceSectionData[] = [
  {
    id: "corporate-tax",
    index: "01",
    eyebrow: "UAE Corporate Tax",
    title: "Corporate Tax Services",
    icon: "file-text",
    lede:
      "UAE Corporate Tax is here at 9% above AED 375,000, with special rules for free zones, groups and small-business relief. We register, file and structure so you pay what you owe and not a dirham more.",
    image: { src: "/services/financial/corporate-tax-services.webp", alt: "UAE Corporate Tax services" },
    good: [
      "Mainland companies above the AED 375k profit threshold",
      "Free-zone companies protecting 0% qualifying-income status",
      "Holding companies with subsidiaries, IP or real estate",
      "Groups eligible to file as a UAE Tax Group",
    ],
    included: [
      "FTA registration and Tax Registration Number (TRN)",
      "Free-zone qualifying-income analysis and documentation",
      "Annual taxable-income computation from audited books",
      "Corporate Tax return preparation and filing",
      "Small-business relief and group-relief assessment",
    ],
    meta: [
      { label: "Standard rate", value: "9% above AED 375k" },
      { label: "SBR", value: "Up to AED 3M revenue" },
      { label: "Free zone", value: "0% qualifying income" },
      { label: "Filing", value: "Annual · within 9 months" },
    ],
    highlight: {
      eyebrow: "The free-zone trap most miss",
      title: "0% isn't automatic. It's documented.",
      body: "Free-zone entities that don't track qualifying income lose the 0% status and pay 9% on everything. We evidence it from day one so the rate sticks under FTA review.",
    },
    steps: [
      "Assess exposure: mainland vs free zone vs group.",
      "Register with the FTA and get your TRN.",
      "Keep audit-ready books with qualifying-income tags.",
      "Compute, file and document within 9 months.",
    ],
  },
  {
    id: "double-taxation",
    index: "02",
    eyebrow: "Treaty relief",
    title: "Double Taxation Advisory",
    icon: "globe",
    lede:
      "The UAE has 140+ double-taxation treaties. Used correctly, they stop the same income being taxed twice. We map your cross-border flows to the right treaty and secure the relief and certificates you're entitled to.",
    image: { src: "/services/financial/double-taxation-advisory.webp", alt: "Double taxation treaty advisory" },
    good: [
      "Companies earning income across multiple countries",
      "Shareholders receiving foreign dividends or interest",
      "Businesses paying or receiving cross-border royalties",
      "Groups with foreign subsidiaries or branches",
    ],
    included: [
      "Treaty analysis for your specific income flows",
      "Tax Residency Certificate (TRC) applications",
      "Relief and exemption position mapping",
      "Withholding-rate reduction under treaties",
      "Documentation to support the treaty position",
    ],
    meta: [
      { label: "Treaties", value: "140+ countries" },
      { label: "Key tool", value: "Tax Residency Certificate" },
      { label: "Covers", value: "Dividends · interest · royalties" },
      { label: "Goal", value: "No double taxation" },
    ],
    highlight: {
      eyebrow: "Relief you have to claim",
      title: "Treaties don't apply themselves.",
      body: "Relief requires the right residency certificate and documentation filed in the right place. We handle the paperwork so the treaty actually reduces your tax.",
    },
    steps: [
      "Map your cross-border income flows.",
      "Identify the applicable treaty and relief.",
      "Secure the Tax Residency Certificate.",
      "Apply the relief and keep the evidence.",
    ],
  },
  {
    id: "ftc-advisory",
    index: "03",
    eyebrow: "Foreign tax credit",
    title: "Foreign Tax Credit (FTC) Advisory",
    icon: "banknote",
    lede:
      "Paid tax abroad on income that's also taxable in the UAE? A foreign tax credit offsets it against your UAE Corporate Tax. We calculate the credit correctly and document it so the FTA accepts it.",
    image: { src: "/services/financial/foreign-tax-credit.webp", alt: "Foreign tax credit advisory" },
    good: [
      "UAE companies with foreign-taxed income",
      "Businesses with overseas branches or projects",
      "Groups repatriating foreign earnings",
      "Companies unsure how to claim foreign tax paid",
    ],
    included: [
      "Identification of creditable foreign taxes",
      "FTC calculation against UAE Corporate Tax",
      "Limitation and eligibility analysis",
      "Supporting documentation and evidence",
      "Coordination with your CT return",
    ],
    meta: [
      { label: "Offsets", value: "Foreign tax vs UAE CT" },
      { label: "Limit", value: "UAE CT on that income" },
      { label: "Needs", value: "Proof of foreign tax" },
      { label: "Filed in", value: "Your CT return" },
    ],
    highlight: {
      eyebrow: "Don't pay twice",
      title: "Foreign tax paid is UAE tax saved.",
      body: "The credit is capped and evidence-driven — get the calculation or documentation wrong and the FTA disallows it. We get both right.",
    },
    steps: [
      "Identify which foreign taxes qualify.",
      "Calculate the credit within the limit.",
      "Assemble the supporting evidence.",
      "Apply it against your Corporate Tax.",
    ],
  },
  {
    id: "pe-advisory",
    index: "04",
    eyebrow: "Permanent establishment",
    title: "Permanent Establishment (PE) Advisory",
    icon: "building",
    lede:
      "Operating across borders can unintentionally create a taxable presence — a permanent establishment — and an unexpected tax bill. We assess your footprint and structure activities to manage PE risk.",
    image: { src: "/services/financial/permanent-establishment-advisory.webp", alt: "Permanent establishment advisory" },
    good: [
      "Foreign companies operating in or into the UAE",
      "UAE companies with staff or projects abroad",
      "Businesses with dependent agents or fixed places",
      "Groups managing where profit is taxed",
    ],
    included: [
      "PE-risk assessment of your activities and presence",
      "Fixed-place and dependent-agent analysis",
      "Profit-attribution guidance for any PE",
      "Treaty PE-threshold review",
      "Structuring recommendations to manage exposure",
    ],
    meta: [
      { label: "Tests", value: "Fixed place · agent" },
      { label: "Risk", value: "Unexpected tax nexus" },
      { label: "Driven by", value: "Treaties + CT law" },
      { label: "Output", value: "Risk map + plan" },
    ],
    highlight: {
      eyebrow: "The presence you didn't plan",
      title: "A PE can be created by accident.",
      body: "A signing employee or a fixed office abroad can trigger taxable presence. We flag it before it becomes an assessment and structure to keep it intentional.",
    },
    steps: [
      "Review your cross-border activities and people.",
      "Assess fixed-place and agent PE risk.",
      "Map profit attribution and exposure.",
      "Recommend a structure that manages it.",
    ],
  },
  {
    id: "tax-residency",
    index: "05",
    eyebrow: "Residency certificates",
    title: "Tax Residency Advisory",
    icon: "id-card",
    lede:
      "A UAE Tax Residency Certificate unlocks treaty benefits and proves where you're taxed. We confirm eligibility and obtain the certificate for both companies and individuals.",
    image: { src: "/services/financial/tax-residency-advisory.webp", alt: "Tax residency advisory" },
    good: [
      "Companies claiming double-taxation treaty relief",
      "Individuals proving UAE tax residency",
      "Businesses with foreign withholding to reduce",
      "Owners managing residency across countries",
    ],
    included: [
      "Eligibility assessment for company or individual",
      "Tax Residency Certificate (TRC) application",
      "Supporting-document preparation",
      "Liaison with the FTA through to issuance",
      "Guidance on maintaining residency status",
    ],
    meta: [
      { label: "For", value: "Companies & individuals" },
      { label: "Issued by", value: "Federal Tax Authority" },
      { label: "Unlocks", value: "Treaty relief" },
      { label: "Validity", value: "Typically 1 year" },
    ],
    highlight: {
      eyebrow: "Proof, not assumption",
      title: "Treaty relief starts with a TRC.",
      body: "Foreign authorities want a valid residency certificate before granting relief. We confirm eligibility and get it issued so the benefits actually flow.",
    },
    steps: [
      "Check residency eligibility and criteria.",
      "Prepare the supporting documents.",
      "File the TRC application with the FTA.",
      "Receive and renew the certificate.",
    ],
  },
  {
    id: "transfer-pricing",
    index: "06",
    eyebrow: "Related-party pricing",
    title: "Transfer Pricing Advisory",
    icon: "network",
    lede:
      "Transactions between related companies must be priced at arm's length and documented — a core UAE Corporate Tax requirement. We set defensible policies and prepare the documentation the FTA expects.",
    image: { src: "/services/financial/transfer-pricing-advisory.webp", alt: "Transfer pricing advisory" },
    good: [
      "Groups with inter-company transactions",
      "Companies charging management or service fees internally",
      "Businesses licensing IP between entities",
      "Multinationals meeting OECD-aligned TP rules",
    ],
    included: [
      "Related-party transaction mapping",
      "Arm's-length benchmarking analysis",
      "Transfer-pricing policy design",
      "Master file / local file documentation",
      "Disclosure-form support for the CT return",
    ],
    meta: [
      { label: "Standard", value: "Arm's length · OECD" },
      { label: "Docs", value: "Master & local file" },
      { label: "Applies to", value: "Related-party deals" },
      { label: "Linked to", value: "Corporate Tax" },
    ],
    highlight: {
      eyebrow: "Document before you're asked",
      title: "Inter-company pricing must hold up.",
      body: "The FTA can adjust profits and penalise undocumented related-party pricing. We benchmark and document so your structure stands up to scrutiny.",
    },
    steps: [
      "Map related-party transactions.",
      "Benchmark them to arm's length.",
      "Set the transfer-pricing policy.",
      "Prepare master and local file documentation.",
    ],
  },
  {
    id: "wht-advisory",
    index: "07",
    eyebrow: "Withholding tax",
    title: "Withholding Tax (WHT) Advisory",
    icon: "calculator",
    lede:
      "The UAE applies 0% domestic withholding tax — but cross-border payments can attract foreign WHT. We manage withholding on your international flows and recover it through treaties where possible.",
    image: { src: "/services/financial/withholding-tax-advisory.webp", alt: "Withholding tax advisory" },
    good: [
      "Companies making or receiving cross-border payments",
      "Businesses paying foreign suppliers, IP or interest",
      "Groups managing WHT across jurisdictions",
      "Owners receiving foreign-sourced income",
    ],
    included: [
      "WHT exposure review on inbound/outbound flows",
      "Treaty-based withholding-rate reduction",
      "Documentation and certificate support",
      "Foreign-WHT recovery and credit coordination",
      "Compliance with foreign filing obligations",
    ],
    meta: [
      { label: "UAE domestic", value: "0%" },
      { label: "Cross-border", value: "Foreign WHT may apply" },
      { label: "Tool", value: "Treaties + TRC" },
      { label: "Goal", value: "Reduce & recover" },
    ],
    highlight: {
      eyebrow: "0% at home isn't the whole picture",
      title: "Foreign withholding still bites.",
      body: "The UAE withholds nothing domestically, but the country you pay or earn from might. We apply treaties to cut the rate and recover what you can.",
    },
    steps: [
      "Review cross-border payment flows.",
      "Apply treaty rates and exemptions.",
      "Prepare certificates and documentation.",
      "Recover or credit foreign WHT.",
    ],
  },
  {
    id: "digital-tax",
    index: "08",
    eyebrow: "Tax technology",
    title: "Digital Tax Solutions",
    icon: "shield",
    lede:
      "Move tax off spreadsheets. We set up accounting and tax software, automate VAT and Corporate Tax workflows, and get you ready for the UAE's shift toward e-invoicing and digital filing.",
    image: { src: "/services/financial/digital-tax-solutions.webp", alt: "Digital tax solutions" },
    good: [
      "Companies still running tax on spreadsheets",
      "Businesses preparing for UAE e-invoicing",
      "Finance teams wanting automated VAT/CT workflows",
      "Owners who want real-time tax visibility",
    ],
    included: [
      "Accounting and tax software setup (Zoho / Xero / QuickBooks)",
      "VAT and Corporate Tax workflow automation",
      "E-invoicing readiness and configuration",
      "Dashboards for live tax and cash visibility",
      "Integration with your existing systems",
    ],
    meta: [
      { label: "Platforms", value: "Zoho · Xero · QuickBooks" },
      { label: "Automates", value: "VAT · CT workflows" },
      { label: "Ready for", value: "UAE e-invoicing" },
      { label: "Output", value: "Live tax dashboards" },
    ],
    highlight: {
      eyebrow: "Built for what's coming",
      title: "E-invoicing is on the way. Get ahead of it.",
      body: "The UAE is moving to mandatory e-invoicing and digital filing. We set up the systems now so the transition is a switch-on, not a scramble.",
    },
    steps: [
      "Audit your current tax and finance tools.",
      "Set up software and automate workflows.",
      "Configure for e-invoicing readiness.",
      "Hand over live dashboards and training.",
    ],
  },
];

export default function TaxConsultationPage() {
  return (
    <>
      <CategoryHero
        breadcrumb="Tax Consultation"
        eyebrow="Tax Consultation"
        title={
          <>
            <span className="block">Pay what you owe.</span>
            <span className="block text-brand">Not a dirham more.</span>
          </>
        }
        lede="Corporate Tax, treaties, transfer pricing, permanent establishment, residency, withholding and tax technology — full-spectrum UAE tax advisory from one accountable team."
        cta={{ label: "Book a tax review", href: "/contact" }}
        pillars={[
          { id: "corporate-tax", index: "01", label: "Corporate Tax Services", desc: "UAE Corporate Tax", icon: "file-text" },
          { id: "double-taxation", index: "02", label: "Double Taxation Advisory", desc: "Treaty relief", icon: "globe" },
          { id: "ftc-advisory", index: "03", label: "Foreign Tax Credit", desc: "FTC advisory", icon: "banknote" },
          { id: "pe-advisory", index: "04", label: "Permanent Establishment", desc: "PE advisory", icon: "building" },
          { id: "tax-residency", index: "05", label: "Tax Residency", desc: "Residency certificates", icon: "id-card" },
          { id: "transfer-pricing", index: "06", label: "Transfer Pricing", desc: "Related-party pricing", icon: "network" },
          { id: "wht-advisory", index: "07", label: "Withholding Tax", desc: "WHT advisory", icon: "calculator" },
          { id: "digital-tax", index: "08", label: "Digital Tax Solutions", desc: "Tax technology", icon: "shield" },
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
                One tax question or a full review?{" "}
                <span className="text-brand-soft">Start with a call.</span>
              </h2>
              <p className="mt-5 max-w-2xl text-[1.02rem] leading-relaxed text-paper/75">
                Corporate Tax, treaties, transfer pricing or residency — tell us
                the situation and we'll come back with a clear position within one
                business day.
              </p>
            </div>
            <div className="col-span-12 lg:col-span-5 lg:text-right">
              <ConsultationButton className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-[0.95rem] font-medium text-ink hover:bg-paper transition-colors" >
                Book a tax review
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.8} />
              </ConsultationButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
