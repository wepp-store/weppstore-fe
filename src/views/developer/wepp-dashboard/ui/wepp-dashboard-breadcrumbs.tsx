'use client';

import { CustomBreadcrumbs } from '@/shared/ui/custom-breadcrumbs';
import { Section } from '@/shared/ui/section';
import { useParams } from 'next/navigation';
import React from 'react';

const WeppDashboardBreadcrumbs = () => {
  const { weppId } = useParams();

  return (
    <Section>
      <CustomBreadcrumbs
        paths={[
          { name: '홈', path: '/developer' },
          { name: '앱 대시보드', path: `/developer/wepp/${weppId}` },
        ]}
      />
    </Section>
  );
};

export default WeppDashboardBreadcrumbs;
