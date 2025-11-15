import type { Post, CreatePostInput, ApiResponse } from '@repo/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787';

export async function getPosts(): Promise<Post[]> {
  const res = await fetch(`${API_URL}/posts`, {
    next: { revalidate: 60 }, // Cache for 60 seconds
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }
  
  return res.json();
}

export async function getPost(slug: string): Promise<Post> {
  const res = await fetch(`${API_URL}/posts/${slug}`, {
    next: { revalidate: 60 },
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch post');
  }
  
  return res.json();
}

export async function createPost(data: CreatePostInput): Promise<Post> {
  const res = await fetch(`${API_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!res.ok) {
    throw new Error('Failed to create post');
  }
  
  return res.json();
}

export async function subscribeNewsletter(email: string): Promise<ApiResponse> {
  const res = await fetch(`${API_URL}/newsletter/subscribe`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });
  
  return res.json();
}

export async function generatePostWithAI(topic: string, keywords: string[]) {
  const res = await fetch(`${API_URL}/ai/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ topic, keywords }),
  });
  
  if (!res.ok) {
    throw new Error('Failed to generate content');
  }
  
  return res.json();
}
