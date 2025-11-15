# 🎛️ Admin Dashboard Guide

## Overview

The admin dashboard provides a complete interface to manage your blog content, generate posts with AI, and track affiliate performance.

## Access

Navigate to: `http://localhost:3000/admin` (development) or `https://yourdomain.com/admin` (production)

**Note**: Currently no authentication is implemented. You'll want to add Better Auth or similar before deploying to production.

## Pages

### 📊 Dashboard (`/admin`)

Main overview with:
- **Statistics Cards**: Total posts, subscribers, affiliate clicks
- **Quick Actions**: 
  - Create new post manually
  - Generate post with AI
  - Manage existing posts
  - View analytics

### 📝 Manage Posts (`/admin/posts`)

View all your blog posts in one place:
- **List View**: All posts with title, excerpt, status, and date
- **Status Badges**: Visual indicators for draft/published
- **Quick Actions**: Edit or delete posts
- **Filter Options**: View drafts, published, or all posts

Features:
- See post status at a glance (draft/published)
- View publish dates and keywords
- Quick edit/delete actions
- Empty state guides you to create first post

### ✍️ Create Post (`/admin/posts/new`)

Manual post creation form with:

**Content Fields:**
- Title (required)
- Content - markdown editor (required)
- Excerpt - brief summary
- Cover image URL

**SEO Fields:**
- SEO Title (max 60 chars)
- SEO Description (max 160 chars)
- Keywords (comma-separated)
- Character counters for SEO fields

**Publishing:**
- Save as draft (not visible to public)
- Publish immediately (live on site)

**Tips:**
- Use markdown formatting in content
- Leave SEO fields empty to auto-generate from content
- Add keywords for better discoverability

### 🤖 Generate with AI (`/admin/posts/generate`)

AI-powered content generation using Gemini:

**Step 1: Configure Generation**
- **Topic**: What your post is about (e.g., "Deploy Next.js to Cloudflare")
- **Keywords**: Target SEO keywords (comma-separated)
- **Word Count**: Target length (500-5000 words)
- **Tone**: Choose between:
  - Technical (detailed, code-heavy)
  - Professional (business-focused)
  - Casual (friendly, conversational)
- **Code Examples**: Toggle to include/exclude code blocks

**Step 2: Review Generated Content**
After generation (30-60 seconds), you'll see:
- Generated title
- SEO-optimized title and description
- Excerpt for preview
- Suggested keywords
- Full content preview

**Step 3: Save**
- **Save as Draft**: Review and edit before publishing
- **Generate Again**: Try different parameters

