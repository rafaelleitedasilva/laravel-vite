import type { Profile } from "@/types";

/**
 * Fonte de verdade do perfil. Editar aqui e abrir PR — o deploy é automático (Vercel).
 * Baseado no currículo (2026).
 */
export const profile: Profile = {
  name: "Rafael Leite da Silva",
  title: "Desenvolvedor Fullstack · Tech Lead",
  bio: [
    "Desenvolvedor Fullstack com 4 anos de experiência no desenvolvimento de aplicações web e APIs, com foco em qualidade, escalabilidade e manutenibilidade. Especialização forte em PHP — Laravel e Lumen no backend — e construção de interfaces dinâmicas com Livewire, Alpine.js, Vite e Sass no frontend.",
    "Experiência prática em infraestrutura e entrega contínua com Docker e Azure DevOps: provisionamento de ambientes e automação de deploy por pipelines. Adoção contínua de TDD com PHPUnit no ecossistema Laravel, reduzindo retrabalho e aumentando a confiabilidade.",
    "Atuação em liderança técnica — decisões arquiteturais, condução de code reviews, mentoria de desenvolvedores e alinhamento entre demandas de negócio e soluções técnicas — em ambientes ágeis com gestão de fluxo por boards.",
  ],
  email: "rafael.leite.14@hotmail.com",
  phone: "(11) 99972-8065",
  location: "São Paulo, SP",
  socials: [
    { label: "GitHub", href: "https://github.com/rafaelleitedasilva" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/rafael-leite-da-silva-10654a222/",
    },
  ],
};
