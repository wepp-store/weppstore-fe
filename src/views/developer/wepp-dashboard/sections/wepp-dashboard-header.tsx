'use client';

import { DeleteWeppButton } from '@/features/delete-wepp';
import { weppKeys } from '@/shared/apis/queries/wepp';
import { PATH } from '@/shared/constants';
import { IWepp } from '@/shared/types';
import { Section } from '@/shared/ui/section';
import { weppStatusToColor, weppStatusToText } from '@/shared/utils';
import { Button, Chip, Link } from '@nextui-org/react';
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
        <div className="flex gap-2 items-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-300">
            {wepp?.name} 대시보드
          </h1>
          <Chip
            color={weppStatusToColor(wepp?.status)}
            variant="flat"
            className="rounded-md"
          >
            {weppStatusToText(wepp?.status)}
          </Chip>
        </div>

        <div className="flex gap-4 items-center">
          <Button
            href={PATH.DEVELOPER.WEPP_DETAIL(weppId)}
            as={Link}
            variant="bordered"
            radius="sm"
          >
            수정하기
          </Button>
          <DeleteWeppButton />
        </div>
      </header>
    </Section>
  );
};

export default WeppDashboardHeader;
