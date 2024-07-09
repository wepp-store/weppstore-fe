import { MainLayout } from '@/shared/layouts/main';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return <>{children}</>;
};

export default Layout;
