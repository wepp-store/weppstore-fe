import { AuthGuard } from '@/shared/auth';
import { DeveloperLayout } from '@/shared/layouts/developer';
import React from 'react';

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <AuthGuard>
      <DeveloperLayout>{children}</DeveloperLayout>
    </AuthGuard>
  );
};

export default Layout;
