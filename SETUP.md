# Setup Checklist

Follow this checklist to get your affiliate blog up and running.

## ☐ Phase 1: Local Setup (15 minutes)

- [ ] Clone repository
- [ ] Run `pnpm install`
- [ ] Install Turso CLI: `curl -sSfL https://get.tur.so/install.sh | bash`
- [ ] Install Wrangler CLI: `pnpm add -g wrangler`

## ☐ Phase 2: Database Setup (10 minutes)

- [ ] Create Turso database: `turso db create affiliate-blog`
- [ ] Get database URL: `turso db show affiliate-blog --url`
- [ ] Create auth token: `turso db tokens create affiliate-blog`
- [ ] Copy `.env.example` to `.env`
- [ ] Add Turso credentials to `.env`
- [ ] Run migrations: `cd packages/db && pnpm push`

## ☐ Phase 3: API Services (15 minutes)

### Gemini AI
- [ ] Get API key from https://makersuite.google.com/app/apikey
- [ ] Test with: `curl https://generativelanguage.googleapis.com/v1/models?key=YOUR_KEY`

### Cloudflare
- [ ] Sign up at https://cloudflare.com (free)
- [ ] Login with Wrangler: `wrangler login`
- [ ] Create R2 bucket: `wrangler r2 bucket create blog-images`
- [ ] Create KV namespace: `wrangler kv:namespace create CACHE`
- [ ] Update KV IDs in `apps/api/wrangler.toml`

### Resend (Email)
- [ ] Sign up at https://resend.com (free)
- [ ] Get API key from dashboard
- [ ] Verify domain (or use resend.dev for testing)

## ☐ Phase 4: Configure Secrets (10 minutes)

```bash
cd apps/api

# Add all secrets
wrangler secret put TURSO_DATABASE_URL
wrangler secret put TURSO_AUTH_TOKEN
wrangler secret put GEMINI_API_KEY
wrangler secret put RESEND_API_KEY
wrangler secret put BETTER_AUTH_SECRET  # Generate with: openssl rand -base64 32
```

## ☐ Phase 5: Frontend Setup (5 minutes)

```bash
cd apps/web

# Create environment file
cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:8787
NEXT_PUBLIC_URL=http://localhost:3000
EOF
```

## ☐ Phase 6: Test Locally (10 minutes)

```bash
# From root directory
pnpm dev

# Should see:
# - Next.js running on http://localhost:3000
# - Hono API running on http://localhost:8787
```

### Test API Endpoints

- [ ] Health: `curl http://localhost:8787/health`
- [ ] Posts: `curl http://localhost:8787/posts`
- [ ] AI Generate: 
```bash
curl -X POST http://localhost:8787/ai/generate \
  -H "Content-Type: application/json" \
  -d '{"topic": "Test Post", "keywords": ["test"]}'
```

### Test Frontend
- [ ] Open http://localhost:3000
- [ ] Check homepage loads
- [ ] Navigate to /blog
- [ ] Verify API connection (should show posts or "No posts yet")

## ☐ Phase 7: Create First Post (10 minutes)

### Option A: Via AI
```bash
# Generate content
curl -X POST http://localhost:8787/ai/generate \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "Getting Started with Next.js 15",
    "keywords": ["nextjs", "react", "tutorial"]
  }' > generated.json

# Create post (extract content from generated.json)
curl -X POST http://localhost:8787/posts \
  -H "Content-Type: application/json" \
  -d @generated.json
```

### Option B: Manual
```bash
curl -X POST http://localhost:8787/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Post",
    "content": "# Hello World\n\nThis is my first post!",
    "status": "published"
  }'
```

- [ ] Verify post appears at http://localhost:3000/blog

## ☐ Phase 8: Deploy to Production (20 minutes)

### Deploy API
```bash
cd apps/api
pnpm deploy

# Note the URL: https://affiliate-blog-api.your-subdomain.workers.dev
```

### Deploy Frontend (Vercel)
- [ ] Push to GitHub
- [ ] Go to https://vercel.com/new
- [ ] Import your repository
- [ ] Root Directory: `apps/web`
- [ ] Add environment variable:
  - `NEXT_PUBLIC_API_URL`: Your Workers API URL
  - `NEXT_PUBLIC_URL`: Your Vercel URL (will be provided)
- [ ] Deploy!

### Update Production Database
```bash
# Point to production
export TURSO_DATABASE_URL=libsql://your-production-db.turso.io
export TURSO_AUTH_TOKEN=your-production-token

cd packages/db
pnpm push
```

## ☐ Phase 9: Custom Domain (Optional, 15 minutes)

### For API (Cloudflare)
- [ ] Add domain to Cloudflare
- [ ] Create Worker route: `api.yourdomain.com/*`
- [ ] Update `apps/api/wrangler.toml` routes
- [ ] Redeploy API

### For Frontend (Vercel)
- [ ] Add custom domain in Vercel dashboard
- [ ] Configure DNS records
- [ ] Update `NEXT_PUBLIC_URL` environment variable

## ☐ Phase 10: Post-Launch (Ongoing)

### Content
- [ ] Create content calendar
- [ ] Set up AI generation workflow
- [ ] Add affiliate links
- [ ] Configure link tracking

### SEO
- [ ] Submit sitemap to Google Search Console
- [ ] Add Google Analytics (optional)
- [ ] Optimize meta tags
- [ ] Add structured data

### Monitoring
- [ ] Check Cloudflare Analytics
- [ ] Monitor API performance
- [ ] Track affiliate clicks
- [ ] Review error logs

### Growth
- [ ] Set up newsletter
- [ ] Promote first posts
- [ ] Join relevant communities
- [ ] Build backlinks

## 🎉 You're Done!

Your affiliate blog is now live at:
- Frontend: https://yourdomain.com
- API: https://api.yourdomain.com (or .workers.dev)

## 📈 Success Metrics (First 30 Days)

- [ ] 10 published posts
- [ ] 1,000 page views
- [ ] 50 newsletter subscribers
- [ ] First affiliate click
- [ ] First conversion 🎯

## 🆘 Need Help?

- Check README.md for detailed documentation
- Review error logs in Cloudflare dashboard
- Test API endpoints with curl
- Verify environment variables are set correctly

## 💡 Pro Tips

1. **Content First**: Focus on quality posts before optimizing infrastructure
2. **SEO Takes Time**: Don't expect traffic immediately (3-6 months is normal)
3. **Affiliate Strategy**: Be genuine - only promote tools you actually use
4. **Monitor Costs**: Set up billing alerts in Cloudflare (though free tier is generous)
5. **Backup Database**: `turso db shell affiliate-blog .dump > backup.sql`

---

**Total Setup Time**: ~90 minutes
**Cost**: $0/month (using all free tiers)
**Expected Traffic**: Handles 100k+ monthly visitors
