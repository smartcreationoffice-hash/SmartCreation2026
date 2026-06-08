import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Calendar } from "lucide-react";
import { NorthernEmiratesZonesHero } from "@/components/northern-emirates-zones-hero";
import {
  ServiceSection,
  type ServiceSectionData,
} from "@/components/service-section";

export const metadata: Metadata = {
  title: "Other Emirates Free Zones · SHAMS, SPC, SPARK, RAKEZ, AFZA, ANCFZ, UAQ",
  description:
    "Every UAE free zone outside Dubai compared side by side: SHAMS, SPC, SPARK in Sharjah, RAKEZ in Ras Al Khaimah, AFZA and ANCFZ in Ajman, and UAQ FTZ — by cost, activity list and visa quota.",
  alternates: { canonical: "/free-zones/northern-emirates" },
};

const sections: ServiceSectionData[] = [
  {
    id: "shams",
    index: "01",
    eyebrow: "Sharjah · media & creative",
    title: "SHAMS",
    icon: "globe",
    image: { src: "/free-zones/shams-large.webp", alt: "SHAMS · Sharjah" },
    lede:
      "Sharjah Media City is affordable, fast and creative-friendly. Right for content creators, freelancers, agencies and small media-adjacent businesses. Two-day licence, low cost, broad activity list.",
    good: [
      "Solo founders, freelancers and creators",
      "Marketing agencies and content studios on a budget",
      "Bootstrapped teams that need a real licence fast",
      "Founders relocating to Sharjah residency",
    ],
    included: [
      "Activity classification against SHAMS' creative list",
      "Application + KYC submission",
      "Flexi-desk lease, Sharjah-resident-friendly",
      "Establishment card, immigration file, visa quota",
      "Bank account introduction",
    ],
    meta: [
      { label: "Authority", value: "SHAMS · Sharjah Media City" },
      { label: "Setup time", value: "2 working days" },
      { label: "Visa quota", value: "Up to 6 with flexi-desk" },
      { label: "Year-one cost", value: "From AED 5,750" },
    ],
    highlight: {
      eyebrow: "Why SHAMS punches above its weight",
      title: "Two-day licence at the lowest credible cost.",
      body: "SHAMS isn't Dubai-prestige but for solo founders, freelancers and small creative shops it's the fastest way to a real licence with bank-acceptable paperwork, and you can bring family on the same visa.",
    },
    steps: [
      "Match your activity to SHAMS' creative list.",
      "Submit application + KYC.",
      "Sign flexi-desk lease.",
      "Licence + visa quota activated in 2 days.",
    ],
  },
  {
    id: "spc",
    index: "02",
    eyebrow: "Sharjah · publishing & content",
    title: "SPC",
    icon: "globe",
    image: { src: "/free-zones/spc-large.webp", alt: "SPC · Sharjah" },
    lede:
      "Sharjah Publishing City is built for publishing, e-learning, content production and intellectual-property businesses. Strong cultural and academic ecosystem, IP-friendly licensing.",
    good: [
      "Publishers, e-learning and EdTech companies",
      "Authors, agents and rights-management businesses",
      "Content studios producing video and digital media",
      "IP-heavy companies needing a copyright-friendly base",
    ],
    included: [
      "Activity mapping under SPC's publishing/IP categories",
      "Application + corporate documents",
      "Office or flexi-desk lease in SPC",
      "Establishment card, immigration file, visa quota",
      "IP and copyright registration support",
    ],
    meta: [
      { label: "Authority", value: "SPC · Sharjah Publishing City" },
      { label: "Setup time", value: "5–7 working days" },
      { label: "Visa quota", value: "1–6 visas typical" },
      { label: "Year-one cost", value: "From AED 6,500" },
    ],
    highlight: {
      eyebrow: "Why SPC for content businesses",
      title: "An ecosystem built around publishing and IP.",
      body: "SPC sits inside Sharjah's broader cultural-and-academic district. If your business depends on rights, IP, distribution and publishing infrastructure, the partners and authorities you need are all in one place.",
    },
    steps: [
      "Confirm publishing / IP activity classification.",
      "Submit corporate documents.",
      "Choose office or flexi-desk.",
      "Licence + visa quota activated.",
    ],
  },
  {
    id: "spark",
    index: "03",
    eyebrow: "Sharjah · research, technology & innovation",
    title: "SPARK",
    icon: "globe",
    image: { src: "/free-zones/spark-large.webp", alt: "SPARK · Sharjah Research, Technology and Innovation Park" },
    lede:
      "Sharjah Research, Technology and Innovation Park (SRTIP) is the U.A.E.'s applied-research and deep-tech free zone. Built for R&D-led businesses in renewable energy, water, transport, environment, EdTech and digital. Sits next to the American University of Sharjah and University City.",
    good: [
      "R&D-led startups in clean-tech, water, mobility and AgTech",
      "Deep-tech founders commercialising university research",
      "Industrial-tech and Industry 4.0 manufacturers",
      "EdTech and digital-health companies wanting an academic partner",
    ],
    included: [
      "Activity classification under SRTIP's research / tech categories",
      "Choice of office, lab or industrial-park lease",
      "Application package, KYC and shareholder docs",
      "Establishment card, immigration file and visa quota",
      "Intros to SRTIP's accelerator, grant and university partners",
    ],
    meta: [
      { label: "Authority", value: "SRTIP · Sharjah" },
      { label: "Setup time", value: "4–6 working days" },
      { label: "Visa quota", value: "Tied to leased area" },
      { label: "Year-one cost", value: "From AED 11,500" },
    ],
    highlight: {
      eyebrow: "Why SPARK for deep-tech",
      title: "A free zone built next to the laboratory you need.",
      body: "SRTIP shares a campus with the American University of Sharjah, the University of Sharjah and the Sharjah Centre for Astronomy & Space Sciences. If your business needs research partners, post-grad talent and prototyping infrastructure, the proximity is the entire point.",
    },
    steps: [
      "Confirm activity matches SRTIP's research / tech list.",
      "Pick office, lab or industrial-park lease.",
      "Submit application + KYC.",
      "Licence + visa quota activated.",
    ],
  },
  {
    id: "rakez",
    index: "04",
    eyebrow: "RAK · industrial & SME",
    title: "RAKEZ",
    icon: "globe",
    image: { src: "/free-zones/rakez-large.webp", alt: "RAKEZ · Ras Al Khaimah" },
    lede:
      "Ras Al Khaimah Economic Zone is the most cost-efficient industrial and SME licensing in the UAE. Industrial parks, plots, warehouses and offices at a fraction of Dubai pricing, with broad activity lists and 0% personal income tax.",
    good: [
      "Manufacturing, industrial and SME operators",
      "Cost-sensitive trading and import-export businesses",
      "Founders prioritising cost over Dubai address",
      "Logistics and warehousing at scale on a budget",
    ],
    included: [
      "Activity classification across RAKEZ industrial / commercial categories",
      "Application + corporate documents",
      "Office, plot or warehouse lease",
      "Establishment card, immigration file, visa quota",
      "Banking introduction",
    ],
    meta: [
      { label: "Authority", value: "RAKEZ" },
      { label: "Setup time", value: "5–10 working days" },
      { label: "Visa quota", value: "Tied to lease size" },
      { label: "Year-one cost", value: "From AED 6,200" },
    ],
    highlight: {
      eyebrow: "Why RAKEZ for industrial",
      title: "Half the cost of Dubai for the same legal protections.",
      body: "If your business doesn't depend on a Dubai postcode, RAKEZ delivers the same UAE corporate framework, same 100% foreign ownership, same banking access, for materially lower setup and renewal cost.",
    },
    steps: [
      "Match activity to RAKEZ industrial / commercial list.",
      "Submit application + KYC.",
      "Lease office, warehouse or plot.",
      "Licence + immigration file issued.",
    ],
  },
  {
    id: "afza",
    index: "05",
    eyebrow: "Ajman · fastest entry",
    title: "AFZA",
    icon: "globe",
    image: { src: "/free-zones/afza-large.webp", alt: "AFZA · Ajman" },
    lede:
      "Ajman Free Zone (AFZA) is one of the fastest and cheapest UAE free-zone licences. Right for first-time entrepreneurs, small trading and consulting firms, and bootstrapped founders who want a real UAE licence without Dubai overhead.",
    good: [
      "First-time founders launching their first UAE business",
      "Small consulting, trading and service businesses",
      "Founders prioritising lowest possible cost",
      "Anyone testing the UAE market before committing to Dubai",
    ],
    included: [
      "Activity confirmation under AFZA's commercial / service categories",
      "Application + KYC submission",
      "Smart-office or flexi-desk lease",
      "Establishment card, immigration file, visa quota",
      "Bank account introduction",
    ],
    meta: [
      { label: "Authority", value: "Ajman Free Zone Authority" },
      { label: "Setup time", value: "2–4 working days" },
      { label: "Visa quota", value: "1–3 with flexi-desk" },
      { label: "Year-one cost", value: "From AED 5,500" },
    ],
    highlight: {
      eyebrow: "Why AFZA for first-time founders",
      title: "Cheapest credible UAE licence, in days.",
      body: "AFZA isn't Dubai prestige, but it's a fully legitimate UAE free-zone licence. Lower stakes, lower cost, lower risk: the right way to test an idea in the UAE without committing capital you don't yet need to.",
    },
    steps: [
      "Confirm activity matches AFZA's list.",
      "Submit application + KYC.",
      "Choose smart-office or flexi-desk.",
      "Licence + visa quota activated.",
    ],
  },
  {
    id: "ancfz",
    index: "06",
    eyebrow: "Startups & SMEs · Ajman",
    title: "ANCFZ",
    icon: "globe",
    image: { src: "/free-zones/anc-large.webp", alt: "ANCFZ · Ajman NuVentures Centre Free Zone" },
    lede:
      "Ajman NuVentures Centre Free Zone is purpose-built for startups and small businesses that want low setup cost, fast turnaround and a flexible activity list. Right for founders launching lean, freelancers and remote teams.",
    good: [
      "Solo founders and freelancers seeking a credible licence",
      "Bootstrapped SMEs prioritising cost and speed",
      "Service businesses without a heavy physical footprint",
      "Remote-first teams that need a U.A.E. address with a visa",
    ],
    included: [
      "Activity confirmation against ANCFZ's flexible list",
      "Smart-office or flexi-desk lease",
      "Application, KYC and shareholder docs",
      "Establishment card and visa quota provisioning",
      "Bank introduction with two U.A.E. banks",
    ],
    meta: [
      { label: "Authority", value: "ANCFZ · Ajman" },
      { label: "Setup time", value: "2–4 working days" },
      { label: "Visa quota", value: "Flexible 1–4 visas" },
      { label: "Year-one cost", value: "From AED 9,500" },
    ],
    highlight: {
      eyebrow: "Why ANCFZ wins on cost",
      title: "One of the lowest entry points in the U.A.E.",
      body: "If your business doesn't need Dubai prestige, ANCFZ trims the licence and lease bill significantly while keeping the same investor visa, bank account access and CT framework as any other free zone.",
    },
    steps: [
      "Confirm activity matches ANCFZ's list.",
      "Pick smart-office or flexi-desk.",
      "Submit application + KYC.",
      "Licence + visa quota activated.",
    ],
  },
  {
    id: "uaq",
    index: "07",
    eyebrow: "Fast setup · Umm Al Quwain",
    title: "UAQ",
    icon: "globe",
    image: { src: "/free-zones/uaq-large.webp", alt: "UAQ · Umm Al Quwain Free Trade Zone" },
    lede:
      "Umm Al Quwain Free Trade Zone Authority offers the fastest-setup environment in the U.A.E. for SMEs. Light-touch process, broad activity list, and an entry-level price point with full ownership and tax benefits.",
    good: [
      "SMEs that need a quick licence on a tight timeline",
      "Trading and consulting firms without a physical footprint",
      "Founders who want minimum bureaucracy",
      "Cost-conscious teams scaling 1–5 people",
    ],
    included: [
      "Activity confirmation against UAQ FTZ's list",
      "Flexi-desk or virtual-office lease",
      "Application, KYC and shareholder docs",
      "Establishment card and visa quota provisioning",
      "Bank introduction with U.A.E. banks",
    ],
    meta: [
      { label: "Authority", value: "UAQ FTZ · Umm Al Quwain" },
      { label: "Setup time", value: "2–4 working days" },
      { label: "Visa quota", value: "Flexible 1–6 visas" },
      { label: "Year-one cost", value: "From AED 8,500" },
    ],
    highlight: {
      eyebrow: "Why UAQ for speed",
      title: "From signed brief to issued licence in days, not weeks.",
      body: "UAQ FTZ runs one of the leanest application flows in the country. For founders who need to move fast (sign a contract, hire on a visa, open a bank), UAQ lets you skip weeks of bureaucracy elsewhere.",
    },
    steps: [
      "Match your activity to UAQ's list.",
      "Pick virtual office or flexi-desk.",
      "Submit application + KYC.",
      "Licence + visa quota issued in days.",
    ],
  },
];

