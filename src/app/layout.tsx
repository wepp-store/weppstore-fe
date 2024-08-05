import {
  ClientToastProvider,
  ClientNextUIProvider,
  ClientQueryClientProvider,
  ClientProgressProvider,
} from '@/shared/providers';
import '@/shared/styles/globals.scss';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';

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
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'cyan' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  initialScale: 1,
  userScalable: false,
  width: 'device-width',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientProgressProvider>
          <ClientNextUIProvider>
            <ClientQueryClientProvider>
              <ClientToastProvider>
                {children}
                <div id="drawer-root"></div>
                <div id="modal-root"></div>
              </ClientToastProvider>
            </ClientQueryClientProvider>
          </ClientNextUIProvider>
        </ClientProgressProvider>

        <Script
          async
          src="https://cdn.jsdelivr.net/gh/ryxxn/pwa-install-prompt@main/index.js"
        />
      </body>
    </html>
  );
}
