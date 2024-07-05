'use client';

import { useWeppDetail } from '@/_apis/queries/wepp/wepp-detail';
import { IWepp } from '@/_types';
import { Card } from '@/components/card';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';

const WeppDashboardHeader = () => {
  const { id: weppId }: { id: string } = useParams();

  const { data } = useWeppDetail<IWepp>({ weppId });

  return (
    <div className="container mx-auto p-4">
      <header>
        <h1 className="text-3xl font-bold text-gray-800">개발자 대시보드</h1>
        <p className="text-gray-600">멋진 앱</p>
      </header>
    </div>
  );
};

export default WeppDashboardHeader;