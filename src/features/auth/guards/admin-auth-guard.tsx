'use client';

import { useAuth } from '@/shared/apis/queries/auth';
import SignIn from '@/app/login/page';
import React from 'react';
import { redirect, usePathname } from 'next/navigation';
import { CircularProgress } from '@nextui-org/react';
import { PATH } from '@/shared/constants';

// ----------------------------------------------------------------------

type AdminAuthGuardProps = {
  children: React.ReactNode;
};

export default function AdminAuthGuard({ children }: AdminAuthGuardProps) {
  const { isLoading, data, isError: isNotFoundUser } = useAuth();

  const pathname = usePathname();

  const isAdmin = data?.kind === 'ADMIN';

  if (isLoading) {
    <div className="m-auto">
      <CircularProgress />
    </div>;
  }

  if (isNotFoundUser) {
    return redirect(`${PATH.AUTH.LOGIN}?redirect=${pathname}`);
  }

  if (!isAdmin) {
    // TODO: fix this message
    return <div>관리자 전용 페이지입니다.</div>;
  }

  return <> {children} </>;
}
