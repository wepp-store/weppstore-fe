import {
  MainCategoriesSection,
  MainFeaturedSection,
  MainListSection,
} from '@/sections/main';
import { MainLayout } from '@/shared/layouts/main';

export default function Home() {
  return (
    <MainLayout>
      {/* 추천 앱 */}
      <MainFeaturedSection />
      {/* 카테고리 */}
      <MainCategoriesSection />
      {/* 앱 리스트 */}
      <MainListSection />
    </MainLayout>
  );
}
