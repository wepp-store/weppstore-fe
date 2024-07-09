import {
  MainCategoriesSection,
  MainFeaturedSection,
  MainListSection,
} from '@/views/main';

export default function Home() {
  return (
    <>
      {/* 추천 앱 */}
      <MainFeaturedSection />
      {/* 카테고리 */}
      <MainCategoriesSection />
      {/* 앱 리스트 */}
      <MainListSection />
    </>
  );
}
