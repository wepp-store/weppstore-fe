'use client';

//
import { useAuth } from '@/shared/apis/queries/auth';
import React from 'react';
import { CircularProgress } from '@nextui-org/react';
import { redirect, usePathname } from 'next/navigation';
import { PATH } from '@/shared/constants';

// ----------------------------------------------------------------------

type AuthGuardProps = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isLoading, isError: isNotFoundUser, data } = useAuth();

  const pathname = usePathname();

  if (isLoading) {
    <div className="m-auto">
      <CircularProgress />
    </div>;
  }

  if (isNotFoundUser || !data) {
    return redirect(`${PATH.AUTH.LOGIN}?redirect=${pathname}`);
  }

  return <> {children} </>;
}
