'use client';
import { useMineWeppList } from '@/shared/apis/queries/wepp';
import { Section } from '@/shared/ui/section';
import { Card } from '@nextui-org/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

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

  const navigateToWeppDetail = (weppId: number) => {
    push(`/developer/wepp/${weppId}`);
  };

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
              <Card key={wepp.id} onClick={() => navigateToWeppDetail(wepp.id)}>
                <div className="flex items-center justify-between">
                  <Image
                    src={wepp.logo || ''}
                    alt={wepp.name}
                    width={48}
                    height={48}
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{wepp.name}</h3>
                    <p className="text-sm text-gray-500">{wepp.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </React.Fragment>
        ))}
    </Section>
  );
};

export default DeveloperMainList;
