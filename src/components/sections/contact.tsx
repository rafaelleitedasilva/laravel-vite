"use client";

import { Section } from "@/components/ui/section";
import { getProfile } from "@/lib/content";
import { ContactForm } from "@/components/sections/contact-form";
import { ExternalLink } from "@/components/ui/external-link";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { stagger } from "@/lib/motion";

export function Contact() {
  const profile = getProfile();

  return (
    <Section
      id="contato"
      label="contato"
      title="Vamos conversar"
      intro="Aberto a oportunidades, colaborações e trocas técnicas."
    >
      <div className="grid gap-10 md:grid-cols-[1fr_1.4fr]">
        <Reveal as="div" shape="left" className="space-y-5 text-sm text-text-dim">
          <dl className="space-y-3">
            <div>
              <dt className="font-mono text-xs uppercase tracking-wider">E-mail</dt>
              <dd className="mt-0.5">
                <a
                  className="text-accent underline underline-offset-4"
                  href={`mailto:${profile.email}`}
                >
                  {profile.email}
                </a>
              </dd>
            </div>
            {profile.phone ? (
              <div>
                <dt className="font-mono text-xs uppercase tracking-wider">Telefone</dt>
                <dd className="mt-0.5">
                  <a
                    className="text-accent underline underline-offset-4"
                    href={`tel:+55${profile.phone.replace(/\D/g, "")}`}
                  >
                    {profile.phone}
                  </a>
                </dd>
              </div>
            ) : null}
            {profile.location ? (
              <div>
                <dt className="font-mono text-xs uppercase tracking-wider">Local</dt>
                <dd className="mt-0.5 text-text">{profile.location}</dd>
              </div>
            ) : null}
          </dl>
          <StaggerGroup as="ul" gap={stagger.tight} className="space-y-2">
            {profile.socials.map((s) => (
              <StaggerItem key={s.href} as="li" shape="up-sm">
                <ExternalLink href={s.href}>{s.label}</ExternalLink>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Reveal>
        <Reveal as="div" delay={0.1}>
          <ContactForm fallbackEmail={profile.email} />
        </Reveal>
      </div>
    </Section>
  );
}
