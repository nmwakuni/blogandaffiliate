# Affiliate Blog - Next.js + Hono + Cloudflare Monorepo

A modern affiliate blog built with Next.js, Hono API on Cloudflare Workers, Turso database, and Gemini AI for content generation.

## 🏗️ Architecture

```
Frontend: Next.js 15 → Deployed to Vercel
API: Hono → Deployed to Cloudflare Workers  
Database: Turso (SQLite)
Images: Cloudflare R2
AI: Gemini 2.0 Flash
Email: Resend
Analytics: Cloudflare Analytics Engine
```

## 📁 Project Structure

```
affiliate-blog/
├── apps/
│   ├── web/              # Next.js frontend
│   │   ├── src/
│   │   │   ├── app/      # App Router pages
│   │   │   ├── components/
│   │   │   └── lib/      # API client
│   │   └── package.json
│   │
│   └── api/              # Hono API on Workers
│       ├── src/
│       │   ├── routes/   # API routes
│       │   └── services/ # Business logic
│       ├── wrangler.toml
│       └── package.json
│
├── packages/
│   ├── types/            # Shared TypeScript types
│   ├── db/               # Database schema & client
│   └── utils/            # Shared utilities
│
└── scripts/              # CLI tools
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm 8+
- Cloudflare account (free tier)
- Turso account (free tier)
- Gemini API key (free tier)

### 1. Clone and Install

```bash
git clone <your-repo>
cd affiliate-blog
pnpm install
```

### 2. Set Up Turso Database

```bash
# Install Turso CLI
curl -sSfL https://get.tur.so/install.sh | bash

# Create database
turso db create affiliate-blog

# Get credentials
turso db show affiliate-blog --url
turso db tokens create affiliate-blog

# Run migrations
cd packages/db
pnpm generate
pnpm push
```

### 3. Configure Environment Variables

#### For API (Cloudflare Workers):

```bash
cd apps/api

# Add secrets
wrangler secret put TURSO_DATABASE_URL
wrangler secret put TURSO_AUTH_TOKEN
wrangler secret put GEMINI_API_KEY
wrangler secret put RESEND_API_KEY
wrangler secret put BETTER_AUTH_SECRET

# Create R2 bucket
wrangler r2 bucket create blog-images

# Create KV namespace
wrangler kv:namespace create CACHE
# Copy the ID from output into wrangler.toml
```

#### For Frontend (Next.js):

```bash
cd apps/web

# Create .env.local
cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:8787
NEXT_PUBLIC_URL=http://localhost:3000
EOF
```

### 4. Development

```bash
# From root - runs both apps
pnpm dev

# Or run separately:
pnpm dev:web    # Next.js on http://localhost:3000
pnpm dev:api    # Hono API on http://localhost:8787
```

### 5. Database Management

```bash
# Generate migrations after schema changes
pnpm db:generate

# Apply migrations
pnpm db:push

# Open Drizzle Studio
pnpm db:studio
```

## 🌐 Deployment

### Deploy API to Cloudflare Workers

```bash
cd apps/api
pnpm deploy

# Your API will be at:
# https://affiliate-blog-api.your-subdomain.workers.dev
```

### Deploy Frontend to Vercel

1. Push to GitHub
2. Import project in Vercel dashboard
3. Set Root Directory: `apps/web`
4. Add environment variable:
   ```
   NEXT_PUBLIC_API_URL=https://affiliate-blog-api.your-subdomain.workers.dev
   ```
5. Deploy!

## 🤖 AI Content Generation

### Using the API Directly

```bash
curl -X POST http://localhost:8787/ai/generate \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "Deploy Next.js to Cloudflare Workers",
    "keywords": ["nextjs", "cloudflare", "deployment"],
    "targetWordCount": 1500,
    "tone": "technical",
    "includeCodeExamples": true
  }'
```

### Using the CLI Script

```bash
# Create scripts/generate-post.ts for CLI usage
pnpm generate:post
```

## 📝 Creating Your First Post

1. Generate content with AI:
```bash
curl -X POST http://localhost:8787/ai/generate \
  -H "Content-Type: application/json" \
  -d '{"topic": "Getting Started with Hono", "keywords": ["hono", "api"]}'
```

2. Create post via API:
```bash
curl -X POST http://localhost:8787/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Getting Started with Hono",
    "content": "...",
    "status": "published"
  }'
```

3. View at: `http://localhost:3000/blog/getting-started-with-hono`

## 🔗 Affiliate Link Tracking

### Create Short Link

```bash
curl -X POST http://localhost:8787/links \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://vercel.com/signup?ref=yourcode",
    "productName": "Vercel",
    "provider": "vercel"
  }'
```

### Use in Posts

```markdown
Check out [Vercel hosting](https://yourdomain.com/links/abc123)
```

Every click is tracked with:
- Referrer
- Country
- User agent
- Timestamp

## 📊 Free Tier Limits

- **Cloudflare Workers**: 100,000 requests/day
- **Turso**: 9GB storage, 1B row reads/month
- **Gemini AI**: 1M tokens/month (1,500 requests/day)
- **Cloudflare R2**: 10GB storage, 1M Class A operations
- **Resend**: 100 emails/day

Should be enough for 100k+ monthly visitors!

## 🛠️ Tech Stack

### Frontend
- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- React Markdown

### Backend
- Hono 4
- Cloudflare Workers
- Drizzle ORM
- Zod validation

### Database & Storage
- Turso (SQLite)
- Cloudflare R2 (images)
- Cloudflare KV (cache)

### AI & Services
- Gemini 2.0 Flash
- Resend (email)
- Cloudflare Analytics Engine

## 📚 Package Scripts

```bash
# Development
pnpm dev              # Run all apps
pnpm dev:web          # Next.js only
pnpm dev:api          # Hono API only

# Build
pnpm build            # Build all apps
pnpm build:web        # Next.js only
pnpm build:api        # API only

# Database
pnpm db:generate      # Generate migrations
pnpm db:push          # Apply migrations
pnpm db:studio        # Open Drizzle Studio

# Deployment
pnpm deploy:api       # Deploy to Workers

# Utilities
pnpm generate:post    # Generate post with AI
pnpm lint             # Lint all packages
pnpm clean            # Clean all builds
```

## 🎯 Next Steps

1. **Customize Design**: Edit `apps/web/src/app/layout.tsx`
2. **Add More Routes**: Create API routes in `apps/api/src/routes/`
3. **Enhance AI**: Improve prompts in `apps/api/src/routes/ai.ts`
4. **Add Auth**: Implement Better Auth for admin panel
5. **SEO**: Add sitemap, robots.txt, meta tags
6. **Analytics**: Integrate PostHog or similar
7. **Newsletter**: Set up Resend audience

## 🐛 Troubleshooting

### API not connecting
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Ensure API is running on port 8787
- Check CORS settings in `apps/api/src/index.ts`

### Database errors
- Verify Turso credentials
- Run `pnpm db:push` to apply migrations
- Check schema in `packages/db/src/schema.ts`

### Deployment issues
- Ensure all secrets are set in Cloudflare
- Check wrangler.toml configuration
- Verify R2 bucket and KV namespace IDs

## 📄 License

MIT

## 🙏 Credits

Built with ❤️ using:
- [Next.js](https://nextjs.org)
- [Hono](https://hono.dev)
- [Cloudflare](https://cloudflare.com)
- [Turso](https://turso.tech)
- [Gemini AI](https://ai.google.dev)
