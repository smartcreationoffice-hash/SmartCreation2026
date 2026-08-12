import Link from "next/link";
import Image from "next/image";
import { requireAdmin } from "@/lib/admin-auth";
import { getAllCardsAdmin, cardUrl } from "@/lib/cards";
import { AdminShell } from "../_shell";

export const dynamic = "force-dynamic";

export default async function CardsList() {
  await requireAdmin();

  // The sc_cards table is created by hand once (scripts/add-cards-table.sql).
  // Until it exists, show the setup note rather than a 500.
  let cards: Awaited<ReturnType<typeof getAllCardsAdmin>> = [];
  let needsSetup = false;
  try {
    cards = await getAllCardsAdmin();
  } catch (e) {
    const msg = (e as Error).message ?? "";
    if (/sc_cards/i.test(msg) || /schema cache/i.test(msg)) needsSetup = true;
    else throw e;
  }

  if (needsSetup) {
    return (
      <AdminShell active="cards">
        <div className="mb-8">
          <div className="font-mono text-[0.66rem] uppercase tracking-[0.22em] text-stone mb-2">
            Team · Digital cards
          </div>
          <h1 className="font-display text-[2rem] tracking-[-0.02em] text-ink">
            One setup step left
          </h1>
        </div>
        <div className="rounded-2xl border border-amber-300 bg-amber-50 p-6 max-w-2xl">
          <p className="text-[0.95rem] text-ink">
            The cards table hasn&rsquo;t been created in the database yet.
          </p>
          <ol className="mt-4 space-y-2 text-[0.9rem] text-ink-mute list-decimal pl-5">
            <li>Open Supabase → SQL Editor → New query.</li>
            <li>
              Paste the contents of{" "}
              <code className="font-mono text-[0.84rem] text-ink">
                scripts/add-cards-table.sql
              </code>{" "}
              from the site repo.
            </li>
            <li>Press Run, then reload this page.</li>
          </ol>
          <p className="mt-4 text-[0.82rem] text-ink-mute">
            It only has to be done once. Nothing else about the site changes.
          </p>
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell active="cards">
      <div className="flex items-end justify-between mb-8 gap-4 flex-wrap">
        <div>
          <div className="font-mono text-[0.66rem] uppercase tracking-[0.22em] text-stone mb-2">
            Team
          </div>
          <h1 className="font-display text-[2rem] tracking-[-0.02em] text-ink">
            Digital cards
          </h1>
          <p className="mt-2 text-[0.92rem] text-ink-mute max-w-xl">
            The NFC / QR business cards. Create one per person, fill in their
            details, then download the QR or write the link to an NFC card. Edits
            go live within a minute &mdash; the QR itself never needs reprinting.
          </p>
        </div>
        <Link
          href="/admin/cards/new"
          className="rounded-full bg-brand-night text-paper px-4 py-2 text-[0.88rem] font-medium hover:bg-brand transition-colors"
        >
          + New card
        </Link>
      </div>

      {cards.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-ink/15 bg-paper p-10 text-center">
          <p className="text-ink-mute">
            No cards yet. Click{" "}
            <span className="font-medium text-ink">+ New card</span> to make the
            first one.
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((c) => (
            <li key={c.id}>
              <Link
                href={`/admin/cards/${c.id}`}
                className="group flex h-full gap-4 rounded-2xl border border-ink/10 bg-paper p-4 hover:border-ink/30 transition-colors"
              >
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-ink/10 bg-paper-soft">
                  {c.photo ? (
                    <Image
                      src={c.photo}
                      alt={c.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  ) : (
                    <span className="absolute inset-0 grid place-items-center font-display text-[1.1rem] text-stone">
                      {c.name.slice(0, 1).toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={
                        "rounded-full px-2 py-0.5 font-mono text-[0.55rem] uppercase tracking-[0.2em] " +
                        (c.active
                          ? "bg-emerald-500/90 text-paper"
                          : "bg-stone/80 text-paper")
                      }
                    >
                      {c.active ? "live" : "offline"}
                    </span>
                  </div>
                  <div className="mt-1.5 font-display text-[1.05rem] leading-tight text-ink truncate">
                    {c.name}
                  </div>
                  {c.chip && (
                    <div className="text-[0.8rem] text-ink-mute truncate">
                      {c.chip}
                    </div>
                  )}
                  <div className="mt-2 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-stone truncate">
                    /card/{c.slug}
                  </div>
                </div>
              </Link>
              <a
                href={cardUrl(c.slug)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1.5 inline-block text-[0.76rem] text-ink-mute hover:text-ink underline"
              >
                Open live card →
              </a>
            </li>
          ))}
        </ul>
      )}
    </AdminShell>
  );
}
