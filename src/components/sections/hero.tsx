"use client";

import Link from "next/link";
import { type PointerEvent as ReactPointerEvent, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { Github, Linkedin, ArrowRight } from "lucide-react";
import { getProfile } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { buttonClass } from "@/components/ui/button";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { spring } from "@/lib/motion";
import { useFinePointer } from "@/hooks/useMediaQuery";

const socialIcon: Record<string, typeof Github> = {
  GitHub: Github,
  LinkedIn: Linkedin,
};

export function Hero() {
  const profile = getProfile();
  const sectionRef = useRef<HTMLElement>(null);
  const canParallax = useFinePointer();

  // Cursor-driven drift on the background glow — a few px, smoothed by a
  // soft spring. Only wired up for accurate pointers; MotionConfig's
  // reducedMotion="user" additionally neutralizes it for that preference.
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, spring.cursor);
  const y = useSpring(rawY, spring.cursor);

  function onPointerMove(e: ReactPointerEvent<HTMLElement>) {
    if (!canParallax || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rawX.set(px * 24);
    rawY.set(py * 16);
  }

  function onPointerLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  // CTA magnético — puxa levemente na direção do cursor dentro da própria
  // área do botão. Só a ação principal ganha isso; o resto do site fica quieto.
  const magX = useMotionValue(0);
  const magY = useMotionValue(0);
  const magSpringX = useSpring(magX, spring.cursor);
  const magSpringY = useSpring(magY, spring.cursor);

  function onCtaPointerMove(e: ReactPointerEvent<HTMLSpanElement>) {
    if (!canParallax) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - (rect.left + rect.width / 2);
    const py = e.clientY - (rect.top + rect.height / 2);
    magX.set(Math.max(-10, Math.min(10, px * 0.3)));
    magY.set(Math.max(-10, Math.min(10, py * 0.3)));
  }

  function onCtaPointerLeave() {
    magX.set(0);
    magY.set(0);
  }

  return (
    <section
      ref={sectionRef}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      aria-labelledby="hero-title"
      className="relative overflow-hidden border-b border-border"
    >
      {/* halo de núcleo — luz prateada surgindo do horizonte, deriva sutil com o cursor */}
      <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ x, y }}>
        <div className="absolute inset-x-0 -bottom-1/2 top-0 bg-[radial-gradient(70rem_38rem_at_50%_115%,rgba(233,236,240,0.14),rgba(233,236,240,0.04)_45%,transparent_70%)]" />
      </motion.div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgba(201,204,211,0.5),transparent)]"
      />

      <Container className="relative py-28 md:py-40">
        <StaggerGroup gap={0.09}>
          <StaggerItem as="p" shape="up-sm" className="mono-label">
            / um ponto no espaço
          </StaggerItem>
          <StaggerItem
            as="h1"
            id="hero-title"
            shape="up-sm"
            className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl md:text-7xl"
          >
            {profile.name}
          </StaggerItem>
          <StaggerItem
            as="p"
            shape="up-sm"
            className="mt-5 max-w-2xl text-lg text-text-dim md:text-xl"
          >
            {profile.title}. Construo aplicações web e APIs com PHP/Laravel, Livewire e
            Alpine.js — buscando clareza na vastidão de sistemas complexos.
          </StaggerItem>

          <StaggerItem as="div" shape="up-sm" className="mt-8 flex flex-wrap items-center gap-3">
            <motion.span
              className="inline-block"
              onPointerMove={onCtaPointerMove}
              onPointerLeave={onCtaPointerLeave}
              style={{ x: magSpringX, y: magSpringY }}
            >
              <Link href="/#trabalhos" className={buttonClass("primary", "md")}>
                Ver trabalhos <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </motion.span>
            <Link href="/#contato" className={buttonClass("secondary", "md")}>
              Fale comigo
            </Link>
          </StaggerItem>

          <StaggerItem as="ul" shape="up-sm" className="mt-8 flex items-center gap-2">
            {profile.socials.map((s) => {
              const Icon = socialIcon[s.label] ?? Github;
              return (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="inline-flex size-10 items-center justify-center rounded-md text-text-dim transition-colors hover:bg-bg-elev hover:text-text active:scale-[0.94]"
                  >
                    <Icon className="size-5" aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </StaggerItem>
        </StaggerGroup>

        {/* pista de rolagem — flutuação lenta e contínua em CSS */}
        <div
          aria-hidden="true"
          className="scroll-cue pointer-events-none mt-16 hidden h-8 w-px justify-self-start bg-gradient-to-b from-border-strong to-transparent md:block"
        />
      </Container>
    </section>
  );
}
