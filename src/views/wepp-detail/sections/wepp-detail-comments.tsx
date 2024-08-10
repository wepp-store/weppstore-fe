import { CreateWeppCommentField } from '@/features/wepp-comment';
import { Section } from '@/shared/ui/section';
import React from 'react';
import { WeppComment } from '../ui';
import { Loader } from '@/shared/ui/loader';
import { useWeppComments } from '../api';

const WeppDetailComments = () => {
  const {
    data,
    isLoading,
    isFetched,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useWeppComments();

  const isNotData = !isLoading && !data?.pages[0]?.data?.length;

  return (
    <Section>
      <h3 className="text-lg font-semibold mb-2">댓글</h3>

      {isNotData && <>등록된 댓글이 없습니다.</>}

      {isFetched &&
        data?.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group?.data?.map((comment) => (
              <WeppComment key={comment.id} comment={comment} />
            ))}
          </React.Fragment>
        ))}
      {hasNextPage && (
        <button
          className="flex items-center mt-4 mb-2 text-sm text-gray-700"
          onClick={() => fetchNextPage()}
        >
          {/* divider */}
          <div className="w-8 h-px bg-divider" />
          <span className="ml-4">
            {isFetchingNextPage ? <Loader /> : '더보기'}
          </span>
        </button>
      )}

      <CreateWeppCommentField />
    </Section>
  );
};

export default WeppDetailComments;
