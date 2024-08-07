import React from 'react';
import { useRepliesOfComment } from '../api';
import { IComment } from '@/shared/types';
import { Avatar } from '@nextui-org/react';
import { timeAgo } from '@/shared/utils';
import { useReplyStateStore } from '@/features/create-wepp-comment/lib';
import WeppCommentDeleteButton from './wepp-comment-delete-button';

interface Props {
  show: boolean;
  commentId: number;
  isDeletable: boolean;
}

const WeppCommentReplies = ({ commentId, show, isDeletable }: Props) => {
  const {
    data,
    isLoading,
    isFetched,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useRepliesOfComment({
    commentId,
    enabled: show,
  });

  return (
    <div className="flex flex-col">
      {isFetched &&
        data?.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.data.map((comment) => (
              <ReplyComment
                key={comment.id}
                comment={comment}
                isDeletable={isDeletable}
              />
            ))}
          </React.Fragment>
        ))}
    </div>
  );
};

const ReplyComment = ({
  comment,
  isDeletable,
}: {
  comment: IComment;
  isDeletable: boolean;
}) => {
  const {
    // comment data
    user,
    _count,
    content,
    parentId,
    createdAt,
    id: commentId,
  } = comment;

  // reply state
  const setReplyComment = useReplyStateStore((state) => state.setReplyComment);

  return (
    <div className="pt-4 flex justify-between">
      <div className="flex gap-4 grow">
        <Avatar name={user.userName} src={user.profileUrl || '/no-image.svg'} />

        <div className="flex flex-col grow">
          <p className="text-sm">@{user.userName}</p>
          <p className="font-gray-800">{content}</p>
          <div className="flex gap-2 mt-1 text-xs text-gray-500">
            <time>{timeAgo(createdAt)}</time>
            <div
              role="button"
              onClick={() =>
                setReplyComment({
                  id: commentId,
                  writer: user.userName,
                })
              }
            >
              답글 달기
            </div>
          </div>
        </div>
      </div>
      {isDeletable && <WeppCommentDeleteButton commentId={commentId} />}
    </div>
  );
};

export default WeppCommentReplies;
