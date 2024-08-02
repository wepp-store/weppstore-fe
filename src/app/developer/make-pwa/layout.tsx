import { DeveloperLayout } from '@/shared/layouts/developer';
import React from 'react';

const Layout = ({ children }: React.PropsWithChildren) => {
  return <DeveloperLayout>{children}</DeveloperLayout>;
};

export default Layout;
