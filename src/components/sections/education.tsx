"use client";

import { Award, GraduationCap } from "lucide-react";
import { Section } from "@/components/ui/section";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { getCertifications, getEducation } from "@/lib/content";
import { stagger } from "@/lib/motion";

export function Education() {
  const education = getEducation();
  const certifications = getCertifications();

  return (
    <Section id="formacao" label="formacao" title="Formação & certificações">
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <h3 className="mb-4 text-sm font-medium text-text-dim">Formação acadêmica</h3>
          <StaggerGroup as="ul" gap={stagger.normal} className="space-y-1.5">
            {education.map((item) => (
              <StaggerItem
                key={`${item.institution}-${item.course}`}
                as="li"
                shape="up-sm"
                className="group -mx-3 flex gap-3 rounded-lg px-3 py-3 transition-transform duration-200 hover:-translate-y-0.5"
              >
                <GraduationCap
                  className="mt-0.5 size-4 shrink-0 text-text-dim transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-accent"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-mono text-xs text-text-dim">
                    {item.start} — {item.end}
                  </p>
                  <p className="mt-1 font-medium">{item.course}</p>
                  <p className="text-text-dim">{item.institution}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-medium text-text-dim">Certificações</h3>
          <StaggerGroup as="ul" gap={stagger.tight} className="space-y-1">
            {certifications.map((cert) => (
              <StaggerItem
                key={cert.name}
                as="li"
                shape="up-sm"
                className="group -mx-3 flex gap-3 rounded-lg px-3 py-2.5 transition-transform duration-200 hover:-translate-y-0.5"
              >
                <Award
                  className="mt-0.5 size-4 shrink-0 text-text-dim transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-accent"
                  aria-hidden="true"
                />
                <span>
                  <span className="block text-sm">{cert.name}</span>
                  <span className="text-sm text-text-dim">
                    {cert.issuer} · {cert.year}
                  </span>
                </span>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </Section>
  );
}
