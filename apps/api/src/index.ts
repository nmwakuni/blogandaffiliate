import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { createDbClient } from '@repo/db';
import posts from './routes/posts';
import links from './routes/links';
import ai from './routes/ai';
import newsletter from './routes/newsletter';

// Environment types
type Bindings = {
  TURSO_DATABASE_URL: string;
  TURSO_AUTH_TOKEN: string;
  GEMINI_API_KEY: string;
  RESEND_API_KEY: string;
  BETTER_AUTH_SECRET: string;
  IMAGES: R2Bucket;
  CACHE: KVNamespace;
  ANALYTICS: AnalyticsEngineDataset;
  ENVIRONMENT: string;
};

type Variables = {
  db: ReturnType<typeof createDbClient>;
};

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>();

// Middleware
app.use('*', logger());
app.use('*', cors({
  origin: ['http://localhost:3000', 'https://yourdomain.com'],
  credentials: true,
}));

// Initialize database for each request
app.use('*', async (c, next) => {
  c.set('db', createDbClient(c.env.TURSO_DATABASE_URL, c.env.TURSO_AUTH_TOKEN));
  await next();
});

// Health check
app.get('/health', (c) => {
  return c.json({ 
    status: 'ok', 
    environment: c.env.ENVIRONMENT,
    timestamp: new Date().toISOString()
  });
});

// Routes
app.route('/posts', posts);
app.route('/links', links);
app.route('/ai', ai);
app.route('/newsletter', newsletter);

// 404 handler
app.notFound((c) => {
  return c.json({ error: 'Not found' }, 404);
});

// Error handler
app.onError((err, c) => {
  console.error('Error:', err);
  return c.json({ 
    error: err.message || 'Internal server error' 
  }, 500);
});

export default app;
