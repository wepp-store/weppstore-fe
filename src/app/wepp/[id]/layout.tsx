import { MainLayout } from '@/layouts/main';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return <MainLayout>{children}</MainLayout>;
};

export default Layout;
