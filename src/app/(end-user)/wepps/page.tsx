import { weppListOptions } from '@/shared/apis/queries/wepp';
import { MainPage } from '@/views/(end-user)/main';
import {
  dehydrate,
  QueryClient,
  HydrationBoundary,
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
