'use client';
import React from 'react';
import { CustomBreadcrumbs } from '@/components/custom-breadcrumbs';
import { useParams } from 'next/navigation';

const WeppInfoBreadcrumbs = () => {
  const { id }: { id: string } = useParams();

  return (
    <CustomBreadcrumbs
      paths={[
        { name: '홈', path: '/' },
        { name: '개발자', path: '/developer' },
        { name: '앱', path: `/developer/wepp/${id}` },
        { name: '앱 정보', path: `/developer/wepp/${id}/info` },
      ]}
    />
  );
};

export default WeppInfoBreadcrumbs;
