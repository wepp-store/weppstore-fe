'use client';

//
import { useAuth } from '@/shared/apis/queries/auth';
import SignIn from '@/app/login/page';
import React from 'react';

// ----------------------------------------------------------------------

type AuthGuardProps = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isLoading, isError: isNotFoundUser } = useAuth();

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (isNotFoundUser) {
    return <SignIn />;
  }

  return <> {children} </>;
}
