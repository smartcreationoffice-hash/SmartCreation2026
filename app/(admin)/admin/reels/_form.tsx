import { saveReelAction, deleteReelAction } from "../actions";

export type ReelFormData = {
  id: number | null;
  url: string;
  caption: string;
  active: boolean;
  display_order: number;
};

export function ReelForm({ data }: { data: ReelFormData }) {
  const isNew = data.id === null;
  return (
    <>
      <form action={saveReelAction} className="space-y-6 max-w-2xl">
        {data.id !== null && <input type="hidden" name="id" value={data.id} />}

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
              Active &mdash; show this reel on the site
            </span>
          </label>
          <p className="text-[0.78rem] text-ink-mute">
            Active reels appear in the &ldquo;On Instagram&rdquo; section on the
            About page, ordered by the number below.
          </p>
        </div>

        {/* Reel */}
        <div className="rounded-2xl border border-ink/10 bg-paper p-5 space-y-4">
          <div className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-stone">
            Reel
          </div>
          <Field
            label="Instagram reel link"
            name="url"
            defaultValue={data.url}
            required
            hint="Paste the full reel URL, e.g. https://www.instagram.com/reel/ABC123/ — open the reel in Instagram and copy the link."
          />
          <Field
            label="Caption / note"
            name="caption"
            defaultValue={data.caption}
            hint="Optional internal note so you remember what this reel is. Not shown on the site."
          />
          <Field
            label="Order"
            name="display_order"
            defaultValue={String(data.display_order)}
            type="number"
            hint="Lower numbers show first. Default 100."
          />
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-ink/10">
          <button
            type="submit"
            className="rounded-full bg-brand-night text-paper px-5 py-2.5 text-[0.92rem] font-medium hover:bg-brand transition-colors"
          >
            {isNew ? "Add reel" : "Save changes"}
          </button>
        </div>
      </form>

      {!isNew && data.id !== null && (
        <form
          action={deleteReelAction}
          className="mt-12 pt-6 border-t border-red-200 max-w-2xl"
        >
          <input type="hidden" name="id" value={data.id} />
          <button type="submit" className="text-[0.82rem] text-red-600 hover:underline">
            Delete this reel
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
}: {
  label: string;
  name: string;
  defaultValue?: string;
  hint?: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="block text-[0.82rem] text-ink-mute mb-1">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </span>
      <input
        name={name}
        defaultValue={defaultValue}
        required={required}
        type={type}
        className="w-full rounded-xl border border-ink/15 bg-paper-soft px-3 py-2 text-[0.92rem] focus:outline-none focus:border-ink/40"
      />
      {hint && (
        <span className="block text-[0.72rem] text-ink-mute mt-1">{hint}</span>
      )}
    </label>
  );
}