**Best Practices:**
- Be specific with topics (good: "Deploy Next.js 15 to Cloudflare Workers with Hono", bad: "Next.js")
- Include 3-5 relevant keywords
- Review content before publishing (AI isn't perfect!)
- Check for affiliate link placeholders marked `[AFFILIATE: product-name]`
- Replace placeholders with actual short URLs

### 📊 Analytics (`/admin/analytics`)

Track affiliate link performance:

**Overview Cards:**
- Total clicks across all links
- Conversion count
- Top performing product
- Overall click-through rate (CTR)

**Link Performance Table:**
- Product name
- Total clicks
- Conversions
- Click-through rate
- Trend indicators

**Tracking Details:**
Each click captures:
- Referrer URL (where click came from)
- Country (via Cloudflare geo-data)
- User agent (browser/device)
- Timestamp

## Workflows

### Creating Your First Post (Manual)

1. Go to `/admin/posts/new`
2. Enter title: "Getting Started with Next.js 15"
3. Write content in markdown:
```markdown
# Introduction

Next.js 15 brings amazing new features...

## New Features

1. Improved performance
2. Better DX

Check out [Vercel hosting](https://yourdomain.com/links/vercel-abc) for deployment!
```
4. Add excerpt: "Explore the new features in Next.js 15"
5. Set SEO title (or leave blank for auto-generation)
6. Add keywords: nextjs, react, web-development
7. Choose status: Published
8. Click "Create Post"

### Creating Your First Post (AI)

1. Go to `/admin/posts/generate`
2. Enter topic: "Getting Started with Next.js 15"
3. Add keywords: nextjs, react, tutorial
4. Set word count: 1500
5. Choose tone: Technical
6. Enable code examples
7. Click "Generate with AI"
8. Wait 30-60 seconds
9. Review generated content
10. Click "Save as Draft"
11. Edit if needed, then publish from `/admin/posts`

### Adding Affiliate Links

When writing content, use short link format:

```markdown
Check out [Vercel hosting](https://yourdomain.com/links/vercel-abc)
```

To create the short link:
1. Use API to create affiliate link (see API docs)
2. Get short link ID
3. Use in posts
4. Clicks auto-tracked

## API Integration

The admin dashboard calls these API endpoints:

```typescript
// Get all posts
GET /posts

// Create post
POST /posts
{
  title: string,
  content: string,
  excerpt?: string,
  status: 'draft' | 'published',
  // ... other fields
}

// Generate with AI
POST /ai/generate
{
  topic: string,
  keywords: string[],
  targetWordCount: number,
  tone: 'technical' | 'professional' | 'casual',
  includeCodeExamples: boolean
}

// Update post
PUT /posts/:id

// Delete post
DELETE /posts/:id
```

## Environment Variables

Required for admin to work:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8787  # Your Hono API
```

## Security Considerations

⚠️ **IMPORTANT**: The admin dashboard has NO authentication currently!

**Before deploying to production:**

1. **Add Authentication**
   - Use Better Auth (recommended)
   - Or implement custom auth
   - Example: Add `middleware.ts` to protect `/admin/*` routes

2. **Secure API Endpoints**
   - Add API key or JWT validation
   - Only allow authenticated users to create/edit/delete

3. **Rate Limiting**
   - Use Arcjet for rate limiting
   - Prevent AI API abuse
   - Protect against spam

**Quick Auth Setup (Better Auth):**

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if user is authenticated
  const isAuthenticated = request.cookies.get('auth-token');
  
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
```

## Customization

### Adding New Admin Pages

1. Create file in `apps/web/src/app/admin/[page]/page.tsx`
2. Add link in dashboard (`/admin/page.tsx`)
3. Implement functionality

### Modifying Styles

Admin uses Tailwind CSS. Colors:
- Primary: `blue-600`
- Success: `green-600`
- Warning: `yellow-600`
- Danger: `red-600`
- AI/Special: `purple-600`

### Adding Features

Common additions:
- Image upload (integrate with R2)
- Post scheduling
- Bulk operations
- Advanced analytics
- Category management
- Tag management

## Troubleshooting

### "Failed to fetch posts"
- Check `NEXT_PUBLIC_API_URL` is correct
- Ensure API is running
- Check browser console for errors

### AI generation fails
- Verify `GEMINI_API_KEY` is set in Workers
- Check you haven't hit rate limits (1500/day)
- Try shorter content or simpler topics

### Posts not appearing
- Check post status is "published"
- Verify slug is unique
- Check database connection

### Analytics showing no data
- Ensure affiliate links are being used
- Check Cloudflare Analytics Engine is configured
- Verify KV namespace is set up

## Best Practices

### Content Creation
- **AI-Generated**: Always review before publishing
- **Manual**: Use markdown for formatting
- **SEO**: Fill in SEO fields for better rankings
- **Keywords**: 5-10 relevant keywords per post

### Publishing Strategy
1. Generate or write draft
2. Review and edit
3. Optimize SEO fields
4. Add affiliate links
5. Publish
6. Monitor analytics

### Affiliate Strategy
- Use affiliate links naturally in content
- Don't over-promote
- Disclose affiliate relationships
- Track what works (analytics)

## Next Steps

1. **Add Authentication** (critical for production)
2. **Customize Design** (match your brand)
3. **Add More Features**:
   - Post scheduling
   - Image uploads
   - Bulk editing
   - Advanced analytics
4. **Set up Monitoring**:
   - Cloudflare analytics
   - Error tracking
   - Uptime monitoring

---

**Pro Tip**: Create a content calendar and use AI generation to draft posts in bulk, then review and publish 2-3x per week for consistent growth!
