import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

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

export const metadata: Metadata = {
  title: 'EdgeStack - Modern Tools for Edge Computing',
  description: 'Tutorials, guides and resources for building fast web applications with edge computing, Cloudflare Workers, and modern deployment strategies.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className={inter.className}>
        <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <a href="/" className="text-2xl font-bold text-gradient">
                EdgeStack
              </a>
              <div className="flex gap-6">
                <a href="/blog" className="hover:text-primary transition-colors">Blog</a>
                <a href="/admin" className="hover:text-primary transition-colors">Admin</a>
                <a href="/about" className="hover:text-primary transition-colors">About</a>
              </div>
            </div>
          </div>
        </nav>
        <main className="min-h-screen">{children}</main>
        <footer className="border-t mt-20 bg-muted/50">
          <div className="max-w-6xl mx-auto px-4 py-8 text-center text-muted-foreground">
            <p>© 2025 EdgeStack. Built with Next.js, Hono & Cloudflare.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
