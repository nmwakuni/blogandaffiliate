import type { Metadata } from 'next';

interface SEOProps {
  title: string;
  description: string;
  url?: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: Date;
  modifiedTime?: Date;
  authors?: string[];
  tags?: string[];
  section?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
const siteName = 'EdgeStack';
const defaultImage = `${baseUrl}/og-image.png`;
const twitterHandle = '@edgestack'; // Update with your Twitter handle

export function generateMetadata({
  title,
  description,
  url,
  image,
  type = 'website',
  publishedTime,
  modifiedTime,
  authors,
  tags,
  section,
}: SEOProps): Metadata {
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  const pageUrl = url || baseUrl;
  const ogImage = image || defaultImage;

  const metadata: Metadata = {
    title: fullTitle,
    description,
    metadataBase: new URL(baseUrl),

    // Basic meta tags
    keywords: tags?.join(', '),
    authors: authors ? authors.map(name => ({ name })) : undefined,

    // OpenGraph
    openGraph: {
      type,
      locale: 'en_US',
      url: pageUrl,
      title: fullTitle,
      description,
      siteName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    // Twitter
    twitter: {
      card: 'summary_large_image',
      site: twitterHandle,
      creator: twitterHandle,
      title: fullTitle,
      description,
      images: [ogImage],
    },

    // Additional meta tags
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    // Verification (add your verification codes)
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    },
  };

  // Article-specific metadata
  if (type === 'article' && metadata.openGraph) {
    metadata.openGraph.type = 'article';
    (metadata.openGraph as any).article = {
      publishedTime: publishedTime?.toISOString(),
      modifiedTime: modifiedTime?.toISOString(),
      authors: authors,
      tags: tags,
      section: section,
    };
  }

  return metadata;
}

// JSON-LD Structured Data Generators
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: baseUrl,
    description: 'AI-powered blog platform for affiliate marketing',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/blog?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteName,
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    sameAs: [
      // Add your social media profiles
      'https://twitter.com/edgestack',
      'https://github.com/edgestack',
    ],
  };
}

export function generateArticleSchema({
  title,
  description,
  url,
  image,
  publishedTime,
  modifiedTime,
  authors = ['EdgeStack Team'],
  tags = [],
}: {
  title: string;
  description: string;
  url: string;
  image?: string;
  publishedTime?: Date;
  modifiedTime?: Date;
  authors?: string[];
  tags?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    image: image || defaultImage,
    datePublished: publishedTime?.toISOString(),
    dateModified: modifiedTime?.toISOString() || publishedTime?.toISOString(),
    author: authors.map(name => ({
      '@type': 'Person',
      name,
    })),
    publisher: {
      '@type': 'Organization',
      name: siteName,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
    url,
    keywords: tags.join(', '),
    articleSection: 'Technology',
    inLanguage: 'en-US',
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
