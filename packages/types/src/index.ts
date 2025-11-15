// Post types
export type PostStatus = 'draft' | 'published' | 'archived';

export interface Post {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string | null;
  coverImage: string | null;
  status: PostStatus;
  seoTitle: string | null;
  seoDescription: string | null;
  keywords: string[];
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date | null;
}

export interface CreatePostInput {
  title: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
  status?: PostStatus;
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
}

export interface UpdatePostInput extends Partial<CreatePostInput> {
  id: string;
}

// Affiliate Link types
export interface AffiliateLink {
  id: string;
  postId: string | null;
  url: string;
  productName: string;
  provider: string;
  clicks: number;
  conversions: number;
  createdAt: Date;
}

export interface CreateAffiliateLinkInput {
  postId?: string;
  url: string;
  productName: string;
  provider: string;
}

// Newsletter types
export interface Subscriber {
  id: string;
  email: string;
  status: 'active' | 'unsubscribed';
  subscribedAt: Date;
  unsubscribedAt: Date | null;
}

export interface SubscribeInput {
  email: string;
  source?: string;
}

// AI Generation types
export interface GeneratePostInput {
  topic: string;
  keywords: string[];
  targetWordCount?: number;
  tone?: 'professional' | 'casual' | 'technical';
  includeCodeExamples?: boolean;
}

export interface GeneratePostOutput {
  title: string;
  content: string;
  excerpt: string;
  seoTitle: string;
  seoDescription: string;
  suggestedKeywords: string[];
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
