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
      <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.781 3.631 2.695 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.36-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.583-1.31-.881-2.37-.886h-.03c-.85 0-2.005.232-2.74 1.337l-1.689-1.135c.986-1.453 2.677-2.205 4.471-2.205h.044c2.998.018 4.782 1.86 4.957 5.078.1.043.199.087.298.132 1.402.66 2.428 1.658 2.966 2.886.752 1.716.821 4.513-1.452 6.785-1.737 1.736-3.842 2.52-6.794 2.521h-.043Zm1.063-13.058c-.107 0-.214.003-.323.008-1.318.074-2.137.7-2.083 1.595.057.943 1.094 1.376 2.011 1.327 1.327-.072 2.166-.736 2.166-2.93Z" />
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
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24.044 12.045.044 5.463.044.104 5.4.101 11.986c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.652a12.062 12.062 0 0 0 5.71 1.448h.005c6.585 0 11.946-5.357 11.949-11.945a11.88 11.88 0 0 0-3.479-8.402z" />
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
      { label: "Group of companies", href: "/group-companies" },
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
