import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { generateMetaDescription, extractKeywords } from '@repo/utils';

type Bindings = {
  GEMINI_API_KEY: string;
};

const app = new Hono<{ Bindings: Bindings }>();

const generateSchema = z.object({
  topic: z.string().min(1),
  keywords: z.array(z.string()).default([]),
  targetWordCount: z.number().default(1500),
  tone: z.enum(['professional', 'casual', 'technical']).default('technical'),
  includeCodeExamples: z.boolean().default(true),
});

app.post('/generate', zValidator('json', generateSchema), async (c) => {
  const data = c.req.valid('json');
  const genAI = new GoogleGenerativeAI(c.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
  
  const prompt = `Write a technical blog post about: "${data.topic}"

Requirements:
- Target word count: ${data.targetWordCount} words
- Tone: ${data.tone}
- Target keywords: ${data.keywords.join(', ')}
- ${data.includeCodeExamples ? 'Include practical code examples' : 'No code examples needed'}
- Use Markdown formatting
- Include proper headings (H2, H3)
- Add a brief introduction and conclusion
- SEO-optimized content
- Natural placement for affiliate links to hosting/tools (mark with [AFFILIATE: product-name])

Format the response as JSON:
{
  "title": "Compelling title with primary keyword",
  "content": "Full markdown content",
  "excerpt": "Brief 1-2 sentence summary",
  "seoTitle": "SEO-optimized title (max 60 chars)",
  "seoDescription": "Meta description (max 160 chars)",
  "suggestedKeywords": ["keyword1", "keyword2", ...]
}`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    // Try to parse JSON response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not parse AI response');
    }
    
    const generated = JSON.parse(jsonMatch[0]);
    
    // Fallback generation for missing fields
    if (!generated.excerpt) {
      generated.excerpt = generateMetaDescription(generated.content);
    }
    if (!generated.seoDescription) {
      generated.seoDescription = generated.excerpt;
    }
    if (!generated.suggestedKeywords || generated.suggestedKeywords.length === 0) {
      generated.suggestedKeywords = extractKeywords(generated.content, 10);
    }
    
    return c.json(generated);
  } catch (error) {
    console.error('AI generation error:', error);
    return c.json({ 
      error: 'Failed to generate content',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
});

// Generate outline only
app.post('/outline', zValidator('json', z.object({
  topic: z.string().min(1),
})), async (c) => {
  const { topic } = c.req.valid('json');
  const genAI = new GoogleGenerativeAI(c.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
  
  const prompt = `Create a detailed outline for a technical blog post about: "${topic}"
  
Include:
- Main title
- Introduction points
- 5-7 main sections with H2 headings
- 2-3 subsections for each main section (H3)
- Conclusion points
- Suggested call-to-action

Format as a simple markdown outline.`;

  try {
    const result = await model.generateContent(prompt);
    return c.json({ outline: result.response.text() });
  } catch (error) {
    return c.json({ error: 'Failed to generate outline' }, 500);
  }
});

export default app;
