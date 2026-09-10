# Portfólio — Rafael Leite da Silva

Portfólio pessoal em **Next.js (App Router) + React + TypeScript + Tailwind CSS v4**,
com conteúdo estático tipado, uma única função serverless para o formulário de
contato e deploy na Vercel.

A arquitetura e o raciocínio da migração (a partir da versão anterior em Laravel)
estão em [`PORTFOLIO_MODERNIZATION.md`](./PORTFOLIO_MODERNIZATION.md).

## Requisitos

- **Node.js 20+** (`.nvmrc` = 20)
- npm 10+

## Rodando localmente

```bash
cp .env.example .env.local   # preencha os valores (ver abaixo)
npm install
npm run dev                  # http://localhost:3000
```

Sem `.env.local` o site sobe normalmente; apenas o envio real de e-mail e o
rate limit ficam inativos (o formulário responde `send_failed`).

## Scripts

| Script | Ação |
| --- | --- |
| `npm run dev` | servidor de desenvolvimento |
| `npm run build` / `npm start` | build de produção / servir |
| `npm run lint` | ESLint (0 warnings) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run test` | testes unitários (Vitest) |
| `npm run test:e2e` | testes E2E + a11y (Playwright) — exige `npm run build` antes |
| `npm run format` | Prettier |

## Variáveis de ambiente

Ver [`.env.example`](./.env.example). Resumo:

| Nome | Escopo | Obrigatória |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | público | sim (metadata/sitemap/OG) |
| `RESEND_API_KEY` | servidor | sim, para o formulário |
| `CONTACT_FROM_EMAIL` | servidor | sim (remetente verificado no Resend; use `onboarding@resend.dev` até verificar o domínio) |
| `CONTACT_TO_EMAIL` | servidor | sim (destino das mensagens) |
| `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` | servidor | opcional (sem eles o `/api/contact` **não** é rate-limited) |

Nenhuma variável sensível usa o prefixo `NEXT_PUBLIC_`.

## Editar conteúdo

Tudo em [`src/content/`](./src/content/):

- `profile.ts` — nome, título, bio, redes, e-mail/telefone/local exibidos
- `experience.ts` — trajetória profissional (empresa, cargo, datas, bullets de impacto)
- `education.ts` — formação acadêmica e certificações
- `skills.ts` — tecnologias por área
- `projects.ts` — projetos (slug, textos, tecnologias, imagem, links) — abrem em modal

Imagens em [`public/images/`](./public/images/).
Editar → abrir PR → a Vercel publica um Preview automático; merge em `main` publica em produção.

## Estrutura

```text
src/
├── app/              # rotas, layouts, metadata, sitemap/robots/OG, /api/contact
├── components/
│   ├── ui/           # primitivos (Button, Card, Badge, Field, Section…)
│   ├── layout/       # Header, Footer, navegação
│   ├── sections/     # Hero, About, Experience, Skills, Work, Contact
│   └── projects/     # ProjectCard, ProjectGrid, ProjectFilter
├── content/          # FONTE DE VERDADE do conteúdo (TS tipado)
├── lib/              # content, validação (Zod), e-mail (Resend), rate-limit, SEO
├── hooks/            # hooks de client
└── types/            # tipos compartilhados
tests/
├── unit/             # Vitest
└── e2e/              # Playwright + axe
```

## Deploy na Vercel

1. Importar o repositório na Vercel — o preset **Next.js** é detectado automaticamente.
2. Node 20.x nas Project Settings. Build/Install: padrão.
3. Cadastrar as variáveis de ambiente em *Production* e *Preview*.
4. Região da função: `gru1` (São Paulo) — opcional, em Project Settings › Functions.
5. Domínio `rafaelleitedasilva.dev.br` + `www` (redirect para o apex).

Cabeçalhos de segurança (CSP, HSTS, etc.) e o redirect `/home → /` estão em
[`next.config.ts`](./next.config.ts).

## Pendências conhecidas

- `public/images/senai-intranet.png` (~535 KB) e alguns `.jpeg` merecem recompressão;
  `next/image` já serve AVIF/WebP redimensionado em runtime.
- `experience[].highlights` está vazio — preencher com bullets de impacto.
- Provedor de e-mail (Resend), store de rate limit (Upstash), analytics
  (Vercel) e DNS são decisões a confirmar — ver `PORTFOLIO_MODERNIZATION.md`, Apêndice B.
