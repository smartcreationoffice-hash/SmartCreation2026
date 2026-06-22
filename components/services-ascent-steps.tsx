"use client";

import type { CSSProperties } from "react";
import { m } from "framer-motion";
import { Briefcase, Building2, Calculator, type LucideIcon } from "lucide-react";

/**
 * SAVED VARIANT — "steps" version of the Services ascent.
 *
 * Three-step ascent with floating, labelled icon cards (Set up · Finance ·
 * Offices), a faint Dubai skyline + Burj Khalifa behind, and short "outputs"
 * drifting out of the open door. Kept as a reusable alternative to the
 * animated-climber version exported from services-ascent.tsx.
 *
 * To use it: import { ServicesAscentSteps } from "@/components/services-ascent-steps"
 * and render it in place of <ServicesAscent />.
 */

type Step = {
  id: string;
  label: string;
  icon: LucideIcon;
  cx: number; // tread centre x
  y: number; // tread surface y
};

const STEPS: Step[] = [
  { id: "setup", label: "Set up", icon: Briefcase, cx: 86, y: 300 },
  { id: "office", label: "Offices", icon: Building2, cx: 186, y: 220 },
  { id: "finance", label: "Finance", icon: Calculator, cx: 286, y: 140 },
];

// the ascending profile — three treads then the landing the door sits on
const PROFILE = "M 36 300 H 136 V 220 H 236 V 140 H 336 V 70 H 432";

// short "outputs" that drift up out of the open door, on a continuous loop
const DOOR_LINES = [
  "Trade licence ✓",
  "Books & VAT ✓",
  "Office ready ✓",
  "Open for business",
];
const LINE_SPACING = 1.8; // seconds between each phrase starting
const LINE_ACTIVE = 2.4; // seconds a phrase is on screen
const LINE_BASE_DELAY = 2.0; // wait for the door to open first

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (delay: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.3, delay, ease: [0.22, 1, 0.36, 1] as const },
      opacity: { duration: 0.2, delay },
    },
  }),
};

const fade = (delay: number, to = 1) => ({
  hidden: { opacity: 0 },
  show: { opacity: to, transition: { duration: 0.8, delay } },
});

