import { WeppComment } from '@/entities/wepps';
import { CreateWeppCommentField } from '@/features/create-wepp-comment';
import { useWeppComments } from '@/shared/apis/queries/wepp/wepp-comments';
import { Section } from '@/shared/ui/section';
import React from 'react';

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
            {group.data.map((comment) => (
              <WeppComment key={comment.id} comment={comment} />
            ))}
          </React.Fragment>
        ))}

      <CreateWeppCommentField />
    </Section>
  );
};

export default WeppDetailComments;
