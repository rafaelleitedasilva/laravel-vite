export type ProjectType = "corp" | "personal";

export interface Project {
  /** URL slug, e.g. "fluit" -> /projetos/fluit */
  slug: string;
  /** Display name */
  name: string;
  /** Company the work was done for (null for personal projects) */
  corp: string | null;
  type: ProjectType;
  /** One-line summary for cards and metadata */
  shortDescription: string;
  /** Full prose, one entry per paragraph */
  body: string[];
  technologies: string[];
  /** Path under /public, e.g. "/images/fluit.jpeg". Omit to render the starfield placeholder. */
  cover?: string;
  /** Alt text for the cover image */
  coverAlt: string;
  year?: string;
  role?: string;
  repository?: string;
  demo?: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  /** ISO date (YYYY-MM-DD) */
  start: string;
  /** ISO date, or null when current */
  end: string | null;
  location: string;
  highlights: string[];
}

export interface SkillGroup {
  /** e.g. "Backend" */
  title: string;
  items: string[];
}

export interface EducationItem {
  institution: string;
  course: string;
  /** Year the course started, e.g. "2023" */
  start: string;
  /** Year it ended (or expected end) */
  end: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface Profile {
  name: string;
  title: string;
  bio: string[];
  /** Publicly displayed contact address */
  email: string;
  /** Phone number in display form, e.g. "(11) 99999-9999" */
  phone?: string;
  /** City / region */
  location?: string;
  socials: SocialLink[];
}
