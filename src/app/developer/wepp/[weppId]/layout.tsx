import { AuthGuard } from '@/features/auth';
import React from 'react';

const Layout = ({ children }: React.PropsWithChildren) => {
  return <AuthGuard>{children}</AuthGuard>;
};

export default Layout;
