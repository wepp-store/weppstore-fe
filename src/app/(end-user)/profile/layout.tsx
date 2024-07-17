import { AuthGuard } from '@/features/auth';

const Layout = ({ children }: React.PropsWithChildren) => {
  return <AuthGuard>{children}</AuthGuard>;
};

export default Layout;
