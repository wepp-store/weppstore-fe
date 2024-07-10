'use client';
import { PATH_API } from '@/shared/apis/path';
import { IWepp } from '@/shared/types';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React from 'react';

const WeppDashboardHeader = () => {
  const { id: weppId }: { id: string } = useParams();

  const queryClient = useQueryClient();
  const queryKey = [PATH_API.WEPP.ROOT, weppId];

  const wepp = queryClient.getQueryData<IWepp>(queryKey);

  return (
    <div className="container mx-auto p-4">
      <header>
        <h1 className="text-3xl font-bold text-gray-800">
          {wepp?.name} 대시보드
        </h1>
      </header>
    </div>
  );
};

export default WeppDashboardHeader;
