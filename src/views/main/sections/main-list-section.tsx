'use client';

import { useWeppList } from '@/shared/apis/queries/wepp';
import { Section } from '@/shared/ui/section';
import React from 'react';
import { WeppCard } from '../ui';

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
        <div
          className="
          grid
          gap-4
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          xl:grid-cols-4
          "
        >
          {isNotData && <>등록된 앱이 없습니다.</>}
          {isFetched &&
            data?.pages.map((group, i) => (
              <React.Fragment key={i}>
                {group.data.map((wepp) => (
                  <WeppCard
                    key={wepp.id}
                    wepp={wepp}
                    href={`wepps/${wepp.id}`}
                  />
                ))}
              </React.Fragment>
            ))}
        </div>
      </Section>
    </>
  );
};

export default MainListSection;
