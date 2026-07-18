'use client';

import React, { useState } from 'react';
import { PageShell } from '@/components/shared/PageShell';
import { Card, CardHeader, CardContent } from '@/components/ui/card/Card';
import { Input } from '@/components/ui/input/Input';
import { Textarea } from '@/components/ui/textarea/Textarea';
import { Button } from '@/components/ui/button/Button';
import { Mail, MessageSquare, Landmark } from 'lucide-react';
import { SocialConfig } from '@/config/social';

export function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setSending(true);
    // Simulate form submission
    setTimeout(() => {
      setSending(false);
      setSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
    }, 1000);
  };

  return (
    <PageShell
      title="Get in Touch"
      description="Collaborate on software projects, discuss Linux training classes, or reach out for speaking events."
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <h3 className="text-base font-bold text-zinc-100">Send a Message</h3>
            </CardHeader>
            <CardContent>
              {success ? (
                <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
                  Thank you! Your message has been sent successfully. I will get back to you shortly.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider font-mono">Your Name</label>
                    <Input
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider font-mono">Email Address</label>
                    <Input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider font-mono">Message</label>
                    <Textarea
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message details here..."
                      rows={5}
                    />
                  </div>
                  <Button type="submit" variant="primary" className="w-full sm:w-auto" isLoading={sending}>
                    Send Message
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-widest font-mono">Contact Details</h3>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-zinc-400">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <a href={`mailto:${SocialConfig.email}`} className="hover:underline text-zinc-300">
                  {SocialConfig.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4 text-amber-500 shrink-0" />
                <a href={SocialConfig.linkedin} target="_blank" className="hover:underline text-zinc-300">
                  LinkedIn Profile
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Landmark className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="text-zinc-300">Pune, Maharashtra, India</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageShell>
  );
}
