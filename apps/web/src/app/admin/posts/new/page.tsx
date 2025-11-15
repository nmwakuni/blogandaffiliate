'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewPostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    coverImage: '',
    seoTitle: '',
    seoDescription: '',
    keywords: '',
    status: 'draft' as 'draft' | 'published',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const keywords = formData.keywords
        .split(',')
        .map(k => k.trim())
        .filter(Boolean);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          keywords,
        }),
      });

      if (!response.ok) throw new Error('Failed to create post');

      alert('Post created successfully!');
      router.push('/admin/posts');
    } catch (error) {
      alert('Failed to create post: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">✍️ Create New Post</h1>
        <p className="text-gray-600">Write a blog post manually</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Your Post Title"
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Content * (Markdown supported)
          </label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            placeholder="# Introduction&#10;&#10;Your content here...&#10;&#10;## Section 1&#10;&#10;More content..."
            className="w-full px-4 py-2 border rounded-lg font-mono text-sm"
            rows={20}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Excerpt
          </label>
          <textarea
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            placeholder="Brief summary of your post (1-2 sentences)"
            className="w-full px-4 py-2 border rounded-lg"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Cover Image URL
          </label>
          <input
            type="url"
            value={formData.coverImage}
            onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
            placeholder="https://example.com/image.jpg"
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div className="border-t pt-6">
          <h3 className="font-semibold mb-4">SEO Settings</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                SEO Title (max 60 characters)
              </label>
              <input
                type="text"
                value={formData.seoTitle}
                onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                placeholder="Leave empty to use post title"
                maxLength={60}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.seoTitle.length}/60 characters
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                SEO Description (max 160 characters)
              </label>
              <textarea
                value={formData.seoDescription}
                onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                placeholder="Leave empty to use excerpt"
                maxLength={160}
                className="w-full px-4 py-2 border rounded-lg"
                rows={3}
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.seoDescription.length}/160 characters
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Keywords (comma separated)
              </label>
              <input
                type="text"
                value={formData.keywords}
                onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                placeholder="nextjs, cloudflare, tutorial"
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <label className="block text-sm font-medium mb-2">
            Status
          </label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="draft">Draft (not visible to public)</option>
            <option value="published">Published (visible to all)</option>
          </select>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Creating...' : '💾 Create Post'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 border rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
