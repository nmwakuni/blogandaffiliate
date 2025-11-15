'use client';

import { useState } from 'react';
import { Mail, CheckCircle, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/newsletter/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to subscribe');
      }

      setSubscribed(true);
      setEmail('');
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  if (subscribed) {
    return (
      <div className="glass rounded-2xl p-8 text-center animate-slide-up">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary mb-4">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold mb-2">You're subscribed!</h3>
        <p className="text-muted-foreground">
          Check your inbox for a confirmation email. Welcome to the community!
        </p>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-primary">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold">Stay in the Loop</h3>
          <p className="text-muted-foreground">
            Get the latest posts and updates delivered to your inbox
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email..."
            className="flex-1 h-12"
            required
          />
          <Button
            type="submit"
            disabled={loading}
            className="bg-gradient-primary text-white hover:opacity-90 h-12 px-8"
          >
            <Mail className="w-4 h-4 mr-2" />
            {loading ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </div>

        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}

        <p className="text-xs text-muted-foreground">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </form>
    </div>
  );
}
