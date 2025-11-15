import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkles, Zap, Rocket, BarChart3, Globe, Code2, TrendingUp } from 'lucide-react';

export default function Home() {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 animate-slide-up">
            <Badge variant="secondary" className="px-4 py-2 bg-purple-500/10 border-purple-500/20">
              <Sparkles className="w-4 h-4 mr-2 inline text-purple-400" />
              AI-Powered Content Platform
            </Badge>

            <h1 className="text-6xl sm:text-8xl font-bold tracking-tight">
              <span className="text-gradient animate-glow">EdgeStack</span>
            </h1>

            <p className="text-3xl sm:text-4xl font-semibold max-w-4xl mx-auto bg-gradient-to-r from-foreground via-foreground/80 to-foreground/60 bg-clip-text text-transparent">
              Build Your Affiliate Empire with AI
            </p>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Generate stunning blog posts with Gemini AI, track affiliate conversions, and grow your revenue.
              The modern platform for content creators and marketers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Button size="lg" className="bg-gradient-primary text-white hover:opacity-90 transition-opacity group" asChild>
                <Link href="/admin/posts/generate">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate Content with AI
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2" asChild>
                <Link href="/blog">
                  Explore Blog
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-8">
              <div>
                <div className="text-3xl font-bold text-gradient">100%</div>
                <div className="text-sm text-muted-foreground">Free Tier</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gradient-blue">AI</div>
                <div className="text-sm text-muted-foreground">Powered</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gradient">Edge</div>
                <div className="text-sm text-muted-foreground">Computing</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold tracking-tight">Everything You Need</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A complete platform for building and scaling your affiliate marketing business
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="group hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <CardTitle>AI Content Generation</CardTitle>
                <CardDescription>
                  Generate SEO-optimized blog posts in seconds with Gemini 2.0 Flash. Custom tones, keywords, and formatting.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/10">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Affiliate Link Tracking</CardTitle>
                <CardDescription>
                  Smart link shortening with advanced analytics. Track clicks, conversions, and earnings in real-time.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Edge Performance</CardTitle>
                <CardDescription>
                  Deploy on Cloudflare's global network. Sub-50ms response times anywhere in the world.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Code2 className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Rich Text Editor</CardTitle>
                <CardDescription>
                  Powerful Tiptap editor with markdown support. Create beautiful, formatted content with ease.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Analytics Dashboard</CardTitle>
                <CardDescription>
                  Comprehensive analytics powered by Cloudflare. Monitor traffic, clicks, and conversions.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <CardTitle>SEO Optimized</CardTitle>
                <CardDescription>
                  Built-in SEO best practices. Auto-generated sitemaps, meta tags, and schema markup.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 bg-gradient-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Powered by Modern Tech</h2>
            <p className="text-muted-foreground text-lg">
              Built with the latest and greatest tools for performance and developer experience
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-gradient">Next.js 15</div>
              <div className="text-sm text-muted-foreground">React Framework</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-gradient-blue">Hono</div>
              <div className="text-sm text-muted-foreground">Edge API</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-gradient">Gemini AI</div>
              <div className="text-sm text-muted-foreground">Content Gen</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-gradient-blue">Turso</div>
              <div className="text-sm text-muted-foreground">Edge Database</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          <h2 className="text-5xl font-bold tracking-tight">
            Ready to Start Creating?
          </h2>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
            Join content creators earning with AI-powered affiliate marketing.
            Get started in minutes, scale to thousands of posts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" className="bg-gradient-primary text-white hover:opacity-90 transition-opacity text-lg px-8 py-6" asChild>
              <Link href="/admin/posts/generate">
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Your First Post
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-2 text-lg px-8 py-6" asChild>
              <Link href="/blog">
                Browse Examples
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
