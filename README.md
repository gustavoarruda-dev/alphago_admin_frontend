# AlphaGo Admin Frontend

Frontend administrativo do AlphaGo, construído com a mesma base técnica e padrões visuais do `alphago_frontend`.

## Stack

- React 18
- Vite 5
- TypeScript strict
- React Router
- TanStack Query
- Zustand
- Axios
- Tailwind CSS
- Radix UI
- Recharts e Highcharts
- Vitest + Testing Library

## Escopo atual

O projeto já possui a base administrativa e páginas mockadas para evolução incremental:

- `Minha Conta` em `/account`
- `Dashboard` em `/dashboard`
- `Faturamento` em `/billing`

Também já existem:

- shell administrativa com sidebar
- tema claro e escuro
- skeletons pulsantes
- cards e superfícies no padrão visual da plataforma
- popovers e dialogs seguindo o padrão do frontend principal
- mocks para gráficos, filtros, tabelas e detalhes

## Estrutura

```text
src/
  components/
    admin/        # shell, header, sidebar e componentes de páginas admin
    theme/        # provider e toggle de tema
    ui/           # componentes base reutilizáveis
  data/           # dados mockados e configurações de navegação
  hooks/          # hooks compartilhados
  lib/            # utilitários
  pages/          # páginas por domínio
  services/       # base de API e integrações
```

## Requisitos

- Node.js 20+
- npm 10+

## Desenvolvimento local

Instale as dependências:

```bash
npm install
```

Suba o servidor de desenvolvimento:

```bash
npm run dev
```

Aplicação local:

```text
http://localhost:5174
```

## Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
npm run test
npm run format
```

## Ambiente

Use o arquivo versionado como base:

```bash
.env.example
```

Crie o seu `.env` local:

```bash
cp .env.example .env
```

Variáveis atuais:

```env
VITE_API_URL=/api
VITE_API_PROXY_TARGET=http://localhost:8000
BRAIN_API_PROXY_TARGET=http://localhost:8001
NEXUS_PROXY_TARGET=http://localhost:8002
```

Regras:

- `.env` é ignorado pelo Git
- `.env.example` pode ser versionado
- não commitar tokens, segredos, chaves privadas ou credenciais reais

## Docker

Também é possível subir pelo compose do monorepo:

```bash
docker compose -f ../docker-compose-dev.yml up -d frontend-admin
```

## Padrões do projeto

- manter componentes pequenos e orientados por domínio
- centralizar mocks e configs em `src/data`
- preferir composição sobre componentes monolíticos
- reaproveitar componentes base em `src/components/ui`
- manter o visual alinhado ao `alphago_frontend`

## Status

Este projeto está em fase inicial de estruturação do painel administrativo. As telas atuais estão mockadas e preparadas para integração com APIs reais.
