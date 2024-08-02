import { AuthGuard } from '@/features/auth';
import { MainLayout } from '@/shared/layouts/main';

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <AuthGuard>
      <MainLayout>{children}</MainLayout>
    </AuthGuard>
  );
};

export default Layout;
