# Backend (Node + Prisma)

Este diretório contém um esqueleto de backend em Node/Express com Prisma.

Passos rápidos:

1. Copie a variável `DATABASE_URL` do Supabase para o arquivo `.env` neste diretório.
2. Instale dependências: `npm install`.
3. Gere o cliente Prisma: `npm run prisma:generate`.
4. Rode migrations (quando pronto): `npm run prisma:migrate`.
5. Inicie em desenvolvimento: `npm run dev`.

Endpoints básicos:

- `GET /api/products` — lista produtos
- `POST /api/contact` — recebe formulário de contato
- `POST /api/auth/register` — registrar usuário (ex.: admin)
- `POST /api/auth/login` — login simples (apenas exemplo)

Observação: a autenticação e armazenamento de senhas estão simplificados aqui; substitua por método seguro (hash/sessions/JWT) antes de usar em produção.