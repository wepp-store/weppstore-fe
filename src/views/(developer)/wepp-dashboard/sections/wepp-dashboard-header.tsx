'use client';
import { DeleteWeppButton } from '@/features/delete-wepp';
import { PATH_API } from '@/shared/apis/path';
import { weppKeys } from '@/shared/apis/queries/wepp';
import { IWepp } from '@/shared/types';
import { Section } from '@/shared/ui/section';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React from 'react';

const WeppDashboardHeader = () => {
  const { weppId }: { weppId: string } = useParams();

  const queryClient = useQueryClient();

  const wepp = queryClient.getQueryData<IWepp>(weppKeys.mine(weppId));

  return (
    <Section>
      <header className="flex justify-between">
        <h1 className="text-3xl font-bold text-gray-800">
          {wepp?.name} 대시보드
        </h1>

        <DeleteWeppButton />
      </header>
    </Section>
  );
};

export default WeppDashboardHeader;
