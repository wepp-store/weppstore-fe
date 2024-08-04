import { getQueryClient } from '@/shared/apis/get-query-client';
import { weppDetailOptions } from '@/shared/apis/queries/wepp';
import { IWepp } from '@/shared/types';
import { WeppDetailPage } from '@/views/wepp-detail';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Metadata } from 'next';

// TODO: 2회 호출되는 이슈가 있음

type Props = {
  params: { weppId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const queryClient = getQueryClient();

  const wepp = await queryClient.fetchQuery<IWepp>(
    weppDetailOptions({ weppId: params.weppId }) as any
  );

  return {
    title: wepp?.name || 'Default Title',
    description: wepp?.description || 'Default description',
  };
}

export default async function Page({ params }: Props) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(
    weppDetailOptions({
      weppId: params.weppId,
      read: true,
      gcTime: Infinity,
      staleTime: Infinity,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <WeppDetailPage />
    </HydrationBoundary>
  );
}
