# PORTFOLIO_MODERNIZATION.md

> Documento de arquitetura e plano de migração do portfólio pessoal de **Rafael Leite da Silva**
> (`rafaelleitedasilva.dev.br`).
> Repositório analisado: `laravel-vite` — branch `main`.
> Data da análise: 2026-09-10.
> Autor da análise: revisão arquitetural assistida.

**Convenção usada neste documento:**

| Marcador | Significado |
| --- | --- |
| `REQUISITO` | Algo explicitamente presente no código ou explicitamente necessário. |
| `RECOMENDAÇÃO` | Decisão técnica sugerida, com justificativa. Pode ser recusada. |
| `DECISÃO PENDENTE` | Precisa de uma definição do dono do projeto antes de implementar. |
| `Não identificado no projeto analisado.` | O prompt sugeria a existência, mas não há evidência no código. |

---

## 1. Executive Summary

### Situação atual

O repositório é um **projeto Laravel 10** que serve **uma única página** (SPA em **Vue 3**) montada dentro de um `<div id="app">` vazio via Blade. Sobre esse esqueleto Laravel foram acumuladas três gerações de tecnologia que não conversam entre si:

1. Um **template HTML/jQuery comprado** (~25 plugins jQuery em `resources/js/`, folha SCSS de **5.444 linhas** em `resources/scss/style.scss`) — praticamente todo morto: nenhum desses plugins é importado por `resources/js/app.js`.
2. Uma **SPA Vue 3** funcional (`resources/js/App.vue`, ~400 linhas) que é o site que efetivamente roda hoje.
3. Um **scaffold Vite+Vue autônomo e abandonado** em `frontend/` que aponta para `http://localhost:8000/api/projects` com campos (`title`) que nem existem na API real.

O backend real se resume a **dois endpoints**:

- `GET /api/projects` — lê a tabela `projects` (8 registros, todos definidos em *seeders*, no código) e devolve JSON.
- `POST /email` — valida um formulário de contato e dispara um e-mail via SMTP para `rafael.leite.14@hotmail.com`.

Há **duas estratégias de deploy conflitantes** versionadas ao mesmo tempo: **Azure** (2 workflows do GitHub Actions + `Dockerfile` PHP-Apache multi-stage) e **Vercel** (`vercel.json` usando `@vercel/php`, roteando **todo** o tráfego — inclusive a home — por uma *lambda* PHP).

### Proposta

Reconstruir o portfólio como uma aplicação **Next.js (App Router) + React + TypeScript + Tailwind CSS**, com:

- **Conteúdo como dados locais tipados** (TypeScript + MDX) — sem banco de dados, sem CMS, sem PHP.
- **Formulário de contato** via **uma única Vercel Function** (Route Handler) integrada a um serviço de e-mail transacional (Resend).
- **Deploy Git-based nativo na Vercel** (Preview + Production), com Static Generation por padrão.
- **Design system próprio** substituindo o template comprado e o Bootstrap.

O Laravel, o MySQL, o Sanctum, as sessões, o CSRF, a fila, o Redis, o broadcasting, os ~25 plugins jQuery, o SCSS de 5k linhas e os workflows Azure são **removidos integralmente**.

### Decisão

