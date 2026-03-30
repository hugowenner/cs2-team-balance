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
    default: 'No Fear CS2 - Gerador de Times', // Título padrão para a página inicial
    template: '%s | No Fear CS2', // Template para outras páginas (ex: "Histórico | No Fear CS2")
  },
  description: 'Balanceador de times determinístico para Counter-Strike 2 da comunidade No Fear. Crie partidas justas com algoritmo de seed reproduzível.',
  
  // --- Palavras-chave para SEO ---
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

  // --- Autor e Publicador ---
  authors: [{ name: 'No Fear Community' }],
  publisher: 'No Fear Community',

  // --- Favicon e Ícones ---
  // IMPORTANTE: Você precisa adicionar um arquivo `icon.png` ou `favicon.ico` na pasta `app`
  // Se não tiver, comente a linha abaixo ou substitua pela URL do seu ícone.
  icons: {
    icon: '/icon.png', // <-- Substitua pelo nome do seu arquivo de ícone na pasta `app`
    shortcut: '/favicon.ico', // Opcional, se você tiver um .ico
    apple: '/apple-touch-icon.png', // Opcional, para ícones na tela inicial de dispositivos Apple
  },

  // --- Metadados para Redes Sociais (Open Graph) ---
  openGraph: {
    title: 'No Fear CS2 - Gerador de Times',
    description: 'Crie times balanceados para suas partidas de CS2 de forma rápida e justa.',
    url: 'https://seu-dominio-aqui.com', // <-- IMPORTANTE: Substitua pela URL do seu site
    siteName: 'No Fear CS2',
    type: 'website',
    locale: 'pt_BR',
    images: [
      {
        url: '/og-image.png', // <-- Crie uma imagem (1200x630px) para previews no Facebook/LinkedIn
        width: 1200,
        height: 630,
        alt: 'No Fear CS2 - Gerador de Times',
      },
    ],
  },

  // --- Metadados para o Twitter ---
  twitter: {
    card: 'summary_large_image',
    title: 'No Fear CS2 - Gerador de Times',
    description: 'Crie times balanceados para suas partidas de CS2 de forma rápida e justa.',
    images: ['/og-image.png'], // Usa a mesma imagem do Open Graph
  },

  // --- Outras configurações ---
  other: {
    'theme-color': '#080c14', // Cor da barra de endereço em navegadores móveis
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