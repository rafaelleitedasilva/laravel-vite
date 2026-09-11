"use client";

import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/**
 * A page section with the signature "/slug" mono label as its heading kicker.
 * Keeps the terminal-prompt aesthetic from the old site, now intentional.
 *
 * The heading group animates in as the section crosses into view — this is
 * centralized here so every section gets the same entrance for free instead
 * of each one re-declaring it. Section-specific content animation (stagger,
 * parallax, ...) is up to each section's own children.
 */
export function Section({
  id,
  label,
  title,
  intro,
  children,
  className,
}: {
  id: string;
  /** mono kicker, e.g. "sobre" -> renders "/sobre" */
  label: string;
  title: string;
  intro?: string;
  children: ReactNode;
  className?: string;
}) {
  const headingId = `${id}-title`;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn(
        "edge-glow scroll-mt-20 border-t border-border/60 py-16 md:py-24",
        className,
      )}
    >
      <Container>
        <Reveal as="p" className="mono-label">
          /{label}
        </Reveal>
        <Reveal
          as="h2"
          id={headingId}
          delay={0.06}
          className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl"
        >
          {title}
        </Reveal>
        {intro ? (
          <Reveal as="p" delay={0.12} className="mt-3 max-w-2xl text-text-dim">
            {intro}
          </Reveal>
        ) : null}
        <div className="mt-10">{children}</div>
      </Container>
    </section>
  );
}
