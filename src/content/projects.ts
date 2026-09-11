import type { Project } from "@/types";

/**
 * Fonte de verdade dos projetos. Migrado de database/seeders/*ProjectsSeeder.php
 * (site Laravel) — substitui a tabela MySQL `projects` e o endpoint GET /api/projects.
 *
 * Sem capturas de tela: nem todo projeto está disponível online ou tem uma
 * imagem digna de mostrar, então nenhum card usa screenshot — a capa é
 * sempre um planeta (ver ProjectCard), pela identidade visual, não pela
 * falta de conteúdo.
 *
 * `body` traz a descrição existente. Campos aprofundados (problema, solução,
 * resultados) devem ser preenchidos com o dono — ver
 * PORTFOLIO_MODERNIZATION.md R-01 / DP-07 / TASK-M2.
 */
export const projects: Project[] = [
  {
    slug: "fornecedores-goodstorage",
    name: "Fornecedores GoodStorage",
    corp: "GoodStorage",
    type: "corp",
    role: "Desenvolvedor Fullstack · Tech Lead",
    shortDescription:
      "Portal de onboarding e integração de fornecedores da GoodStorage com o Oracle, construído do zero.",
    body: [
      "Sistema construído inteiramente por mim, do zero: onboarding de fornecedores e integração com o Oracle, unificando o cadastro e a gestão de fornecedores da GoodStorage numa única plataforma.",
      "Atuei como desenvolvedor Fullstack e Tech Lead, orientando desenvolvedores contratados ao longo do projeto, além de participar das decisões de design que definiram parte da identidade visual do sistema.",
    ],
    technologies: ["Laravel", "Oracle", "Docker", "Azure DevOps"],
    demo: "https://fornecedores.goodstorage.com.br/",
  },
  {
    slug: "meu-espaco-goodstorage",
    name: "Meu Espaço",
    corp: "GoodStorage",
    type: "corp",
    role: "Desenvolvedor Fullstack",
    shortDescription:
      "Hub de clientes da GoodStorage — integração dos métodos de pagamento de faturas avulsas.",
    body: [
      "Participei do Meu Espaço, hub de autoatendimento para clientes da GoodStorage, integrando os métodos de pagamento de faturas avulsas: o cliente consegue quitar faturas atrasadas ou em dia diretamente pelo sistema, via Pix ou cartão de crédito.",
    ],
    technologies: ["Laravel", "Pix", "Cartão de Crédito", "APIs REST"],
    demo: "https://meuespaco.goodstorage.com.br/",
  },
  {
    slug: "doutores-da-alegria",
    name: "Doutores da Alegria",
    corp: "Kasi",
    type: "corp",
    role: "Desenvolvedor Backend",
    shortDescription: "Integração com o backend da organização para captura de pagamentos.",
    body: [
      "Atuei na conexão com o backend da Doutores da Alegria, principalmente na captura de pagamentos.",
    ],
    technologies: ["Laravel", "APIs REST"],
  },
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
    repository: "https://github.com/rafaelleitedasilva/jotion",
    demo: "https://jotion-seven.vercel.app/",
  },
  {
    slug: "automacoes-n8n",
    name: "Automações com n8n",
    corp: null,
    type: "personal",
    role: "Desenvolvedor de Automações",
    shortDescription:
      "Integrações com n8n: e-mail, gateways de pagamento e operações diretas em SQL Server.",
    body: [
      "Diversas automações e integrações construídas com n8n ao longo da minha trajetória — desde envio de e-mail e integração de gateways de pagamento (Cielo e Braspag) até operações que envolviam apenas consultas e comandos diretos no SQL Server.",
    ],
    technologies: ["n8n", "Cielo", "Braspag", "SQL Server", "APIs REST"],
  },
  {
    slug: "conecta-saber",
    name: "Conecta Saber",
    corp: null,
    type: "personal",
    role: "Autor",
    shortDescription: "Aplicação web em PHP, com frontend e backend containerizados via Docker.",
    body: [
      "Projeto pessoal em desenvolvimento, com frontend e backend separados e containerizados com Docker.",
    ],
    technologies: ["PHP", "Docker"],
    repository: "https://github.com/rafaelleitedasilva/conecta_saber",
  },
];