export function ServicesAscentSteps() {
  return (
    <m.svg
      viewBox="0 0 470 360"
      role="img"
      aria-label="A three-step ascent — business setup, financial services and a ready-to-move office — rising toward an open doorway into a fully operating UAE business."
      className="h-auto w-full select-none overflow-visible"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
    >
      <defs>
        <filter id="chip-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow
            dx="0"
            dy="4"
            stdDeviation="5"
            floodColor="var(--color-brand-deep)"
            floodOpacity="0.2"
          />
        </filter>
        {/* atmospheric fade for the Burj — denser at the base */}
        <linearGradient id="burj-fade" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="var(--color-brand-deep)" stopOpacity="0.14" />
          <stop offset="100%" stopColor="var(--color-brand-deep)" stopOpacity="0.015" />
        </linearGradient>
      </defs>

      {/* faint Dubai skyline behind it all — a UAE-business horizon */}
      <m.path
        d="M 6 343 V 322 H 20 V 332 H 30 V 312 H 46 V 326 H 58 V 318 H 72 V 330 H 84 V 314 H 100 V 324 H 112 V 308 H 128 V 320 H 140 V 326 H 156 V 316 H 170 V 324 H 184 V 306 H 198 V 318 H 214 V 328 H 246 V 314 H 262 V 322 H 278 V 318 H 294 V 326 H 326 V 318 H 342 V 326 H 358 V 322 H 374 V 312 H 390 V 322 H 406 V 314 H 422 V 324 H 440 V 318 H 456 V 343 Z"
        fill="var(--color-brand-deep)"
        variants={fade(0.15, 0.06)}
      />

      {/* Burj Khalifa — faint landmark, tapered tiers + long spire */}
      <m.path
        d="M 38 343 V 300 H 41 V 266 H 44 V 232 H 46.5 V 198 H 48.5 V 165 H 50 V 130 H 51.4 L 52 100 L 52.6 60 L 53 24 L 53.4 60 L 54 100 L 54.6 130 H 56 V 165 H 57.5 V 198 H 59.5 V 232 H 62 V 266 H 65 V 300 H 68 V 343 Z"
        fill="url(#burj-fade)"
        stroke="var(--color-brand-deep)"
        strokeOpacity="0.12"
        strokeWidth="0.6"
        strokeLinejoin="round"
        variants={fade(0.3, 1)}
      />

      {/* ground line */}
      <m.line
        x1="8"
        y1="344"
        x2="462"
        y2="344"
        stroke="var(--color-ink)"
        strokeOpacity="0.18"
        strokeWidth="1"
        variants={draw}
        custom={0}
      />

      {/* faint architectural guides dropping from each tread */}
      {STEPS.map((s, i) => (
        <m.line
          key={"g" + s.id}
          x1={s.cx}
          y1={s.y}
          x2={s.cx}
          y2={344}
          stroke="var(--color-brand-deep)"
          strokeOpacity="0.09"
          strokeWidth="1"
          strokeDasharray="2 5"
          variants={draw}
          custom={0.5 + i * 0.14}
        />
      ))}

      {/* the staircase profile — one continuous ascending stroke */}
      <m.path
        d={PROFILE}
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        variants={draw}
        custom={0.15}
      />
      {/* tread highlight — a soft brand line riding just under the profile */}
      <m.path
        d={PROFILE}
        fill="none"
        stroke="var(--color-brand)"
        strokeOpacity="0.5"
        strokeWidth="1.25"
        strokeLinejoin="round"
        strokeLinecap="round"
        transform="translate(0,3.5)"
        variants={draw}
        custom={0.35}
      />

      {/* destination glow behind the doorway */}
      <m.circle
        cx="404"
        cy="38"
        r="46"
        fill="var(--color-brand)"
        variants={fade(1.3, 0.18)}
        style={{ filter: "blur(16px)" }}
      />

      {/* doorway frame on the top landing */}
      <m.path
        d="M 388 70 V 6 H 432 V 70"
        fill="none"
        stroke="var(--color-brand-deep)"
        strokeWidth="2.5"
        strokeLinejoin="round"
        variants={draw}
        custom={1.2}
      />
      {/* open door leaf, ajar toward the climber */}
      <m.path
        d="M 388 6 L 358 17 V 81 L 388 70 Z"
        fill="var(--color-brand-deep)"
        stroke="var(--color-brand-deep)"
        strokeWidth="1"
        strokeLinejoin="round"
        variants={{
          hidden: { opacity: 0, scaleX: 0 },
          show: {
            opacity: 1,
            scaleX: 1,
            transition: { duration: 0.55, delay: 1.4, ease: [0.22, 1, 0.36, 1] },
          },
        }}
        style={{ transformOrigin: "388px 38px" }}
      />
      {/* door handle */}
      <m.circle
        cx="366"
        cy="44"
        r="2"
        fill="var(--color-brand-soft)"
        variants={fade(1.85, 1)}
      />
      {/* accent dot resting on the threshold — the goal reached */}
      <m.circle
        cx="412"
        cy="70"
        r="4"
        fill="var(--color-brand)"
        variants={{
          hidden: { opacity: 0, scale: 0 },
          show: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5, delay: 1.85, ease: [0.22, 1, 0.36, 1] },
          },
        }}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      />

      {/* outputs of a running business, drifting up out of the open door */}
      {DOOR_LINES.map((line, i) => (
        <m.text
          key={"d" + i}
          x="384"
          y="14"
          textAnchor="end"
          className="font-mono"
          fontSize="9.5"
          letterSpacing="0.3"
          fill="var(--color-brand-deep)"
          variants={{
            hidden: { opacity: 0, x: 0, y: 0 },
            show: {
              opacity: [0, 0.95, 0.9, 0],
              x: [0, -8, -18, -28],
              y: [0, -12, -28, -44],
              transition: {
                duration: LINE_ACTIVE,
                times: [0, 0.2, 0.6, 1],
                ease: "easeOut",
                repeat: Infinity,
                repeatDelay: DOOR_LINES.length * LINE_SPACING - LINE_ACTIVE,
                delay: LINE_BASE_DELAY + i * LINE_SPACING,
              },
            },
          }}
        >
          {line}
        </m.text>
      ))}

      {/* per-step markers: a labelled icon card resting on each tread */}
      {STEPS.map((s, i) => {
        const Icon = s.icon;
        const chip = 38;
        const chipX = s.cx - chip / 2;
        const chipY = s.y - chip - 4; // rest the card on the tread
        return (
          <m.g
            key={"m" + s.id}
            variants={{
              hidden: { opacity: 0, y: 10, scale: 0.8 },
              show: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  duration: 0.55,
                  delay: 0.7 + i * 0.16,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          >
            {/* inner group floats gently, forever — staggered per step (CSS) */}
            <g
              className="ascent-float"
              style={
                {
                  "--float-dur": `${3.4 + i * 0.6}s`,
                  "--float-delay": `${i * 0.5}s`,
                } as CSSProperties
              }
            >
              {/* label above the card */}
              <text
                x={s.cx}
                y={chipY - 9}
                textAnchor="middle"
                className="font-mono"
                fontSize="8.5"
                letterSpacing="1.4"
                fill="var(--color-stone)"
              >
                {s.label.toUpperCase()}
              </text>
              <rect
                x={chipX}
                y={chipY}
                width={chip}
                height={chip}
                rx="11"
                fill="var(--color-paper-soft)"
                stroke="var(--color-brand-deep)"
                strokeOpacity="0.18"
                strokeWidth="1"
                filter="url(#chip-shadow)"
              />
              {/* thin brand top accent on the card */}
              <rect
                x={chipX + 11}
                y={chipY + 5}
                width={chip - 22}
                height="2"
                rx="1"
                fill="var(--color-brand)"
                opacity="0.65"
              />
              <Icon
                x={s.cx - 10}
                y={chipY + 11}
                width={20}
                height={20}
                color="var(--color-brand-deep)"
                strokeWidth={1.7}
              />
            </g>
          </m.g>
        );
      })}
    </m.svg>
  );
}
