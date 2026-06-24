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
  title: "VAT Consultancy Services in the UAE",
  description:
    "VAT registration, return filing, refunds and compliance audits for UAE companies — FTA-compliant and filed on a calendar, not under deadline.",
  alternates: { canonical: "/financial/vat-consultancy" },
};

const sections: ServiceSectionData[] = [
  {
    id: "vat-registration",
    index: "01",
    eyebrow: "FTA VAT registration",
    title: "VAT Registration Service",
    icon: "file-text",
    lede:
      "Register for VAT correctly the first time — mandatory above AED 375k turnover, voluntary above AED 187.5k. We assess your position, file with the FTA and get your TRN issued without rejections.",
    image: { src: "/services/financial/accounting.webp", alt: "VAT registration in the UAE" },
    good: [
      "Businesses crossing the AED 375k mandatory threshold",
      "Startups registering voluntarily to reclaim input VAT",
      "Companies needing a TRN before invoicing clients",
      "Groups considering a single VAT-group registration",
    ],
    included: [
      "Eligibility and threshold assessment",
      "Document preparation and EmaraTax application",
      "Tax Registration Number (TRN) issuance",
      "VAT-group registration where it makes sense",
      "Guidance on invoicing and record-keeping from day one",
    ],
    meta: [
      { label: "Mandatory", value: "AED 375k turnover" },
      { label: "Voluntary", value: "AED 187.5k" },
      { label: "Portal", value: "EmaraTax" },
      { label: "Output", value: "TRN issued" },
    ],
    highlight: {
      eyebrow: "Register right, not twice",
      title: "Rejections cost weeks. We avoid them.",
      body: "Most VAT applications bounce on activity or document mismatches. We frame the application the way the FTA expects, so the TRN comes back clean.",
    },
    steps: [
      "Assess whether you must or should register.",
      "Prepare documents and submit on EmaraTax.",
      "Secure your TRN.",
      "Set up VAT-ready invoicing and records.",
    ],
  },
  {
    id: "vat-return-filing",
    index: "02",
    eyebrow: "Quarterly returns",
    title: "VAT Return Filing",
    icon: "calculator",
    lede:
      "Accurate VAT returns prepared and filed every period, on the FTA calendar. Input and output VAT reconciled to your books — no last-minute scrambles, no avoidable penalties.",
    image: { src: "/services/financial/corporate-tax.webp", alt: "VAT return filing" },
    good: [
      "VAT-registered companies on monthly or quarterly periods",
      "Businesses that keep missing or rushing deadlines",
      "Owners who want returns reconciled to real books",
      "Companies wanting input VAT correctly recovered",
    ],
    included: [
      "Input and output VAT review and reconciliation",
      "Return preparation in line with FTA rules",
      "On-time filing via EmaraTax",
      "Payment guidance and record archiving",
      "Flagging of recoverable input VAT often missed",
    ],
    meta: [
      { label: "Cadence", value: "Quarterly / monthly" },
      { label: "Portal", value: "EmaraTax" },
      { label: "Basis", value: "Reconciled to books" },
      { label: "Penalty risk", value: "Minimised" },
    ],
    highlight: {
      eyebrow: "Filed on a calendar",
      title: "Companies get fined for being late, not wrong.",
      body: "We file every period on schedule and reconcile to the ledger, so returns are right and on time — the two things the FTA actually penalises.",
    },
    steps: [
      "Pull the period's transactions from the books.",
      "Reconcile input and output VAT.",
      "Prepare and file the return on EmaraTax.",
      "Archive the records for audit.",
    ],
  },
  {
    id: "vat-compliance-audit",
    index: "03",
    eyebrow: "Health check",
    title: "VAT Compliance Audit",
    icon: "file-search",
    lede:
      "A review of your VAT position before the FTA does it for you — invoices, returns, input-recovery and record-keeping checked against the rules, with gaps fixed while they're still cheap.",
    image: { src: "/services/financial/audit.webp", alt: "VAT compliance audit" },
    good: [
      "Companies unsure their past returns are correct",
      "Businesses preparing for a potential FTA review",
      "Owners who inherited messy VAT records",
      "Firms wanting peace of mind before year-end",
    ],
    included: [
      "Review of past returns and supporting records",
      "Tax-invoice format and compliance check",
      "Input-VAT recovery and reverse-charge review",
      "Gap analysis with correction recommendations",
      "Voluntary-disclosure support where needed",
    ],
    meta: [
      { label: "Scope", value: "Returns · invoices · records" },
      { label: "Output", value: "Gap report + fixes" },
      { label: "Best before", value: "An FTA audit" },
      { label: "Outcome", value: "Lower penalty risk" },
    ],
    highlight: {
      eyebrow: "Find it before the FTA does",
      title: "A voluntary fix beats a penalty.",
      body: "Correcting errors yourself through voluntary disclosure carries far smaller penalties than waiting for the FTA to find them. We catch them first.",
    },
    steps: [
      "Review returns, invoices and records.",
      "Identify errors and recovery gaps.",
      "Recommend corrections and disclosures.",
      "Help you implement and refile if needed.",
    ],
  },
  {
    id: "vat-refund",
    index: "04",
    eyebrow: "Reclaim input VAT",
    title: "VAT Refund Service",
    icon: "banknote",
    lede:
      "When your input VAT exceeds output VAT, that money is yours to reclaim. We prepare and substantiate the refund claim so the FTA approves it instead of querying it.",
    image: { src: "/services/financial/banking.webp", alt: "VAT refund service" },
    good: [
      "Exporters and zero-rated businesses in a refund position",
      "Companies with heavy input VAT on setup or capex",
      "Businesses sitting on unclaimed VAT credits",
      "New-build / first-year companies with large purchases",
    ],
    included: [
      "Refund-eligibility and position review",
      "Compilation of supporting tax invoices and evidence",
      "Refund claim preparation and EmaraTax submission",
      "Response to FTA queries and verification",
      "Tracking the claim through to payment",
    ],
    meta: [
      { label: "Applies to", value: "Net input-VAT position" },
      { label: "Common for", value: "Exporters · capex-heavy" },
      { label: "Portal", value: "EmaraTax" },
      { label: "We handle", value: "Claim + FTA queries" },
    ],
    highlight: {
      eyebrow: "Don't leave it on the table",
      title: "Unclaimed VAT is just lost cash.",
      body: "Refund claims get held up by weak documentation. We assemble the evidence the FTA wants up front, so the credit comes back instead of getting parked.",
    },
    steps: [
      "Confirm you're in a refundable position.",
      "Assemble invoices and supporting evidence.",
      "Submit the claim on EmaraTax.",
      "Handle FTA verification through to payout.",
    ],
  },
];

