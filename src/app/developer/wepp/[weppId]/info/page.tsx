import { getServerQueryClient } from '@/shared/apis/get-query-client';
import { weppMineDetailOptions } from '@/shared/apis/queries/wepp';
import { WeppInfoPage } from '@/views/(developer)/wepp-info';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { cookies } from 'next/headers';

const Page = async ({ params }: { params: { weppId: string } }) => {
  const queryClient = getServerQueryClient();

  const cookieStore = cookies();
  const token = cookieStore.get('weppstore_token')?.value;

  await queryClient.prefetchQuery(
    weppMineDetailOptions({
      weppId: params.weppId,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <WeppInfoPage />
    </HydrationBoundary>
  );
};

export default Page;
