'use client';

import UpdateWeppForm from '@/features/update-wepp/ui/update-wepp-form';
import { CustomBreadcrumbs } from '@/shared/ui/custom-breadcrumbs';
import { Section } from '@/shared/ui/section';
import { useParams } from 'next/navigation';
import React from 'react';

const WeppInfoPage = () => {
  const { weppId } = useParams();

  return (
    <>
      <Section className="pb-0">
        <CustomBreadcrumbs
          paths={[
            { name: '홈', path: '/developer' },
            { name: '앱 대시보드', path: `/developer/wepp/${weppId}` },
            { name: '앱 정보', path: `/developer/wepp/${weppId}/info` },
          ]}
        />
      </Section>

      <Section className="pt-0">
        <UpdateWeppForm />
      </Section>
    </>
  );
};

export default WeppInfoPage;
