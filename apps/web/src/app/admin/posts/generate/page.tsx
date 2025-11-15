'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function GeneratePostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<any>(null);
  const [formData, setFormData] = useState({
    topic: '',
    keywords: '',
    targetWordCount: 1500,
    tone: 'technical' as 'professional' | 'casual' | 'technical',
    includeCodeExamples: true,
  });

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const keywords = formData.keywords.split(',').map(k => k.trim()).filter(Boolean);
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ai/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          keywords,
        }),
      });

      if (!response.ok) throw new Error('Failed to generate content');

      const data = await response.json();
      setGeneratedContent(data);
    } catch (error) {
      alert('Failed to generate content: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async () => {
    if (!generatedContent) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: generatedContent.title,
          content: generatedContent.content,
          excerpt: generatedContent.excerpt,
          seoTitle: generatedContent.seoTitle,
          seoDescription: generatedContent.seoDescription,
          keywords: generatedContent.suggestedKeywords,
          status: 'draft', // Save as draft first
        }),
      });

      if (!response.ok) throw new Error('Failed to create post');

      alert('Post created as draft! Review it before publishing.');
      router.push('/admin/posts');
    } catch (error) {
      alert('Failed to create post: ' + (error as Error).message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">🤖 Generate Post with AI</h1>
        <p className="text-gray-600">Let Gemini AI create a blog post for you</p>
      </div>

      {!generatedContent ? (
        <form onSubmit={handleGenerate} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Topic *
            </label>
            <input
              type="text"
              value={formData.topic}
              onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
              placeholder="e.g., Deploy Next.js to Cloudflare Workers"
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Keywords (comma separated)
            </label>
            <input
              type="text"
              value={formData.keywords}
              onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
              placeholder="nextjs, cloudflare, deployment"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Target Word Count
              </label>
              <input
                type="number"
                value={formData.targetWordCount}
                onChange={(e) => setFormData({ ...formData, targetWordCount: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border rounded-lg"
                min="500"
                max="5000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Tone
              </label>
              <select
                value={formData.tone}
                onChange={(e) => setFormData({ ...formData, tone: e.target.value as any })}
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="technical">Technical</option>
                <option value="professional">Professional</option>
                <option value="casual">Casual</option>
              </select>
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="codeExamples"
              checked={formData.includeCodeExamples}
              onChange={(e) => setFormData({ ...formData, includeCodeExamples: e.target.checked })}
              className="mr-2"
            />
            <label htmlFor="codeExamples" className="text-sm">
              Include code examples
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Generating... (may take 30-60 seconds)' : '🤖 Generate with AI'}
          </button>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800 font-medium">✅ Content generated successfully!</p>
            <p className="text-sm text-green-600 mt-1">Review the content below and publish when ready.</p>
          </div>

          <div className="border rounded-lg p-6 bg-white">
            <h2 className="text-2xl font-bold mb-4">{generatedContent.title}</h2>
            
            <div className="space-y-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">SEO Title:</span>
                <p className="text-gray-600">{generatedContent.seoTitle}</p>
              </div>
              
              <div>
                <span className="font-medium text-gray-700">SEO Description:</span>
                <p className="text-gray-600">{generatedContent.seoDescription}</p>
              </div>
              
              <div>
                <span className="font-medium text-gray-700">Excerpt:</span>
                <p className="text-gray-600">{generatedContent.excerpt}</p>
              </div>
              
              <div>
                <span className="font-medium text-gray-700">Keywords:</span>
                <div className="flex gap-2 mt-1">
                  {generatedContent.suggestedKeywords?.map((keyword: string) => (
                    <span key={keyword} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <h3 className="font-semibold mb-3">Content Preview:</h3>
              <div className="prose max-w-none text-sm bg-gray-50 p-4 rounded max-h-96 overflow-y-auto">
                <pre className="whitespace-pre-wrap font-sans">{generatedContent.content}</pre>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handlePublish}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              💾 Save as Draft
            </button>
            <button
              onClick={() => setGeneratedContent(null)}
              className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300"
            >
              ↻ Generate Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
