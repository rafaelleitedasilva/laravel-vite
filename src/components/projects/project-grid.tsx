"use client";

import type { Project } from "@/types";
import { ProjectCard } from "@/components/projects/project-card";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";

export function ProjectGrid({
  projects,
  onSelect,
}: {
  projects: Project[];
  onSelect: (project: Project, trigger: HTMLElement) => void;
}) {
  if (projects.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-text-dim">
        Nenhum projeto nesta categoria.
      </p>
    );
  }

  return (
    <StaggerGroup as="ul" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <StaggerItem key={project.slug} as="li" className="flex">
          <ProjectCard project={project} onSelect={onSelect} />
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
