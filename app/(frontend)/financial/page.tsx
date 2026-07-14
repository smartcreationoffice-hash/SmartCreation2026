import type { Metadata } from "next";
import { ConsultationButton } from "@/components/consultation-button";
import Link from "next/link";
import { ArrowUpRight, Calendar } from "lucide-react";
import { FinancialHero } from "@/components/financial-hero";
import {
  ServiceSection,
  type ServiceSectionData,
} from "@/components/service-section";

export const metadata: Metadata = {
  title: "Financial Services · Accounting, Audit, Tax, VAT & Compliance",
  description:
    "Five financial disciplines under one accountable team: accounting & bookkeeping, audit & assurance, tax consultation, VAT consultancy and regulatory compliance. Explore each service area.",
  alternates: { canonical: "/financial" },
};

/** A category section that links through to its own dedicated page. */
type CategorySection = ServiceSectionData & { href: string; ctaLabel: string };

const sections: CategorySection[] = [
  {
    id: "accounting",
    index: "01",
    eyebrow: "Bookkeeping & management accounts",
    title: "Accounting",
    icon: "calculator",
    href: "/financial/accounting",
    ctaLabel: "Explore accounting",
    lede:
      "Clean books, kept monthly. From day-to-day bookkeeping to investor-grade management accounts, we maintain the ledger every audit, VAT return and Corporate Tax filing depends on — so the numbers are always ready, never rebuilt under deadline.",
    image: {
      src: "/services/financial/accounting-category.webp",
      alt: "Accounting & bookkeeping services in the UAE",
    },
    good: [
      "Companies that want monthly numbers, not a year-end scramble",
      "Founders preparing for investment, a loan or an audit",
      "Businesses moving off spreadsheets to proper cloud accounting",
      "Owners who want a clear monthly P&L and cash position",
    ],
    included: [
      "Accounting Services — monthly close and financial statements",
      "Bookkeeping Services — accurate day-to-day ledger upkeep",
      "Cloud accounting on Zoho, Xero or QuickBooks",
      "Management reporting with the numbers that matter to you",
      "Year-end statements ready for audit and Corporate Tax",
    ],
    meta: [
      { label: "Cadence", value: "Monthly close" },
      { label: "Software", value: "Zoho · Xero · QuickBooks" },
      { label: "Reporting", value: "P&L · balance sheet · cash flow" },
      { label: "Standards", value: "IFRS-aligned" },
    ],
    highlight: {
      eyebrow: "Why monthly beats year-end",
      title: "We keep up, so you never catch up.",
      body: "Books closed every month mean no six-month panic before tax season — when a bank, investor or the FTA asks for figures, they're already there and reconciled.",
    },
    steps: [
      "Set up the chart of accounts and onboard your software.",
      "Record and reconcile every transaction, monthly.",
      "Issue management accounts by the 10th of each month.",
      "Compile year-end statements for audit and tax.",
    ],
  },
  {
    id: "audit-assurance",
    index: "02",
    eyebrow: "Internal, external & FTA audits",
    title: "Audit & Assurance",
    icon: "file-search",
    href: "/financial/audit-assurance",
    ctaLabel: "Explore audit & assurance",
    lede:
      "Independent assurance that stands up to scrutiny. Internal audits that surface the gaps before they cost you, statutory external audits banks and regulators accept, and full representation when the FTA opens a tax audit.",
    image: {
      src: "/services/financial/audit-assurance-category.webp",
      alt: "Audit & assurance services in the UAE",
    },
    good: [
      "Free-zone companies with a mandatory annual audit requirement",
      "Businesses raising finance or reporting to shareholders",
      "Groups needing internal controls reviewed and tightened",
      "Companies notified of an FTA tax audit",
    ],
    included: [
      "Internal Audit — controls, risk and process review",
      "External Audit — statutory, IFRS-aligned independent opinion",
      "FTA Tax Audit — preparation, documentation and representation",
      "Findings ranked by severity, with the fix for each",
      "A report you can act on, not just file",
    ],
    meta: [
      { label: "Standards", value: "IFRS · ISA" },
      { label: "Scope", value: "Internal · external · tax" },
      { label: "Turnaround", value: "2–4 weeks typical" },
      { label: "Output", value: "Signed report + action list" },
    ],
    highlight: {
      eyebrow: "Why our audits land differently",
      title: "Findings you can act on Monday.",
      body: "An audit that ends in a filed PDF changes nothing. Ours ends in a prioritised list of what to fix, why it matters and how — so the assurance actually makes the business stronger.",
    },
    steps: [
      "Scope the engagement: internal, external or FTA.",
      "Test the books, controls and documentation.",
      "Draft findings with severity ratings and fixes.",
      "Issue the report and walk you through every point.",
    ],
  },
  {
    id: "tax-consultation",
    index: "03",
    eyebrow: "Corporate tax & cross-border",
    title: "Tax Consultation",
    icon: "file-text",
    href: "/financial/tax-consultation",
    ctaLabel: "Explore tax consultation",
    lede:
      "UAE Corporate Tax is here — and cross-border tax is where the real money is won or lost. Registration, structuring, treaty relief, transfer pricing and more, handled so you pay exactly what you owe and not a dirham more.",
    image: {
      src: "/services/financial/tax-consultation-category.webp",
      alt: "Tax consultation services in the UAE",
    },
    good: [
      "Companies above the AED 375k Corporate Tax threshold",
      "Free-zone entities protecting 0% qualifying income",
      "Groups with related-party or cross-border transactions",
      "Businesses exposed to foreign withholding or double tax",
    ],
    included: [
      "Corporate Tax — registration, computation and filing",
      "Double Taxation and Foreign Tax Credit advisory",
      "Permanent Establishment and Tax Residency guidance",
      "Transfer Pricing documentation and Withholding Tax advisory",
      "Digital tax and e-invoicing readiness",
    ],
    meta: [
      { label: "Standard rate", value: "9% above AED 375k" },
      { label: "Free-zone", value: "0% on qualifying income" },
      { label: "Coverage", value: "8 tax specialisms" },
      { label: "Filing", value: "Annual · within 9 months" },
    ],
    highlight: {
      eyebrow: "The free-zone trap most miss",
      title: "0% isn't automatic. It's documented.",
      body: "Free-zone entities that don't evidence \"qualifying income\" lose the 0% and pay 9% on everything. We build the structure and the paper trail so the rate sticks under FTA review.",
    },
    steps: [
      "Map your exposure: entity, group and cross-border.",
      "Register with the FTA and structure for the right rate.",
      "Document qualifying income and related-party pricing.",
      "Compute, file and defend within the deadline.",
    ],
  },
  {
    id: "vat-consultancy",
    index: "04",
    eyebrow: "Registration to refunds",
    title: "VAT Consultancy",
    icon: "file-signature",
    href: "/financial/vat-consultancy",
    ctaLabel: "Explore VAT consultancy",
    lede:
      "Every stage of VAT, handled end to end. Registration without rejections, returns filed on time, voluntary disclosures that beat penalties, and refund claims that actually get your cash back.",
    image: {
      src: "/services/financial/vat-consultancy-category.webp",
      alt: "VAT consultancy services in the UAE",
    },
    good: [
      "Businesses at or above the AED 375k VAT threshold",
      "Companies filing late, incorrectly or not at all",
      "Exporters and zero-rated businesses owed refunds",
      "Firms wanting a compliance check before the FTA does",
    ],
    included: [
      "VAT Registration — TRN issued without the rejections",
      "VAT Return Filing — accurate, on every deadline",
      "VAT Compliance Audit — fix issues before they become penalties",
      "VAT Refund — reclaim the input tax you're owed",
      "Voluntary disclosures handled the right way",
    ],
    meta: [
      { label: "Threshold", value: "AED 375k turnover" },
      { label: "Standard rate", value: "5%" },
      { label: "Cadence", value: "Quarterly (or monthly)" },
      { label: "Coverage", value: "Register · file · audit · refund" },
    ],
    highlight: {
      eyebrow: "Where the penalties come from",
      title: "Companies get fined for being late, not wrong.",
      body: "Most VAT penalties are for missed deadlines and unclaimed positions, not honest errors. We keep the calendar, file on time and chase every refund so nothing leaks.",
    },
    steps: [
      "Register for VAT and set up compliant invoicing.",
      "File accurate returns every quarter, on time.",
      "Audit past filings and disclose voluntarily if needed.",
      "Prepare and submit refund claims.",
    ],
  },
  {
    id: "compliance",
    index: "05",
    eyebrow: "AML · UBO · structuring · trademark",
    title: "Compliance",
    icon: "shield",
    href: "/financial/compliance",
    ctaLabel: "Explore compliance",
    lede:
      "The regulatory layer that keeps your company clean, current and protected. AML frameworks, UBO filings, corporate structuring and trademark registration — each a fine or a dispute if missed, all tracked on one calendar.",
    image: {
      src: "/services/compliance/compliance-category.webp",
      alt: "Compliance services in the UAE",
    },
    good: [
      "DNFBPs and companies with AML obligations",
      "Businesses with multiple or changing beneficial owners",
      "Founders structuring or restructuring a group",
      "Brands that need their name legally protected",
    ],
    included: [
      "AML Compliance — policies, KYC and MLRO support",
      "UBO Notification — filing and register upkeep",
      "Business Structuring — a clean, tax-efficient setup",
      "Trademark Registration — protect the brand early",
      "One calendar for every regulator and deadline",
    ],
    meta: [
      { label: "Authorities", value: "FIU · MoE · DET" },
      { label: "Cadence", value: "Annual + change-driven" },
      { label: "Fines if missed", value: "AED 10k–1M" },
      { label: "Coverage", value: "AML · UBO · structuring · IP" },
    ],
    highlight: {
      eyebrow: "Why these get missed",
      title: "Different authority, different deadline.",
      body: "AML, UBO and trademark each answer to a different regulator on a different clock. We track them on one calendar so year-end never becomes a fire drill — and the frameworks behind them are real, not template-only.",
    },
    steps: [
      "Assess AML, UBO and structuring obligations.",
      "Draft policies, registers and the right structure.",
      "File every notification and trademark application.",
      "Recertify each cycle — no missed deadlines.",
    ],
  },
];

