# 🚀 Quick Start Guide

Get your EdgeStack affiliate blog running in 5 minutes!

---

## Prerequisites

Before you start, make sure you have:
- **Node.js 18+** installed
- **pnpm** installed (`npm install -g pnpm`)
- A **Cloudflare account** (free)
- A **Turso account** (free)
- A **Gemini API key** (free)

---

## Step 1: Environment Setup (2 minutes)

### 1.1 Create Turso Database

```bash
# Install Turso CLI
curl -sSfL https://get.tur.so/install.sh | bash

# Create database
turso db create edgestack

# Get credentials
turso db show edgestack --url
turso db tokens create edgestack
```

**Save these for later:**
- Database URL
- Auth token

### 1.2 Get Gemini API Key

1. Go to https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Save your API key

### 1.3 Get Resend API Key (Optional)

1. Go to https://resend.com
2. Sign up for free
3. Get your API key from dashboard

---

## Step 2: Configure Environment (1 minute)

### 2.1 Frontend Environment

```bash
cd apps/web
```

Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8787
NEXT_PUBLIC_URL=http://localhost:3000
```

### 2.2 API Secrets

```bash
cd ../api

# Add secrets via Wrangler
wrangler secret put TURSO_DATABASE_URL
# Paste your Turso database URL

wrangler secret put TURSO_AUTH_TOKEN
# Paste your Turso auth token

wrangler secret put GEMINI_API_KEY
# Paste your Gemini API key

wrangler secret put RESEND_API_KEY
# Paste your Resend API key (or skip if not using)

wrangler secret put BETTER_AUTH_SECRET
# Generate with: openssl rand -base64 32
```

---

## Step 3: Initialize Database (1 minute)

```bash
cd ../../packages/db
pnpm generate
pnpm push
```

This creates all the necessary tables in your Turso database.

---

## Step 4: Start Development (30 seconds)

```bash
# From project root
cd ../..
pnpm dev
```

**That's it!** Your app is now running:
- **Frontend:** http://localhost:3000
- **API:** http://localhost:8787

---

## Step 5: Create Your First Post (1 minute)

### Option A: Use AI Generation (Recommended)

1. Open http://localhost:3000
2. Click "Generate Post" in the navigation
3. Enter a topic (e.g., "Getting Started with Next.js")
4. Add keywords (e.g., "nextjs, react, tutorial")
5. Click "Generate with AI"
6. Review and publish!

### Option B: Create Manually

1. Go to http://localhost:3000/admin/posts/new
2. Use the rich text editor to write your post
3. Add SEO metadata
4. Click "Publish Post"

---

## 🎉 You're Done!

Your blog is now running with:
- ✅ Beautiful dark theme
- ✅ AI content generation
- ✅ Rich text editor
- ✅ Newsletter subscription
- ✅ SEO optimization
- ✅ Search functionality

---

## Testing Your Features

### Test AI Generation:
```bash
curl -X POST http://localhost:8787/ai/generate \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "Deploy Next.js to Cloudflare",
    "keywords": ["nextjs", "cloudflare"],
    "targetWordCount": 1500
  }'
```

### Test Newsletter:
```bash
curl -X POST http://localhost:8787/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

### Test Posts:
```bash
curl http://localhost:8787/posts
```

---

## Common Issues & Solutions

### Issue: "Cannot connect to API"
**Solution:** Make sure `NEXT_PUBLIC_API_URL` in `.env.local` is set to `http://localhost:8787`

### Issue: "Database error"
**Solution:** Run `pnpm db:push` from the `packages/db` directory

### Issue: "Gemini API error"
**Solution:** Check your API key at https://makersuite.google.com/app/apikey

### Issue: "Port already in use"
**Solution:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 8787
lsof -ti:8787 | xargs kill -9
```

---

## Next Steps

### 1. Customize Your Blog:
- Edit `apps/web/src/app/page.tsx` for homepage content
- Update site metadata in `apps/web/src/app/layout.tsx`
- Change the logo/branding

### 2. Create Content:
- Generate 5-10 posts with AI
- Manually refine and add affiliate links
- Build your content calendar

### 3. Deploy to Production:

#### Deploy API to Cloudflare:
```bash
cd apps/api
pnpm deploy
```

#### Deploy Web to Vercel:
1. Push code to GitHub
2. Import project in Vercel
3. Set root directory to `apps/web`
4. Add environment variables
5. Deploy!

---

## Helpful Commands

```bash
# Development
pnpm dev              # Start all services
pnpm dev:web          # Just Next.js
pnpm dev:api          # Just Hono API

# Database
pnpm db:generate      # Generate migrations
pnpm db:push          # Apply to database
pnpm db:studio        # Open database viewer

# Build
pnpm build            # Build everything
pnpm build:web        # Build Next.js
pnpm build:api        # Build API

# Deploy
pnpm deploy:api       # Deploy to Cloudflare
```

---

## Support

If you run into issues:
1. Check `IMPROVEMENTS_SUMMARY.md` for feature details
2. Review `SETUP.md` for comprehensive setup guide
3. Check API logs with `wrangler tail`
4. Check Next.js logs in the terminal

---

## Enjoy Your New Blog! 🎉

You now have a production-ready, AI-powered affiliate blog platform. Start creating amazing content and grow your audience!

**Happy blogging! ✨**