export default function NorthernEmiratesZonesPage() {
  return (
    <>
      <NorthernEmiratesZonesHero />

      {sections.map((s, idx) => (
        <ServiceSection key={s.id} section={s} idx={idx} />
      ))}

      {/* CTA */}
      <section className="py-20 md:py-28 bg-ink text-paper border-t border-paper/10">
        <div className="container-edit">
          <div className="grid grid-cols-12 gap-x-4 md:gap-x-10 gap-y-10 items-center">
            <div className="col-span-12 lg:col-span-7">
              <div className="flex items-center gap-3 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-mist mb-4">
                <span className="h-px w-8 bg-mist/40" />§ Next step
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3.4vw,2.5rem)] leading-[1.05] tracking-[-0.02em] text-paper text-balance max-w-3xl">
                Tell us your activity and team size.{" "}
                <span className="text-brand-soft">We'll come back with the right zone.</span>
              </h2>
              <p className="mt-5 max-w-2xl text-[1.02rem] leading-relaxed text-paper/75">
                Activity, ownership, visa quota, banking, lease type and total
                year-one cost: assessed against every other-emirate zone
                and back to you within one business day.
              </p>
            </div>
            <div className="col-span-12 lg:col-span-5 lg:text-right">
              <div className="inline-flex flex-col gap-3 lg:items-end">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-[0.95rem] font-medium text-ink hover:bg-paper transition-colors"
                >
                  Get my recommendation
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.8}
                  />
                </Link>
                <Link
                  href="/free-zones/dubai"
                  className="group inline-flex items-center justify-center gap-2 rounded-full border border-paper/20 bg-paper/5 backdrop-blur px-5 py-3 text-[0.9rem] text-paper hover:bg-paper/10 transition-colors"
                >
                  <Calendar className="h-3.5 w-3.5" strokeWidth={1.8} />
                  See Dubai zones
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
