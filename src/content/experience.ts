import type { ExperienceItem } from "@/types";

/**
 * Trajetória profissional — currículo 2026. Datas convertidas para ISO
 * (dia 01 como marcador; só mês/ano são exibidos).
 */
export const experience: ExperienceItem[] = [
  {
    company: "GoodStorage",
    role: "Desenvolvedor Fullstack Pleno · Tech Lead",
    start: "2024-03-01",
    end: null,
    location: "São Paulo, SP",
    highlights: [
      "Liderança técnica na evolução de sistemas corporativos Laravel/Lumen, influenciando decisões arquiteturais e a padronização de código.",
      "Condução de code reviews e mentoria de desenvolvedores, elevando a qualidade e reduzindo retrabalho nas entregas.",
      "Melhorias estruturais em aplicações existentes, aumentando a manutenibilidade e a velocidade de evolução.",
      "Alinhamento direto entre negócio e tecnologia, traduzindo requisitos complexos em soluções técnicas viáveis.",
    ],
  },
  {
    company: "Kasi Consultoria em TI",
    role: "Desenvolvedor Fullstack (ênfase em Backend)",
    start: "2023-06-01",
    end: "2024-03-01",
    location: "São Paulo, SP",
    highlights: [
      "Desenvolvimento de múltiplos sistemas web em Laravel, incluindo dashboards de monitoramento de sensores e soluções financeiras CNAB.",
      "Integração com gateways de pagamento, GPS e APIs de mensageria, ampliando automação e conectividade entre plataformas.",
      "Refatoração de aplicações legadas com design patterns, melhorando organização, legibilidade e manutenção.",
      "Entrega simultânea de demandas de backend e frontend em projetos de escopos e complexidades variados.",
    ],
  },
  {
    company: "SENAI — Freelancer",
    role: "Desenvolvedor Fullstack",
    start: "2023-05-01",
    end: "2023-06-01",
    location: "Diadema, SP",
    highlights: [
      "Plataforma de estágios com fluxo completo para alunos e empresas, incluindo autenticação e gestão de vagas.",
      "Estruturação do backend e da interface web garantindo autonomia operacional da instituição no processo de estágios.",
    ],
  },
  {
    company: "SENAI — Freelancer",
    role: "Desenvolvedor Frontend",
    start: "2022-08-01",
    end: "2023-03-01",
    location: "Diadema, SP",
    highlights: [
      "Intranet institucional do SENAI Diadema: interface centralizada para comunicação interna e recursos organizacionais.",
    ],
  },
  {
    company: "Alumbra Produtos Elétricos e Eletrônicos",
    role: "Jovem Aprendiz — Técnico de TI / Desenvolvedor Frontend",
    start: "2022-02-01",
    end: "2023-06-01",
    location: "São Bernardo do Campo, SP",
    highlights: [
      "Suporte de infraestrutura e participação em projetos internos de frontend, contribuindo para a digitalização de processos organizacionais.",
    ],
  },
];
