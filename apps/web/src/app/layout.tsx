import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Link from 'next/link';
import './globals.css';
import { generateMetadata as genMeta, generateWebsiteSchema, generateOrganizationSchema } from '@/lib/seo';
import StructuredData from '@/components/StructuredData';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

export const metadata: Metadata = genMeta({
  title: 'EdgeStack - AI-Powered Affiliate Blog Platform',
  description: 'Create stunning blog content with AI, track affiliate links, and grow your revenue. Built with Next.js 15, Hono, Cloudflare Workers, and Gemini AI.',
  url: baseUrl,
  type: 'website',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <StructuredData data={generateWebsiteSchema()} />
        <StructuredData data={generateOrganizationSchema()} />
      </head>
      <body className={inter.className}>
        <div className="relative">
          {/* Gradient background effects */}
          <div className="fixed inset-0 -z-10 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>

          {/* Navigation */}
          <nav className="glass sticky top-0 z-50 border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <Link href="/" className="text-2xl font-bold text-gradient hover:scale-105 transition-transform">
                  ✨ EdgeStack
                </Link>

                <div className="flex items-center gap-6">
                  <Link href="/blog" className="text-sm font-medium hover:text-primary transition-colors">
                    Blog
                  </Link>
                  <Link href="/admin" className="text-sm font-medium hover:text-primary transition-colors">
                    Admin
                  </Link>
                  <Link
                    href="/admin/posts/generate"
                    className="px-4 py-2 bg-gradient-primary text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    Generate Post
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          {/* Main content */}
          <main className="min-h-screen">{children}</main>

          {/* Footer */}
          <footer className="border-t mt-20 glass">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="col-span-1 md:col-span-2">
                  <h3 className="text-xl font-bold text-gradient mb-4">EdgeStack</h3>
                  <p className="text-muted-foreground text-sm">
                    AI-powered affiliate blog platform. Create stunning content with Gemini AI,
                    track affiliate links, and grow your audience.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Quick Links</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
                    <li><Link href="/admin" className="hover:text-primary transition-colors">Admin</Link></li>
                    <li><Link href="/admin/posts/generate" className="hover:text-primary transition-colors">Generate Post</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Resources</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><a href="https://nextjs.org" className="hover:text-primary transition-colors">Next.js</a></li>
                    <li><a href="https://hono.dev" className="hover:text-primary transition-colors">Hono</a></li>
                    <li><a href="https://cloudflare.com" className="hover:text-primary transition-colors">Cloudflare</a></li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
                <p>© 2025 EdgeStack. Built with Next.js 15, Hono, Cloudflare Workers & Gemini AI.</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
