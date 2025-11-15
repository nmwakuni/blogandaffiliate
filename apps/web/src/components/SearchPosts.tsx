'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from './ui/input';

interface SearchPostsProps {
  posts: any[];
}

export default function SearchPosts({ posts }: SearchPostsProps) {
  const [query, setQuery] = useState('');

  // This is a client component, but the actual filtering
  // happens in the parent component. This is just the UI.

  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search posts by title, content, or keywords..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-12 h-14 text-lg"
      />
      {query && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
          {posts.filter(post =>
            post.title.toLowerCase().includes(query.toLowerCase()) ||
            post.content.toLowerCase().includes(query.toLowerCase()) ||
            post.keywords.some((k: string) => k.toLowerCase().includes(query.toLowerCase()))
          ).length} results
        </div>
      )}
    </div>
  );
}
