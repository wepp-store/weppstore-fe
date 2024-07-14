'use client';

import UpdateWeppForm from '@/features/update-wepp/ui/update-wepp-form';
import { CustomBreadcrumbs } from '@/shared/ui/custom-breadcrumbs';
import { useParams } from 'next/navigation';
import React from 'react';

const WeppInfoPage = () => {
  const { id }: { id: string } = useParams();

  return (
    <>
      <CustomBreadcrumbs
        paths={[
          { name: '홈', path: '/developer' },
          { name: '앱 대시보드', path: `/developer/wepp/${id}` },
          { name: '앱 정보', path: `/developer/wepp/${id}/info` },
        ]}
      />

      <UpdateWeppForm />
    </>
  );
};

export default WeppInfoPage;
