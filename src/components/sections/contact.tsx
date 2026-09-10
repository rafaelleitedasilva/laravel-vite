import { Section } from "@/components/ui/section";
import { getProfile } from "@/lib/content";
import { ContactForm } from "@/components/sections/contact-form";
import { ExternalLink } from "@/components/ui/external-link";

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
        <div className="space-y-5 text-sm text-text-dim">
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
          <ul className="space-y-2">
            {profile.socials.map((s) => (
              <li key={s.href}>
                <ExternalLink href={s.href}>{s.label}</ExternalLink>
              </li>
            ))}
          </ul>
        </div>
        <ContactForm fallbackEmail={profile.email} />
      </div>
    </Section>
  );
}
