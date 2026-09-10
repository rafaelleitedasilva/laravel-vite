import type { SkillGroup } from "@/types";

/** Habilidades — currículo 2026, agrupadas por área. */
export const skills: SkillGroup[] = [
  {
    title: "Backend",
    items: ["PHP", "Laravel", "Lumen", "APIs REST", "TDD · PHPUnit"],
  },
  {
    title: "Frontend",
    items: ["Livewire", "Alpine.js", "JavaScript", "Ajax", "Sass", "Bootstrap", "Vite"],
  },
  {
    title: "Infra & ferramentas",
    items: ["Docker", "Azure DevOps", "CI/CD", "Git & GitHub", "Postman", "Linux"],
  },
];
