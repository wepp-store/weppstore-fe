'use client';

import { setSession } from '@/features/auth';
import { useOAuthLogIn } from '@/shared/apis/queries/auth';
import { PATH } from '@/shared/constants';
import { CircularProgress } from '@nextui-org/react';
import { redirect, useSearchParams } from 'next/navigation';
import React from 'react';

const OAuthPending = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const redirectUri = searchParams.get('state');

  const { data, isLoading, isError } = useOAuthLogIn({
    // TODO: fix provider
    provider: 'GOOGLE',
    code,
    enabled: !!code,
  });

  if (isLoading) {
    return (
      <div className="m-auto">
        <CircularProgress />
      </div>
    );
  }

  if (!code || !data || isError) {
    return redirect(PATH.AUTH.LOGIN);
  }

  const token = {
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
  };

  setSession(token);

  if (redirectUri) {
    return redirect(redirectUri);
  }

  return redirect(PATH.MAIN.WEPPS);
};

export default OAuthPending;
