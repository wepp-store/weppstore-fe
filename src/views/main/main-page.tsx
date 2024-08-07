import React from 'react';
import { MainListSection } from './sections';

const MainPage = () => {
  return (
    <>
      {/* 추천 앱 */}
      {/* <MainFeaturedSection /> */}
      {/* 카테고리 */}
      {/* <MainCategoriesSection /> */}

      {/* <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
          <h1 className="mb-4 text-4xl font-bold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            혁신적인 PWA의 새로운 이름,{' '}
            <span className="text-blue-700">Wepp</span>!
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
            Wepp Store에서 웹과 앱의 완벽한 결합을 경험해보세요. 가볍고 빠른
            설치, 오프라인에서도 강력한 기능을 자랑하는 Wepp의 세계로
            초대합니다.
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
            <a
              href="#"
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
            >
              지금 바로 시작하세요
              <svg
                className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
            <a
              href="#"
              className="py-3 px-5 sm:ms-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              자세히 알아보기
            </a>
          </div>
        </div>
      </section> */}

      {/* 앱 리스트 */}
      <MainListSection />
    </>
  );
};

export default MainPage;
