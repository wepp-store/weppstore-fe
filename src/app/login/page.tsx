import { LoginForm } from '@/features/auth';
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
      <div
        className="
        fixed
        w-full
        h-full
        top-0
        left-0
        flex justify-center items-center
        bg-white
        z-50
      "
      >
        <LoginForm />
      </div>
    </Suspense>
  );
};

export default SignIn;
