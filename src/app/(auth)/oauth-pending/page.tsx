import { OAuthPendingPage } from '@/views/(auth)/login';
import { CircularProgress } from '@nextui-org/react';
import React, { Suspense } from 'react';

const Page = () => {
  return (
    <Suspense
      fallback={
        <div className="m-auto">
          <CircularProgress />
        </div>
      }
    >
      <OAuthPendingPage />;
    </Suspense>
  );
};

export default Page;
