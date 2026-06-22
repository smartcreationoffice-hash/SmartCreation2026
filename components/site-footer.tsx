import Link from "next/link";
import { ArrowUpRight, Linkedin, Instagram, Facebook, Youtube } from "lucide-react";
import { Logo } from "@/components/logo";
import { CONTACT, freeZones, services } from "@/lib/data";

type SocialIconProps = { className?: string };

function TikTokIcon({ className }: SocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.62a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.05Z" />
    </svg>
  );
}

function ThreadsIcon({ className }: SocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.18 22.5h-.06C8.5 22.48 5.71 21.34 4.04 19.16 2.56 17.22 1.8 14.55 1.78 11.24v-.49c.02-3.31.78-5.98 2.26-7.93C5.71 1.16 8.5.02 12.12 0h.06c2.78.02 5.1.7 6.9 2.03 1.7 1.25 2.9 3.04 3.55 5.31l-2.07.58c-1.1-3.95-3.92-5.95-8.4-5.97-2.95.02-5.19.93-6.65 2.7-1.37 1.66-2.07 4.05-2.1 7.1.02 3.05.73 5.45 2.1 7.1 1.46 1.77 3.7 2.69 6.65 2.7 2.65-.02 4.42-.65 5.88-2.08 1.66-1.63 1.64-3.62.96-4.83-.4-.7-1.13-1.29-2.1-1.7-.24 1.78-.81 3.22-1.71 4.3-1.2 1.45-2.91 2.24-5.1 2.36-1.65.09-3.25-.31-4.47-1.13-1.45-.97-2.3-2.46-2.39-4.18-.18-3.34 2.49-5.74 6.65-5.98 1.48-.08 2.86 0 4.13.24-.17-1.04-.51-1.86-1.02-2.45-.7-.81-1.79-1.23-3.23-1.24h-.04c-1.16 0-2.73.32-3.73 1.85L4.18 7.34c1.33-2.04 3.5-3.16 6.1-3.16h.05c4.36.03 6.96 2.7 7.22 7.36.15.06.3.12.44.2 2 .94 3.47 2.36 4.24 4.1 1.07 2.43.99 6.39-2.13 9.45-2.38 2.34-5.27 3.4-9.13 3.42h-.06l.05-.21Zm.59-12.62c-.34 0-.69 0-1.04.03-3.12.17-5.06 1.6-4.95 3.65.12 2.16 2.5 3.16 4.8 3.04 2.11-.11 4.86-.93 5.33-6.36-.91-.21-2.32-.36-4.14-.36Z" />
    </svg>
  );
}

function XIcon({ className }: SocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.5 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25h6.834l4.713 6.231L18.244 2.25Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: SocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.52 3.48A12 12 0 0 0 3.62 20.45L2 22l1.62-.42a12 12 0 1 0 16.9-18.1ZM12 21.5a9.45 9.45 0 0 1-4.83-1.33l-.34-.2-2.83.74.76-2.76-.22-.36A9.5 9.5 0 1 1 12 21.5Zm5.31-7.13c-.29-.14-1.7-.84-1.97-.94-.27-.1-.46-.14-.65.14-.2.29-.74.94-.91 1.13-.17.2-.34.22-.62.07-.29-.14-1.22-.45-2.33-1.44a8.74 8.74 0 0 1-1.61-2c-.17-.29 0-.45.13-.6.13-.13.29-.34.43-.51.14-.17.19-.29.29-.48.1-.2.05-.36-.02-.51-.07-.14-.65-1.56-.89-2.13-.23-.56-.47-.48-.65-.49h-.55c-.2 0-.51.07-.78.36-.27.29-1.03 1-1.03 2.44s1.05 2.83 1.2 3.02c.14.19 2.07 3.16 5.02 4.43.7.3 1.25.48 1.68.62.7.22 1.34.19 1.85.12.56-.08 1.7-.7 1.94-1.36.24-.66.24-1.23.17-1.36-.07-.13-.27-.2-.55-.34Z" />
    </svg>
  );
}

