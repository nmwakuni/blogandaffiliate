import { Hono } from 'hono';
import { eq } from 'drizzle-orm';
import { affiliateLinks, clickEvents } from '@repo/db/schema';
import { generateId } from '@repo/utils';

type Bindings = {
  ANALYTICS: AnalyticsEngineDataset;
  CACHE: KVNamespace;
};

type Variables = {
  db: any;
};

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>();

// Redirect with tracking (e.g., /links/abc123)
app.get('/:linkId', async (c) => {
  const linkId = c.req.param('linkId');
  const db = c.get('db');
  
  // Get link from database
  const link = await db
    .select()
    .from(affiliateLinks)
    .where(eq(affiliateLinks.id, linkId))
    .get();
  
  if (!link) {
    return c.json({ error: 'Link not found' }, 404);
  }
  
  // Track click
  const clickId = generateId();
  const referrer = c.req.header('referer') || null;
  const userAgent = c.req.header('user-agent') || null;
  const country = c.req.header('cf-ipcountry') || null;
  
  // Save to database
  await db.insert(clickEvents).values({
    id: clickId,
    linkId,
    referrer,
    userAgent,
    country,
    timestamp: new Date(),
  });
  
  // Increment counter in cache (fast writes)
  const cacheKey = `link:${linkId}:clicks`;
  const currentClicks = parseInt(await c.env.CACHE.get(cacheKey) || '0');
  await c.env.CACHE.put(cacheKey, (currentClicks + 1).toString());
  
  // Track in Analytics Engine
  c.env.ANALYTICS.writeDataPoint({
    blobs: [linkId, link.productName, link.provider],
    doubles: [1],
    indexes: [link.postId || ''],
  });
  
  // Redirect to affiliate URL
  return c.redirect(link.url, 302);
});

// Get link stats
app.get('/:linkId/stats', async (c) => {
  const linkId = c.req.param('linkId');
  const db = c.get('db');
  
  const link = await db
    .select()
    .from(affiliateLinks)
    .where(eq(affiliateLinks.id, linkId))
    .get();
  
  if (!link) {
    return c.json({ error: 'Link not found' }, 404);
  }
  
  // Get cached click count
  const cacheKey = `link:${linkId}:clicks`;
  const cachedClicks = await c.env.CACHE.get(cacheKey);
  
  return c.json({
    ...link,
    clicks: cachedClicks ? parseInt(cachedClicks) : link.clicks,
  });
});

export default app;
