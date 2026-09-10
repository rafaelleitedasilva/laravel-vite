import Link from "next/link";
import { Github, Linkedin, ArrowRight } from "lucide-react";
import { getProfile } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { buttonClass } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const socialIcon: Record<string, typeof Github> = {
  GitHub: Github,
  LinkedIn: Linkedin,
};

export function Hero() {
  const profile = getProfile();

  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden border-b border-border"
    >
      {/* halo de núcleo — luz prateada surgindo do horizonte */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -bottom-1/2 top-0 bg-[radial-gradient(70rem_38rem_at_50%_115%,rgba(233,236,240,0.14),rgba(233,236,240,0.04)_45%,transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgba(201,204,211,0.5),transparent)]"
      />
      <Container className="relative py-28 md:py-40">
        <p className="mono-label">/ um ponto no espaço</p>
        <h1
          id="hero-title"
          className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl md:text-7xl"
        >
          {profile.name}
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-text-dim md:text-xl">
          {profile.title}. Construo aplicações web e APIs com PHP/Laravel, Livewire e
          Alpine.js — buscando clareza na vastidão de sistemas complexos.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link href="/#trabalhos" className={buttonClass("primary", "md")}>
            Ver trabalhos <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <Link href="/#contato" className={buttonClass("secondary", "md")}>
            Fale comigo
          </Link>
        </div>

        <ul className="mt-8 flex items-center gap-2">
          {profile.socials.map((s) => {
            const Icon = socialIcon[s.label] ?? Github;
            return (
              <li key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className={cn(
                    "inline-flex size-10 items-center justify-center rounded-md text-text-dim transition-colors hover:bg-bg-elev hover:text-text",
                  )}
                >
                  <Icon className="size-5" aria-hidden="true" />
                </a>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
