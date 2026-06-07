# Taskmatic MVP Build Plan

## Stack
- **Auth:** NextAuth.js v5 (credentials provider)
- **Database:** SQLite via Prisma (local dev) → Vercel Postgres (production)
- **AI:** DeepSeek API (deepseek-v4-flash)
- **Deploy:** Vercel

## Steps
1. Install dependencies (next-auth, prisma, bcryptjs)
2. Set up Prisma schema (User, Template, Run)
3. Create API routes: /api/auth/*, /api/templates/*
4. Create pages: login, dashboard, template forms
5. Wire up DeepSeek for template execution
6. Add usage limits per plan
