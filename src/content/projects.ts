import type { Project } from "@/types";

/**
 * Fonte de verdade dos projetos. Migrado de database/seeders/*ProjectsSeeder.php
 * (site Laravel) — substitui a tabela MySQL `projects` e o endpoint GET /api/projects.
 *
 * `body` traz a descrição existente. Campos aprofundados (problema, solução,
 * resultados, galeria) devem ser preenchidos com o dono — ver
 * PORTFOLIO_MODERNIZATION.md R-01 / DP-07 / TASK-M2.
 */
export const projects: Project[] = [
  {
    slug: "fluit",
    name: "Fluit",
    corp: "Kasi",
    type: "corp",
    role: "Desenvolvedor Fullstack",
    shortDescription:
      "Plataforma de dashboards com schedules, jobs e dezenas de widgets sobre um banco de mais de 2 GB.",
    body: [
      "Um projeto verdadeiramente desafiador desde a sua concepção até o seu desenvolvimento. Foi realizando a Fluit que pude testar todas as minhas habilidades como programador, indo desde soft skills para traduzir em código os pedidos do cliente até a tecnicidade complexa de se desenvolver um sistema com schedules, jobs e inúmeros widgets que utilizam um banco com mais de 2 GB de dados.",
    ],
    technologies: [
      "Laravel",
      "Lumen",
      "ApexCharts",
      "Docker",
      "MySQL",
      "GitHub",
      "Bootstrap",
    ],
    cover: "/images/fluit.jpeg",
    coverAlt: "Interface do sistema Fluit",
  },
  {
    slug: "sestagio",
    name: "Sestágio",
    corp: "Senai",
    type: "corp",
    role: "Desenvolvedor Fullstack",
    shortDescription:
      "Plataforma que conecta empresas e estudantes para vagas de estágio, com cadastro de vagas e currículos.",
    body: [
      "O Sestágio oferece às empresas uma plataforma centralizada e intuitiva para cadastrar vagas de estágio, proporcionando uma experiência simplificada e eficiente. As organizações podem detalhar os requisitos específicos, as responsabilidades do estagiário e outros critérios relevantes, garantindo uma correspondência mais precisa com os perfis ideais.",
      "Os alunos, por sua vez, encontram no Sestágio uma ferramenta robusta para explorar oportunidades de estágio alinhadas aos seus interesses e habilidades, podendo cadastrar seus currículos de forma fácil e rápida, tornando o processo de candidatura mais eficiente.",
    ],
    technologies: ["Laravel", "Vercel", "Docker", "PlanetScale", "GitHub", "Bootstrap"],
    cover: "/images/sestagio.jpeg",
    coverAlt: "Interface da plataforma Sestágio",
  },
  {
    slug: "intranet-senai",
    name: "Intranet",
    corp: "Senai",
    type: "corp",
    role: "Desenvolvedor Frontend",
    shortDescription:
      "Portal de comunicação interna do SENAI: anúncios, comunicados e notícias institucionais num só lugar.",
    body: [
      "O SENAI Intranet centraliza a comunicação interna, fornecendo uma plataforma unificada para anúncios, comunicados, notícias institucionais e atualizações importantes. Isso reduz a dispersão de informações e mantém todos os colaboradores informados de maneira consistente.",
    ],
    technologies: ["HTML", "CSS", "JavaScript", "GitHub", "Bootstrap"],
    cover: "/images/senai-intranet.png",
    coverAlt: "Tela inicial da intranet do SENAI",
  },
  {
    slug: "alumbra",
    name: "Alumbra",
    corp: "Alumbra",
    type: "corp",
    role: "Analista de Sistemas",
    shortDescription:
      "Site institucional responsivo com galeria de projetos que mostram os produtos Alumbra transformando espaços.",
    body: [
      "O código por trás do website Alumbra abraça a filosofia do design responsivo, garantindo que a experiência do usuário seja fluida e agradável em uma variedade de dispositivos. A galeria inspiradora do site destaca projetos que demonstram como os produtos Alumbra têm o poder de transformar espaços residenciais, comerciais e industriais.",
    ],
    technologies: ["Laravel", "Bootstrap", "SQL Server"],
    cover: "/images/alumbra.jpeg",
    coverAlt: "Website institucional da Alumbra",
    demo: "https://www.alumbra.com.br/web/index",
  },
  {
    slug: "blogtext",
    name: "BlogText",
    corp: null,
    type: "personal",
    role: "Autor",
    shortDescription:
      "Projeto de publicação de textos autorais que funde elegância e personalização, feito com Laravel e SCSS.",
    body: [
      "Adentre o BlogText, um projeto de publicação de textos autorais que funde elegância e personalização, tecido com Laravel e a estilização refinada do SCSS. Proporcionamos um ambiente único para a expressão literária.",
    ],
    technologies: ["Laravel", "SCSS", "PlanetScale", "Docker", "GitHub", "Livewire"],
    cover: "/images/blogtext.jpeg",
    coverAlt: "Interface do BlogText",
    repository: "https://github.com/rafaelleitedasilva/blogtext",
    demo: "https://blogtext.vercel.app/",
  },
  {
    slug: "jotion",
    name: "Jotion",
    corp: null,
    type: "personal",
    role: "Autor",
    shortDescription:
      "Clone do Notion unindo TypeScript e React para organização e colaboração flexíveis.",
    body: [
      "Um projeto ambicioso que une TypeScript e React para proporcionar uma experiência de organização e colaboração tão flexível quanto a sua criatividade. Este clone do Notion é uma jornada pelo poder da programação e do design, onde a versatilidade do TypeScript e a agilidade do React se unem para criar uma plataforma de produtividade única.",
    ],
    technologies: ["React", "TypeScript", "Convex", "Docker", "GitHub", "Clerk"],
    cover: "/images/jotion.png",
    coverAlt: "Interface do Jotion",
    repository: "https://github.com/rafaelleitedasilva/jotion",
    demo: "https://jotion-seven.vercel.app/",
  },
];
