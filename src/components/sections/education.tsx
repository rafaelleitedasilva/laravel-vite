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
      <div>
        <h3 className="mb-4 text-sm font-medium text-text-dim">Formação acadêmica</h3>
        <StaggerGroup as="div" gap={stagger.normal} className="grid gap-4 sm:grid-cols-2">
          {education.map((item) => (
            <StaggerItem
              key={`${item.institution}-${item.course}`}
              as="div"
              shape="up-sm"
              className="group rounded-lg border border-border p-4 transition-colors duration-200 hover:border-border-strong"
            >
              <GraduationCap
                className="size-4 text-text-dim transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-accent"
                aria-hidden="true"
              />
              <p className="mt-3 font-mono text-xs text-text-dim">
                {item.start} — {item.end}
              </p>
              <p className="mt-1 font-medium">{item.course}</p>
              <p className="text-text-dim">{item.institution}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>

      <div className="mt-10 border-t border-border pt-10">
        <h3 className="mb-4 text-sm font-medium text-text-dim">Certificações</h3>
        <StaggerGroup
          as="div"
          gap={stagger.tight}
          className="grid gap-x-6 gap-y-1 sm:grid-cols-2 lg:grid-cols-3"
        >
          {certifications.map((cert) => (
            <StaggerItem
              key={cert.name}
              as="div"
              shape="up-sm"
              className="group flex gap-2.5 rounded-lg py-2 transition-transform duration-200 hover:-translate-y-0.5"
            >
              <Award
                className="mt-0.5 size-3.5 shrink-0 text-text-dim transition-colors duration-200 group-hover:text-accent"
                aria-hidden="true"
              />
              <span>
                <span className="block text-sm leading-tight">{cert.name}</span>
                <span className="text-xs text-text-dim">
                  {cert.issuer} · {cert.year}
                </span>
              </span>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </Section>
  );
}
