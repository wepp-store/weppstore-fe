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
      <h2
        className="
        text-3xl
        font-bold
        text-gray-800
        mb-4"
      >
        Featured Apps
      </h2>
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
