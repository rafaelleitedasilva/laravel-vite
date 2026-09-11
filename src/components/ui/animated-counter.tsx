"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useTransform } from "motion/react";
import { duration, ease } from "@/lib/motion";

/**
 * Conta de 0 até `value` uma vez, quando entra na tela. Usa um MotionValue
 * como filho do motion.span (o Motion escreve o texto direto no DOM a cada
 * frame, sem re-render React) em vez de useState por frame.
 */
export function AnimatedCounter({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toString());

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, value, {
      duration: duration.slow + 0.3,
      ease: ease.emphasized,
    });
    return controls.stop;
  }, [inView, value, count]);

  return (
    <motion.span ref={ref} className={className}>
      {rounded}
    </motion.span>
  );
}
