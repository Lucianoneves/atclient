# Controle de Atendimento (atclient)

Sistema web para gerenciamento de chamados de atendimento e clientes, desenvolvido com Next.js, autenticação via Google e banco de dados MongoDB.

## Resumo do projeto (até o momento)

O **atclient** é um sistema de **Controle de Atendimento** em fase inicial de desenvolvimento. A ideia é permitir que usuários autenticados gerenciem **chamados (tickets)** e **clientes** de forma organizada.

### O que já está implementado

| Área | Status | Detalhes |
|------|--------|----------|
| **Frontend** | Parcial | Next.js 16 com App Router, Tailwind CSS 4, layout responsivo |
| **Autenticação** | Funcional | NextAuth.js com login via Google e sessão persistida no banco |
| **Banco de dados** | Modelado | Prisma ORM + MongoDB com modelos de domínio e autenticação |
| **Dashboard** | Parcial | Página protegida com listagem de chamados (dados estáticos por enquanto) |
| **Clientes** | Inicial | Rota `/dashboard/customer` criada, ainda sem CRUD |
| **CRUD de chamados** | Pendente | Botão "Abrir Chamado" aponta para `/dashboard/new` (rota ainda não criada) |

### Stack tecnológica

- **Next.js 16** — App Router, Server Components, rotas de API
- **React 19** — UI com React Compiler
- **TypeScript** — tipagem estática
- **Tailwind CSS 4** — estilização utilitária
- **NextAuth.js v4** — autenticação com Google OAuth
- **Prisma 6.19** — ORM com MongoDB
- **MongoDB** — banco de dados NoSQL

### Modelo de dados (Prisma)

```
User ──┬── Account / Session (NextAuth)
       ├── Ticket[] (chamados)
       └── Customer[] (clientes)

Customer ── Ticket[]
```

- **User** — usuário autenticado (Google)
- **Customer** — cliente cadastrado (nome, email, telefone, endereço)
- **Ticket** — chamado de atendimento (nome, descrição, status)
- **Account, Session, VerificationToken** — tabelas exigidas pelo NextAuth/Prisma Adapter

### Estrutura de rotas

| Rota | Descrição | Proteção |
|------|-----------|----------|
| `/` | Página inicial (hero) | Pública |
| `/dashboard` | Lista de chamados | Requer login |
| `/dashboard/customer` | Lista de clientes | Requer login |
| `/dashboard/new` | Novo chamado | Planejada (ainda não existe) |
| `/api/auth/[...nextauth]` | Endpoints do NextAuth | API |

### Fluxo de autenticação

1. Usuário clica no ícone de cadeado no header
2. `signIn()` redireciona para o Google OAuth
3. NextAuth cria/atualiza `User`, `Account` e `Session` no MongoDB via Prisma Adapter
4. Callback de `session` adiciona o `id` do usuário à sessão
5. Páginas do dashboard usam `getServerSession()` e redirecionam para `/` se não autenticado

---

## Como rodar o projeto

### Pré-requisitos

