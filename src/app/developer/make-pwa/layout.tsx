import { DeveloperLayout } from '@/shared/layouts/developer';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Make PWA',
  description:
    'Create and customize your PWA manifest and service worker with ease.',
};

const Layout = ({ children }: React.PropsWithChildren) => {
  return <DeveloperLayout>{children}</DeveloperLayout>;
};

export default Layout;
