import { weppListOptions } from '@/shared/apis/queries/wepp';
import {
  MainListSection,
  MainFeaturedSection,
  MainCategoriesSection,
} from '@/views/main';
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
      {/* 추천 앱 */}
      <MainFeaturedSection />
      {/* 카테고리 */}
      <MainCategoriesSection />
      {/* 앱 리스트 */}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MainListSection />
      </HydrationBoundary>
    </>
  );
}
