import { Section } from "@/components/ui/section";
import { getExperience, getProfile } from "@/lib/content";

export function About() {
  const profile = getProfile();
  const experience = getExperience();
  const current = experience[0];
  const earliestYear = experience
    .map((e) => Number(e.start.slice(0, 4)))
    .sort((a, b) => a - b)[0];

  const facts: string[] = [];
  if (current) {
    facts.push(
      current.end === null
        ? `${current.role} na ${current.company}`
        : `Última posição: ${current.role} na ${current.company}`,
    );
  }
  if (earliestYear) facts.push(`No mercado desde ${earliestYear}`);
  facts.push("Foco em PHP/Laravel, Livewire e APIs REST");
  facts.push("TDD com PHPUnit · Docker · Azure DevOps");

  return (
    <Section
      id="sobre"
      label="sobre"
      title="Quem sou"
      className="relative overflow-hidden"
    >
      <Orbit />
      <div className="relative grid gap-10 md:grid-cols-[1.4fr_1fr]">
        <div className="space-y-4 text-text-dim">
          {profile.bio.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
        <ul className="space-y-3 border-l border-border pl-5">
          {facts.map((f) => (
            <li key={f} className="text-sm">
              <span className="mr-2 font-mono text-accent" aria-hidden="true">
                ›
              </span>
              {f}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

/** Órbita decorativa em prata — substitui a antiga esfera de partículas. */
function Orbit() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 400 400"
      className="pointer-events-none absolute -right-24 -top-16 h-[26rem] w-[26rem] opacity-[0.28] md:-right-10"
    >
      <defs>
        <radialGradient id="orbit-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="55%" stopColor="#c9ccd3" />
          <stop offset="100%" stopColor="#5a5c62" />
        </radialGradient>
      </defs>
      <g fill="none" stroke="#c9ccd3">
        <ellipse cx="200" cy="200" rx="170" ry="66" strokeOpacity="0.35" />
        <ellipse
          cx="200"
          cy="200"
          rx="120"
          ry="120"
          strokeOpacity="0.18"
          transform="rotate(-18 200 200)"
        />
        <ellipse cx="200" cy="200" rx="78" ry="150" strokeOpacity="0.12" />
      </g>
      <circle cx="200" cy="200" r="16" fill="url(#orbit-core)" />
      <circle cx="370" cy="200" r="3.5" fill="#ffffff" />
      <circle cx="200" cy="80" r="2.5" fill="#c9ccd3" />
      <circle cx="122" cy="200" r="2" fill="#c9ccd3" />
    </svg>
  );
}
