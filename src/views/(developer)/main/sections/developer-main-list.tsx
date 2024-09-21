'use client';
import { useMineWeppList } from '@/shared/apis/queries/wepp';
import { Section } from '@/shared/ui/section';
import { useRouter } from 'next/navigation';
import React from 'react';
import { DeveloperWeppCard } from '../ui';

const DeveloperMainList = () => {
  const { push } = useRouter();

  const {
    data,
    isLoading,
    isFetched,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useMineWeppList();

  const isNotData = !isLoading && !data?.pages[0]?.data?.length;

  return (
    <Section
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
              <DeveloperWeppCard key={wepp.id} wepp={wepp} />
            ))}
          </React.Fragment>
        ))}
    </Section>
  );
};

export default DeveloperMainList;
