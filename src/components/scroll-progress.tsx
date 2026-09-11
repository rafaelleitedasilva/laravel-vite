"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { spring } from "@/lib/motion";

/**
 * Trilha fixa na borda direita da tela com um marcador que acompanha o
 * progresso de rolagem da página — a "trajetória" do visitante pelo site,
 * literal. Um único useScroll (sem target = página inteira); só a posição
 * (top) do marcador muda, sem custo de layout.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, spring.soft);
  const top = useTransform(progress, (v) => `${v * 100}%`);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-y-4 right-3 z-40 hidden w-4 md:block"
    >
      <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-border-strong/50" />
      <motion.div
        className="absolute left-1/2 size-1.5 -ml-[3px] rounded-full bg-accent shadow-[0_0_8px_2px_rgba(233,236,240,0.55)]"
        style={{ top, y: "-50%" }}
      />
    </div>
  );
}
