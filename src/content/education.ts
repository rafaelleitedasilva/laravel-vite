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

/**
 * Certificações — mais recente primeiro. Curadas a partir de
 * github.com/rafaelleitedasilva/Certificados: só as de tecnologia (fora
 * idiomas, segurança do trabalho, economia circular etc.).
 *
 * Emissor/ano de "MySQL (40h)" ficou de fora por enquanto — o arquivo do
 * repositório não deixa claro quem emitiu; confirmar antes de incluir.
 */
export const certifications: Certification[] = [
  {
    name: "DP-900 — Microsoft Azure Data Fundamentals",
    issuer: "Green Treinamentos",
    year: "2026",
  },
  {
    name: "AWS Cloud Practitioner Foundational",
    issuer: "Green Treinamentos",
    year: "2026",
  },
  {
    name: "Google Cloud Foundations",
    issuer: "Green Treinamentos",
    year: "2026",
  },
  {
    name: "Google Cloud AI Foundations",
    issuer: "Green Treinamentos",
    year: "2026",
  },
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
    name: "Segurança da Informação",
    issuer: "SENAI",
    year: "2023",
  },
  {
    name: "HTML & CSS",
    issuer: "SENAI",
    year: "2022",
  },
  {
    name: "JavaScript (40h)",
    issuer: "SENAI",
    year: "2022",
  },
  {
    name: "Hardware (20h)",
    issuer: "SENAI",
    year: "2022",
  },
  {
    name: "AWS Academy Cloud Foundations",
    issuer: "AWS Academy",
    year: "2022",
  },
];
