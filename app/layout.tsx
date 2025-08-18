import './globals.css';
import type { Metadata } from 'next';
import { Urbanist } from 'next/font/google';

const urbanist = Urbanist({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AI Call Bot - Conversational Platform',
  description: 'Build intelligent call bots that understand, respond, and automate customer conversations in real time.',
  keywords: 'AI, call bot, conversational AI, automation, customer service',
  authors: [{ name: 'AI Call Bot Team' }],
  openGraph: {
    title: 'AI Call Bot - Conversational Platform',
    description: 'Build intelligent call bots that understand, respond, and automate customer conversations in real time.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={urbanist.className}>{children}</body>
    </html>
  );
}