"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { GripVertical } from "lucide-react";
import { uploadImageAction } from "./actions";

type GalleryItem = { url: string; caption?: string };

/* Single-image picker (for hero image) */
export function HeroImagePicker({
  name,
  initialUrl,
}: {
  name: string;            // hidden input name → URL
  initialUrl?: string | null;
}) {
  const [url, setUrl] = useState<string>(initialUrl ?? "");
  const [pending, startTransition] = useTransition();
  const [err, setErr] = useState<string | null>(null);

  async function onFile(file: File) {
    setErr(null);
    const fd = new FormData();
    fd.append("file", file);
    startTransition(async () => {
      const res = await uploadImageAction(fd);
      if ("error" in res) setErr(res.error);
      else setUrl(res.url);
    });
  }

  return (
    <div>
      <input type="hidden" name={name} value={url} />
      <div className="flex items-start gap-4">
        <div className="relative h-[140px] w-[200px] rounded-xl bg-paper-soft border border-ink/10 overflow-hidden shrink-0">
          {url ? (
            <Image src={url} alt="" fill sizes="200px" className="object-cover" />
          ) : (
            <div className="absolute inset-0 grid place-items-center text-[0.78rem] text-ink-mute">
              No image
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 min-w-0">
          <label className="inline-flex items-center justify-center cursor-pointer rounded-full border border-ink/15 bg-paper px-3 py-1.5 text-[0.82rem] text-ink hover:border-ink/40 transition-colors">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) onFile(f);
              }}
            />
            {pending ? "Uploading…" : url ? "Replace image" : "Upload image"}
          </label>
          {url && (
            <button
              type="button"
              onClick={() => setUrl("")}
              className="text-left text-[0.78rem] text-ink-mute hover:text-red-600"
            >
              Remove
            </button>
          )}
          {err && <p className="text-[0.78rem] text-red-600">{err}</p>}
        </div>
      </div>
    </div>
  );
}

/* Gallery editor: list of {url, caption} */
export function GalleryEditor({
  name,
  initial,
}: {
  name: string;
  initial: GalleryItem[];
}) {
  const [items, setItems] = useState<GalleryItem[]>(initial);
  const [pending, startTransition] = useTransition();
  const [err, setErr] = useState<string | null>(null);
  // Drag state — we track only indices; React rerenders on each step.
  const [dragFrom, setDragFrom] = useState<number | null>(null);
  const [dragOver, setDragOver] = useState<number | null>(null);

  function reorder(from: number, to: number) {
    if (from === to) return;
    setItems((cur) => {
      const next = cur.slice();
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
  }

  async function onFiles(files: FileList) {
    setErr(null);
    for (const f of Array.from(files)) {
      const fd = new FormData();
      fd.append("file", f);
      await new Promise<void>((resolve) => {
        startTransition(async () => {
          const res = await uploadImageAction(fd);
          if ("error" in res) {
            setErr(res.error);
          } else {
            setItems((cur) => [...cur, { url: res.url }]);
          }
          resolve();
        });
      });
    }
  }

  const remove = (idx: number) => setItems((cur) => cur.filter((_, i) => i !== idx));
  const setCaption = (idx: number, caption: string) =>
    setItems((cur) => cur.map((it, i) => (i === idx ? { ...it, caption } : it)));

  return (
    <div className="rounded-2xl border border-ink/10 bg-paper-soft p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-stone">
            Gallery
          </div>
          <div className="text-[0.78rem] text-ink-mute mt-0.5">
            {items.length} {items.length === 1 ? "image" : "images"}
          </div>
        </div>
        <label className="inline-flex items-center justify-center cursor-pointer rounded-full border border-ink/15 bg-paper px-3 py-1.5 text-[0.82rem] text-ink hover:border-ink/40 transition-colors">
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => {
              if (e.target.files) onFiles(e.target.files);
            }}
          />
          {pending ? "Uploading…" : "+ Add images"}
        </label>
      </div>
      {err && <p className="mb-3 text-[0.8rem] text-red-600">{err}</p>}
      {items.length > 1 && (
        <p className="mb-3 text-[0.72rem] text-ink-mute">
          Drag a card by the <GripVertical className="inline h-3 w-3 -mt-0.5" /> handle to reorder.
        </p>
      )}
      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {items.map((it, i) => {
          const isDragging = dragFrom === i;
          const isDropTarget = dragOver === i && dragFrom !== null && dragFrom !== i;
          return (
            <li
              key={i}
              onDragOver={(e) => {
                if (dragFrom === null) return;
                e.preventDefault();
                e.dataTransfer.dropEffect = "move";
                if (dragOver !== i) setDragOver(i);
              }}
              onDrop={(e) => {
                e.preventDefault();
                if (dragFrom !== null) reorder(dragFrom, i);
                setDragFrom(null);
                setDragOver(null);
              }}
              className={
                "relative rounded-xl border bg-paper overflow-hidden transition-all " +
                (isDragging ? "opacity-40 " : "") +
                (isDropTarget
                  ? "border-brand-night ring-2 ring-brand-night/30 "
                  : "border-ink/10 ")
              }
            >
              {/* Drag handle — only the handle is draggable so caption inputs stay focusable */}
              <button
                type="button"
                aria-label="Drag to reorder"
                draggable
                onDragStart={(e) => {
                  setDragFrom(i);
                  // Firefox needs data on the transfer to actually drag.
                  e.dataTransfer.effectAllowed = "move";
                  e.dataTransfer.setData("text/plain", String(i));
                }}
                onDragEnd={() => {
                  setDragFrom(null);
                  setDragOver(null);
                }}
                className="absolute top-1.5 left-1.5 z-10 flex h-7 w-7 items-center justify-center rounded-md border border-ink/15 bg-paper/90 text-ink-mute backdrop-blur cursor-grab active:cursor-grabbing hover:text-ink hover:border-ink/40 transition-colors"
              >
                <GripVertical className="h-3.5 w-3.5" strokeWidth={2} />
              </button>
              <div className="absolute top-1.5 right-1.5 z-10 rounded-md bg-ink/70 text-paper backdrop-blur px-1.5 py-0.5 font-mono text-[0.62rem] tabular-nums">
                {i + 1}
              </div>
              <div className="relative aspect-[4/3] bg-paper-soft pointer-events-none">
                {it.url && <Image src={it.url} alt="" fill sizes="200px" className="object-cover" />}
              </div>
              <div className="p-2 space-y-2">
                <input
                  placeholder="Caption (optional)"
                  value={it.caption ?? ""}
                  onChange={(e) => setCaption(i, e.target.value)}
                  className="w-full rounded-md border border-ink/15 bg-paper-soft px-2 py-1 text-[0.78rem] focus:outline-none focus:border-ink/40"
                />
                <button
                  type="button"
                  onClick={() => remove(i)}
                  className="w-full text-[0.75rem] text-ink-mute hover:text-red-600 text-left"
                >
                  Remove
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <input type="hidden" name={name} value={JSON.stringify(items)} />
    </div>
  );
}
