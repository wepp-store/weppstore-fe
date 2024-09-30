'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Section } from '@/shared/ui/section';
import { useMineWeppList } from '@/shared/apis/queries/wepp';
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

  const isNotData =
    isFetched && !isLoading && (!data || data.pages[0]?.data?.length === 0);

  if (isNotData) {
    return (
      <Section className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <>등록된 앱이 없습니다.</>
      </Section>
    );
  }

  return (
    <Section className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {data?.pages.map((group, i) => (
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
