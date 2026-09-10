import { Section } from "@/components/ui/section";
import { getCertifications, getEducation } from "@/lib/content";

export function Education() {
  const education = getEducation();
  const certifications = getCertifications();

  return (
    <Section
      id="formacao"
      label="formacao"
      title="Formação & certificações"
    >
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <h3 className="mb-4 text-sm font-medium text-text-dim">Formação acadêmica</h3>
          <ul className="space-y-5">
            {education.map((item) => (
              <li key={`${item.institution}-${item.course}`}>
                <p className="font-mono text-xs text-text-dim">
                  {item.start} — {item.end}
                </p>
                <p className="mt-1 font-medium">{item.course}</p>
                <p className="text-text-dim">{item.institution}</p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-medium text-text-dim">Certificações</h3>
          <ul className="space-y-4">
            {certifications.map((cert) => (
              <li key={cert.name} className="flex gap-3">
                <span className="font-mono text-xs text-text-dim">{cert.year}</span>
                <span>
                  <span className="block text-sm">{cert.name}</span>
                  <span className="text-sm text-text-dim">{cert.issuer}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
