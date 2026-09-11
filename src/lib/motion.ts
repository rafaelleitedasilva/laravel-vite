import type { Transition, Variants } from "motion/react";

/**
 * Design tokens for motion — a single vocabulary so every animation in the
 * app reads as one language instead of one-off tweaks per component.
 *
 * Hierarchy (see PORTFOLIO_MODERNIZATION.md "Motion"):
 *  - micro-interactions: 100–250ms
 *  - element entrances:  300–600ms
 *  - larger transitions: 500–900ms
 *  - continuous/ambient:  very slow, low-amplitude
 */
export const duration = {
  fast: 0.18,
  normal: 0.45,
  slow: 0.7,
  ambient: 1.4,
} as const;

/** Cubic-bezier easings — "standard" for entrances, "emphasized" for bigger moves. */
export const ease = {
  standard: [0.22, 1, 0.36, 1],
  emphasized: [0.16, 1, 0.3, 1],
  out: [0.25, 0.46, 0.45, 0.94],
} as const;

export const spring = {
  soft: { type: "spring", stiffness: 120, damping: 20, mass: 0.6 },
  snappy: { type: "spring", stiffness: 320, damping: 26, mass: 0.5 },
  cursor: { type: "spring", stiffness: 60, damping: 14, mass: 0.4 },
} as const satisfies Record<string, Transition>;

export const stagger = {
  tight: 0.045,
  normal: 0.08,
  loose: 0.12,
} as const;

/** Entrance travel distance in px, by weight. */
export const distance = {
  xs: 6,
  sm: 12,
  md: 20,
  lg: 32,
} as const;

export const transition = {
  entrance: { duration: duration.normal, ease: ease.standard } as Transition,
  entranceSlow: { duration: duration.slow, ease: ease.emphasized } as Transition,
  micro: { duration: duration.fast, ease: ease.out } as Transition,
};

/*
 * Variants intentionally carry no `transition` — that's supplied by the
 * component (via the `transition` prop) so a single element can combine a
 * shared shape (fadeUp, fadeSide, ...) with its own delay without fighting
 * over which `transition` wins.
 */

/** Fade + rise — the default section/element entrance. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: distance.md },
  visible: { opacity: 1, y: 0 },
};

/** Same idea, smaller travel — for compact items (badges, list rows). */
export const fadeUpSm: Variants = {
  hidden: { opacity: 0, y: distance.sm },
  visible: { opacity: 1, y: 0 },
};

/** Lateral entrance — used where "coming from a side" reads as a trajectory (timeline). */
export function fadeSide(fromRight = false): Variants {
  const x = (fromRight ? 1 : -1) * distance.lg;
  return {
    hidden: { opacity: 0, x },
    visible: { opacity: 1, x: 0 },
  };
}

/** The shared vocabulary of entrance shapes, keyed for use in `shape` props. */
export type MotionShape = "up" | "up-sm" | "left" | "right";

export const shapes: Record<MotionShape, Variants> = {
  up: fadeUp,
  "up-sm": fadeUpSm,
  left: fadeSide(false),
  right: fadeSide(true),
};

/** Parent container — stagger its StaggerItem children as it enters the viewport. */
export function staggerContainer(gap: number = stagger.normal, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: gap, delayChildren },
    },
  };
}

/** Default viewport gate: animate once, a little before the element is centered. */
export const viewportOnce = { once: true, margin: "-10% 0px -10% 0px" } as const;
