import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Zap, Rocket, BarChart3 } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20 py-20 sm:py-32">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center space-y-8">
            <Badge variant="secondary" className="px-4 py-2">
              <Zap className="w-4 h-4 mr-2 inline" />
              Modern Edge Computing
            </Badge>
            
            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight">
              <span className="text-gradient">EdgeStack</span>
            </h1>
            
            <p className="text-2xl sm:text-3xl font-semibold text-foreground/90 max-w-3xl mx-auto">
              Modern Tools for Edge Computing
            </p>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tutorials, guides & resources for building blazing-fast web applications 
              with Cloudflare Workers, Next.js, and cutting-edge deployment strategies.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="bg-gradient-edge text-white" asChild>
                <Link href="/blog">
                  Read the Blog
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Decorative gradient orbs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-edge-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-stack-500/20 rounded-full blur-3xl" />
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why EdgeStack?</h2>
            <p className="text-muted-foreground text-lg">
              Learn from real-world examples and deploy with confidence
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-edge flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Edge-First Architecture</CardTitle>
                <CardDescription>
                  Deploy to Cloudflare's global network for sub-50ms response times worldwide
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-stack-500 to-edge-500 flex items-center justify-center mb-4">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Modern Stack Tutorials</CardTitle>
                <CardDescription>
                  Next.js 15, Hono, Turso, and the latest tools for building production apps
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-edge-600 to-stack-600 flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Performance-Focused</CardTitle>
                <CardDescription>
                  Deep dives into optimization, caching strategies, and real-world benchmarks
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Build at the Edge?</h2>
          <p className="text-muted-foreground text-lg mb-8">
            Join developers learning to deploy faster, scale globally, and optimize for performance.
          </p>
          <Button size="lg" className="bg-gradient-edge text-white" asChild>
            <Link href="/blog">
              Explore Tutorials
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
