## AlphaGo Admin Frontend

Frontend administrativo inicial do AlphaGo, criado com a mesma base técnica do `alphago_frontend`:

- React 18 + Vite + TypeScript strict
- Tailwind CSS
- React Router
- TanStack Query
- Zustand
- Axios
- Vitest + Testing Library

## O que existe hoje

- Shell administrativa
- Sidebar responsiva
- Página inicial de configurações em `/settings/account`
- Dashboard administrativa em `/dashboard`
- Página de faturamento em `/billing`
- Cartões de módulos com estado visual e feedback via toast

## Rodando em desenvolvimento

Na pasta do app:

```bash
npm install
npm run dev
```

Ou pelo monorepo:

```bash
docker compose -f docker-compose-dev.yml up -d frontend-admin
```

App local: `http://localhost:5174`

## Ambiente

O projeto usa variáveis via Vite.

Arquivo versionado:

```bash
.env.example
```

Arquivo local ignorado pelo Git:

```bash
.env
```

Variáveis atuais:

```bash
VITE_API_URL=/api
VITE_API_PROXY_TARGET=http://localhost:8000
BRAIN_API_PROXY_TARGET=http://localhost:8001
NEXUS_PROXY_TARGET=http://localhost:8002
```

Nenhuma credencial sensível deve ser commitada em `.env`.
