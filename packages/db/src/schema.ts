import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

// Posts table
export const posts = sqliteTable('posts', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  excerpt: text('excerpt'),
  coverImage: text('cover_image'),
  status: text('status').notNull().default('draft'), // draft | published | archived
  seoTitle: text('seo_title'),
  seoDescription: text('seo_description'),
  keywords: text('keywords', { mode: 'json' }).$type<string[]>().default(sql`'[]'`),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
  publishedAt: integer('published_at', { mode: 'timestamp' }),
});

// Affiliate Links table
export const affiliateLinks = sqliteTable('affiliate_links', {
  id: text('id').primaryKey(),
  postId: text('post_id').references(() => posts.id, { onDelete: 'set null' }),
  url: text('url').notNull(),
  productName: text('product_name').notNull(),
  provider: text('provider').notNull(), // vercel, hostinger, cloudflare, etc.
  clicks: integer('clicks').notNull().default(0),
  conversions: integer('conversions').notNull().default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

// Newsletter Subscribers table
export const subscribers = sqliteTable('subscribers', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  status: text('status').notNull().default('active'), // active | unsubscribed
  subscribedAt: integer('subscribed_at', { mode: 'timestamp' }).notNull(),
  unsubscribedAt: integer('unsubscribed_at', { mode: 'timestamp' }),
});

// Click tracking table (for analytics)
export const clickEvents = sqliteTable('click_events', {
  id: text('id').primaryKey(),
  linkId: text('link_id').references(() => affiliateLinks.id, { onDelete: 'cascade' }).notNull(),
  referrer: text('referrer'),
  userAgent: text('user_agent'),
  country: text('country'),
  timestamp: integer('timestamp', { mode: 'timestamp' }).notNull(),
});

// Types
export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;

export type AffiliateLink = typeof affiliateLinks.$inferSelect;
export type NewAffiliateLink = typeof affiliateLinks.$inferInsert;

export type Subscriber = typeof subscribers.$inferSelect;
export type NewSubscriber = typeof subscribers.$inferInsert;

export type ClickEvent = typeof clickEvents.$inferSelect;
export type NewClickEvent = typeof clickEvents.$inferInsert;
