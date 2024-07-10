import { MainLayout } from '@/shared/layouts/main';
import React from 'react';

const Layout = ({ children }: React.PropsWithChildren) => {
  return <MainLayout>{children}</MainLayout>;
};

export default Layout;
