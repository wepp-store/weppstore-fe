import { UpdateWeppForm } from '@/features/update-wepp';
import { weppDetailOptions } from '@/shared/apis/queries/wepp';
import { WeppInfoBreadcrumbs } from '@/views/developer/wepp-info';
import {
  dehydrate,
  QueryClient,
  HydrationBoundary,
} from '@tanstack/react-query';

const Page = async ({ params }: { params: { id: string } }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    weppDetailOptions({
      weppId: params.id,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <WeppInfoBreadcrumbs />
      <UpdateWeppForm />
    </HydrationBoundary>
  );
};

export default Page;
