import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getPost, getPosts } from '@/lib/api-client';
import { formatDate } from '@repo/utils';
import NewsletterForm from '@/components/NewsletterForm';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock } from 'lucide-react';

export async function generateStaticParams() {
  try {
    const posts = await getPosts();
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    return [];
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const post = await getPost(params.slug);

    if (!post) return {};

    return {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt || '',
        images: post.coverImage ? [post.coverImage] : [],
      },
    };
  } catch (error) {
    return {};
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  let post;

  try {
    post = await getPost(params.slug);
  } catch (error) {
    notFound();
  }

  const readingTime = Math.ceil(post.content.split(' ').length / 200);

  return (
    <article className="animate-fade-in">
      {/* Hero Section */}
      <div className="border-b bg-gradient-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <header className="space-y-6">
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.publishedAt?.toISOString()}>
                  {post.publishedAt ? formatDate(post.publishedAt) : 'Draft'}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{readingTime} min read</span>
              </div>
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-gradient">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-xl text-muted-foreground leading-relaxed">
                {post.excerpt}
              </p>
            )}

            {post.keywords.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.keywords.map((keyword) => (
                  <Badge key={keyword} variant="secondary" className="bg-primary/10">
                    {keyword}
                  </Badge>
                ))}
              </div>
            )}
          </header>
        </div>
      </div>

      {/* Cover Image */}
      {post.coverImage && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full rounded-xl border border-border shadow-2xl"
          />
        </div>
      )}

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Newsletter CTA */}
        <div className="mt-16 pt-8 border-t">
          <NewsletterForm />
        </div>
      </div>
    </article>
  );
}
