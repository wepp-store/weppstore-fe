import { DeveloperLayout } from '@/layouts/developer';
import React from 'react';

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <DeveloperLayout>{children}</DeveloperLayout>;
};

export default Layout;