export default function VatConsultancyPage() {
  return (
    <>
      <CategoryHero
        breadcrumb="VAT Consultancy"
        eyebrow="VAT Consultancy"
        title={
          <>
            <span className="block">VAT, filed on a</span>
            <span className="block text-brand">calendar — not in a panic.</span>
          </>
        }
        lede="Registration, quarterly filing, refunds and compliance health-checks — FTA-compliant VAT handled end-to-end so you never file late or leave a refund unclaimed."
        cta={{ label: "Book a finance review", href: "/contact" }}
        pillars={[
          { id: "vat-registration", index: "01", label: "VAT Registration Service", desc: "FTA registration & TRN", icon: "file-text" },
          { id: "vat-return-filing", index: "02", label: "VAT Return Filing", desc: "Quarterly returns", icon: "calculator" },
          { id: "vat-compliance-audit", index: "03", label: "VAT Compliance Audit", desc: "Health check", icon: "file-search" },
          { id: "vat-refund", index: "04", label: "VAT Refund Service", desc: "Reclaim input VAT", icon: "banknote" },
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
                Unsure about your VAT?{" "}
                <span className="text-brand-soft">We'll review it for free.</span>
              </h2>
              <p className="mt-5 max-w-2xl text-[1.02rem] leading-relaxed text-paper/75">
                Registration, returns, refunds or a compliance check — tell us
                where you are and we'll come back with a clear plan within one
                business day.
              </p>
            </div>
            <div className="col-span-12 lg:col-span-5 lg:text-right">
              <ConsultationButton className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-[0.95rem] font-medium text-ink hover:bg-paper transition-colors" >
                Book a finance review
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.8} />
              </ConsultationButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