> **ADOTAR** — Rebuild completo (Estratégia C), Next.js + Vercel, conteúdo estático tipado.
> Ver justificativa detalhada nas seções [4](#4-target-architecture), [5](#5-technology-decisions) e [6](#6-migration-strategy).

### Ganho esperado (resumo)

| Dimensão | Hoje | Depois |
| --- | --- | --- |
| Runtime em produção | Lambda PHP para 100% das rotas | HTML estático em CDN; 1 function só para o form |
| SEO / SSR | SPA client-only, `<div id="app">` vazio no HTML | HTML renderizado no build, metadata por página, OG images |
| Superfície operacional | Laravel + MySQL + SMTP + (Azure ou Vercel-PHP) | Repo Git + Vercel + 1 provedor de e-mail |
| Dependências | ~30 pacotes PHP + Bootstrap + jQuery + 25 plugins | Next + React + Tailwind + 2–3 libs |
| Fonte de conteúdo | Seeders PHP → MySQL → API → fetch no browser | Arquivo `.ts` / `.mdx` no repo, lido no build |
| Custo | App Service Azure / função PHP | Plano Hobby/Pro da Vercel (estático é barato) |

---

## 2. Current Architecture

### 2.1 Stack identificada (`REQUISITO` — presente no código)

| Camada | Tecnologia | Evidência |
| --- | --- | --- |
| Framework backend | Laravel `^10.10` (PHP `^8.1`) | `composer.json` |
| Auth scaffolding | `laravel/sanctum ^3.2` (não usado por nenhuma rota de app) | `composer.json`, `routes/api.php` (`auth:sanctum` só no `/user` boilerplate) |
| REPL | `laravel/tinker` | `composer.json` |
| Build frontend | Vite `^4` + `laravel-vite-plugin ^0.8` + `@vitejs/plugin-vue ^4` | `package.json`, `vite.config.js` |
| UI | Vue `^3.4` (uma SPA de um componente) | `resources/js/App.vue`, `resources/js/app.js` |
| CSS | Bootstrap `^5.3.2` (importado global) + SCSS de template (`style.scss`, 5.444 linhas) + `resources/css/app.css` | `resources/js/app.js`, `vite.config.js` |
| HTTP client | `axios` | `resources/js/bootstrap.js`, `App.vue` |
| Banco (dev/docker) | MySQL 8.0 | `docker-compose.yml` |
| Banco (exemplo) | SQLite (`DB_DATABASE=personal_blog`) | `.env.example` |
| Banco (config órfã) | SQL Server (`sqlsrv`) — presente em `config/database.php`, sem uso | `config/database.php` |
| E-mail | SMTP via `Illuminate\Mail` (Mailable `App\Mail\portfolio`) | `app/Http/Controllers/HomeController.php`, `app/Mail/portfolio.php` |
| Testes | PHPUnit `^10.1` (5 arquivos, ver [2.7](#27-testes-existentes)) | `tests/` |
| Deploy A | Azure Web App (via zip) | `.github/workflows/main_vite-laravel.yml` |
| Deploy B | Azure Container Apps (via imagem Docker) | `.github/workflows/laravel-vite-AutoDeployTrigger-*.yml` |
| Deploy C | Vercel + `@vercel/php@0.6.1` | `vercel.json` |
| CI | GitHub Actions: PHPUnit em SQLite | `.github/workflows/laravel.yml` |

> **Livewire:** `Não identificado no projeto analisado.` Não há `livewire/livewire` em `composer.json`/`composer.lock`, não há `app/Livewire`, não há diretivas `@livewire`/`wire:` em Blade. A única ocorrência da string "Livewire" está em `database/seeders/PersonalProjectsSeeder.php` como *tag de tecnologia* de um projeto de terceiros ("BlogText"). **Toda a seção "LIVEWIRE" do briefing não se aplica a este repositório.**

### 2.2 Estrutura de diretórios (real, resumida)

```text
laravel-vite/
├── api/                         # entrypoints PHP para a Vercel (@vercel/php)
│   ├── index.php                # bootstrap do kernel Laravel
│   └── assets.php               # hack manual p/ servir css/js (referencia public/css e public/js que NÃO existem)
├── app/
│   ├── Http/Controllers/
│   │   ├── Controller.php
│   │   └── HomeController.php    # index() -> view('index'); email() -> valida + Mail::send
│   ├── Mail/portfolio.php        # Mailable markdown (emails.portfolio)
│   ├── Models/
│   │   ├── Projects.php          # $fillable: name, corp, description, technologies, images, github, link, type
│   │   └── User.php              # boilerplate, sem uso
│   ├── Http/Middleware/*         # 9 middlewares padrão do Laravel
│   └── Providers/*               # 5 providers padrão
├── bootstrap/
├── config/                      # 15 arquivos de config padrão (cache, queue, broadcasting, sanctum, session...)
├── database/
│   ├── migrations/
│   │   ├── 2014_..._create_users_table.php
│   │   ├── 2014_..._create_password_reset_tokens_table.php
│   │   ├── 2019_..._create_failed_jobs_table.php
│   │   ├── 2019_..._create_personal_access_tokens_table.php
│   │   ├── 2023_12_15_100723_create_projects_table.php
│   │   └── 2026_05_24_000001_update_projects_structure.php   (untracked)
│   └── seeders/
│       ├── DatabaseSeeder.php -> ProjectsSeeder
│       ├── ProjectsSeeder.php -> Corporate + Personal
│       ├── CorporateProjectsSeeder.php   (untracked) — 4 projetos: Fluit, Sestagio, Intranet, Alumbra
│       └── PersonalProjectsSeeder.php    (untracked) — 2 projetos: BlogText, Jotion
├── frontend/                    # (untracked) scaffold Vite+Vue autônomo, ABANDONADO
│   ├── src/App.vue              # espera campos {title, description} — não batem com a API
│   └── ...
├── public/
│   ├── index.php                # front controller Laravel padrão
│   ├── build/                   # saída do Vite (gitignored)
│   ├── robots.txt               # "Disallow:" (vazio = permite tudo)
│   └── web.config               # rewrite p/ IIS (Azure)
├── resources/
│   ├── css/app.css             # ~90 linhas de overrides (scrollbar, offcanvas, modal)
│   ├── scss/style.scss         # 5.444 linhas — template comprado
│   ├── js/
│   │   ├── app.js              # entrypoint real: importa bootstrap + Bootstrap CSS/JS + style.scss + monta Vue
│   │   ├── bootstrap.js        # axios + CSRF; Echo/Pusher comentados
│   │   ├── App.vue             # (untracked) A SPA REAL — header, hero, sobre, experiência, skills, projetos, contato, footer
│   │   ├── contact.js          # jQuery validate -> POST p/ "contact_process.php" (NÃO existe)
│   │   ├── mail-script.js      # jQuery ajax -> POST p/ "mail.php" (NÃO existe)
│   │   ├── animated.headline.js, main.js, plugins.js         # leftovers do template
│   │   ├── owl.carousel.min.js, slick.min.js, wow.min.js, waypoints.min.js,
│   │   │  jquery.magnific-popup.js, jquery.barfiller.js, jquery.countdown.min.js,
│   │   │  jquery.counterup.min.js, jquery.nice-select.min.js, jquery.slicknav.min.js,
│   │   │  jquery.paroller.min.js, jquery.sticky.js, jquery.validate.min.js,
│   │   │  jquery.ajaxchimp.min.js, jquery.form.js, gijgo.min.js (177 KB),
│   │   │  price-range.js (83 KB), popper.min.js, hover-direction-snake.min.js,
│   │   │  one-page-nav-min.js                                 # ~25 arquivos, NENHUM importado
│   │   └── vendor/jquery-1.12.4.min.js, modernizr-3.5.0.min.js
│   ├── fonts/                   # FontAwesome (brands/solid/regular), themify, flaticon, gijgo — .eot/.svg/.ttf/.woff/.woff2 (~2,2 MB)
│   ├── images/                  # 15 imagens de projetos + logos (jpeg/png/svg)
│   ├── documents/               # RafaelLeiteDaSilva.pdf (275 KB) + "(antigo)" (1,1 MB)
│   ├── favicon/                 # favicon completo (ico + png 16/32/192/512 + apple-touch)
│   └── views/
│       ├── index.blade.php      # @extends('layouts.master'); só <div id="app"></div>
│       ├── construction.blade.php  # página "em construção" (não roteada)
│       ├── layouts/master.blade.php # <head> + @vite(['resources/js/app.js'])
│       ├── layouts/header.blade.php # (não incluído por master)
│       ├── layouts/footer.blade.php # (não incluído por master) — 9 KB, versão Blade antiga da mesma UI
│       └── emails/portfolio.blade.php
├── routes/
│   ├── web.php                  # / -> HomeController@index ; POST /email ; /{route} -> redirect('home')
│   ├── api.php                  # GET /api/projects ; GET /user (auth:sanctum, boilerplate)
│   ├── channels.php, console.php # boilerplate
├── tests/                       # ver 2.7
├── personal_blog               # arquivo SQLite ÓRfão na raiz — schema ANTIGO (sem colunas technologies/images/github/link), 0 registros de projeto
├── vercel.json                 # runtime PHP + rotas
├── Dockerfile                  # PHP 8.3 Apache, multi-stage, p/ Azure Container Apps
├── docker-compose.yml          # frontend(nginx) + app(php-apache) + db(mysql)
├── startup.sh                  # script nginx/php-fpm p/ Azure App Service (referencia nginx.conf inexistente)
├── .htaccess / public/.htaccess # rewrite Apache
├── index.php                   # 2º front controller na raiz (duplicado de public/index.php)
└── .github/workflows/*         # 3 workflows (2 Azure deploy + 1 PHPUnit)
```

### 2.3 Frontend (real)

- **Entry:** `resources/js/app.js` importa `./bootstrap` (axios), `bootstrap/dist/css` + JS, `../scss/style.scss`, faz `import.meta.glob` de imagens/favicon e monta `createApp(App).mount('#app')`.
- **Componente único:** `resources/js/App.vue` (`<script setup>`). Seções, na ordem:
  1. **Header** fixo com menu âncora (Sobre, Experiência, Habilidades, Trabalhos, Contato) e botão "Contato".
  2. **Hero** (`#home`): nome "Rafael", subtítulo "Desenvolvedor Fullstack", links GitHub/LinkedIn.
  3. **Sobre** (`#sobre`): 2 parágrafos + GIF externo (`i.pinimg.com`) + 3 "stats" hardcoded no componente (`+5 anos`, `APIs`, `Web`).
  4. **Experiência** (`#experiencia`): 3 itens **hardcoded** no componente (GoodStorage, Kasi, Alumbra).
  5. **Tecnologias/Habilidades** (`#habilidades`): 3 grupos (Frontend/Backend/DevOps) com barras de progresso, **hardcoded** no componente.
  6. **Trabalhos** (`#trabalhos`): abas "Corporativo" / "Pessoal", lista `filteredProjects` vinda de `GET /api/projects` (filtra por `project.type === selectedTab`).
  7. **Contato** (`#contato`): `<form action="/email" method="POST">` com `_token` CSRF, campos `name`, `email`, `context`, `message`.
  8. **Footer**: copyright dinâmico com ano.
- **Estado:** `ref`/`computed` locais. Sem Pinia/Vuex. Sem router (navegação por `scrollIntoView`).
- **Estilo do componente:** classes Bootstrap 5 + algumas classes do template (`.slider-area`, `.section-tittle`, `.single-services`, `.hero__caption`) + `<style scoped>` mínimo.

### 2.4 Backend / fluxo de dados

```text
[Browser] --GET /--> Laravel web.php --> HomeController@index --> view('index')
                                                                  └─ master.blade.php + @vite(app.js)
[Browser] --(Vue onMounted)--> GET /api/projects --> Projects::orderBy('name')->get() --> MySQL `projects`
[Browser] --(submit form)--> POST /email --> HomeController@email:
                                             ├─ Validator (regras: name, email, message, context required)
                                             ├─ new App\Mail\portfolio(nome,email,mensagem,context)
                                             ├─ Mail::send(...) --> SMTP (config/mail.php, driver 'smtp')
                                             ├─ Session::flash('message', ...)
                                             └─ return redirect('/home')   <-- rota '/home' não existe;
                                                cai no catch-all /{route} -> redirect()->route('home') -> '/'
```

**Dados dos projetos** (fonte de verdade real = *seeders*, não o banco):

| # | name | corp | type | link | github |
| --- | --- | --- | --- | --- | --- |
| 1 | Fluit | Kasi | corp | — | — |
| 2 | Sestagio | Senai | corp | — | — |
| 3 | Intranet | Senai | corp | — | — |
| 4 | Alumbra | Alumbra | corp | `alumbra.com.br/web/index` | — |
| 5 | BlogText | — | personal | `blogtext.vercel.app` | `github.com/rafaelleitedasilva/blogtext` |
| 6 | Jotion | — | personal | `jotion-seven.vercel.app` | `github.com/rafaelleitedasilva/jotion` |

> Os seeders gravam `description` como string, `technologies`/`images` como JSON. O model `Projects` faz cast de `technologies` e `images` para `array`. Note a chave typo `tecnologies` (sem "h") nos arrays dos seeders, mapeada manualmente para a coluna `technologies` no `insert`.

### 2.5 Banco de dados

- **`projects`** — única tabela de negócio. Colunas (após `2026_05_24` migration): `id, name(unique), corp(nullable), description(text), technologies(json), images(json), github, link, type, timestamps`.
- **`users`, `password_reset_tokens`, `failed_jobs`, `personal_access_tokens`** — scaffolding Laravel, **sem uso** (não há login, admin, jobs ou tokens de API no app).
- **`personal_blog`** (arquivo SQLite na raiz) — **órfão e desatualizado**: schema antigo de `projects` (sem `technologies/images/github/link`), 0 registros de projeto. Deve ser apagado.
- `config/database.php` mantém bloco `sqlsrv` (SQL Server) sem nenhuma referência em env/código.

### 2.6 Autenticação / segurança (estado atual)

- **Sem autenticação de usuário final** e **sem área administrativa**. `auth:sanctum` só protege a rota boilerplate `GET /user`.
- CSRF ativo (`VerifyCsrfToken`), token injetado em `<meta name="csrf-token">` e no `<form>`.
- `config/cors.php`: `allowed_origins => ['http://localhost:8080']` (aponta para o container `frontend` do docker-compose; irrelevante em produção já que o front é servido pelo mesmo host).
- `resources/views/layouts/master.blade.php`: `<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">` — único header de segurança; **não há** CSP real, HSTS, X-Frame-Options, etc.
- `.env` está no repositório de trabalho (não commitado — está no `.gitignore`), com `APP_KEY`, credenciais de e-mail e de banco. **`DECISÃO PENDENTE`**: confirmar que `.env` nunca foi commitado no histórico e rotacionar `APP_KEY` / senha de e-mail se houver dúvida.
- **Bug de validação** em `HomeController@email`: a lógica está invertida — o ramo `if ($validator->fails())` **também envia o e-mail** (com dados possivelmente inválidos) em vez de retornar os erros. Um POST com `email` inválido ainda dispara `Mail::send`.
- **Sem rate limiting** no `POST /email` → endpoint aberto a abuso/spam.
- `GET /{route}` como catch-all que redireciona tudo para a home mascara 404s (ruim para SEO).

### 2.7 Testes existentes

| Arquivo | O que faz | Observação |
| --- | --- | --- |
| `tests/Unit/ExampleTest.php` | `assertTrue(true)` | placeholder |
| `tests/Feature/ExampleTest.php` | `GET /` → espera `302` | frágil; hoje `/` retorna `200` (view), então **provavelmente quebrado** |
| `tests/Feature/EmailTest.php` | `Mail::fake()` + `Mail::send(new portfolio(...))` + assert | testa a Mailable, não o endpoint; namespace errado (`Tests\Unit`) |
| `tests/Feature/GithubTest.php` | chama a **API pública do GitHub** e espera `200` | teste de rede — **flaky**, falha offline / sob rate limit |
| CI (`laravel.yml`) | roda `composer update` + `phpunit` em SQLite | `composer update` no CI é não-determinístico; workflow sem `name`/trigger de PR explícito além do default |

### 2.8 CI/CD e deploy (estado atual)

- **`main_vite-laravel.yml`**: build PHP + `npm build` → zipa o projeto inteiro (`-x node_modules tests`) → `azure/webapps-deploy` para o App Service `vite-laravel`.
- **`laravel-vite-AutoDeployTrigger-*.yml`**: `azure/container-apps-deploy-action` → build da imagem Docker → Azure Container Apps `laravel-vite` (com placeholders `_dockerfilePathKey_` não preenchidos → provavelmente **não funcional**).
- **`vercel.json`**: define `api/index.php` como function `@vercel/php@0.6.1` (1024 MB, 60 s) e roteia `/(.*)` → `api/index.php`. Assets via rotas `/build/*`, `/resources/*`, `/favicon/*` → `public/*`.
- **Três alvos de deploy versionados simultaneamente**, sem documentação de qual é o de produção. O domínio `rafaelleitedasilva.dev.br` aparece no `App.vue` mas o registrador/DNS/ambiente ativo **não está documentado** — `DECISÃO PENDENTE`.

---

## 3. Problems Identified

### 3.1 Arquitetura e manutenção

| # | Problema | Impacto |
| --- | --- | --- |
| P-01 | **Três stacks sobrepostas** (Laravel/Blade, template jQuery, SPA Vue) + scaffold `frontend/` abandonado. | Ninguém sabe o que é "vivo". Qualquer mudança exige arqueologia. |
| P-02 | **~25 plugins jQuery + `style.scss` de 5.444 linhas não utilizados.** `gijgo.min.js` (177 KB), `price-range.js` (83 KB), fontes (~2,2 MB) versionados sem uso. | Peso morto no repo; risco de alguém reativar; confusão. |
| P-03 | **Backend de framework completo para 2 endpoints.** Sanctum, sessions, CSRF, queue, broadcasting, Redis, 4 tabelas de scaffolding — tudo ligado, nada usado. | Superfície de segurança e de manutenção enorme para o valor entregue. |
| P-04 | **Dados de conteúdo presos num pipeline seeder→MySQL→API→fetch.** Editar um projeto exige migration/seed/deploy de backend + banco disponível em runtime. | Fricção alta para a tarefa mais comum (atualizar projeto/experiência). |
| P-05 | **Conteúdo duplicado e divergente:** experiência e skills hardcoded no `App.vue`; projetos no banco; versão Blade antiga da UI em `footer.blade.php`; `frontend/App.vue` com contrato de dados diferente. | Fontes de verdade múltiplas. |
| P-06 | **Três alvos de deploy conflitantes** (Azure App Service, Azure Container Apps, Vercel-PHP) sem dono claro. | Deploys imprevisíveis; `vercel.json` roteia até HTML estático por lambda PHP. |
| P-07 | `index.php` duplicado na raiz e em `public/`; `api/assets.php` referencia `public/css`/`public/js` que não existem; `startup.sh` referencia `nginx.conf` inexistente. | Restos de tentativas de deploy que induzem a erro. |
| P-08 | `personal_blog` SQLite órfão com schema desatualizado versionado na raiz. | Confunde sobre qual é o banco real. |

### 3.2 Produto / UX / SEO

| # | Problema | Impacto |
| --- | --- | --- |
| P-09 | **SPA client-only montada em `<div id="app">` vazio.** O HTML servido não tem conteúdo. | LCP ruim, indexação pobre, preview de link (OG) vazio, sem JS = página em branco. |
| P-10 | **`<head>` mínimo:** só `<title>Rafael L. Silva</title>`. Sem `description`, `canonical`, Open Graph, Twitter Card, `lang` fixo, structured data. | Compartilhamento em redes/WhatsApp sem card; ranking prejudicado. |
| P-11 | **Projetos não têm página própria** (`/projetos/[slug]`). Tudo é âncora numa página só. | Impossível linkar/compartilhar um projeto; sem SEO por projeto. |
| P-12 | **Catch-all redireciona qualquer URL para a home** (200 em vez de 404). | URLs quebradas "somem"; ruim para SEO e para o usuário. |
| P-13 | **Dependências externas em runtime na home:** GIFs de `i.pinimg.com` / `tumblr` (Sobre), fontes do Google/Bunny. | CLS, dependência de terceiros, LCP variável, privacidade. |
| P-14 | **Bootstrap 5 (CSS+JS) + SCSS de template** carregados para uma UI que usa uma fração das classes. | ~200+ KB de CSS/JS desnecessário; identidade visual genérica. |
| P-15 | **Acessibilidade não tratada:** barras de progresso decorativas sem semântica clara, `alt` genérico, sem skip-link, foco não estilizado, sem `prefers-reduced-motion`, menu mobile é um `<div class="mobile_menu">` vazio (dependia de plugin jQuery removido → **menu mobile provavelmente não funciona**). |
| P-16 | **Sem feedback de envio do formulário** no SPA. O `<form>` faz POST tradicional → recarrega/redireciona para `/` e a mensagem `Session::flash` **nunca é exibida** (o SPA não lê flash). |
| P-17 | Textos de skills com nível arbitrário em % ("Plateform 65%", "Bootstrap 92%") — pouco profissional, difícil de manter. |

### 3.3 Segurança

| # | Problema | Impacto |
| --- | --- | --- |
| P-18 | **Lógica de validação invertida** no `/email`: e-mail é enviado mesmo quando a validação falha. |
| P-19 | **Sem rate limiting / anti-spam** no `/email`. Endpoint público → spam/abuso, custo de e-mail, blacklist de domínio. |
| P-20 | **Sem headers de segurança** (CSP real, HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy). |
| P-21 | Segredos (`APP_KEY`, SMTP, DB) num `.env` local. `DECISÃO PENDENTE`: auditar histórico Git; se algum `.env` foi commitado, **rotacionar tudo**. |
| P-22 | `@vercel/php@0.6.1` — runtime PHP community na Vercel, defasado e com cold start alto; expõe um framework inteiro por HTTP para servir conteúdo estático. |

### 3.4 Performance

| # | Problema | Impacto |
| --- | --- | --- |
| P-23 | **Nada é pré-renderizado.** TTFB depende de lambda PHP; conteúdo depende de 1 request extra (`/api/projects`) após hydration. |
| P-24 | Imagens servidas sem otimização/responsive (`resources/images/*.jpeg` de 100–535 KB, `senai-intranet.png` = 535 KB). Sem `next/image` ou equivalente. |
| P-25 | Fontes locais em 5 formatos (`.eot/.svg/.ttf/.woff/.woff2`) versionadas; FontAwesome inteiro. |
| P-26 | Bundle Vue + Bootstrap JS + axios entregue para uma página estática. |

---

## 4. Target Architecture

### Arquitetura proposta

```text
                         ┌──────────────────────────────────────────────┐
                         │                  Vercel                      │
   Git push  ─────────▶  │  Build (next build)                          │
   (GitHub)              │   ├─ SSG: /  /projetos  /projetos/[slug]     │
                         │   │        sitemap.xml  robots.txt  /og/*    │
                         │   ├─ Static assets → Edge CDN                │
                         │   └─ 1 Function: POST /api/contact (Node)    │
                         └───────────────┬──────────────────────────────┘
                                         │
                        POST /api/contact│ (rate-limited, validado com Zod)
                                         ▼
                              ┌─────────────────────┐
                              │ Resend (e-mail API) │  → rafael.leite.14@hotmail.com
                              └─────────────────────┘

   Conteúdo (projetos, experiência, skills, textos):
     src/content/*.ts  +  src/content/projetos/*.mdx   ── lido em BUILD TIME ──▶  SSG
     (sem banco, sem CMS, sem runtime)
```

### 4.1 Stack

| Camada | Escolha | `REQUISITO`/`RECOMENDAÇÃO` |
| --- | --- | --- |
| Framework | **Next.js 15+ (App Router)** | `RECOMENDAÇÃO` (ver [5.1](#51-nextreact-vs-nuxtvue--decisão-pendente)) |
| UI lib | **React 19** + TypeScript `strict` | `RECOMENDAÇÃO` |
| Estilo | **Tailwind CSS v4** + design tokens CSS (ver [§7](#7-uxui-improvements)) | `RECOMENDAÇÃO` |
| Componentes | Biblioteca própria em `src/components/ui` (Button, Card, Badge, Section, Container, Field…) — headless quando precisar de a11y (menu mobile, dialog) via Radix Primitives ou `@headlessui/react` | `RECOMENDAÇÃO` |
| Conteúdo | Arquivos `.ts` tipados + `.mdx` para descrições longas de projeto (`next-mdx-remote` ou `@next/mdx`) | `RECOMENDAÇÃO` |
| Imagens | `next/image` + arquivos em `/public` (originais versionados em `src/content/assets` ou direto em `public/images`) | `RECOMENDAÇÃO` |
| Fontes | `next/font` (self-host automático, sem layout shift). Sugestão: uma sans geométrica (ex. Geist/Inter) + uma mono (ex. Geist Mono/JetBrains Mono) para dar o tom "engenharia" | `RECOMENDAÇÃO` |
| Ícones | `lucide-react` (tree-shakeable) no lugar de FontAwesome inteiro | `RECOMENDAÇÃO` |
| Form contato | React Server Action **ou** Route Handler `app/api/contact/route.ts` (Node runtime) | `RECOMENDAÇÃO` |
| Validação | **Zod** (client + server, mesmo schema) | `RECOMENDAÇÃO` |
| E-mail | **Resend** (`resend` SDK) + template React Email | `DECISÃO PENDENTE` (ver [5.3](#53-provedor-de-e-mail--decisão-pendente)) |
| Anti-spam | Honeypot + time-trap + rate limit (Upstash Redis REST **ou** `@vercel/kv`/`@vercel/firewall` rate limit) | `RECOMENDAÇÃO` |
| Analytics | **Vercel Web Analytics** + **Speed Insights** | `DECISÃO PENDENTE` (ver [5.4](#54-analytics--decisão-pendente)) |
| Erros | Vercel runtime logs (suficiente na escala atual); Sentry opcional | `RECOMENDAÇÃO` |
| Lint/format | ESLint (`eslint-config-next` + `@typescript-eslint` + `jsx-a11y`) + Prettier + `prettier-plugin-tailwindcss` | `RECOMENDAÇÃO` |
| Testes | Vitest (unit) + Playwright (E2E: home + envio de form mockado) + `axe` no Playwright (a11y) | `RECOMENDAÇÃO` |
| Deploy | **Vercel** Git integration (Preview + Production) | `RECOMENDAÇÃO` |
| Node | `>= 20` (`.nvmrc` + `engines` no `package.json`) | `RECOMENDAÇÃO` |

### 4.2 O que deixa de existir

Laravel, Composer, PHP, `api/*.php`, `index.php`, `public/index.php`, MySQL, SQLite (`personal_blog`), SQL Server config, Sanctum, sessions, CSRF server-side, `config/*` (15 arquivos), `bootstrap/`, `app/`, `routes/*.php`, migrations, seeders, `resources/scss/style.scss`, `resources/css/app.css`, **todos** os `resources/js/*.js` de plugin jQuery, `resources/js/vendor/*`, Bootstrap, `resources/fonts/*` (substituídas por `next/font`), `frontend/`, `Dockerfile`, `docker-compose.yml`, `startup.sh`, `.htaccess`, `public/web.config`, os 2 workflows Azure, `vercel.json` PHP.

### 4.3 O que é preservado (migrado 1:1 de conteúdo)

- **Textos**: hero, "sobre" (2 parágrafos), copyright.
- **Dados**: 3 experiências (GoodStorage, Kasi, Alumbra), 6 projetos (tabela em [2.4](#24-backend--fluxo-de-dados)), skills (revisar formato — ver [§7](#7-uxui-improvements)).
- **Assets**: `resources/images/*` (reotimizados), `resources/favicon/*`, `resources/documents/RafaelLeiteDaSilva.pdf` (descartar o `(antigo)`).
- **Destino do e-mail**: `rafael.leite.14@hotmail.com`.
- **Domínio**: `rafaelleitedasilva.dev.br`.
- **Estrutura de seções** como wireframe inicial (mas com redesenho — [§7](#7-uxui-improvements)).

### 4.4 Persistência / storage / observabilidade

- **Persistência:** nenhuma. Conteúdo é código.
- **Storage:** `/public` (assets estáticos servidos pela CDN da Vercel). PDF do currículo em `/public/rafael-leite-da-silva-cv.pdf`.
- **Observabilidade:** Vercel Deployments + Runtime Logs + Web Analytics + Speed Insights. Alertas de build por e-mail/GitHub.

---

## 5. Technology Decisions

Formato ADR resumido.

### 5.1 Next/React vs Nuxt/Vue — `DECISÃO PENDENTE`

- **Contexto:** o código atual é Vue; o dono domina Vue/Laravel. A base a migrar é **1 componente de ~400 linhas** — custo de reescrita trivial em qualquer direção.
- **Opção A — Next.js + React (`RECOMENDAÇÃO`):** plataforma-nativa na Vercel (mesma empresa): Image/Font Optimization, `next/og` para OG images dinâmicas, ISR, Server Actions, `@vercel/analytics` e `@vercel/speed-insights` com suporte de 1ª linha, maior volume de exemplos/deploy templates. Ecossistema de portfólio/MDX mais maduro.
- **Opção B — Nuxt 3 + Vue:** roda muito bem na Vercel (preset Nitro `vercel`), mantém o idioma que o dono já conhece, `@nuxt/image`, `@nuxt/content` (MDX-like) é excelente para exatamente este caso. Perde um pouco em integrações 1ª-parte e em `next/og`.
- **Trade-off:** escolher React é adotar uma linguagem de UI que o dono usa menos no dia a dia; escolher Nuxt é abrir mão de algumas conveniências nativas da Vercel.
- **Recomendação:** **Next.js + React**, salvo se o dono preferir explicitamente manter Vue — nesse caso **Nuxt 3** é uma escolha igualmente defensável e o resto deste documento se aplica com renomeações óbvias (`app/` → `pages/`+`components/`, Route Handler → `server/api/contact.post.ts`, `next/image` → `@nuxt/image`).
- **Não é** migração "por moda": a justificativa é integração com a plataforma de deploy e maturidade do fluxo SSG+MDX+OG.

### 5.2 Banco de dados / CMS — decisão: **NÃO ADOTAR**

- 6 projetos + 3 experiências + textos, editados só pelo dono, com histórico desejável (PR). 
- Markdown/MDX + TS resolvem com: type-safety, versionamento, review, preview deploy por branch, zero runtime, zero custo, zero backup.
- CMS (Sanity/Contentful/Payload) ou DB (Postgres serverless) só se: (a) outra pessoa não-dev for editar, ou (b) volume/estrutura crescer muito, ou (c) precisar de conteúdo dinâmico (ex. contadores reais). Nenhum é o caso hoje → `DECISÃO PENDENTE` reavaliar só se (a)/(b)/(c) surgir.

### 5.3 Provedor de e-mail — `DECISÃO PENDENTE`

| Opção | Prós | Contras |
| --- | --- | --- |
| **Resend** (`RECOMENDAÇÃO`) | DX excelente, React Email, free tier (3k/mês), logs | exige verificar domínio (DNS SPF/DKIM em `rafaelleitedasilva.dev.br`) |
| **Web3Forms / Formspree / Getform** | zero backend, honeypot embutido | dado de contato passa por 3º; menos controle de template; free tier limitado |
| **Resend + `onboarding@resend.dev`** | sem config de DNS para começar | remetente não é o domínio próprio; só para validação |
| Manter SMTP (Outlook/Hotmail) | "já funciona" | credenciais SMTP numa function serverless, throttling do Outlook, sem observabilidade, frágil |
- **Recomendação:** Resend com domínio verificado. Enquanto o DNS não estiver pronto, usar remetente de teste do Resend.

### 5.4 Analytics — `DECISÃO PENDENTE`

- **Vercel Web Analytics + Speed Insights** (`RECOMENDAÇÃO`): 1 linha, sem cookies, sem banner de consentimento, mede Core Web Vitals reais. Free tier cobre um portfólio.
- Alternativa: **Plausible** (self-host ou cloud) se quiser dashboard público/portável.
- Alternativa: **nenhum** — perfeitamente aceitável para um portfólio.
- **Não** adicionar Google Analytics/GTM (peso, consentimento, privacidade) sem necessidade.

### 5.5 Estilo: Tailwind vs CSS Modules — decisão: **Tailwind v4**

- Consistência via tokens, tree-shaking real, `prettier-plugin-tailwindcss` para ordenação, `eslint` para classes inválidas. Design system expresso em `@theme` (v4). CSS Modules pontuais permitidos para animações complexas.

### 5.6 Deploy: Vercel vs Azure — decisão: **Vercel, remover Azure**

- Objetivo do projeto (briefing) é "Vercel-native". Azure App Service/Container Apps para um site estático = servidor sempre ligado, custo fixo, deploy por zip/imagem, sem Preview por PR. Remover os 2 workflows e o `Dockerfile`/`startup.sh`.

### 5.7 `@vercel/php` — decisão: **remover**

- Sem Laravel, não há PHP. `vercel.json` novo só com headers/redirects (a maior parte é convenção do Next e nem precisa de arquivo).

---

## 6. Migration Strategy

### 6.1 Avaliação das três estratégias

| Critério | A — Incremental | B — Reescrita controlada (mantém backend) | C — Rebuild completo |
| --- | --- | --- | --- |
| Esforço | Alto (manter 2 stacks + ponte) | Médio | **Baixo-Médio** |
| Risco | Médio (integração Laravel↔Next, CORS, sessão) | Médio (mantém PHP na Vercel) | **Baixo** (superfície minúscula; nada crítico a preservar) |
| Complexidade | Alta (dois deploys, dois runtimes) | Média | **Baixa** |
| Tempo | Longo | Médio | **Curto** (~1–2 semanas de trabalho focado) |
| Manutenção pós | Ruim durante a transição | Ainda carrega Laravel | **Ótima** |
| Impacto visual | Pode ficar híbrido/inconsistente | Total | **Total** |
| Facilidade de deploy | Pior (2 alvos) | Média (PHP na Vercel) | **Melhor** (1 alvo, estático) |
| Rollback | Complexo | Médio | **Trivial** (DNS/alias Vercel volta pro deploy antigo; ou manter o site atual no ar em subdomínio até o corte) |

### 6.2 Por que **C — Rebuild completo**

- Não há **acoplamento real** a preservar: 2 endpoints, 8 registros de dados (já no código, em seeders), 1 componente de UI.
- ~95% do repositório é peso morto (template jQuery, scaffolding Laravel, scaffold `frontend/`, 3 deploys).
- Incremental (A) só adiciona custo: manter Laravel + Next simultaneamente, resolver CORS/CSRF entre eles, dois pipelines — para depois jogar o Laravel fora mesmo assim.
- Rebuild aqui é **mais seguro** que incremental porque o "novo" é testável isoladamente e o corte é uma troca de DNS/alias.

### 6.3 Plano de corte (baixo risco)

1. Novo projeto Next em repositório novo (ou branch órfã `next`/pasta limpa) → deploy Vercel em domínio Vercel (`*.vercel.app`).
2. Site atual continua no ar sem alterações até o corte.
3. Paridade de conteúdo + QA (Lighthouse, a11y, teste do form com envio real para o Hotmail).
4. Apontar `rafaelleitedasilva.dev.br` (e `www`) para a Vercel; configurar redirect `www` → apex (ou vice-versa).
5. Observar 48–72 h (Analytics, Speed Insights, logs do `/api/contact`, Search Console).
6. Rollback: reverter DNS / alias Vercel para o deploy anterior. Arquivar o repo Laravel (tag `archive/laravel-final`).

---

## 7. UX/UI Improvements

> `RECOMENDAÇÃO` em todo esta seção. As decisões estéticas finais (paleta exata, fontes) são `DECISÃO PENDENTE` do dono, mas o sistema abaixo é o ponto de partida.

### 7.1 Direção de arte

- Tom: **engenharia / tecnologia / maturidade**. Escuro por padrão, com acento único frio (azul-elétrico ou verde-terminal), tipografia mono para detalhes de código (os títulos hoje já usam `/sobre`, `/experiencia` — manter esse "prompt de terminal" como assinatura visual, agora intencional).
- **Menos** movimento: entradas suaves (fade/translate curto) via Intersection Observer, respeitando `prefers-reduced-motion`. Sem carrosséis, sem parallax, sem barras de progresso animadas "wow".
- Remover GIFs externos (Pinterest/Tumblr) — substituir por um elemento gráfico próprio (grid sutil, ruído, ou um canvas leve de partículas **opcional** e desabilitável).

### 7.2 Design system (tokens)

`REQUISITO`: o projeto **não possui** design system consistente hoje (Bootstrap + SCSS de template + overrides ad hoc). Propor:

```text
Cor
  --bg            #0B0C0E   (base)      --bg-elev   #141619
  --text          #E7E9EC                --text-dim  #9BA1A8
  --border        #23262B
  --accent        #4F8BFF   (ajustável)  --accent-ink #0B0C0E
  --success #3FB950   --warning #D29922   --danger #F85149
  Contraste mínimo: texto normal ≥ 4.5:1, texto grande/UI ≥ 3:1 (WCAG AA)

Tipografia
  Sans: next/font (Geist ou Inter)     Mono: Geist Mono / JetBrains Mono
  Escala (rem): 0.75 / 0.875 / 1 / 1.125 / 1.25 / 1.5 / 2 / 2.5 / 3.25 / 4
  line-height: 1.5 corpo, 1.15 títulos    tracking: -0.02em títulos grandes

Espaçamento (rem): 0.25 0.5 0.75 1 1.5 2 3 4 6 8 12   (escala 4px base)
Radius: 4 / 8 / 12 / 16 / full
Sombra: sm (0 1 2 / .3)  md (0 8 24 / .35)  — discretas, escuro
Breakpoints: 360 / 480 / 768 / 1024 / 1280 / 1536
Container: max-w 72rem, padding lateral 1rem (mobile) → 2rem (≥768)
Motion: duração 150–250ms, ease-out; tudo dentro de @media (prefers-reduced-motion: no-preference)
z-index: base 0, sticky header 40, dropdown 50, modal 100, toast 110
```

### 7.3 Componentes reutilizáveis (`src/components/ui`)

`Container`, `Section` (com id + heading padrão "/slug"), `Button` (variants: primary/ghost/link; sizes sm/md), `IconButton`, `Card` (projeto/experiência), `Badge` (tech tag), `Link` (externo com ícone + `rel`), `Field` (label + input + erro + `aria-describedby`), `Textarea`, `Prose` (MDX render), `ThemeToggle` (se houver claro/escuro), `Nav` + `MobileMenu` (Dialog acessível, foco preso, `Esc` fecha), `SkipLink`, `Toast`/inline-alert para o form.

Regra: **zero estilo duplicado** — variações via `cva`/`tailwind-variants`.

### 7.4 Melhorias por seção

| Seção | Mudança |
| --- | --- |
| Header | Sticky com blur; menu âncora com `scroll-margin-top`; **menu mobile funcional** (Dialog); indicação de seção ativa via IntersectionObserver; foco visível. |
| Hero | H1 real com nome; subtítulo; CTAs (ver projetos / baixar CV / contato); links sociais com `aria-label`. Sem imagem externa. |
| Sobre | Texto + destaques factuais (anos de experiência, stack principal) **sem percentuais inventados**. Foto própria opcional otimizada. |
| Experiência | Timeline vertical; cada item com empresa, cargo, período (datas em `<time datetime>`), local, 1–3 bullets de impacto. Dados em `src/content/experiencia.ts`. |
| Skills/Tecnologias | Substituir barras em % por **grupos de badges** (ex.: "Uso no dia a dia" / "Confortável" / "Estudando") — honesto e sem manutenção de números. |
| Trabalhos | Grid de `ProjectCard` com filtro Corporativo/Pessoal (query param `?tipo=` para ser linkável); cada card → `/projetos/[slug]`. Imagem via `next/image` com `blurDataURL`. |
| Projeto (novo) | Página dedicada: capa, resumo, papel, ano, problema, solução, stack, links (repo/demo com `rel="noopener"`), galeria. Metadata + OG por projeto. |
| Contato | Form controlado (React), validação Zod inline, estados loading/success/error **visíveis**, honeypot, `aria-live` para o resultado. Sem reload. |
| Footer | Copyright, links, "feito com Next.js / hospedado na Vercel", link para o repo. |
| 404 | Página real (não redirect) com link para home e projetos. |

### 7.5 Estados obrigatórios

Loading (form submit; skeleton só se algum dado for client-side — idealmente nenhum), vazio (filtro sem resultado), erro (form falhou → mensagem + fallback "envie e-mail direto para …"), offline/no-JS (conteúdo principal é SSG, funciona sem JS; form degrada para `mailto:` ou mensagem).

---

## 8. Frontend Architecture

```text
portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx                # <html lang="pt-BR">, fontes, theme, Analytics, SkipLink, header/footer
│   │   ├── page.tsx                  # Home (SSG) — compõe as <Section/>
│   │   ├── opengraph-image.tsx       # OG default (next/og)
│   │   ├── sitemap.ts               # sitemap dinâmico a partir do conteúdo
│   │   ├── robots.ts
│   │   ├── not-found.tsx            # 404 real
│   │   ├── projetos/
│   │   │   ├── page.tsx             # lista/index (SSG) com filtro ?tipo=
│   │   │   └── [slug]/
│   │   │       ├── page.tsx         # detalhe (generateStaticParams + generateMetadata)
│   │   │       └── opengraph-image.tsx
│   │   └── api/
│   │       └── contact/route.ts     # POST — Node runtime, Zod, rate limit, Resend
│   │
│   ├── components/
│   │   ├── ui/                      # Button, Card, Badge, Field, Container, Section, Link, Dialog...
│   │   ├── layout/                  # Header, Nav, MobileMenu, Footer, SkipLink, ThemeToggle
│   │   ├── sections/                # Hero, About, Experience, Skills, Work, Contact
│   │   └── projects/                # ProjectCard, ProjectGrid, ProjectFilter, ProjectGallery
│   │
│   ├── content/                     # FONTE DE VERDADE do conteúdo
│   │   ├── profile.ts               # nome, título, bio, socials, email, cv
│   │   ├── experience.ts            # Experience[]
│   │   ├── skills.ts                # SkillGroup[]
│   │   ├── projects.ts              # ProjectMeta[] (ou frontmatter dos .mdx)
│   │   ├── projetos/                # *.mdx (um por projeto: problema/solução/etc.)
│   │   └── assets/                  # imagens-fonte (se não em /public)
│   │
│   ├── lib/
│   │   ├── content.ts               # getProjects(), getProject(slug), getExperience()...
│   │   ├── validation/contact.ts    # schema Zod compartilhado client+server
│   │   ├── email/                   # cliente Resend + template React Email
│   │   ├── rate-limit.ts
│   │   ├── seo.ts                   # helpers de metadata / JSON-LD
│   │   └── utils.ts                 # cn(), formatDate()...
│   │
│   ├── types/                       # Project, Experience, SkillGroup, ContactPayload
│   ├── hooks/                       # useActiveSection, useMediaQuery, useReducedMotion
│   └── styles/
│       └── globals.css              # @import "tailwindcss"; @theme { tokens }
│
├── public/
│   ├── images/                      # otimizadas (webp/avif quando possível)
│   ├── rafael-leite-da-silva-cv.pdf
│   ├── favicon.ico + icons          # de resources/favicon
│   └── og/                          # imagens OG estáticas de fallback (se não usar next/og)
│
├── tests/
│   ├── unit/                        # Vitest: validação, helpers de content, seo
│   └── e2e/                         # Playwright: home render, nav mobile, form (Resend mockado), axe
│
├── .env.example
├── .nvmrc                           # 20
├── next.config.ts
├── tailwind / postcss config
├── eslint.config.mjs / .prettierrc
├── vitest.config.ts / playwright.config.ts
├── tsconfig.json                    # "strict": true
└── vercel.json                      # (opcional) headers de segurança + redirect www
```

### 8.1 Rendering

| Rota | Estratégia | Motivo |
| --- | --- | --- |
| `/` | **SSG** | conteúdo 100% estático no build |
| `/projetos` | **SSG** | idem; filtro é client-side sobre dados já embutidos |
| `/projetos/[slug]` | **SSG** + `generateStaticParams` | uma página por MDX |
| `sitemap.xml`, `robots.txt`, `opengraph-image` | build-time | — |
| `POST /api/contact` | **Function (Node)**, sem cache | único ponto dinâmico; precisa de `fetch` de saída e segredo |

Sem SSR por request, sem ISR (não há dado que mude fora de deploy). Se algum dia entrar "últimos posts do blog" ou "repos do GitHub em tempo real" → ISR com `revalidate`.

### 8.2 Client vs Server Components

- **Server (default):** todas as `sections/`, `ProjectCard`, layout, páginas.
- **Client (`"use client"`):** `MobileMenu`, `ContactForm`, `ProjectFilter`, `ThemeToggle`, hooks de scroll. Nada mais.

---

## 9. Backend Strategy

Classificação de cada funcionalidade que hoje depende do Laravel:

| Funcionalidade atual | Classe | Destino |
| --- | --- | --- |
| `GET /` → `view('index')` | **B — conteúdo estático** | Página Next SSG. |
| `GET /api/projects` (lê MySQL) | **B — conteúdo estático** | `src/content/projects.ts` + `.mdx`, lido no build. Endpoint deixa de existir. |
| Tabela `projects` + migrations + seeders | **A — remover** (vira conteúdo) | Dados migrados para MDX/TS (ver [Task M2](#tasks)). |
| `POST /email` (valida + `Mail::send`) | **C — Serverless Function** | `app/api/contact/route.ts` + Resend. Corrige o bug de validação (P-18) e adiciona rate limit (P-19). |
| Mailable `App\Mail\portfolio` + `emails/portfolio.blade.php` | **C** | Template **React Email** em `src/lib/email/`. |
| `auth:sanctum`, `GET /user`, tabela `users`, `personal_access_tokens` | **A — remover** | Sem autenticação no produto. |
| `password_reset_tokens`, `failed_jobs` | **A — remover** | Scaffolding não usado. |
| Sessions / CSRF server-side | **A — remover** | Form usa Server Action / Route Handler; proteção via origin check + honeypot + rate limit. |
| Queue / Broadcasting / Redis / Pusher | **A — remover** | Nunca usado. |
| Catch-all `GET /{route}` → redirect home | **A — remover** | Next entrega `not-found.tsx` (404 correto). Redirects legítimos (ex. rota antiga) via `next.config` `redirects()`. |
| `api/assets.php` | **A — remover** | Assets pela CDN da Vercel. |
| CV PDF (`resources/documents`) | **B** | `/public/…cv.pdf` (estático). |
| `config/cors.php` | **A — remover** | Sem API cross-origin. `/api/contact` é same-origin. |

**Nenhuma funcionalidade cai em "D — backend externo dedicado" nem "E — serviço externo pesado".** O único backend é a Function de contato (categoria C).

### 9.1 Contrato do `POST /api/contact`

```ts
// request (application/json)  — schema Zod compartilhado
{
  name: string   // 2..80, trim
  email: string  // email válido
  context: string // "assunto" — 3..120
  message: string // 10..3000
  company?: string // HONEYPOT — deve vir vazio
  _ts?: number    // timestamp de render do form; rejeita se < 2s (time-trap)
}
// responses
200 { ok: true }
400 { ok: false, errors: Record<field, string> }
422 { ok: false, error: "spam_detected" }   // honeypot/time-trap (resposta genérica p/ não vazar heurística → usar 200 fake opcional)
429 { ok: false, error: "rate_limited" }
500 { ok: false, error: "send_failed" }
```

- Runtime: **Node** (SDK Resend). `maxDuration: 10`.
- Rate limit: por IP (`x-forwarded-for`), ex. 3 req / 10 min. Store: Upstash Redis REST **ou** `@vercel/kv`. `DECISÃO PENDENTE`: qual store (ambos têm free tier; Upstash é portável).
- Origin check: rejeitar se `Origin`/`Referer` não for o domínio de produção/preview.
- Log estruturado (sem PII no log além do necessário) para Vercel Logs.

---

## 10. Vercel Architecture

| Aspecto | Configuração |
| --- | --- |
| Framework preset | Next.js (auto-detectado) |
| Build command | `next build` (default) |
| Output | `.next` (default) — estático → Edge CDN; `/api/contact` → Serverless Function (Node) |
| Install | `npm ci` (lockfile versionado) |
| Node version | 20.x (Project Settings + `.nvmrc` + `engines`) |
| Environments | **Production** (`main`), **Preview** (toda branch/PR), **Development** (`vercel dev` local) |
| Domains | `rafaelleitedasilva.dev.br` (apex, Production) + `www.` → redirect 308 para apex (ou inverso). SSL automático (Let's Encrypt). |
| DNS | `DECISÃO PENDENTE` — registrador/zona de `dev.br` não documentados. Necessário: `A 76.76.21.21` (apex) ou `ALIAS/ANAME`, e `CNAME cname.vercel-dns.com` para `www`. |
| Preview protection | opcional (senha) para previews |
| Env vars | ver [§16](#16-environment-variables). Marcar server-only sem prefixo `NEXT_PUBLIC_`. |
| Functions | só `app/api/contact/route.ts`. Região: `gru1` (São Paulo) — público majoritariamente BR. `maxDuration: 10`, `memory: 512`. |
| Edge Functions | **não usar** — nenhum caso justifica (o form precisa de Node/segredo; conteúdo é estático na CDN, já "no edge"). |
| Cron Jobs | nenhum. |
| Caching | estático: `Cache-Control` automático + `immutable` para assets com hash. `/api/contact`: `no-store`. |
| Headers | via `next.config.ts` `headers()` **ou** `vercel.json` — ver [§13](#13-security). |
| Redirects/Rewrites | `next.config.ts` `redirects()` — ex.: `/home` → `/`, `/{qualquer rota morta conhecida}` → destino correto (301). |
| Observabilidade | Web Analytics + Speed Insights (habilitar no dashboard + pacotes) + Runtime Logs. |
| Limites relevantes (Hobby) | Function 10s/execução, 100 GB-hrs, sem cron além de 2/dia; um portfólio fica folgado. Se precisar de mais previews/analytics retention → **Pro**. `DECISÃO PENDENTE`: plano. |

**Restrições respeitadas:** sem processo persistente, sem worker sempre ligado, sem filesystem persistente (só `/tmp` efêmero, que não é usado), sem sessão local, sem storage local permanente. O único estado externo é o rate-limit store (KV/Upstash) e o provedor de e-mail.

---

## 11. SEO

| Item | Implementação |
| --- | --- |
| `lang` | `<html lang="pt-BR">` (hoje é dinâmico e cai em `en`). |
| Títulos | `metadata` por rota. Template: `%s · Rafael Leite da Silva`. Home: `Rafael Leite da Silva — Desenvolvedor Fullstack`. |
| Description | Única por página (home, /projetos, cada projeto). |
| Canonical | `metadataBase` + `alternates.canonical` por página. |
| Open Graph | `og:title/description/type/url/image`. Imagem via `opengraph-image.tsx` (`next/og`) — home + por projeto. |
| Twitter Card | `summary_large_image`. |
| Sitemap | `app/sitemap.ts` gera `/`, `/projetos`, `/projetos/[slug]`. |
| robots | `app/robots.ts` — `allow: /`, aponta o sitemap. (Hoje `robots.txt` é `Disallow:` vazio = ok, mas sem sitemap.) |
| Headings | 1× `<h1>` por página; hierarquia correta nas seções (`<h2>` por seção). |
| HTML semântico | `<header><nav><main><section><article><footer>`, `<time datetime>`, listas reais. |
| Structured data (JSON-LD) | `Person` (home, com `sameAs` = GitHub/LinkedIn), `BreadcrumbList` + `CreativeWork`/`SoftwareSourceCode` (páginas de projeto). |
| URLs | limpas e estáveis: `/projetos/fluit`, `/projetos/jotion`. Slugs definidos no conteúdo. |
| 404 | `not-found.tsx` retorna **404 real** (fim do catch-all que dava 200). |
| Performance como SEO | SSG + `next/image` + `next/font` → LCP/CLS bons (ver [§12](#12-performance)). |
| Verificação | Google Search Console (meta tag ou DNS) — `DECISÃO PENDENTE` (acesso à conta Google). |

---

## 12. Performance

Metas (`RECOMENDAÇÃO`): Lighthouse mobile ≥ 95 em Performance/SEO/Best Practices/A11y; **LCP < 2.0 s**, **CLS < 0.05**, **INP < 200 ms**, TTFB < 200 ms (estático/CDN).

| Alavanca | Ação |
| --- | --- |
| HTML | SSG → HTML completo no primeiro byte, sem fetch pós-hydration (`/api/projects` eliminado). |
| JS no cliente | Server Components por padrão; só `MobileMenu`, `ContactForm`, `ProjectFilter`, `ThemeToggle` são client. Meta: **< 90 KB JS** inicial gzip. |
| CSS | Tailwind (só o usado). Remoção total de Bootstrap + `style.scss` (5.4k linhas) + `app.css`. |
| Imagens | `next/image` (AVIF/WebP, `sizes`, lazy por padrão, `priority` só no hero). Reprocessar os `.jpeg` de 100–535 KB. `senai-intranet.png` (535 KB) → comprimir/converter. |
| Fontes | `next/font` self-host, `display: swap`, subset latin, no máx. 2 famílias / 2–3 pesos. Elimina `resources/fonts/*` (~2,2 MB, 5 formatos). |
| Ícones | `lucide-react` tree-shaken (vs FontAwesome inteiro). |
| Terceiros | Remover GIFs externos (Pinterest/Tumblr) e Bunny/Google Fonts remotos. Analytics da Vercel é leve e assíncrono. |
| Animações | Só transform/opacity, `will-change` pontual, gated por `prefers-reduced-motion`. Sem libs de animação pesadas (Framer Motion só se realmente necessário; preferir CSS). |
| Cache | Assets com hash `immutable`; documentos estáticos com `Cache-Control` longo. |
| Monitor | Speed Insights (RUM) + checagem Lighthouse CI no pipeline (ver [§15](#15-cicd)). |

---

## 13. Security

| Área | Medida |
| --- | --- |
| Segredos no cliente | **Nada** de `RESEND_API_KEY`, `KV_*`, tokens no bundle. Só `NEXT_PUBLIC_*` (ver [§16](#16-environment-variables)) vai ao browser. Regra de review: PR que adiciona `NEXT_PUBLIC_` a algo sensível é bloqueado. |
| `/api/contact` | Validação Zod server-side (corrige **P-18**); honeypot + time-trap; **rate limit** por IP (corrige **P-19**); origin/referer check; tamanho máx. de payload; sanitização do conteúdo antes de montar o e-mail (escape HTML no template). |
| Headers (via `next.config.ts` `headers()` ou `vercel.json`) | `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` · `X-Content-Type-Options: nosniff` · `Referrer-Policy: strict-origin-when-cross-origin` · `X-Frame-Options: DENY` · `Permissions-Policy: camera=(), microphone=(), geolocation=()` · **CSP** (ver abaixo). |
| CSP | Começar em `Content-Security-Policy-Report-Only`, depois enforce. Base: `default-src 'self'; img-src 'self' data:; font-src 'self'; script-src 'self' 'unsafe-inline'* ; style-src 'self' 'unsafe-inline'; connect-src 'self' https://vitals.vercel-insights.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'`. *`'unsafe-inline'`/nonce para scripts do Next — usar nonce via middleware se quiser CSP estrita. |
| XSS | Sem `dangerouslySetInnerHTML` exceto MDX renderizado de **conteúdo próprio** (confiável). Sem input de usuário renderizado como HTML. |
| CSRF | Não há sessão/cookie de auth → superfície mínima. Route Handler valida `Origin`. Se usar Server Actions, o Next já mitiga (mesma origem + token). |
| Injection | Sem SQL, sem shell. E-mail montado com template parametrizado, campos escapados. |
| Deps | `npm audit` no CI; Dependabot/Renovate; lockfile commitado; `npm ci`. |
| Segredos legados | `DECISÃO PENDENTE` / `REQUISITO`: auditar histórico Git por `.env`/`APP_KEY`/senha SMTP commitados; se encontrados, **rotacionar** a senha do e-mail e qualquer credencial exposta e considerar `git filter-repo`. Como o novo projeto é repo/branch limpo, o histórico Laravel pode ser arquivado à parte. |
| Superfície removida | Sem Sanctum, sem `personal_access_tokens`, sem `failed_jobs`, sem admin, sem PHP runtime público, sem MySQL exposto. |
| Dependência externa | Rate-limit store e Resend acessados só do servidor, com chave em env server-only. |

---

## 14. Testing

Prioridade por risco, não por quantidade.

| Nível | Escopo | Ferramenta | Casos mínimos |
| --- | --- | --- | --- |
| **Unit** | Lógica pura | Vitest | (1) schema Zod de contato: aceita válido, rejeita cada campo inválido, detecta honeypot/time-trap. (2) `lib/content`: `getProject(slug)` inexistente → `notFound`; ordenação; filtro por `tipo`. (3) helpers de SEO/JSON-LD geram shape esperado. |
| **Integration** | Route Handler `/api/contact` | Vitest + mock do Resend + mock do KV | 200 no caminho feliz (Resend chamado 1×); 400 com erros de campo; 429 quando rate limit estoura; 422/200-fake no honeypot; 500 quando Resend falha (Resend chamado, resposta tratada). |
| **E2E** | Fluxos críticos | Playwright | (1) Home renderiza `<h1>` e todas as seções **sem JS** (SSG). (2) Menu mobile abre/fecha, prende foco, fecha no `Esc`. (3) Form: preenche → submit (Resend interceptado) → mensagem de sucesso visível; erro de validação inline; estado de erro de rede. (4) `/projetos/[slug]` de um slug conhecido responde 200 e tem metadata; slug inexistente → 404. |
| **A11y** | Automatizado | `@axe-core/playwright` | Home, `/projetos`, `/projetos/[slug]`, form com erros — 0 violações críticas/sérias. |
| **Visual** | Opcional | Playwright screenshots ou Chromatic | Só se o dono quiser trava de regressão visual das seções principais. `DECISÃO PENDENTE`. |
| **Perf** | Orçamento | Lighthouse CI (`@lhci/cli`) no PR | Falha se Performance/A11y/SEO mobile < 90. |

Não portar: `GithubTest` (teste de rede à API do GitHub — flaky, sem valor). `ExampleTest`s (placeholders).

---

## 15. CI/CD

```text
git push / PR  ──▶  GitHub Actions (ci.yml)
                      ├─ setup Node 20 + npm ci
                      ├─ lint         (eslint --max-warnings=0)
                      ├─ typecheck    (tsc --noEmit)
                      ├─ test:unit    (vitest run --coverage)
                      ├─ build        (next build)
                      ├─ test:e2e     (playwright, contra o build)  ── pode ser job separado
                      └─ lhci         (Lighthouse CI no output)      ── opcional/non-blocking no início
                   │
                   └──▶  Vercel (automático via Git integration)
                           ├─ PR  → Preview Deployment (URL única no PR)
                           └─ main → Production Deployment
```

- **Vercel faz o deploy** (não o GitHub Actions). O Actions é só o *quality gate*. `DECISÃO PENDENTE`: opcionalmente usar "Ignored Build Step" na Vercel para só publicar se o CI passou, ou confiar no *required status checks* do branch protection.
- **Branch protection** em `main`: PR obrigatório, checks `lint`/`typecheck`/`test:unit`/`build` obrigatórios, 1 aprovação (auto-aprovação permitida se solo).
- **Etapas descartadas** do fluxo genérico do briefing: nenhuma pipeline de migração de banco (não há banco); nenhum passo de deploy manual (Vercel cuida).
- Remover os 3 workflows atuais (`laravel.yml`, `main_vite-laravel.yml`, `laravel-vite-AutoDeployTrigger-*.yml`).

---

## 16. Environment Variables

| Nome | Escopo | Onde | Obrigatória | Descrição |
| --- | --- | --- | --- | --- |
| `RESEND_API_KEY` | **server** | Vercel (Prod+Preview), `.env.local` | sim (para o form) | Chave da API Resend. |
| `CONTACT_TO_EMAIL` | server | Vercel, `.env.local` | sim | Destino (`rafael.leite.14@hotmail.com`). |
| `CONTACT_FROM_EMAIL` | server | Vercel, `.env.local` | sim | Remetente verificado (ex. `contato@rafaelleitedasilva.dev.br`) — depende da verificação de domínio no Resend. |
| `RATE_LIMIT_REDIS_URL` / `KV_REST_API_URL` | server | Vercel | sim (se rate limit via KV/Upstash) | Endpoint REST do store. |
| `RATE_LIMIT_REDIS_TOKEN` / `KV_REST_API_TOKEN` | server | Vercel | sim (idem) | Token do store. |
| `NEXT_PUBLIC_SITE_URL` | **public** | Vercel, `.env.local` | sim | `https://rafaelleitedasilva.dev.br` — usado em `metadataBase`, canonical, sitemap, OG. |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | public | Vercel | não | Só se adotar Plausible em vez de Vercel Analytics. |
| `SENTRY_DSN` / `NEXT_PUBLIC_SENTRY_DSN` | server/public | Vercel | não | Só se adotar Sentry. |

- `.env.example` versionado com todas as chaves (valores vazios/fake).
- **Nada** sensível com prefixo `NEXT_PUBLIC_`. `RESEND_API_KEY`, tokens de KV e DSN de servidor **nunca** com `NEXT_PUBLIC_`.
- Vercel: setar em *Production* e *Preview* separadamente; valores de teste em Preview (ex. Resend em modo sandbox).

---

## 17. Project Structure

Ver árvore completa em [§8](#8-frontend-architecture). Resumo dos diretórios e suas responsabilidades:

| Diretório | Responsabilidade | Não pode conter |
| --- | --- | --- |
| `src/app` | Rotas, layouts, metadata, Route Handlers | lógica de negócio, chamadas HTTP diretas de UI |
| `src/components/ui` | Apresentação pura, reutilizável, sem dados | fetch, acesso a `content`, segredos |
| `src/components/sections` | Composição de UI + leitura de `content` (server) | estado global, efeitos de rede |
| `src/content` | **Fonte de verdade** do conteúdo (TS + MDX + assets) | código executável com efeitos colaterais |
| `src/lib` | Serviços (email, rate-limit), acesso a conteúdo, validação, SEO | JSX de página |
| `src/types` | Tipos compartilhados | implementação |
| `src/hooks` | Hooks de client (media query, scroll, reduced motion) | acesso a segredos |
| `src/styles` | `globals.css` + `@theme` (tokens) | — |
| `public` | Assets servidos como estão (imagens, CV, favicon, OG estáticos) | segredos, fontes (usar `next/font`) |
| `tests` | unit / e2e / a11y | — |

Separação de responsabilidades (do briefing) mapeada:

- **UI** → `components/ui`
- **Components/composição** → `components/sections`, `components/projects`, `components/layout`
- **Data** → `content/` + `lib/content.ts`
- **Services** → `lib/email`, `lib/rate-limit`
- **Domain** → mínimo; regras de validação em `lib/validation` (compartilhado). Não há regra de negócio relevante além de "validar contato" e "resolver slug".
- **Infrastructure** → `app/api/contact/route.ts` (borda com Resend/KV), `next.config.ts`, `vercel.json`.

---

## 18. Migration Tasks

> Estimativa de complexidade: **XS** (<1h) · **S** (~meio dia) · **M** (~1–2 dias) · **L** (>2 dias).
> Prioridade: **P0** bloqueador · **P1** alta · **P2** média · **P3** melhoria futura.

<a id="tasks"></a>

### TASK-001 — Fundação do novo frontend
- **Objetivo:** criar a base Next.js compatível com Vercel.
- **Contexto:** não há projeto Next hoje; ver [§4](#4-target-architecture), [§8](#8-frontend-architecture).
- **Fazer:** `create-next-app` (App Router, TS, Tailwind, ESLint, `src/`); ativar `tsconfig` `strict`; adicionar Prettier + `prettier-plugin-tailwindcss` + `eslint-plugin-jsx-a11y`; `.nvmrc`=20 e `engines`; `.env.example`; `next.config.ts` (`metadataBase`, `images`, `headers()`, `redirects()`); scripts `dev/build/start/lint/typecheck/test`.
- **Afeta:** repo novo / diretório limpo.
- **Depende de:** —
- **Aceite:** `npm run dev` sobe; `lint`, `typecheck`, `build` sem erro; Preview Deployment na Vercel verde.
- **Riscos:** conflito de versões Tailwind v4 / plugins.
- **Prioridade:** P0 · **Complexidade:** S

### TASK-002 — Pipeline de qualidade (CI) + branch protection
- **Objetivo:** quality gate antes do deploy.
- **Fazer:** `.github/workflows/ci.yml` (Node 20, `npm ci`, lint, typecheck, `vitest run`, `next build`); job Playwright separado; branch protection em `main` com checks obrigatórios; remover `laravel.yml`, `main_vite-laravel.yml`, `laravel-vite-AutoDeployTrigger-*.yml`.
- **Depende de:** TASK-001
- **Aceite:** PR de teste roda todos os checks; merge bloqueado se algum falhar; workflows Azure removidos.
- **Prioridade:** P0 · **Complexidade:** S

### TASK-003 — Design system / tokens + primitivos de UI
- **Objetivo:** base visual coerente (substitui Bootstrap + `style.scss`).
- **Fazer:** `globals.css` com `@theme` (cores, tipografia, espaçamento, radius, sombra, breakpoints de [§7.2](#72-design-system-tokens)); `next/font` (2 famílias); `components/ui`: `Container`, `Section`, `Button`, `Link`, `Badge`, `Card`, `Field`, `Textarea`, `Prose`, `SkipLink`; documentar em uma página `/(dev)/styleguide` não indexada ou Storybook (opcional).
- **Depende de:** TASK-001
- **Aceite:** styleguide mostra todos os componentes em light/dark; contraste AA verificado; zero CSS global fora de tokens/reset.
- **Prioridade:** P0 · **Complexidade:** M

### TASK-M1 — Migrar conteúdo textual e de perfil
- **Objetivo:** tirar textos hardcoded do `App.vue` para `content/`.
- **Fazer:** `content/profile.ts` (nome, título "Desenvolvedor Fullstack", bio dos 2 parágrafos de `App.vue`, socials GitHub/LinkedIn, e-mail, caminho do CV); `content/experience.ts` (GoodStorage / Kasi / Alumbra com cargo, período como datas ISO, local); `content/skills.ts` (reformatado para grupos de badges — ver [§7.4](#74-melhorias-por-seção); **rever com o dono**, remover percentuais).
- **Depende de:** TASK-001; tipos em `src/types`
- **Aceite:** `tsc` valida os dados contra os tipos; nenhum texto de conteúdo em componentes.
- **Riscos:** skills exigem decisão de conteúdo do dono (`DECISÃO PENDENTE`).
- **Prioridade:** P0 · **Complexidade:** S

### TASK-M2 — Migrar dados de projetos (MySQL/seeders → MDX/TS)
- **Objetivo:** eliminar `GET /api/projects` + tabela + seeders.
- **Fazer:** para cada um dos 6 projetos (Fluit, Sestagio, Intranet, Alumbra, BlogText, Jotion): criar `content/projetos/<slug>.mdx` com frontmatter (`title, slug, corp, type, year, role, technologies[], cover, gallery[], repository, demo, shortDescription`) + corpo MDX (problema / solução / desafios / resultados — **preencher com o dono**, hoje só há um parágrafo de descrição por projeto); `lib/content.ts` com `getProjects()/getProject(slug)`; tipos `Project`.
- **Depende de:** TASK-001, TASK-M4 (imagens)
- **Aceite:** `getProjects()` retorna 6; filtro `type` (`corp`/`personal`) funciona; slugs estáveis; `tsc`/schema (Zod no frontmatter) valida.
- **Riscos:** conteúdo aprofundado (problema/solução) não existe hoje → precisa de input do dono; começar com `shortDescription` e evoluir.
- **Prioridade:** P0 · **Complexidade:** M

### TASK-M3 — Formulário de contato + Function `/api/contact`
- **Objetivo:** substituir `POST /email` (Laravel) por Function serverless correta.
- **Fazer:** `lib/validation/contact.ts` (Zod, campos `name/email/context/message` + honeypot `company` + `_ts`); `app/api/contact/route.ts` (Node, valida, origin check, rate limit, chama Resend, respostas de [§9.1](#91-contrato-do-post-apicontact)); template **React Email** em `lib/email/`; `components/sections/Contact` + `ContactForm` (client, Zod inline, estados loading/success/error com `aria-live`); corrigir o bug de validação invertida (**P-18**).
- **Depende de:** TASK-001; env `RESEND_*`, `CONTACT_*`, rate-limit store; decisão [5.3](#53-provedor-de-e-mail--decisão-pendente)
- **Aceite:** envio real chega em `rate...@hotmail.com`; payload inválido → erros inline, **e-mail não enviado**; honeypot preenchido → sem envio; 4 requests rápidos → 429; testes de integração de [§14](#14-testing) passam.
- **Riscos:** verificação de domínio no Resend depende de DNS (`DECISÃO PENDENTE`); usar remetente sandbox até lá.
- **Prioridade:** P0 · **Complexidade:** M

### TASK-M4 — Assets: imagens, favicon, CV
- **Fazer:** mover `resources/images/*` → `public/images` (ou `content/assets`), reotimizar (AVIF/WebP; comprimir `senai-intranet.png` 535 KB e os `.jpeg` grandes); gerar `blurDataURL`; mover `resources/favicon/*` → `public/` + `app/icon`/`apple-icon`; `resources/documents/RafaelLeiteDaSilva.pdf` → `public/rafael-leite-da-silva-cv.pdf` (descartar `(antigo)`); remover `resources/fonts/*` (substituído por `next/font`).
- **Depende de:** TASK-001
- **Aceite:** todas as imagens de projeto referenciadas existem e passam por `next/image`; Lighthouse não acusa imagens sem dimensão / oversized; favicon e OG resolvem.
- **Prioridade:** P1 · **Complexidade:** S

### TASK-004 — Home (SSG) compondo as seções
- **Fazer:** `app/page.tsx` (server) + `sections/Hero`, `About`, `Experience` (timeline), `Skills` (badges), `Work` (grid + filtro), `Contact`; header sticky + `Nav` + `MobileMenu` acessível (Dialog, foco preso, `Esc`); `useActiveSection`; remover GIFs externos.
- **Depende de:** TASK-003, TASK-M1, TASK-M2, TASK-M3, TASK-M4
- **Aceite:** home renderiza todo o conteúdo **no HTML** (view-source), sem chamadas de rede pós-load; menu mobile funcional; navegação âncora com `scroll-margin-top`.
- **Prioridade:** P0 · **Complexidade:** M

### TASK-005 — Páginas de projeto (`/projetos` + `/projetos/[slug]`)
- **Fazer:** índice com filtro linkável (`?tipo=`); `[slug]/page.tsx` com `generateStaticParams` + `generateMetadata`; render MDX via `Prose`; `ProjectGallery`; `not-found` para slug inválido; breadcrumb.
- **Depende de:** TASK-M2, TASK-003
- **Aceite:** 6 páginas estáticas geradas; metadata única por projeto; slug inexistente → 404 real; links externos com `rel="noopener noreferrer"`.
- **Prioridade:** P1 · **Complexidade:** M

### TASK-006 — SEO técnico
- **Fazer:** `metadataBase` + template de título; `description`/canonical por rota; `app/sitemap.ts`, `app/robots.ts`; `opengraph-image.tsx` (home + projeto) via `next/og`; JSON-LD `Person` + `CreativeWork`; `<html lang="pt-BR">`; remover catch-all/redirect-tudo.
- **Depende de:** TASK-004, TASK-005; env `NEXT_PUBLIC_SITE_URL`
- **Aceite:** Rich Results Test sem erro; sitemap lista todas as rotas; OG image aparece no preview (validar em WhatsApp/LinkedIn/X); Lighthouse SEO = 100.
- **Prioridade:** P1 · **Complexidade:** S

### TASK-007 — Segurança: headers + anti-abuso
- **Fazer:** `headers()` no `next.config.ts` (HSTS, `nosniff`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`, CSP em report-only → enforce); rate limit + honeypot + origin check no `/api/contact` (parte já em TASK-M3, aqui é o hardening/CSP e revisão); `npm audit` no CI; Dependabot.
- **Depende de:** TASK-M3, TASK-002
- **Aceite:** securityheaders.com nota A; CSP sem violações no console em produção; 429 confirmado sob carga leve.
- **Prioridade:** P1 · **Complexidade:** S

### TASK-008 — Performance & Core Web Vitals
- **Fazer:** auditar bundle (`@next/bundle-analyzer`); garantir client components mínimos; `priority` só no hero; `next/font` `display: swap`; Lighthouse CI no PR (orçamento); habilitar Speed Insights.
- **Depende de:** TASK-004, TASK-005, TASK-M4
- **Aceite:** Lighthouse mobile ≥ 95 (Perf/A11y/BP/SEO); LCP < 2.0s / CLS < 0.05 / INP < 200ms no lab; JS inicial < 90 KB gz.
- **Prioridade:** P1 · **Complexidade:** S

### TASK-009 — Acessibilidade
- **Fazer:** SkipLink; foco visível global; `prefers-reduced-motion`; `aria-label` em ícones/links sociais; `alt` descritivo por imagem de projeto; menu mobile com roles/foco corretos; `aria-live` no resultado do form; alvos de toque ≥ 44px; checagem `axe` no Playwright.
- **Depende de:** TASK-004, TASK-005
- **Aceite:** 0 violações axe críticas/sérias; navegação 100% por teclado; testado com leitor de tela (VoiceOver/NVDA) nas rotas principais.
- **Prioridade:** P1 · **Complexidade:** S

### TASK-010 — Testes (unit + integração + e2e + a11y)
- **Fazer:** implementar a matriz de [§14](#14-testing); Vitest config + coverage; Playwright config + `@axe-core/playwright`; mock de Resend/KV.
- **Depende de:** TASK-M3, TASK-004, TASK-005
- **Aceite:** `test:unit` e `test:e2e` verdes no CI; cobertura de `lib/validation` e `lib/content` ~100%; e2e do form estável (sem rede real).
- **Prioridade:** P1 · **Complexidade:** M

### TASK-011 — Analytics & observabilidade
- **Fazer:** decidir [5.4](#54-analytics--decisão-pendente); se Vercel: `@vercel/analytics` + `@vercel/speed-insights` no layout; documentar leitura de Runtime Logs do `/api/contact`.
- **Depende de:** TASK-004
- **Aceite:** eventos aparecem no dashboard; Web Vitals reais coletados; sem banner de cookie necessário.
- **Prioridade:** P2 · **Complexidade:** XS

### TASK-012 — Domínio, DNS e go-live
- **Fazer:** resolver [`DECISÃO PENDENTE` DNS](#10-vercel-architecture); adicionar `rafaelleitedasilva.dev.br` + `www` na Vercel; configurar registros; redirect `www`↔apex; `redirects()` para rotas antigas conhecidas (`/home` → `/`); Search Console; monitorar 48–72h; plano de rollback (reverter alias/DNS).
- **Depende de:** todas as P0/P1; acesso ao registrador do domínio
- **Aceite:** HTTPS válido no apex e `www`; produção servindo o novo site; 301s corretos; sem erros 5xx nos logs; CWV de campo estáveis.
- **Prioridade:** P0 (para go-live) · **Complexidade:** S

### TASK-013 — Descomissionar o legado
- **Fazer:** arquivar o repo/branch Laravel (tag `archive/laravel-final`), desligar App Service / Container Apps Azure, remover recursos de MySQL, revogar credenciais SMTP/DB antigas, remover `personal_blog` SQLite, apagar `frontend/`.
- **Depende de:** TASK-012 estável por ~1 semana
- **Aceite:** nenhum recurso pago Azure ativo; credenciais antigas revogadas; repositório antigo somente-leitura/arquivado.
- **Prioridade:** P1 · **Complexidade:** XS

### TASK-014 (P3) — Melhorias futuras (backlog)
- Modo claro/escuro com toggle persistente; `content/` via `@nuxt/content`/`contentlayer`-style typegen; feed de repositórios do GitHub via ISR; página `/uses`; RSS se um blog for incorporado; i18n pt/en (`DECISÃO PENDENTE` se necessário); animações de scroll mais elaboradas com `prefers-reduced-motion`.

---

## 19. Risks

| ID | Risco | Prob. | Impacto | Mitigação |
| --- | --- | --- | --- | --- |
| R-01 | Conteúdo aprofundado dos projetos (problema/solução/resultados) não existe hoje → páginas de projeto ficam rasas. | Alta | Médio | Lançar com `shortDescription` + dados factuais; evoluir MDX incrementalmente com o dono. |
| R-02 | Verificação de domínio no Resend travada por acesso ao DNS de `dev.br`. | Média | Médio | Usar remetente sandbox do Resend no lançamento; `reply-to` = e-mail do visitante; migrar remetente depois. |
| R-03 | Acesso ao registrador/zona DNS do domínio não documentado. | Média | Alto (bloqueia go-live) | Confirmar cedo (TASK-012 dependência); manter site atual no ar até resolver. |
| R-04 | Segredos legados (`APP_KEY`, SMTP) possivelmente no histórico Git. | Média | Médio | Auditar histórico; rotacionar credenciais; repo novo limpo; arquivar o antigo. |
| R-05 | Regressão de SEO/tráfego no corte (URLs, indexação). | Baixa | Médio | Só existe `/` hoje → poucas URLs a preservar; `redirects()` + sitemap + Search Console; monitorar 72h. |
| R-06 | Escolha React quando o dono domina Vue → velocidade de manutenção cai. | Média | Médio | Base minúscula; ou adotar **Nuxt** (5.1) — decisão do dono antes de TASK-001. |
| R-07 | Spam no `/api/contact` apesar das defesas. | Média | Baixo | Honeypot + time-trap + rate limit + origin check; se persistir, adicionar Turnstile (Cloudflare) — sem impacto de privacidade relevante. |
| R-08 | CSP estrita quebra scripts do Next/Analytics. | Média | Baixo | Rollout em `Report-Only`, ajustar, depois enforce. |
| R-09 | Escopo "infinito" de UX/design. | Média | Médio | Congelar design system (TASK-003) antes das páginas; melhorias visuais viram P3. |
| R-10 | Limites do plano Hobby da Vercel (previews/analytics retention). | Baixa | Baixo | Monitorar; upgrade para Pro se necessário (`DECISÃO PENDENTE`). |

---

## 20. Technical Debt

### Dívida atual que será quitada pela migração

- Três stacks sobrepostas; `frontend/` abandonado; `index.php` duplicado; `api/assets.php` quebrado; `startup.sh` com referência inexistente.
- ~25 plugins jQuery + `style.scss` (5.444 linhas) + `resources/fonts` (~2,2 MB) sem uso.
- Scaffolding Laravel inteiro (Sanctum, sessions, queue, broadcasting, Redis, 4 tabelas) para 2 endpoints.
- `personal_blog` SQLite órfão e desatualizado.
- Bug de validação invertida em `HomeController@email`.
- Catch-all que retorna 200 para qualquer URL.
- Testes flaky (`GithubTest`) / quebrados (`ExampleTest` espera 302).
- Dois pipelines Azure + config Vercel-PHP conflitantes.
- Conteúdo duplicado (hardcoded no `App.vue` vs banco vs `footer.blade.php`).

### Dívida potencial introduzida pela nova arquitetura (e como controlar)

| Item | Controle |
| --- | --- |
| Conteúdo em código → dono precisa de PR/deploy para editar | Aceitável no volume atual; documentar o fluxo no README; reavaliar CMS só se outra pessoa for editar. |
| MDX sem typegen forte | Validar frontmatter com Zod no `lib/content`; testes unit cobrindo shape. |
| Rate-limit store externo (KV/Upstash) = 1 dependência de infra | Degradar com elegância se o store cair (permitir envio + log de alerta) — não bloquear o form por falha do limiter. |
| CSP mantida à mão | Documentar; report-only antes de enforce; revisar ao adicionar script de 3º. |
| Acoplamento a APIs 1ª-parte da Vercel (`next/og`, Analytics) | Aceito conscientemente (projeto é "Vercel-native"); são substituíveis. |
| Sem testes de regressão visual | Opcional (TASK-014); risco baixo num site pequeno. |

---

## 21. Definition of Done

A migração está concluída quando **todos** os itens abaixo são verdadeiros:

**Produto & conteúdo**
- [ ] Home, `/projetos` e `/projetos/[slug]` (6 projetos) no ar, servidas como HTML estático (conteúdo visível em *view-source*, sem fetch pós-load).
- [ ] Experiência (3), skills e textos de perfil vêm de `src/content/*` — nada de conteúdo hardcoded em componentes.
- [ ] Nenhuma dependência de imagem/recurso externo em runtime (sem GIFs de Pinterest/Tumblr, sem fontes remotas).
- [ ] Currículo em PDF acessível via `/…-cv.pdf`.
- [ ] 404 real para rotas inexistentes; `/home` redireciona 301 para `/`.

**Formulário de contato**
- [ ] Envio válido chega em `rafael.leite.14@hotmail.com` com `reply-to` do visitante.
- [ ] Payload inválido → erros inline e **nenhum e-mail enviado** (bug P-18 corrigido).
- [ ] Honeypot/time-trap e rate limit ativos e testados (429 sob abuso).
- [ ] Estados de loading/sucesso/erro visíveis e anunciados (`aria-live`); funciona sem reload.

**Qualidade de engenharia**
- [ ] `lint` (0 warnings), `typecheck` (`strict`), `test:unit`, `test:e2e`, `build` — todos verdes no CI.
- [ ] `axe` sem violações críticas/sérias nas rotas principais; navegação 100% por teclado; testado com leitor de tela.
- [ ] Lighthouse mobile ≥ 95 em Performance, A11y, Best Practices, SEO; LCP < 2.0s, CLS < 0.05, INP < 200ms (lab).
- [ ] `securityheaders.com` ≥ A; CSP em enforce sem violações no console de produção.
- [ ] Nenhuma variável sensível com prefixo `NEXT_PUBLIC_`; `.env.example` completo.

**Plataforma**
- [ ] Preview Deployment automático em cada PR; Production em `main`.
- [ ] `rafaelleitedasilva.dev.br` + `www` servidos pela Vercel com HTTPS válido e redirect canônico.
- [ ] `sitemap.xml`/`robots.txt` corretos; site submetido ao Search Console; OG preview validado em WhatsApp/LinkedIn/X.
- [ ] Web Analytics + Speed Insights coletando (ou decisão explícita de não usar analytics).

**Descomissionamento**
- [ ] Workflows Azure e `Dockerfile`/`docker-compose`/`startup.sh` removidos; recursos Azure desligados.
- [ ] Laravel/MySQL/SMTP legados desativados; credenciais antigas revogadas/rotacionadas.
- [ ] `frontend/`, `personal_blog`, `index.php` duplicado e afins removidos; repo antigo arquivado (`archive/laravel-final`).
- [ ] README novo documenta: como editar conteúdo, como rodar local, variáveis de ambiente, como fazer deploy/rollback.

---

## Apêndice A — Checklist de análise (do briefing)

- [x] Entendi a arquitetura atual — Laravel 10 + SPA Vue de 1 componente + template jQuery morto + scaffold abandonado.
- [x] Identifiquei os principais problemas — [§3](#3-problems-identified) (P-01…P-26).
- [x] Avaliei o que pode ser removido — [§4.2](#42-o-que-deixa-de-existir), [§9](#9-backend-strategy).
- [x] Avaliei o que pode ser mantido — [§4.3](#43-o-que-é-preservado-migrado-11-de-conteúdo) (conteúdo, assets, domínio).
- [x] Avaliei Laravel — remover integralmente; nenhuma responsabilidade justifica mantê-lo ([§9](#9-backend-strategy)).
- [x] Avaliei Livewire — **não existe no projeto**; seção do briefing não se aplica.
- [x] Avaliei Vue — migrar para React/Next (custo trivial, ganho de plataforma) **ou** Nuxt se o dono preferir Vue ([5.1](#51-nextreact-vs-nuxtvue--decisão-pendente)).
- [x] Avaliei arquitetura moderna de frontend — Next App Router, Server Components, SSG ([§8](#8-frontend-architecture)).
- [x] Avaliei Next.js — adotado.
- [x] Avaliei compatibilidade com Vercel — [§10](#10-vercel-architecture).
- [x] Avaliei backend/serverless — 1 Function para o form; resto estático ([§9](#9-backend-strategy)).
- [x] Avaliei persistência — nenhuma; conteúdo é código ([5.2](#52-banco-de-dados--cms--decisão-não-adotar)).
- [x] Avaliei storage — `/public` + CDN ([§4.4](#44-persistência--storage--observabilidade)).
- [x] Avaliei segurança — [§13](#13-security).
- [x] Avaliei SEO — [§11](#11-seo).
- [x] Avaliei acessibilidade — [§7.4](#74-melhorias-por-seção)/[TASK-009](#task-009--acessibilidade).
- [x] Avaliei performance — [§12](#12-performance).
- [x] Avaliei testes — [§14](#14-testing).
- [x] Avaliei CI/CD — [§15](#15-cicd).
- [x] Defini estratégia de migração — Rebuild completo (C) com corte por DNS ([§6](#6-migration-strategy)).
- [x] Listei riscos — [§19](#19-risks).
- [x] Listei decisões pendentes — Apêndice B.
- [x] Criei tarefas implementáveis — [§18](#18-migration-tasks).
- [x] Documentei a arquitetura final — este documento.

---

## Apêndice B — Decisões pendentes (consolidado)

| # | Decisão | Recomendação | Necessário para |
| --- | --- | --- | --- |
| DP-01 | **React/Next** vs **Vue/Nuxt** | Next.js + React | TASK-001 |
| DP-02 | Provedor de e-mail do form | Resend + domínio verificado | TASK-M3 |
| DP-03 | Store do rate limit | Upstash Redis (portável) ou `@vercel/kv` | TASK-M3/007 |
| DP-04 | Analytics | Vercel Web Analytics + Speed Insights | TASK-011 |
| DP-05 | Plano Vercel | Hobby para começar; Pro se limites apertarem | TASK-012 |
| DP-06 | Acesso ao registrador/DNS de `rafaelleitedasilva.dev.br` | Confirmar cedo | TASK-012 (go-live) |
| DP-07 | Conteúdo aprofundado por projeto (problema/solução/resultados/galeria) | Coletar com o dono; lançar com resumo | TASK-M2/005 |
| DP-08 | Formato da seção Skills (badges por nível de familiaridade, sem %) | Adotar badges | TASK-M1 |
| DP-09 | Páginas dedicadas de projeto | Sim (SEO + compartilhamento) | TASK-005 |
| DP-10 | i18n pt/en | Não há requisito; manter pt-BR | — (P3) |
| DP-11 | Blog neste repositório | Aparentemente não (BlogText é projeto à parte) — confirmar | escopo |
| DP-12 | Foto pessoal no "Sobre" | Fornecer imagem própria otimizada ou manter sem foto | TASK-M4/004 |
| DP-13 | Auditoria de segredos no histórico Git + rotação | Auditar; rotacionar por precaução | TASK-004(sec)/013 |
| DP-14 | Regressão visual (Chromatic/screenshots) | Opcional, P3 | TASK-014 |
