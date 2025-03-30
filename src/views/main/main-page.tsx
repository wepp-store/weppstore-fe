import React from 'react';
import { MainJumbotronSection, MainListSection } from './sections';

const MainPage = () => {
  return (
    <>
      {/* 추천 앱 */}
      {/* <MainFeaturedSection /> */}
      {/* 카테고리 */}
      {/* <MainCategoriesSection /> */}
      {/* 메인 배너 */}
      <MainJumbotronSection />
      {/* 앱 리스트 */}
      <MainListSection />
    </>
  );
};

export default MainPage;
