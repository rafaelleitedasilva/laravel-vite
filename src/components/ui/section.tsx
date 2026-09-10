import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

/**
 * A page section with the signature "/slug" mono label as its heading kicker.
 * Keeps the terminal-prompt aesthetic from the old site, now intentional.
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
        <p className="mono-label">/{label}</p>
        <h2
          id={headingId}
          className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl"
        >
          {title}
        </h2>
        {intro ? (
          <p className="mt-3 max-w-2xl text-text-dim">{intro}</p>
        ) : null}
        <div className="mt-10">{children}</div>
      </Container>
    </section>
  );
}
