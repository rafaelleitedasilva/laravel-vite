import type { Certification, EducationItem } from "@/types";

/** Formação acadêmica — currículo 2026. Mais recente primeiro. */
export const education: EducationItem[] = [
  {
    institution: "UNINTER",
    course: "Tecnólogo em Análise e Desenvolvimento de Sistemas",
    start: "2023",
    end: "2025",
  },
  {
    institution: "SENAI",
    course: "Técnico em Análise e Desenvolvimento de Sistemas",
    start: "2022",
    end: "2023",
  },
];

/** Certificações — mais recente primeiro. */
export const certifications: Certification[] = [
  {
    name: "AZ-400 — Designing and Implementing Microsoft DevOps Solutions",
    issuer: "Microsoft",
    year: "2025",
  },
  {
    name: "AZ-204 — Developing Solutions for Microsoft Azure",
    issuer: "Microsoft",
    year: "2025",
  },
  {
    name: "Relational Database V8",
    issuer: "freeCodeCamp",
    year: "2024",
  },
  {
    name: "AWS Academy Cloud Foundations",
    issuer: "AWS Academy",
    year: "2022",
  },
];
