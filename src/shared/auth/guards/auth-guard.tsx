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
    return (
      <div className="size-full flex items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  if (isNotFoundUser) {
    return redirect(`${PATH.AUTH.LOGIN}?redirect=${pathname}`);
  }

  return <> {children} </>;
}
