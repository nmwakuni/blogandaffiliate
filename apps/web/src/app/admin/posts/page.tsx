import Link from 'next/link';
import { getPosts } from '@/lib/api-client';
import { formatDate } from '@repo/utils';

export default async function ManagePostsPage() {
  const posts = await getPosts();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Manage Posts</h1>
          <p className="text-gray-600">View and manage all blog posts</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/posts/generate"
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            🤖 Generate with AI
          </Link>
          <Link
            href="/admin/posts/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            ✍️ New Post
          </Link>
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12 border rounded-lg bg-gray-50">
          <p className="text-gray-600 mb-4">No posts yet. Create your first post!</p>
          <div className="flex gap-3 justify-center">
            <Link
              href="/admin/posts/generate"
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
            >
              🤖 Generate with AI
            </Link>
            <Link
              href="/admin/posts/new"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              ✍️ Write Manually
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="border rounded-lg p-6 bg-white hover:shadow-md transition">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-1">
                    <Link href={`/blog/${post.slug}`} className="hover:text-blue-600">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 text-sm">{post.excerpt}</p>
                </div>
                <div className="ml-4">
                  <span className={`px-3 py-1 rounded text-xs font-medium ${
                    post.status === 'published' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {post.status}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-4">
                  <span>
                    {post.publishedAt ? formatDate(post.publishedAt) : 'Not published'}
                  </span>
                  {post.keywords.length > 0 && (
                    <div className="flex gap-1">
                      {post.keywords.slice(0, 3).map((keyword) => (
                        <span key={keyword} className="bg-gray-100 px-2 py-0.5 rounded text-xs">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Link
                    href={`/admin/posts/edit/${post.id}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </Link>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => {
                      if (confirm('Delete this post?')) {
                        // TODO: Implement delete
                        alert('Delete functionality coming soon!');
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
