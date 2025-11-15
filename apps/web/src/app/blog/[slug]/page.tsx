import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getPost, getPosts } from '@/lib/api-client';
import { formatDate } from '@repo/utils';

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
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
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  let post;
  
  try {
    post = await getPost(params.slug);
  } catch (error) {
    notFound();
  }
  
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 text-gray-600">
          <time dateTime={post.publishedAt?.toISOString()}>
            {post.publishedAt ? formatDate(post.publishedAt) : 'Draft'}
          </time>
          {post.keywords.length > 0 && (
            <div className="flex gap-2">
              {post.keywords.map((keyword) => (
                <span key={keyword} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                  {keyword}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>
      
      <div className="prose prose-lg max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </div>
      
      <footer className="mt-12 pt-8 border-t">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Stay Updated</h3>
          <p className="text-gray-600 mb-4">
            Get the latest tutorials delivered to your inbox
          </p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-2 border rounded"
            />
            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              Subscribe
            </button>
          </form>
        </div>
      </footer>
    </article>
  );
}
