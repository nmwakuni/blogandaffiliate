# 🚀 Quick Reference Card

## Essential Commands

### Development
```bash
pnpm install          # Install all dependencies
pnpm dev              # Run both frontend + API
pnpm dev:web          # Frontend only (localhost:3000)
pnpm dev:api          # API only (localhost:8787)
```

### Database
```bash
pnpm db:generate      # Generate migrations from schema
pnpm db:push          # Apply migrations to database
pnpm db:studio        # Open visual database editor
```

### Build & Deploy
```bash
pnpm build            # Build all apps
pnpm build:web        # Build frontend only
pnpm deploy:api       # Deploy API to Cloudflare Workers
```

## Project Structure Quick Map

```
affiliate-blog/
├── apps/
│   ├── web/                    # 🖥️  Frontend (Next.js)
│   │   ├── src/app/           # Pages (App Router)
│   │   │   ├── page.tsx       # Homepage
│   │   │   ├── blog/          # Blog routes
│   │   │   └── layout.tsx     # Root layout
│   │   └── src/lib/           # API client
│   │
│   └── api/                    # ⚡ Backend (Hono)
│       ├── src/index.ts        # Main app
│       ├── src/routes/         # API endpoints
│       │   ├── posts.ts        # Blog CRUD
│       │   ├── ai.ts           # AI generation
│       │   ├── links.ts        # Affiliate tracking
│       │   └── newsletter.ts   # Email subscriptions
│       └── wrangler.toml       # Cloudflare config
│
├── packages/                   # 📦 Shared code
│   ├── types/                  # TypeScript interfaces
│   ├── db/                     # Database schema
│   └── utils/                  # Helper functions
│
├── README.md                   # Full documentation
├── SETUP.md                    # Deployment checklist
└── package.json                # Monorepo scripts
```

## API Endpoints

### Posts
- `GET /posts` - List all published posts
- `GET /posts/:slug` - Get single post
- `POST /posts` - Create new post
- `PUT /posts/:id` - Update post
- `DELETE /posts/:id` - Delete post

### AI Generation
- `POST /ai/generate` - Generate full blog post
- `POST /ai/outline` - Generate outline only

### Affiliate Links
- `GET /links/:linkId` - Redirect with tracking
- `GET /links/:linkId/stats` - Get click stats

### Newsletter
- `POST /newsletter/subscribe` - Add subscriber
- `POST /newsletter/unsubscribe` - Remove subscriber

## Environment Variables

### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL=http://localhost:8787
NEXT_PUBLIC_URL=http://localhost:3000
```

### API (Cloudflare Secrets)
```bash
TURSO_DATABASE_URL      # Database connection
TURSO_AUTH_TOKEN        # Database auth
GEMINI_API_KEY          # AI content generation
RESEND_API_KEY          # Email service
BETTER_AUTH_SECRET      # Authentication
```

## Import Aliases

```typescript
// In any app or package:
import { Post, CreatePostInput } from '@repo/types';
import { posts, affiliateLinks } from '@repo/db/schema';
import { generateSlug, formatDate } from '@repo/utils';
```

## Common Development Tasks

### Create a New Post via API
```bash
curl -X POST http://localhost:8787/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Post",
    "content": "# Hello\n\nContent here...",
    "status": "published"
  }'
```

### Generate Content with AI
```bash
curl -X POST http://localhost:8787/ai/generate \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "Next.js Deployment",
    "keywords": ["nextjs", "vercel", "deployment"]
  }'
```

### Add Database Column
1. Edit `packages/db/src/schema.ts`
2. Run `pnpm db:generate`
3. Run `pnpm db:push`

### Add API Route
1. Create `apps/api/src/routes/myroute.ts`
2. Export Hono app
3. Mount in `apps/api/src/index.ts`:
   ```typescript
   import myroute from './routes/myroute';
   app.route('/myroute', myroute);
   ```

### Add Frontend Page
1. Create `apps/web/src/app/mypage/page.tsx`
2. Access at `/mypage` (automatic routing)

## Troubleshooting

### API not connecting
```bash
# Check if API is running
curl http://localhost:8787/health

# Should return: {"status":"ok"}
```

### Database errors
```bash
# Reset database
cd packages/db
pnpm db:push --force

# Or recreate
turso db destroy affiliate-blog
turso db create affiliate-blog
```

### Build errors
```bash
# Clean everything
pnpm clean
rm -rf node_modules
pnpm install
```

### Type errors
```bash
# Ensure all packages are built
pnpm build

# Check TypeScript
pnpm lint
```

## Deployment Checklist

- [ ] Set up Turso database
- [ ] Get Gemini API key
- [ ] Get Resend API key  
- [ ] Configure Cloudflare R2 bucket
- [ ] Set all Cloudflare secrets
- [ ] Deploy API: `pnpm deploy:api`
- [ ] Deploy frontend to Vercel
- [ ] Test production endpoints
- [ ] Create first post
- [ ] Monitor analytics

## Useful Links

- **Turso**: https://turso.tech
- **Gemini AI**: https://makersuite.google.com
- **Resend**: https://resend.com
- **Cloudflare**: https://dash.cloudflare.com
- **Vercel**: https://vercel.com/dashboard
- **Drizzle**: https://orm.drizzle.team

## Free Tier Limits

| Service | Limit | Good For |
|---------|-------|----------|
| Cloudflare Workers | 100k req/day | 3M+ req/month |
| Turso | 9GB storage | Millions of posts |
| Gemini | 1M tokens/month | ~1,500 posts |
| R2 | 10GB storage | Thousands of images |
| Resend | 100 emails/day | Small newsletter |

## Support

1. Check error logs in Cloudflare dashboard
2. Review `README.md` for detailed docs
3. Verify environment variables
4. Test endpoints with curl
5. Check database with Drizzle Studio

---

**Pro Tip**: Bookmark this file for quick reference during development!
