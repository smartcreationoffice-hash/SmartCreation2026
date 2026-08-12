import { saveCardAction, deleteCardAction } from "../actions";
import { HeroImagePicker } from "../_image-editor";
import { SOCIAL_KEYS } from "@/lib/cards";
import { CardQr } from "./_qr";

export type CardFormData = {
  id: number | null;
  slug: string;
  name: string;
  chip: string;
  role: string;
  tagline: string;
  photo: string | null;
  phone: string;
  email: string;
  whatsapp: string;
  whatsapp_text: string;
  address1: string;
  address2: string;
  socials: { label: string; href: string; icon: string }[];
  active: boolean;
};

export function CardForm({
  data,
  qr,
}: {
  data: CardFormData;
  /** Only present once the card exists and therefore has a live URL. */
  qr?: { url: string; dataUrl: string };
}) {
  const isNew = data.id === null;
  const socialByKey = new Map(data.socials.map((s) => [s.icon, s.href]));

  return (
    <>
      {qr && (
        <div className="mb-6 max-w-3xl">
          <CardQr url={qr.url} qrDataUrl={qr.dataUrl} filename={data.slug} />
        </div>
      )}

      <form action={saveCardAction} className="space-y-6 max-w-3xl">
        {data.id !== null && <input type="hidden" name="id" value={data.id} />}

        {/* Status */}
        <div className="rounded-2xl border border-ink/10 bg-paper p-5 space-y-3">
          <div className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-stone">
            Status
          </div>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="active"
              defaultChecked={data.active}
              className="h-4 w-4 rounded border-ink/30 accent-brand-night"
            />
            <span className="text-[0.92rem] text-ink">
              Live &mdash; anyone with the link or QR can open this card
            </span>
          </label>
          <p className="text-[0.78rem] text-ink-mute">
            Untick to take the card offline. The link then shows a
            &ldquo;not found&rdquo; page; nothing is deleted.
          </p>
        </div>

        {/* Identity */}
        <div className="rounded-2xl border border-ink/10 bg-paper p-5 space-y-4">
          <div className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-stone">
            Who the card is for
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field
              label="Full name"
              name="name"
              defaultValue={data.name}
              required
              hint="Shown as the big heading on the card."
            />
            <Field
              label="Card link"
              name="slug"
              defaultValue={data.slug}
              hint="The /card/… part of the address. Leave blank to build it from the name. Changing it on a printed card breaks the old QR."
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field
              label="Job title"
              name="chip"
              defaultValue={data.chip}
              hint="Small pill above the name, e.g. Business Setup Consultant."
            />
            <Field
              label="Company line"
              name="role"
              defaultValue={data.role}
              hint="Line under the name. Defaults to Smart Creation Group of Companies."
            />
          </div>
          <Field
            label="Tagline"
            name="tagline"
            defaultValue={data.tagline}
            textarea
            hint="One or two sentences on what this person helps clients with."
          />
        </div>

        {/* Photo */}
        <div className="rounded-2xl border border-ink/10 bg-paper p-5">
          <div className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-stone mb-3">
            Photo
          </div>
          <HeroImagePicker name="photo" initialUrl={data.photo} />
          <p className="mt-3 text-[0.78rem] text-ink-mute">
            A head-and-shoulders portrait works best &mdash; it&rsquo;s cropped
            to a circle. Leave empty to show the Smart Creation cube instead.
          </p>
        </div>

        {/* Contact */}
        <div className="rounded-2xl border border-ink/10 bg-paper p-5 space-y-4">
          <div className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-stone">
            Contact details
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field
              label="Phone"
              name="phone"
              defaultValue={data.phone}
              hint="As it should read, e.g. +971 55 545 5831. The Call button dials it."
            />
            <Field
              label="Email"
              name="email"
              defaultValue={data.email}
              type="email"
              hint="Leads from this card's form are emailed here (admin is copied). Leave blank and they go to admin only."
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field
              label="WhatsApp number"
              name="whatsapp"
              defaultValue={data.whatsapp}
              hint="Leave blank to use the phone number above."
            />
            <Field
              label="WhatsApp opening message"
              name="whatsapp_text"
              defaultValue={data.whatsapp_text}
              hint="Pre-filled in the chat when someone taps WhatsApp."
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field
              label="Address line 1"
              name="address1"
              defaultValue={data.address1}
              hint="Leave blank for the head-office address."
            />
            <Field
              label="Address line 2"
              name="address2"
              defaultValue={data.address2}
            />
          </div>
        </div>

        {/* Socials */}
        <div className="rounded-2xl border border-ink/10 bg-paper p-5 space-y-4">
          <div className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-stone">
            Social links
          </div>
          <p className="text-[0.78rem] text-ink-mute">
            Only the ones you fill in get an icon on the card. Leave the rest
            blank.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {SOCIAL_KEYS.map((s) => (
              <Field
                key={s.key}
                label={s.label}
                name={`social_${s.key}`}
                defaultValue={socialByKey.get(s.key) ?? ""}
                placeholder={s.placeholder}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-ink/10">
          <button
            type="submit"
            className="rounded-full bg-brand-night text-paper px-5 py-2.5 text-[0.92rem] font-medium hover:bg-brand transition-colors"
          >
            {isNew ? "Create card" : "Save changes"}
          </button>
          {!isNew && data.slug && (
            <a
              href={`/card/${data.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.85rem] text-ink-mute hover:text-ink underline"
            >
              View card →
            </a>
          )}
        </div>
      </form>

      {!isNew && data.id !== null && (
        <form
          action={deleteCardAction}
          className="mt-12 pt-6 border-t border-red-200 max-w-3xl"
        >
          <input type="hidden" name="id" value={data.id} />
          <input type="hidden" name="slug" value={data.slug} />
          <button
            type="submit"
            className="text-[0.82rem] text-red-600 hover:underline"
          >
            Delete this card
          </button>
          <p className="mt-1 text-[0.75rem] text-ink-mute">
            Any printed QR pointing here stops working. To pause it instead,
            untick &ldquo;Live&rdquo; above.
          </p>
        </form>
      )}
    </>
  );
}

function Field({
  label,
  name,
  defaultValue,
  hint,
  required,
  type = "text",
  textarea = false,
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  hint?: string;
  required?: boolean;
  type?: string;
  textarea?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="block text-[0.82rem] text-ink-mute mb-1">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </span>
      {textarea ? (
        <textarea
          name={name}
          defaultValue={defaultValue}
          required={required}
          placeholder={placeholder}
          rows={3}
          className="w-full rounded-xl border border-ink/15 bg-paper-soft px-3 py-2 text-[0.92rem] focus:outline-none focus:border-ink/40"
        />
      ) : (
        <input
          name={name}
          defaultValue={defaultValue}
          required={required}
          type={type}
          placeholder={placeholder}
          className="w-full rounded-xl border border-ink/15 bg-paper-soft px-3 py-2 text-[0.92rem] focus:outline-none focus:border-ink/40"
        />
      )}
      {hint && (
        <span className="block text-[0.72rem] text-ink-mute mt-1">{hint}</span>
      )}
    </label>
  );
}
