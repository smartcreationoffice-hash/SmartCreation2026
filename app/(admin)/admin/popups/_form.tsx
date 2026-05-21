import { savePopupAction, deletePopupAction } from "../actions";
import { HeroImagePicker } from "../_image-editor";

export type PopupFormData = {
  id: number | null;
  title: string;
  subtitle: string;
  eyebrow: string;
  image_url: string | null;
  cta_label: string;
  cta_href: string;
  target_pages: string;
  delay_seconds: number;
  active: boolean;
  display_order: number;
};

export function PopupForm({ data }: { data: PopupFormData }) {
  const isNew = data.id === null;
  return (
    <>
      <form action={savePopupAction} className="space-y-6 max-w-3xl">
        {data.id !== null && (
          <input type="hidden" name="id" value={data.id} />
        )}

        {/* Status */}
        <div className="rounded-2xl border border-ink/10 bg-paper p-5 space-y-4">
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
              Active &mdash; show this popup to visitors
            </span>
          </label>
          <p className="text-[0.78rem] text-ink-mute">
            Only active popups are shown. Inactive ones stay saved here but are hidden from the site.
          </p>
        </div>

        {/* Copy */}
        <div className="rounded-2xl border border-ink/10 bg-paper p-5 space-y-4">
          <div className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-stone">
            Copy
          </div>
          <Field
            label="Eyebrow"
            name="eyebrow"
            defaultValue={data.eyebrow}
            hint="Optional small label above the title. e.g. LIMITED OFFER, NEW LAUNCH, FREE CONSULT"
          />
          <Field
            label="Title"
            name="title"
            defaultValue={data.title}
            required
            hint="The big headline of the popup."
          />
          <Field
            label="Subtitle"
            name="subtitle"
            defaultValue={data.subtitle}
            textarea
            hint="One- or two-sentence supporting message under the title."
          />
        </div>

        {/* Image */}
        <div className="rounded-2xl border border-ink/10 bg-paper p-5">
          <div className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-stone mb-3">
            Image
          </div>
          <HeroImagePicker name="image_url" initialUrl={data.image_url} />
          <p className="mt-3 text-[0.78rem] text-ink-mute">
            Optional. Shows on the left side of the popup (top on mobile).
            Recommended ~1200 &times; 1000px or similar 5:4 ratio.
          </p>
        </div>

        {/* CTA */}
        <div className="rounded-2xl border border-ink/10 bg-paper p-5 space-y-4">
          <div className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-stone">
            Call to action
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field
              label="Button label"
              name="cta_label"
              defaultValue={data.cta_label}
              hint="e.g. Book a free call, Get the offer. Leave blank to hide the button."
            />
            <Field
              label="Button link"
              name="cta_href"
              defaultValue={data.cta_href}
              hint="Internal path (/contact) or full URL (https://...)."
            />
          </div>
        </div>

        {/* Targeting */}
        <div className="rounded-2xl border border-ink/10 bg-paper p-5 space-y-4">
          <div className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-stone">
            Targeting
          </div>
          <Field
            label="Pages"
            name="target_pages"
            defaultValue={data.target_pages || "*"}
            hint='Use * for every page, / for the home page only, or a comma-separated list like "/, /calculator, /contact". A trailing /* matches a prefix (e.g. /services/* matches all /services pages).'
          />
          <div className="grid sm:grid-cols-2 gap-4">
            <Field
              label="Delay (seconds)"
              name="delay_seconds"
              defaultValue={String(data.delay_seconds)}
              type="number"
              hint="How long after page load before the popup appears. 0-60. Default 6."
            />
            <Field
              label="Priority"
              name="display_order"
              defaultValue={String(data.display_order)}
              type="number"
              hint="When more than one active popup matches a page, the lowest priority number wins. Default 100."
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-ink/10">
          <button
            type="submit"
            className="rounded-full bg-brand-night text-paper px-5 py-2.5 text-[0.92rem] font-medium hover:bg-brand transition-colors"
          >
            {isNew ? "Create popup" : "Save changes"}
          </button>
        </div>
      </form>

      {!isNew && data.id !== null && (
        <form action={deletePopupAction} className="mt-12 pt-6 border-t border-red-200 max-w-3xl">
          <input type="hidden" name="id" value={data.id} />
          <button type="submit" className="text-[0.82rem] text-red-600 hover:underline">
            Delete this popup
          </button>
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
}: {
  label: string;
  name: string;
  defaultValue?: string;
  hint?: string;
  required?: boolean;
  type?: string;
  textarea?: boolean;
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
          rows={3}
          className="w-full rounded-xl border border-ink/15 bg-paper-soft px-3 py-2 text-[0.92rem] focus:outline-none focus:border-ink/40"
        />
      ) : (
        <input
          name={name}
          defaultValue={defaultValue}
          required={required}
          type={type}
          className="w-full rounded-xl border border-ink/15 bg-paper-soft px-3 py-2 text-[0.92rem] focus:outline-none focus:border-ink/40"
        />
      )}
      {hint && (
        <span className="block text-[0.72rem] text-ink-mute mt-1">{hint}</span>
      )}
    </label>
  );
}
