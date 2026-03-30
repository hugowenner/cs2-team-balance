// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  // --- TÍTULO ---
  title: {
    default: 'CS2 Team Balance Tool | Create Fair Teams in Counter-Strike 2',
    template: '%s | CS2 Team Balance',
  },

  // --- DESCRIÇÃO ---
  description:
    'Free CS2 team balance tool. Automatically create fair teams in Counter-Strike 2 using a smart algorithm. Perfect for 5v5 matches.',

  // --- 🔥 VERIFICAÇÃO GOOGLE ---
  verification: {
    google: 'N6zG8YZM5BN_-dn76IPUaMAewPo8p_2vtXhOOS4aAM0',
  },

  // --- 🔥 KEYWORDS (SEO REAL) ---
  keywords: [
    'cs2 team balance',
    'cs2 team balancer',
    'balanceador cs2',
    'cs2 team generator',
    'counter strike 2 team balance',
    'cs2 5v5 team maker',
  ],

  // --- AUTOR ---
  authors: [{ name: 'No Fear Community' }],
  publisher: 'No Fear Community',

  // --- ÍCONES ---
  icons: {
    icon: '/icon.png',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },

  // --- OPEN GRAPH (REDES SOCIAIS) ---
  openGraph: {
    title: 'CS2 Team Balance Tool',
    description:
      'Create balanced teams automatically for Counter-Strike 2 matches using a smart algorithm.',
    url: 'https://cs2-team-balance.vercel.app',
    siteName: 'CS2 Team Balance',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: 'https://cs2-team-balance.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CS2 Team Balance Tool',
      },
    ],
  },

  // --- TWITTER ---
  twitter: {
    card: 'summary_large_image',
    title: 'CS2 Team Balance Tool',
    description:
      'Automatically create fair teams in Counter-Strike 2 with this free tool.',
    images: ['https://cs2-team-balance.vercel.app/og-image.png'],
  },

  // --- OUTROS ---
  other: {
    'theme-color': '#080c14',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} dark`}
    >
      <body
        className={`
          font-sans antialiased 
          bg-background text-foreground 
          min-h-screen
        `}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}