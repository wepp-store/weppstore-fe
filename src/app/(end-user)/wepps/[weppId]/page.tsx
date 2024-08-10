import { getServerQueryClient } from '@/shared/apis/get-query-client';
import { weppDetailOptions } from '@/shared/apis/queries/wepp';
import { IWepp } from '@/shared/types';
import { WeppDetailPage } from '@/views/wepp-detail';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Metadata } from 'next';
import { Suspense } from 'react';

// TODO: 2회 호출되는 이슈가 있음

type Props = {
  params: { weppId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const queryClient = getServerQueryClient();

  const wepp = await queryClient.fetchQuery<IWepp>(
    weppDetailOptions({ weppId: params.weppId }) as any
  );

  return {
    title: wepp?.name || 'Default Title',
    description: wepp?.description || 'Default description',
  };
}

export default async function Page({ params }: Props) {
  const queryClient = getServerQueryClient();

  await queryClient.prefetchQuery(
    weppDetailOptions({
      weppId: params.weppId,
      read: true,
      gcTime: Infinity,
      staleTime: Infinity,
    })
  );

  return (
    <Suspense>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <WeppDetailPage />
      </HydrationBoundary>
    </Suspense>
  );
}
