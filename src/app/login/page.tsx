import { LoginPage } from '@/views/login';
import { CircularProgress } from '@nextui-org/react';
import { Suspense } from 'react';

const SignIn = () => {
  return (
    <Suspense
      fallback={
        <div className="m-auto">
          <CircularProgress />
        </div>
      }
    >
      <LoginPage />
    </Suspense>
  );
};

export default SignIn;
