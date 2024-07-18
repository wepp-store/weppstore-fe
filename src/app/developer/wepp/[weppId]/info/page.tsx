import { weppDetailOptions } from '@/shared/apis/queries/wepp';
import { WeppInfoPage } from '@/views/(developer)/wepp-info';
import {
  dehydrate,
  QueryClient,
  HydrationBoundary,
} from '@tanstack/react-query';

const Page = async ({ params }: { params: { weppId: string } }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    weppDetailOptions({
      weppId: params.weppId,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <WeppInfoPage />
    </HydrationBoundary>
  );
};

export default Page;
