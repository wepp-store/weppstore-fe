import {
  ClientToastProvider,
  ClientNextUIProvider,
  ClientQueryClientProvider,
  ClientProgressProvider,
} from '@/shared/providers';
import '@/app/globals.css';
import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import styles from './layout.module.css';
import { cn } from '@nextui-org/theme';
import { ThemeProvider } from 'next-themes';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Wepp Store',
  description:
    'A simple pwa store where you can find various web applications and games.',
  authors: [{ name: 'ryxxn', url: 'https://github.com/ryxxn' }],
  keywords: [
    'pwa',
    'web',
    'application',
    'game',
    'store',
    'wepp app',
    'wepp',
    'wepp store',
    'pwa store',
  ],
  openGraph: {
    title: 'Wepp Store',
    description:
      'A simple pwa store where you can find various web applications and games.',
    type: 'website',
    // locale: 'en_US',
    url: 'https://weppstore.com',
    siteName: 'Wepp Store',
    images: [
      {
        url: 'https://weppstore.com/logo.svg',
        alt: 'Wepp Store',
        width: 500,
        height: 500,
      },
    ],
  },
  twitter: {
    title: 'Wepp Store',
    description:
      'A simple pwa store where you can find various web applications and games.',
    site: 'https://weppstore.com',
    // siteId: '', // string;
    creator: 'ryxxn',
    // creatorId: '',
    images: [
      {
        url: 'https://weppstore.com/logo.svg',
        alt: 'Wepp Store',
        width: 500,
        height: 500,
      },
    ],
  },
  // @ts-ignore
  'apple-mobile-web-app-status-bar-style': 'black-translucent',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  initialScale: 1,
  userScalable: false,
  width: 'device-width',
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={cn(
          inter.className,
          styles.safeArea,
          'min-h-svh h-full',
          'dark:bg-black dark:text-slate-400'
        )}
      >
        <ThemeProvider attribute="class">
          <ClientProgressProvider>
            <ClientNextUIProvider>
              <ClientQueryClientProvider>
                <ClientToastProvider>{children}</ClientToastProvider>
              </ClientQueryClientProvider>
            </ClientNextUIProvider>
          </ClientProgressProvider>
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && (
          <GoogleAnalytics gaId="G-X8PDBBD3R5" />
        )}

        <Script
          async
          src="https://cdn.jsdelivr.net/gh/ryxxn/pwa-install-prompt@main/index.js"
        />
      </body>
    </html>
  );
}
