"use client";

import { type ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

/**
 * Extremely light scroll-linked drift — a few px, never a "sliding panels"
 * parallax. Reads as depth, not as a feature. `strength` is the max px of
 * travel across the element's time in the viewport.
 */
export function Parallax({
  children,
  strength = 16,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-strength, strength]);

  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}
