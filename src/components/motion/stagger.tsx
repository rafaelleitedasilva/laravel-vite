"use client";

import type { ReactNode } from "react";
import {
  type MotionShape,
  shapes,
  stagger as staggerTokens,
  staggerContainer,
  transition as motionTransition,
  viewportOnce,
} from "@/lib/motion";
import { MOTION_TAGS, type MotionTag } from "@/components/motion/tags";

/**
 * Orchestrates its StaggerItem children: as the group enters the viewport,
 * children animate in one after another instead of all at once. Use for any
 * grid/list where "these belong together, in this order" is the point
 * (badges, cards, timeline entries).
 *
 * `trigger="view"` (default) gates the reveal on scroll position, once —
 * right for static content the user scrolls down to. It's the wrong choice
 * for a list whose *contents* change from user interaction (a filter) after
 * that first reveal: once the viewport observer has fired and disconnected,
 * freshly-mounted children have no trigger left and can get stuck at their
 * hidden variant (invisible, but present in the DOM — this is exactly what
 * broke the project filter). Pass `trigger="mount"` for those — it animates
 * in as soon as it mounts, every time, no IntersectionObserver involved.
 */
export function StaggerGroup({
  children,
  as = "div",
  gap = staggerTokens.normal,
  delay = 0,
  trigger = "view",
  className,
  "aria-label": ariaLabel,
}: {
  children: ReactNode;
  as?: MotionTag;
  gap?: number;
  delay?: number;
  trigger?: "view" | "mount";
  className?: string;
  "aria-label"?: string;
}) {
  const Tag = MOTION_TAGS[as];
  const viewProps =
    trigger === "view"
      ? { whileInView: "visible" as const, viewport: viewportOnce }
      : { animate: "visible" as const };
  return (
    <Tag
      aria-label={ariaLabel}
      className={className}
      variants={staggerContainer(gap, delay)}
      initial="hidden"
      {...viewProps}
    >
      {children}
    </Tag>
  );
}

/** A single child of StaggerGroup — must be a direct descendant to inherit its timing. */
export function StaggerItem({
  children,
  as = "div",
  shape = "up",
  slow = false,
  className,
  id,
}: {
  children: ReactNode;
  as?: MotionTag;
  shape?: MotionShape;
  /** Use the larger "emphasized" transition (bigger elements, e.g. timeline cards). */
  slow?: boolean;
  className?: string;
  id?: string;
}) {
  const Tag = MOTION_TAGS[as];
  return (
    <Tag
      id={id}
      className={className}
      variants={shapes[shape]}
      transition={slow ? motionTransition.entranceSlow : motionTransition.entrance}
    >
      {children}
    </Tag>
  );
}
