"use client";

import type { ReactNode } from "react";
import { type MotionShape, shapes, transition as motionTransition, viewportOnce } from "@/lib/motion";
import { MOTION_TAGS, type MotionTag } from "@/components/motion/tags";

/**
 * The default scroll-triggered entrance: fade + rise (or slide, via `shape`),
 * once, as the element crosses into the viewport. Used for section headings
 * and any standalone block that doesn't need its own stagger choreography.
 */
export function Reveal({
  children,
  as = "div",
  shape = "up-sm",
  delay = 0,
  className,
  id,
}: {
  children: ReactNode;
  as?: MotionTag;
  shape?: MotionShape;
  delay?: number;
  className?: string;
  id?: string;
}) {
  const Tag = MOTION_TAGS[as];
  return (
    <Tag
      id={id}
      className={className}
      variants={shapes[shape]}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ ...motionTransition.entrance, delay }}
    >
      {children}
    </Tag>
  );
}
