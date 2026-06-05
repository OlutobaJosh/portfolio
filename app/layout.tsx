import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Joshua Asiribo — AI-Powered Web Developer',
  description: 'Full-stack developer specialising in Next.js, Supabase, Stripe and AI integration. Based in Nigeria, working globally.',
  keywords: 'web developer, Next.js, React, Supabase, AI integration, Nigeria, freelance',
  openGraph: {
    title: 'Joshua Asiribo — AI-Powered Web Developer',
    description: 'I build, debug, deploy and integrate AI into full-stack web applications.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
