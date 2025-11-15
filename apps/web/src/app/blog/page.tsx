import Link from 'next/link';
import { getPosts } from '@/lib/api-client';
import { formatDate } from '@repo/utils';

export const metadata = {
  title: 'Blog - Developer Guides & Tutorials',
  description: 'In-depth guides on Next.js, Cloudflare, and modern web development',
};

export default async function BlogPage() {
  const posts = await getPosts();
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
      
      {posts.length === 0 ? (
        <p className="text-gray-600">No posts yet. Check back soon!</p>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.id} className="border-b pb-8">
              <Link href={`/blog/${post.slug}`}>
                <h2 className="text-2xl font-semibold mb-2 hover:text-blue-600 transition">
                  {post.title}
                </h2>
              </Link>
              <p className="text-gray-600 mb-4">
                {post.excerpt || 'Read more...'}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <time dateTime={post.publishedAt?.toISOString()}>
                  {post.publishedAt ? formatDate(post.publishedAt) : 'Draft'}
                </time>
                {post.keywords.length > 0 && (
                  <div className="flex gap-2">
                    {post.keywords.slice(0, 3).map((keyword) => (
                      <span key={keyword} className="bg-gray-100 px-2 py-1 rounded text-xs">
                        {keyword}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
