import { LoginForm } from '@/features/auth';
import { Suspense } from 'react';

const SignIn = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
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
