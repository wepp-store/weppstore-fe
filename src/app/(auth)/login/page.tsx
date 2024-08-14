import { LoginPage } from '@/views/(auth)/login';
import { CircularProgress } from '@nextui-org/react';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: '로그인',
  description: 'Wepp Store 로그인 페이지',
};

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
