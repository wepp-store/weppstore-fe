'use client';

import { useWeppList } from '@/_apis/queries/wepp';
import { Section } from '@/components/section';
import React from 'react';
import { WeppCard } from './components';

const MainListSection = () => {
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
    <>
      <Section>
        <h2 className="text-xl font-semibold mb-4">인기 앱</h2>

        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
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
    </>
  );
};

export default MainListSection;