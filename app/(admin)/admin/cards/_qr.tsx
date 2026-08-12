"use client";

import { useRef, useState } from "react";

/**
 * QR panel on the card editor. The QR itself is generated server-side (error
 * correction H, so the centre logo can sit on top without breaking the scan);
 * this component handles the preview, the copy-link button, and compositing
 * the logo into a high-resolution PNG for printing / NFC card artwork.
 */
export function CardQr({
  url,
  qrDataUrl,
  filename,
}: {
  url: string;
  qrDataUrl: string;
  filename: string;
}) {
  const [copied, setCopied] = useState(false);
  const [busy, setBusy] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.prompt("Copy this link", url);
    }
  }

  function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Could not load ${src}`));
      img.src = src;
    });
  }

  /** Draw QR + centre logo at print resolution and hand back a PNG. */
  async function download() {
    setBusy(true);
    try {
      const SIZE = 1200;
      const canvas = canvasRef.current ?? document.createElement("canvas");
      canvas.width = SIZE;
      canvas.height = SIZE;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, SIZE, SIZE);

      const qr = await loadImage(qrDataUrl);
      ctx.drawImage(qr, 0, 0, SIZE, SIZE);

      // White rounded plate behind the mark, same proportions as the card
      // artwork the team already prints.
      const plate = SIZE * 0.23;
      const px = (SIZE - plate) / 2;
      const r = plate * 0.22;
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.moveTo(px + r, px);
      ctx.arcTo(px + plate, px, px + plate, px + plate, r);
      ctx.arcTo(px + plate, px + plate, px, px + plate, r);
      ctx.arcTo(px, px + plate, px, px, r);
      ctx.arcTo(px, px, px + plate, px, r);
      ctx.closePath();
      ctx.fill();

      const logo = await loadImage("/sc-cube.png");
      const lw = plate * 0.66;
      const lh = (logo.height / logo.width) * lw;
      ctx.drawImage(logo, (SIZE - lw) / 2, (SIZE - lh) / 2, lw, lh);

      const href = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = href;
      a.download = `${filename}-qr.png`;
      a.click();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-2xl border border-ink/10 bg-paper p-5">
      <div className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-stone mb-3">
        QR code
      </div>

      <div className="flex flex-wrap items-start gap-5">
        {/* Preview — the logo is overlaid in CSS here; the download composites
            it into the PNG itself */}
        <div className="relative h-[190px] w-[190px] shrink-0 rounded-xl border border-ink/10 bg-white p-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={qrDataUrl} alt={`QR code for ${url}`} className="h-full w-full" />
          <span className="pointer-events-none absolute inset-0 grid place-items-center">
            <span className="flex h-[23%] w-[23%] items-center justify-center rounded-[22%] bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/sc-cube.png" alt="" className="h-[66%] w-[66%] object-contain" />
            </span>
          </span>
        </div>

        <div className="min-w-0 flex-1 space-y-3">
          <div>
            <div className="text-[0.78rem] text-ink-mute mb-1">
              This QR opens:
            </div>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="block break-all font-mono text-[0.82rem] text-brand-deep underline underline-offset-2"
            >
              {url}
            </a>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={download}
              disabled={busy}
              className="rounded-full bg-brand-night px-4 py-2 text-[0.85rem] font-medium text-paper hover:bg-brand transition-colors disabled:opacity-50"
            >
              {busy ? "Preparing…" : "Download PNG"}
            </button>
            <button
              type="button"
              onClick={copyLink}
              className="rounded-full border border-ink/15 bg-paper px-4 py-2 text-[0.85rem] text-ink hover:border-ink/40 transition-colors"
            >
              {copied ? "Copied ✓" : "Copy link"}
            </button>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-ink/15 bg-paper px-4 py-2 text-[0.85rem] text-ink hover:border-ink/40 transition-colors"
            >
              Open card →
            </a>
          </div>

          <p className="text-[0.76rem] leading-relaxed text-ink-mute">
            The PNG is 1200 × 1200 with the SC mark in the centre — print it, or
            write the link above to an NFC card or tag. The QR never changes
            when you edit the card&rsquo;s details, so printed cards keep
            working. It only changes if you change the link.
          </p>
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
