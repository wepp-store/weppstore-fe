'use client';

import { CustomBreadcrumbs } from '@/shared/ui/custom-breadcrumbs';
import { useParams } from 'next/navigation';
import React from 'react';

const WeppDashboardBreadcrumbs = () => {
  const { id }: { id: string } = useParams();

  return (
    <CustomBreadcrumbs
      paths={[
        { name: '홈', path: '/developer' },
        { name: '앱 대시보드', path: `/developer/wepp/${id}` },
      ]}
    />
  );
};

export default WeppDashboardBreadcrumbs;
