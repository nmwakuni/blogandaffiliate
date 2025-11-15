import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { eq, desc } from 'drizzle-orm';
import { posts } from '@repo/db/schema';
import { generateId, generateSlug } from '@repo/utils';
import type { CreatePostInput } from '@repo/types';

type Bindings = {
  TURSO_DATABASE_URL: string;
  TURSO_AUTH_TOKEN: string;
};

type Variables = {
  db: any;
};

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>();

// Validation schemas
const createPostSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1),
  excerpt: z.string().optional(),
  coverImage: z.string().url().optional(),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  seoTitle: z.string().max(60).optional(),
  seoDescription: z.string().max(160).optional(),
  keywords: z.array(z.string()).default([]),
});

// Get all published posts
app.get('/', async (c) => {
  const db = c.get('db');
  
  const allPosts = await db
    .select()
    .from(posts)
    .where(eq(posts.status, 'published'))
    .orderBy(desc(posts.publishedAt));
  
  return c.json(allPosts);
});

// Get single post by slug
app.get('/:slug', async (c) => {
  const slug = c.req.param('slug');
  const db = c.get('db');
  
  const post = await db
    .select()
    .from(posts)
    .where(eq(posts.slug, slug))
    .get();
  
  if (!post) {
    return c.json({ error: 'Post not found' }, 404);
  }
  
  return c.json(post);
});

// Create new post
app.post('/', zValidator('json', createPostSchema), async (c) => {
  const data = c.req.valid('json');
  const db = c.get('db');
  
  const id = generateId();
  const slug = generateSlug(data.title);
  const now = new Date();
  
  const newPost = await db
    .insert(posts)
    .values({
      id,
      slug,
      ...data,
      createdAt: now,
      updatedAt: now,
      publishedAt: data.status === 'published' ? now : null,
    })
    .returning();
  
  return c.json(newPost[0], 201);
});

// Update post
app.put('/:id', zValidator('json', createPostSchema.partial()), async (c) => {
  const id = c.req.param('id');
  const data = c.req.valid('json');
  const db = c.get('db');
  
  const updated = await db
    .update(posts)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(posts.id, id))
    .returning();
  
  if (!updated.length) {
    return c.json({ error: 'Post not found' }, 404);
  }
  
  return c.json(updated[0]);
});

// Delete post
app.delete('/:id', async (c) => {
  const id = c.req.param('id');
  const db = c.get('db');
  
  await db
    .delete(posts)
    .where(eq(posts.id, id));
  
  return c.json({ success: true });
});

export default app;
