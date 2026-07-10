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
  title: "Audit & Assurance Services in the UAE",
  description:
    "Internal audit, statutory external audit and FTA tax-audit support for UAE companies — ISA-compliant, audit-ready and handled by one accountable team.",
  alternates: { canonical: "/financial/audit-assurance" },
};

const sections: ServiceSectionData[] = [
  {
    id: "internal-audit",
    index: "01",
    eyebrow: "Risk & controls review",
    title: "Internal Audit Services",
    icon: "file-search",
    lede:
      "An independent look at your processes, controls and risks — where money leaks, where errors hide, and where a tighter system saves time and cost. Practical findings, not a binder that gathers dust.",
    image: { src: "/services/financial/audit.webp", alt: "Internal audit services" },
    good: [
      "Boards wanting assurance over controls and risk",
      "Companies scaling fast and outgrowing manual processes",
      "Owners who suspect leakage, error or weak controls",
      "Businesses preparing for external audit or investment",
    ],
    included: [
      "Risk assessment across finance, operations and compliance",
      "Process and internal-control walkthroughs",
      "Testing of key controls and sample transactions",
      "Findings report with prioritised, practical fixes",
      "Follow-up review on remediation",
    ],
    meta: [
      { label: "Scope", value: "Finance · ops · compliance" },
      { label: "Output", value: "Prioritised findings" },
      { label: "Cadence", value: "One-off or recurring" },
      { label: "Approach", value: "Risk-based" },
    ],
    highlight: {
      eyebrow: "Not a box-ticking exercise",
      title: "Findings you can act on Monday.",
      body: "We surface the few issues that actually matter — the control gaps and leakage points — and hand you a fix list ranked by impact, not a generic checklist.",
    },
    steps: [
      "Agree scope and the risks that matter to you.",
      "Walk through processes and test key controls.",
      "Report findings, ranked by impact.",
      "Re-check that the fixes landed.",
    ],
  },
  {
    id: "external-audit",
    index: "02",
    eyebrow: "Statutory audit",
    title: "External Audit Services",
    icon: "shield",
    lede:
      "Independent statutory audits for free-zone and mainland companies — the signed, ISA-compliant report your free zone, bank, investor or shareholders require, delivered without the usual back-and-forth.",
    image: { src: "/services/financial/external-audit.webp", alt: "External statutory audit" },
    good: [
      "Free-zone entities required to audit annually (DMCC, JAFZA, DIFC, ADGM)",
      "Companies needing audited accounts for banks or investors",
      "Businesses with shareholders requiring assurance",
      "Groups preparing for sale or restructuring",
    ],
    included: [
      "Engagement scoping and audit-plan agreement",
      "Controls testing and substantive procedures",
      "Reconciliation review and adjusting entries",
      "Signed, ISA-compliant audit report",
      "Management letter with findings and recommendations",
    ],
    meta: [
      { label: "Standards", value: "ISA · IFRS" },
      { label: "Required for", value: "DMCC · JAFZA · DIFC · ADGM" },
      { label: "Timeline", value: "3–6 weeks" },
      { label: "CT linkage", value: "Feeds your CT return" },
    ],
    highlight: {
      eyebrow: "Why ours move faster",
      title: "Clean books in, clean report out.",
      body: "Most audits drag because the books need fixing first. When the records are tidy, the auditor walks into a closed period — fewer adjustments, signed report on schedule.",
    },
    steps: [
      "Scope the engagement and agree the plan.",
      "Fieldwork: testing and substantive procedures.",
      "Resolve adjustments with management.",
      "Issue the signed report and management letter.",
    ],
  },
  {
    id: "fta-tax-audit",
    index: "03",
    eyebrow: "FTA audit support",
    title: "FTA Tax Audit",
    icon: "badge-check",
    lede:
      "Faced with an FTA audit on VAT or Corporate Tax? We prepare your records, represent your position and handle the correspondence — so an audit becomes a process, not a panic.",
    image: { src: "/services/financial/fta-tax-audit.webp", alt: "FTA tax audit support" },
    good: [
      "Companies notified of an FTA VAT or Corporate Tax audit",
      "Businesses unsure their filings will hold up to review",
      "Owners who want a professional handling FTA correspondence",
      "Companies wanting a pre-emptive readiness check",
    ],
    included: [
      "Pre-audit review of filings and supporting records",
      "Reconciliation of returns to the underlying books",
      "Preparation of the document pack the FTA expects",
      "Representation and correspondence with the FTA",
      "Guidance on assessments, penalties and objections",
    ],
    meta: [
      { label: "Covers", value: "VAT · Corporate Tax" },
      { label: "Authority", value: "Federal Tax Authority" },
      { label: "Role", value: "Prep + representation" },
      { label: "Goal", value: "Clean outcome, low penalty" },
    ],
    highlight: {
      eyebrow: "The difference good prep makes",
      title: "Auditors ask less when the file answers first.",
      body: "We frame your records and reconciliations the way the FTA reads them, so the obvious questions are already answered and your exposure to penalties is minimised.",
    },
    steps: [
      "Review filings and reconcile to the books.",
      "Assemble the FTA document pack.",
      "Represent you through the audit.",
      "Resolve assessments and, if needed, object.",
    ],
  },
];

export default function AuditAssurancePage() {
  return (
    <>
      <CategoryHero
        breadcrumb="Audit & Assurance"
        eyebrow="Audit & Assurance"
        title={
          <>
            <span className="block">Audited and assured,</span>
            <span className="block text-brand">no surprises.</span>
          </>
        }
        lede="Internal audit, statutory external audit and FTA tax-audit support — independent, ISA-compliant and handled so reviews run smoothly, not stressfully."
        cta={{ label: "Book a finance review", href: "/contact" }}
        pillars={[
          { id: "internal-audit", index: "01", label: "Internal Audit Services", desc: "Risk & controls review", icon: "file-search" },
          { id: "external-audit", index: "02", label: "External Audit Services", desc: "Statutory ISA audit", icon: "shield" },
          { id: "fta-tax-audit", index: "03", label: "FTA Tax Audit", desc: "FTA audit support", icon: "badge-check" },
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
                Audit coming up?{" "}
                <span className="text-brand-soft">Let's make it a clean one.</span>
              </h2>
              <p className="mt-5 max-w-2xl text-[1.02rem] leading-relaxed text-paper/75">
                Statutory, internal or FTA — tell us where you stand and we'll map
                the path to a signed report or a clean audit outcome. Free,
                30-minute consultation.
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
