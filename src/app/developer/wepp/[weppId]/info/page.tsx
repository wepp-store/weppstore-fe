import { getServerQueryClient } from '@/shared/apis/get-query-client';
import { weppKeys, weppMineDetailOptions } from '@/shared/apis/queries/wepp';
import { WeppInfoPage } from '@/views/(developer)/wepp-info';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

const Page = async ({ params }: { params: { weppId: string } }) => {
  const queryClient = getServerQueryClient();

  const cookieStore = cookies();
  const token = cookieStore.get('weppstore_token')?.value;

  await queryClient.prefetchQuery(
    weppMineDetailOptions({
      weppId: params.weppId,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
  );

  const wepp = queryClient.getQueryData(weppKeys.mine(params.weppId));

  if (!wepp) {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <WeppInfoPage />
    </HydrationBoundary>
  );
};

export default Page;
