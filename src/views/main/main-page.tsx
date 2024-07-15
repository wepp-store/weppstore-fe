import React from 'react';
import MainListSection from './ui/main-list-section';
import MainFeaturedSection from './ui/main-featured-section';
import MainCategoriesSection from './ui/main-categories-section';

const MainPage = () => {
  return (
    <>
      {/* 추천 앱 */}
      {/* <MainFeaturedSection /> */}
      {/* 카테고리 */}
      <MainCategoriesSection />
      {/* 앱 리스트 */}
      <MainListSection />
    </>
  );
};

export default MainPage;
