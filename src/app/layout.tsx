// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Usando a fonte Inter, que é mais comum e limpa para este tipo de UI
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

// Configuração da fonte Inter
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap', // Melhora a performance de carregamento da fonte
});

export const metadata: Metadata = {
  // --- Título e Descrição ---
  title: {
    default: 'No Fear CS2 - Gerador de Times',
    template: '%s | No Fear CS2',
  },
  description: 'Balanceador de times determinístico para Counter-Strike 2 da comunidade No Fear. Crie partidas justas com algoritmo de seed reproduzível.',
  
  // --- 🔥 VERIFICAÇÃO GOOGLE (ADICIONAR ISSO) ---
  verification: {
    google: 'N6zG8YZM5BN_-dn76IPUaMAewPo8p_2vtXhOOS4aAM0',
  },

  // --- Palavras-chave ---
  keywords: [
    'CS2',
    'Counter-Strike 2',
    'Gerador de Times',
    'Balanceador de Times',
    'No Fear',
    '5v5',
    'Algoritmo',
    'Seed',
    'Determinístico',
  ],

  // --- Autor ---
  authors: [{ name: 'No Fear Community' }],
  publisher: 'No Fear Community',

  // --- Ícones ---
  icons: {
    icon: '/icon.png',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },

  // --- Open Graph ---
  openGraph: {
    title: 'No Fear CS2 - Gerador de Times',
    description: 'Crie times balanceados para suas partidas de CS2 de forma rápida e justa.',
    url: 'https://cs2-team-balance.vercel.app', // ⚠️ CORRIGI AQUI
    siteName: 'No Fear CS2',
    type: 'website',
    locale: 'pt_BR',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'No Fear CS2 - Gerador de Times',
      },
    ],
  },

  // --- Twitter ---
  twitter: {
    card: 'summary_large_image',
    title: 'No Fear CS2 - Gerador de Times',
    description: 'Crie times balanceados para suas partidas de CS2 de forma rápida e justa.',
    images: ['/og-image.png'],
  },

  // --- Outros ---
  other: {
    'theme-color': '#080c14',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="pt-BR" // Idioma principal do site
      suppressHydrationWarning 
      className={`${inter.variable} dark`} // Adiciona a variável da fonte e a classe 'dark' para o tema
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