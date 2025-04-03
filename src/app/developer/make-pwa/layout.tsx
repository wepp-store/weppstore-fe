import { DeveloperLayout } from '@/shared/layouts/developer';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Make PWA | Wepp Store',
  description:
    'Create and customize your PWA manifest and service worker with ease.',
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
    'make pwa',
  ],
  openGraph: {
    title: 'Make PWA | Wepp Store',
    description:
      'Create and customize your PWA manifest and service worker with ease.',
    type: 'website',
    // locale: 'en_US',
    url: 'https://weppstore.com/developer/make-pwa',
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
    title: 'Make PWA | Wepp Store',
    description:
      'Create and customize your PWA manifest and service worker with ease.',
    site: 'https://weppstore.com/developer/make-pwa',
    creator: 'ryxxn',
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

const Layout = ({ children }: React.PropsWithChildren) => {
  return <DeveloperLayout>{children}</DeveloperLayout>;
};

export default Layout;
