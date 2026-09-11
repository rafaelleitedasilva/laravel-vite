"use client";

import { motion } from "motion/react";

/**
 * Shared allow-list of `motion.*` tags for the primitives in this folder.
 * Keeps `as` props type-safe (no arbitrary string indexing into `motion`).
 */
export const MOTION_TAGS = {
  div: motion.div,
  span: motion.span,
  p: motion.p,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  li: motion.li,
  ul: motion.ul,
  ol: motion.ol,
} as const;

export type MotionTag = keyof typeof MOTION_TAGS;
