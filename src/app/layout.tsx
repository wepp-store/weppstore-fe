import {
  ClientToastProvider,
  ClientNextUIProvider,
  ClientQueryClientProvider,
  ClientProgressProvider,
} from '@/shared/providers';
import '@/shared/styles/globals.scss';
import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import styles from './layout.module.css';
import { cn } from '@nextui-org/theme';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Wepp Store',
  description:
    'A simple pwa store where you can find various web applications and games.',
  authors: [{ name: 'dochi', url: 'https://github.com/ryxxn' }],
  keywords: ['pwa', 'web', 'application', 'game', 'store', 'wepp app', 'wepp'],
  openGraph: {
    title: 'Wepp Store',
    description:
      'A simple pwa store where you can find various web applications and games.',
    type: 'website',
    // locale: 'en_US',
    url: 'https://weppstore.com',
    siteName: 'React-handle-alert',
    images: [
      {
        url: 'https://weppstore.com/logo.svg',
        alt: 'React-handle-alert',
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
    creator: 'dochi',
    // creatorId: '',
    images: [
      {
        url: 'https://weppstore.com/logo.svg',
        alt: 'React-handle-alert',
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
        className={cn(inter.className, styles.safeArea, 'min-h-svh h-full')}
      >
        <ClientProgressProvider>
          <ClientNextUIProvider>
            <ClientQueryClientProvider>
              <ClientToastProvider>{children}</ClientToastProvider>
            </ClientQueryClientProvider>
          </ClientNextUIProvider>
        </ClientProgressProvider>

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
