import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowUpRight,
  CheckCircle2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";

import {
  getCentreByKey,
  getProperties,
  propertyToOffice,
} from "@/lib/supabase-queries";
import { CONTACT } from "@/lib/data";
import { CentreDetailHero } from "@/components/centre-detail-hero";
import { CentreGallery } from "@/components/centre-gallery";
import { CentreProperties } from "@/components/centre-properties-grid";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ centerKey: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { centerKey } = await params;
  const centre = await getCentreByKey(centerKey);
  if (!centre) return {};

  const title = centre.name;
  const description = centre.tagline ?? centre.description ?? "";
  const url = `/business-centers/${centerKey}`;
  const heroSrc = centre.hero_image ?? undefined;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} · Smart Creation Group`,
      description,
      url,
      type: "website",
      images: heroSrc ? [{ url: heroSrc, width: 1600, height: 900, alt: title }] : undefined,
    },
  };
}

export default async function CentrePage({ params }: PageProps) {
  const { centerKey } = await params;
  const centre = await getCentreByKey(centerKey);
  if (!centre) notFound();

  const propsRaw = await getProperties({ centreKey: centerKey, limit: 100 });
  const offices = propsRaw.map(propertyToOffice);

  const heroSrc = centre.hero_image ?? "";
  const advantages = centre.advantages ?? [];
  const nearby = centre.nearby ?? [];
  const galleryArr = centre.gallery ?? [];

  const phone = centre.phone || CONTACT.phone;
  const email = centre.email || "info@thesmartcreation.com";
  const mapUrl = centre.google_maps_url ?? undefined;

  return (
    <>
      <CentreDetailHero
        name={String(centre.name)}
        tagline={centre.tagline ? String(centre.tagline) : null}
        location={String(centre.location)}
        building={String(centre.building)}
        emirate={centre.emirate ? String(centre.emirate) : null}
        officesCount={offices.length}
      />

      {/* Gallery */}
      {galleryArr.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container-edit">
            <div className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-stone mb-6">
              Inside the centre
            </div>
            <CentreGallery
              items={galleryArr.map((g) => ({
                url: String(g.url ?? ""),
                caption: g.caption ?? null,
              }))}
              centreName={String(centre.name)}
            />
          </div>
        </section>
      )}

      {/* About */}
      <section id="about" className="scroll-mt-28 md:scroll-mt-32 pb-16 md:pb-24">
        <div className="container-edit grid grid-cols-12 gap-x-4 md:gap-x-10 gap-y-12">
          <div className="col-span-12 lg:col-span-7">
            <div className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-stone mb-3">
              About this centre
            </div>
            <p className="text-[1.05rem] leading-relaxed text-ink text-pretty max-w-[60ch]">
              {String(centre.description)}
            </p>

            {advantages.length > 0 && (
              <div className="mt-12">
                <div className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-stone mb-5">
                  Why tenants pick this centre
                </div>
                <ul className="grid sm:grid-cols-2 gap-x-4 md:gap-x-8 gap-y-5">
                  {advantages.map((a, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-brand-deep mt-0.5 shrink-0" strokeWidth={2} />
                      <div>
                        <div className="font-display text-[1.05rem] tracking-[-0.01em] text-ink">
                          {a.title}
                        </div>
                        {a.description && (
                          <p className="mt-1 text-[0.9rem] text-ink-mute leading-relaxed">
                            {a.description}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <aside className="col-span-12 lg:col-span-5">
            <div className="lg:sticky lg:top-28 rounded-3xl border border-ink/10 bg-paper-soft p-6 md:p-7">
              <div className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-stone mb-3">
                Visit / contact
              </div>
              <div className="flex items-start gap-2 text-[0.95rem] text-ink mb-5">
                <MapPin className="h-4 w-4 text-stone mt-0.5 shrink-0" strokeWidth={1.8} />
                <div>
                  <div>{String(centre.building)}</div>
                  {centre.address_line ? <div className="text-ink-mute">{String(centre.address_line)}</div> : (
                    <div className="text-ink-mute">{String(centre.location)}</div>
                  )}
                  <div className="text-ink-mute">{String(centre.emirate)}</div>
                </div>
              </div>

              <div className="space-y-2.5">
                <Link
                  href="/contact"
                  className="group flex items-center justify-center gap-2 rounded-full bg-brand-night px-5 py-3.5 text-[0.92rem] font-medium text-paper hover:bg-brand transition-colors"
                >
                  Book a viewing
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.8} />
                </Link>
                <Link
                  href={CONTACT.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-2 rounded-full border border-ink/15 bg-paper px-5 py-3 text-[0.88rem] text-ink hover:border-ink/40 transition-colors"
                >
                  <MessageCircle className="h-4 w-4" strokeWidth={1.8} />
                  WhatsApp us
                </Link>
                <Link
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="group flex items-center justify-center gap-2 rounded-full border border-ink/15 bg-paper px-5 py-3 text-[0.88rem] text-ink hover:border-ink/40 transition-colors"
                >
                  <Phone className="h-4 w-4" strokeWidth={1.8} />
                  {phone}
                </Link>
                <Link
                  href={`mailto:${email}`}
                  className="group flex items-center justify-center gap-2 rounded-full border border-ink/15 bg-paper px-5 py-3 text-[0.88rem] text-ink hover:border-ink/40 transition-colors"
                >
                  <Mail className="h-4 w-4" strokeWidth={1.8} />
                  {email}
                </Link>
                {mapUrl && (
                  <Link
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center gap-2 rounded-full border border-ink/15 bg-paper px-5 py-3 text-[0.88rem] text-ink hover:border-ink/40 transition-colors"
                  >
                    Open in Google Maps
                    <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.8} />
                  </Link>
                )}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Properties at this centre */}
      <section id="properties" className="scroll-mt-28 md:scroll-mt-32 pb-16 md:pb-24">
        <div className="container-edit">
          {offices.length > 0 ? (
            <CentreProperties
              centerKey={centerKey}
              centreName={String(centre.name)}
              offices={offices}
            />
          ) : (
            <>
              <div className="mb-10">
                <div className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-stone mb-3">
                  Available properties
                </div>
                <h2 className="font-display font-medium text-[clamp(1.7rem,3vw,2.4rem)] tracking-[-0.02em] leading-tight text-ink">
                  No live inventory at this centre. Call us
                </h2>
              </div>
              <div className="rounded-3xl border border-ink/10 bg-paper p-10 md:p-14 text-center">
                <p className="text-ink-mute max-w-xl mx-auto">
                  Fresh inventory is being prepared at this centre. Get in touch and
                  we'll match you with a unit before it's listed publicly.
                </p>
                <Link
                  href="/contact"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-night px-5 py-3 text-[0.9rem] font-medium text-paper hover:bg-brand transition-colors"
                >
                  Schedule a tour
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Nearby */}
      {nearby.length > 0 && (
        <section className="pb-16 md:pb-24 bg-paper-soft">
          <div className="container-edit pt-16 md:pt-20">
            <div className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-stone mb-6">
              What's nearby
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {nearby.map((n, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-ink/10 bg-paper px-4 py-3.5"
                >
                  <div className="min-w-0">
                    <div className="text-[0.95rem] text-ink truncate">{n.name}</div>
                    <div className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-stone">
                      {n.category}
                    </div>
                  </div>
                  <span className="shrink-0 rounded-full bg-paper-deep px-3 py-1 text-[0.78rem] text-ink-mute">
                    {n.distance}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
