import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { subscribers } from '@repo/db/schema';
import { generateId } from '@repo/utils';

type Bindings = {
  RESEND_API_KEY: string;
};

type Variables = {
  db: any;
};

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>();

const subscribeSchema = z.object({
  email: z.string().email(),
  source: z.string().optional(),
});

// Subscribe to newsletter
app.post('/subscribe', zValidator('json', subscribeSchema), async (c) => {
  const { email, source } = c.req.valid('json');
  const db = c.get('db');
  
  // Check if already subscribed
  const existing = await db
    .select()
    .from(subscribers)
    .where(eq(subscribers.email, email))
    .get();
  
  if (existing) {
    if (existing.status === 'active') {
      return c.json({ message: 'Already subscribed' }, 200);
    }
    
    // Reactivate if previously unsubscribed
    await db
      .update(subscribers)
      .set({
        status: 'active',
        unsubscribedAt: null,
      })
      .where(eq(subscribers.email, email));
    
    return c.json({ message: 'Resubscribed successfully' });
  }
  
  // Create new subscriber
  const id = generateId();
  await db.insert(subscribers).values({
    id,
    email,
    status: 'active',
    subscribedAt: new Date(),
    unsubscribedAt: null,
  });
  
  // Send welcome email via Resend
  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${c.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'newsletter@yourdomain.com',
        to: email,
        subject: 'Welcome to our newsletter!',
        html: `<h1>Thanks for subscribing!</h1><p>You'll receive our latest posts and updates.</p>`,
      }),
    });
  } catch (error) {
    console.error('Failed to send welcome email:', error);
  }
  
  return c.json({ message: 'Subscribed successfully' }, 201);
});

// Unsubscribe
app.post('/unsubscribe', zValidator('json', z.object({
  email: z.string().email(),
})), async (c) => {
  const { email } = c.req.valid('json');
  const db = c.get('db');
  
  await db
    .update(subscribers)
    .set({
      status: 'unsubscribed',
      unsubscribedAt: new Date(),
    })
    .where(eq(subscribers.email, email));
  
  return c.json({ message: 'Unsubscribed successfully' });
});

export default app;