const columns = [
  {
    title: "Services",
    links: services.slice(0, 8).map((s) => ({ label: s.title, href: s.href })),
  },
  {
    title: "Free zones",
    links: freeZones.slice(0, 8).map((z) => ({
      label: `${z.code} · ${z.emirate}`,
      href: z.href,
    })),
  },
  {
    title: "Business centers",
    links: [
      { label: "All business centers", href: "/business-centers" },
      { label: "Smart Creation", href: "/business-centers/smart-creation" },
      { label: "Smart Place", href: "/business-centers/smart-place" },
      { label: "Smart View", href: "/business-centers/smart-view" },
      { label: "Future Space", href: "/business-centers/future-space" },
      { label: "Smart Founders", href: "/business-centers/smart-founders" },
      { label: "Abna Rashid", href: "/business-centers/abna-rashid" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Cost calculator", href: "/calculator" },
      { label: "Free zone comparison", href: "/free-zones" },
      { label: "Golden Visa guide", href: "/services/visas#golden-visa" },
      { label: "Corporate Tax guide", href: "/financial#corporate-tax" },
      { label: "VAT guide", href: "/financial#accounting" },
      { label: "Company profile (PDF)", href: "/smart-creation-group-profile.pdf" },
    ],
  },
];

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/smartbusinesscreation/", icon: Linkedin },
  { label: "Instagram", href: "https://www.instagram.com/smartcreationuae", icon: Instagram },
  { label: "Facebook", href: "https://www.facebook.com/smartbusinesscreationuae/", icon: Facebook },
  { label: "YouTube", href: "https://www.youtube.com/@SmartBusinessCreation", icon: Youtube },
  { label: "TikTok", href: "https://www.tiktok.com/@smartcreationuae", icon: TikTokIcon },
  { label: "Threads", href: "https://www.threads.com/@smartcreationuae", icon: ThreadsIcon },
  { label: "X", href: "https://x.com/smartcreationae", icon: XIcon },
  { label: "WhatsApp channel", href: "https://whatsapp.com/channel/0029Va7wizZKwqSORXwdtQ0H", icon: WhatsAppIcon },
];

export function SiteFooter() {
  return (
    <footer className="relative bg-paper-deep text-ink border-t border-ink/10">
      <div className="container-edit py-20 md:py-24">
        <div className="grid grid-cols-12 gap-x-4 md:gap-x-8 gap-y-14">
          {/* Brand column */}
          <div className="col-span-12 lg:col-span-4">
            <Logo onLight />
            <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-ink-mute">
              A multi-sector group spanning six Dubai business centers, real estate,
              technology, hospitality, transport and contracting. Trusted since 2020.
            </p>

            <address className="not-italic mt-8 text-[0.92rem] text-ink leading-relaxed">
              <div>{CONTACT.address}</div>
              <div className="text-ink-mute">{CONTACT.addressLine2}</div>
            </address>

            <div className="mt-6 space-y-1.5 text-[0.92rem]">
              <a href={CONTACT.phoneHref} className="block text-ink hover:text-brand-deep transition-colors">
                {CONTACT.phone}
              </a>
              <a href="tel:+971555519459" className="block text-ink hover:text-brand-deep transition-colors">
                +971 55 551 9459
              </a>
              <a href={CONTACT.emailHref} className="block text-ink hover:text-brand-deep transition-colors">
                {CONTACT.email}
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-2">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink-mute hover:border-ink hover:text-ink transition-colors"
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.6} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link columns */}
          <div className="col-span-12 lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
            {columns.map((col) => (
              <div key={col.title}>
                <div className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-stone mb-5">
                  {col.title}
                </div>
                <ul className="space-y-2.5">
                  {col.links.map((link) => {
                    if ("disabled" in link && link.disabled) {
                      return (
                        <li key={link.label}>
                          <span
                            title="Coming soon"
                            className="inline-flex items-center gap-1.5 text-[0.9rem] text-ink-mute/55 cursor-default"
                          >
                            {link.label}
                          </span>
                        </li>
                      );
                    }
                    const href = link.href!;
                    const isExternal =
                      href.endsWith(".pdf") || href.startsWith("http");
                    return (
                      <li key={href}>
                        <Link
                          href={href}
                          target={isExternal ? "_blank" : undefined}
                          rel={isExternal ? "noopener noreferrer" : undefined}
                          className="group inline-flex items-center gap-1.5 text-[0.9rem] text-ink-mute hover:text-ink transition-colors"
                        >
                          {link.label}
                          {isExternal && (
                            <ArrowUpRight
                              className="h-3 w-3 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                              strokeWidth={1.8}
                            />
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom strip */}
        <div className="mt-16 pt-8 border-t border-ink/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-stone">
            <span>© 2026 Smart Creation Group</span>
            <span className="text-mist/50">·</span>
            <span>Dubai, U.A.E.</span>
            <span className="text-mist/50">·</span>
            <span>
              Built by{" "}
              <a
                href="https://dubaiprod.com"
                target="_blank"
                rel="noopener"
                className="text-ink-mute hover:text-ink transition-colors"
              >
                dubaiprod.com
              </a>
            </span>
          </div>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.82rem] text-ink-mute">
            <li><Link href="/privacy" className="hover:text-ink transition-colors">Privacy</Link></li>
            <li><Link href="/terms" className="hover:text-ink transition-colors">Terms</Link></li>
            <li><Link href="/cookies" className="hover:text-ink transition-colors">Cookies</Link></li>
            <li><Link href="/sitemap.xml" className="hover:text-ink transition-colors inline-flex items-center gap-1">
              Sitemap <ArrowUpRight className="h-3 w-3" strokeWidth={1.5} />
            </Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
