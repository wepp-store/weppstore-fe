import styles from './page.module.css';
import { MainLayout } from '@/layouts/main';
import {
  MainCategoriesSection,
  MainFeaturedSection,
  MainListSection,
} from '@/sections/main';

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
