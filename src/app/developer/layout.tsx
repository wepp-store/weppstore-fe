import { AuthGuard } from '@/features/auth';
import { DeveloperLayout } from '@/shared/layouts/developer';
import React from 'react';

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <AuthGuard>
      <DeveloperLayout>{children}</DeveloperLayout>
    </AuthGuard>
  );
};

export default Layout;