- Node.js 18+
- Conta no [MongoDB Atlas](https://www.mongodb.com/atlas) (ou MongoDB local)
- Credenciais OAuth no [Google Cloud Console](https://console.cloud.google.com/)

### Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="mongodb+srv://usuario:senha@cluster.mongodb.net/atclient?retryWrites=true&w=majority"
GOOGLE_CLIENT_ID="seu-client-id"
GOOGLE_CLIENT_SECRET="seu-client-secret"
NEXTAUTH_SECRET="uma-string-aleatoria-segura"
NEXTAUTH_URL="http://localhost:3000"
```

### Instalação

```bash
npm install
npx prisma generate
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

> **Nota:** A URL do banco é configurada em `prisma.config.ts`. No Prisma 6.19+, evite duplicar `url` no `schema.prisma` se o linter apontar erro — mantenha apenas `provider` no datasource do schema.

---

## Estrutura de pastas

```
src/
├── app/
│   ├── api/auth/[...nextauth]/   # Rotas de autenticação
│   ├── dashboard/
│   │   ├── components/           # Header e TicketItem do dashboard
│   │   ├── customer/             # Página de clientes
│   │   ├── layout.tsx            # Layout com navegação do dashboard
│   │   └── page.tsx              # Página principal do dashboard
│   ├── layout.tsx                # Layout raiz (Header + AuthProvider)
│   └── page.tsx                  # Página inicial
├── components/
│   ├── container/                # Wrapper de largura máxima
│   └── header/                   # Header global com login/logout
├── lib/
│   ├── auth.ts                   # Configuração do NextAuth
│   └── prisma.ts                 # Cliente Prisma (singleton)
├── providers/
│   └── auth.tsx                  # SessionProvider do NextAuth
├── @types/
│   └── next-auth.d.ts            # Extensão de tipos da sessão
└── generated/prisma/             # Cliente Prisma gerado
prisma/
└── schema.prisma                 # Modelos do banco de dados
```

---

## Próximos passos sugeridos

- [ ] Conectar listagem de chamados ao banco (substituir dados estáticos em `TicketItem`)
- [ ] Criar página `/dashboard/new` para abrir chamados
- [ ] Implementar CRUD de clientes
- [ ] Associar chamados e clientes ao usuário logado (`userId`)
- [ ] Implementar ações de editar e excluir chamados
- [ ] Corrigir singleton do Prisma em `src/lib/prisma.ts` (lógica dev/prod invertida)

---

## Perguntas para fixação do aprendizado

Responda por escrito (pode ser em um caderno ou arquivo separado). Tente explicar com suas próprias palavras antes de consultar o código.

### Next.js e React

1. Qual a diferença entre um **Server Component** e um **Client Component**? Dê um exemplo de cada um neste projeto.
2. Por que `src/app/dashboard/page.tsx` pode usar `getServerSession` diretamente, mas `src/components/header/index.tsx` precisa de `'use client'`?
3. O que faz o arquivo `layout.tsx` no App Router? Qual a diferença entre o layout raiz (`src/app/layout.tsx`) e o do dashboard (`src/app/dashboard/layout.tsx`)?
4. O que acontece quando um usuário não autenticado tenta acessar `/dashboard`? Explique o fluxo passo a passo.
5. Para que serve o componente `Container`? Por que centralizar a largura máxima em um componente reutilizável?

### Autenticação (NextAuth)

6. O que é o arquivo `src/app/api/auth/[...nextauth]/route.ts` e por que exporta `GET` e `POST`?
7. Qual o papel do `PrismaAdapter` em `src/lib/auth.ts`?
8. Por que precisamos do `AuthProvider` com `SessionProvider` no layout raiz?
9. Qual a diferença entre `signIn()` / `signOut()` (client) e `getServerSession()` (server)?
10. Por que estendemos a interface `Session` em `src/@types/next-auth.d.ts`? O que ganhamos ao adicionar `id` ao `session.user`?
11. Quais variáveis de ambiente são obrigatórias para o login com Google funcionar?

### Prisma e MongoDB

12. Por que os IDs dos modelos usam `@db.ObjectId` e `@map("_id")`?
13. Explique a relação entre `User`, `Customer` e `Ticket`. Um usuário pode ter vários clientes e vários chamados?
14. O que significa `onDelete: SetNull` na relação entre `Ticket` e `Customer`?
15. Qual a diferença entre configurar `DATABASE_URL` no `schema.prisma` e no `prisma.config.ts`?
16. Por que o Prisma Client é gerado em `src/generated/prisma` em vez do `node_modules` padrão?
17. O que é o padrão singleton em `src/lib/prisma.ts` e por que ele é importante em desenvolvimento?

### Tailwind CSS

18. O que faz a classe `hidden sm:table-cell` usada na tabela de chamados?
19. Como o Tailwind está configurado neste projeto (versão, arquivo de config)?

### Arquitetura e boas práticas

20. Por que os dados do `TicketItem` ainda estão fixos ("Mercado Silva", "Aberto") em vez de vir do banco?
21. Se você fosse buscar os chamados do usuário logado no dashboard, qual query Prisma usaria?
22. O link "Abrir Chamado" aponta para `/dashboard/new` — o que você precisaria criar para essa rota funcionar?
23. Como você associaria um novo chamado ao `userId` da sessão atual?
24. Identifique um possível bug na lógica de `src/lib/prisma.ts` (dev vs production). Como corrigir?

### Conceitos gerais

25. O que é OAuth e por que usamos o Google como provider?
26. Qual a diferença entre autenticação (quem é você) e autorização (o que você pode fazer)?
27. Por que MongoDB foi escolhido como banco? Quais vantagens e desvantagens em relação a um SQL (PostgreSQL)?

---

## Scripts disponíveis

```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build de produção
npm run start    # Servidor de produção
npx prisma generate   # Gera o Prisma Client
npx prisma studio     # Interface visual do banco
```

## Licença

Projeto privado — uso educacional.
#   a t c l i e n t  
 