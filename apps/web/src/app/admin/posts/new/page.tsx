'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X } from 'lucide-react';
import TiptapEditor from '@/components/TiptapEditor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function NewPostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    coverImage: '',
    status: 'draft' as 'draft' | 'published',
    seoTitle: '',
    seoDescription: '',
    keywords: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const keywords = formData.keywords.split(',').map(k => k.trim()).filter(Boolean);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          keywords,
        }),
      });

      if (!response.ok) throw new Error('Failed to create post');

      const post = await response.json();
      router.push(`/blog/${post.slug}`);
    } catch (error) {
      alert('Failed to create post: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gradient mb-2">Create New Post</h1>
        <p className="text-muted-foreground">Write and publish your next amazing article</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Post Details</CardTitle>
            <CardDescription>Basic information about your post</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Title <span className="text-destructive">*</span>
              </label>
              <Input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter an engaging title..."
                className="text-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Content <span className="text-destructive">*</span>
              </label>
              <TiptapEditor
                content={formData.content}
                onChange={(content) => setFormData({ ...formData, content })}
                placeholder="Start writing your amazing content..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Excerpt
              </label>
              <Textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="A brief summary of your post..."
                rows={3}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Optional. Will be auto-generated if left empty.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Cover Image URL
              </label>
              <Input
                type="url"
                value={formData.coverImage}
                onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>SEO Settings</CardTitle>
            <CardDescription>Optimize your post for search engines</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                SEO Title
              </label>
              <Input
                type="text"
                value={formData.seoTitle}
                onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                placeholder="SEO-optimized title (max 60 chars)"
                maxLength={60}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {formData.seoTitle.length}/60 characters
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                SEO Description
              </label>
              <Textarea
                value={formData.seoDescription}
                onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                placeholder="Meta description for search results (max 160 chars)"
                rows={3}
                maxLength={160}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {formData.seoDescription.length}/160 characters
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Keywords
              </label>
              <Input
                type="text"
                value={formData.keywords}
                onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                placeholder="nextjs, react, tutorial (comma separated)"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Publishing Options</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <label className="block text-sm font-medium mb-3">
                Status
              </label>
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant={formData.status === 'draft' ? 'default' : 'outline'}
                  onClick={() => setFormData({ ...formData, status: 'draft' })}
                >
                  Save as Draft
                </Button>
                <Button
                  type="button"
                  variant={formData.status === 'published' ? 'default' : 'outline'}
                  onClick={() => setFormData({ ...formData, status: 'published' })}
                  className={formData.status === 'published' ? 'bg-gradient-primary text-white' : ''}
                >
                  Publish Now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4 sticky bottom-4 bg-background/80 backdrop-blur-sm p-4 rounded-lg border">
          <Button
            type="submit"
            disabled={loading}
            className="flex-1 bg-gradient-primary text-white hover:opacity-90 h-12 text-lg"
          >
            <Save className="w-5 h-5 mr-2" />
            {loading ? 'Saving...' : formData.status === 'published' ? 'Publish Post' : 'Save Draft'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/admin/posts')}
            className="h-12"
          >
            <X className="w-5 h-5 mr-2" />
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
