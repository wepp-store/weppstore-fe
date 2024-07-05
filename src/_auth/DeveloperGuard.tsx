'use client';

//
import { useAuth } from '@/_apis/queries/auth';
import { IUser } from '@/_types';
import SignIn from '@/app/login/page';
import React from 'react';

// ----------------------------------------------------------------------

type DeveloperGuardProps = {
  children: React.ReactNode;
};

export default function DeveloperGuard({ children }: DeveloperGuardProps) {
  const { isLoading, data, isError: isNotFoundUser } = useAuth<IUser>();

  const [minimumLoadingTimePassed, setMinimumLoadingTimePassed] =
    React.useState(false);

  const isDeveloper = data?.kind === 'DEVELOPER';

  React.useEffect(() => {
    // isLoading이 true일 때만 실행
    if (!isLoading) {
      setMinimumLoadingTimePassed(true);
      return;
    }

    const timer = setTimeout(() => {
      setMinimumLoadingTimePassed(true);
      // }, 1200); // 최소 1.2초간 스플래시 띄움
    }, 100); // 최소 1.2초간 스플래시 띄움

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading || !minimumLoadingTimePassed) {
    // 로딩 중이거나 최소 로딩 시간이 지나지 않은 경우
    return <div>로딩 중...</div>;
  }

  if (isNotFoundUser) {
    return <SignIn />;
  }

  if (!isDeveloper) {
    // TODO: fix this message
    return <div>개발자 전용 페이지입니다.</div>;
  }

  return <> {children} </>;
}