export default function FinancialPage() {
  return (
    <>
      <FinancialHero />

      {sections.map((s, idx) => (
        <ServiceSection
          key={s.id}
          section={s}
          idx={idx}
          ctaHref={s.href}
          ctaLabel={s.ctaLabel}
        />
      ))}

      {/* CTA */}
      <section className="py-20 md:py-28 bg-ink text-paper border-t border-paper/10">
        <div className="container-edit">
          <div className="grid grid-cols-12 gap-x-4 md:gap-x-10 gap-y-10 items-center">
            <div className="col-span-12 lg:col-span-7">
              <div className="flex items-center gap-3 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-mist mb-4">
                <span className="h-px w-8 bg-mist/40" />§ Next step
              </div>
              <h2 className="font-display text-[clamp(1.9rem,4vw,3rem)] leading-[1.05] tracking-[-0.02em] text-paper text-balance max-w-3xl">
                Send us last month's books.{" "}
                <span className="text-brand-soft">We'll tell you where the gaps are.</span>
              </h2>
              <p className="mt-5 max-w-2xl text-[1.02rem] leading-relaxed text-paper/75">
                Accounting, audit, Corporate Tax, VAT and compliance: assessed
                against the latest FTA rules and back to you within one business
                day. Free, 30-minute consultation.
              </p>
            </div>
            <div className="col-span-12 lg:col-span-5 lg:text-right">
              <div className="inline-flex flex-col gap-3 lg:items-end">
                <ConsultationButton className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-[0.95rem] font-medium text-ink hover:bg-paper transition-colors" >
                  Book finance review
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.8}
                  />
                </ConsultationButton>
                <Link
                  href="/business-setup"
                  className="group inline-flex items-center justify-center gap-2 rounded-full border border-paper/20 bg-paper/5 backdrop-blur px-5 py-3 text-[0.9rem] text-paper hover:bg-paper/10 transition-colors"
                >
                  <Calendar className="h-3.5 w-3.5" strokeWidth={1.8} />
                  Pair with company formation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
