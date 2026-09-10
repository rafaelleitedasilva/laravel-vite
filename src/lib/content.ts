import { projects } from "@/content/projects";
import { experience } from "@/content/experience";
import { skills } from "@/content/skills";
import { profile } from "@/content/profile";
import { certifications, education } from "@/content/education";
import type { Project, ProjectType } from "@/types";

export function getProfile() {
  return profile;
}

export function getExperience() {
  return experience;
}

export function getSkills() {
  return skills;
}

export function getEducation() {
  return education;
}

export function getCertifications() {
  return certifications;
}

/** All projects. `corp` projects first, then `personal`, stable within group. */
export function getProjects(filter?: ProjectType): Project[] {
  const order: Record<ProjectType, number> = { corp: 0, personal: 1 };
  const list = [...projects].sort((a, b) => order[a.type] - order[b.type]);
  return filter ? list.filter((p) => p.type === filter) : list;
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
