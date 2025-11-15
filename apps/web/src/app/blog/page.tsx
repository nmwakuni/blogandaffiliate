import Link from 'next/link';
import { getPosts } from '@/lib/api-client';
import { formatDate } from '@repo/utils';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import SearchPosts from '@/components/SearchPosts';
import { generateMetadata as genMeta } from '@/lib/seo';

const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

export const metadata = genMeta({
  title: 'Blog - Latest Articles & Tutorials',
  description: 'Explore AI-powered content, tutorials, and insights on modern web development, affiliate marketing, edge computing, and cutting-edge technologies.',
  url: `${baseUrl}/blog`,
  type: 'website',
  tags: ['blog', 'tutorials', 'web development', 'affiliate marketing', 'AI', 'Next.js', 'Cloudflare'],
});

export default async function BlogPage() {
  let posts = [];

  try {
    posts = await getPosts();
  } catch (error) {
    console.error('Failed to fetch posts:', error);
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="border-b bg-gradient-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <h1 className="text-6xl font-bold tracking-tight mb-6">
              <span className="text-gradient">Latest Articles</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Tutorials, guides, and insights on building modern web applications with AI,
              edge computing, and cutting-edge technologies.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Search */}
        <div className="mb-12">
          <SearchPosts posts={posts} />
        </div>

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <div className="max-w-md mx-auto space-y-4">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-2xl font-bold">No posts yet</h3>
                <p className="text-muted-foreground">
                  Check back soon for amazing content, or{' '}
                  <Link href="/admin/posts/generate" className="text-primary hover:underline">
                    generate your first post with AI
                  </Link>
                  .
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => {
              const readingTime = Math.ceil(post.content.split(' ').length / 200);

              return (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                  <Card className="h-full hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
                    {post.coverImage && (
                      <div className="aspect-video overflow-hidden rounded-t-lg">
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <time dateTime={post.publishedAt?.toISOString()}>
                            {post.publishedAt ? formatDate(post.publishedAt) : 'Draft'}
                          </time>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{readingTime} min</span>
                        </div>
                      </div>

                      <CardTitle className="group-hover:text-gradient transition-all">
                        {post.title}
                      </CardTitle>

                      <CardDescription className="line-clamp-2">
                        {post.excerpt || 'Click to read more...'}
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      {post.keywords.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.keywords.slice(0, 3).map((keyword) => (
                            <Badge key={keyword} variant="secondary" className="bg-primary/10 text-xs">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center text-sm text-primary group-hover:gap-2 transition-all">
                        Read more
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
