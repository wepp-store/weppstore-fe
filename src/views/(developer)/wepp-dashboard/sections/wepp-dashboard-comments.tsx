'use client';

import { useWeppComments } from '@/shared/apis/queries/wepp/wepp-comments';
import { Button, User } from '@nextui-org/react';
import React from 'react';

const WeppDashboardReviews = () => {
  const {
    data,
    isLoading,
    isFetched,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useWeppComments({ size: 3 });

  const isNotData = !isLoading && !data?.pages[0]?.data?.length;

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">최근 리뷰</h2>
      <div className="space-y-4">
        {isNotData && <>등록된 리뷰가 없습니다.</>}
        {isFetched &&
          data?.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group.data.map((comment) => (
                <div className="border-b pb-4" key={comment.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">
                        <User
                          name={comment.user.userName}
                          description={comment.user.email}
                          avatarProps={{
                            src: comment.user.profileUrl || '/no-image.svg',
                          }}
                        />
                      </p>
                    </div>
                    <button className="text-blue-500 hover:text-blue-600">
                      답변
                    </button>
                  </div>
                  <p className="mt-2">{comment.content}</p>
                </div>
              ))}
            </React.Fragment>
          ))}
      </div>

      {hasNextPage && (
        <Button
          className="mt-4"
          color="primary"
          variant="light"
          onPress={fetchNextPage as VoidFunction}
        >
          더 보기
        </Button>
      )}
    </div>
  );
};

export default WeppDashboardReviews;
