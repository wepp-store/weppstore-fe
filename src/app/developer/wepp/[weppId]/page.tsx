import { getServerQueryClient } from '@/shared/apis/get-query-client';
import { weppMineDetailOptions, weppKeys } from '@/shared/apis/queries/wepp';
import { WeppDashboardPage } from '@/views/developer/wepp-dashboard';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

const WeppDetail = async ({ params }: { params: { weppId: string } }) => {
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
      <WeppDashboardPage />
    </HydrationBoundary>
  );
};

export default WeppDetail;
