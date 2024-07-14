import { weppListOptions } from '@/shared/apis/queries/wepp';
import { MainPage } from '@/views/main';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery(weppListOptions);

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MainPage />
      </HydrationBoundary>
    </>
  );
}
