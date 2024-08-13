import { AuthGuard } from '@/shared/auth';
import { MainLayout } from '@/shared/layouts/main';

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <AuthGuard>
      <MainLayout>{children}</MainLayout>
    </AuthGuard>
  );
};

export default Layout;
