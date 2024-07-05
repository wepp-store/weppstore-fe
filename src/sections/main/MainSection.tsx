'use client';

import { useWeppList } from '@/_apis/queries/wepp';
import { Card } from '@/components/card';
import { Section } from '@/components/section';
import React from 'react';
import { WeppCard } from './components';

const MainSection = () => {
  const {
    data,
    isLoading,
    isFetched,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useWeppList();

  const isNotData = !isLoading && !data?.pages[0]?.data?.length;

  return (
    <Section>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">게임 카테고리</h1>
      </header>

      <div className="mb-4">
        <select className="w-full p-2 rounded-lg border border-gray-300">
          <option>인기순</option>
          <option>최신순</option>
          <option>평점순</option>
        </select>
      </div>
      <div
        className="
        grid
        gap-4
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
      "
      >
        {isNotData && <>등록된 앱이 없습니다.</>}
        {isFetched &&
          data?.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group.data.map((wepp) => (
                <WeppCard key={wepp.id} wepp={wepp} />
              ))}
            </React.Fragment>
          ))}
      </div>
    </Section>
  );
};

export default MainSection;
