import React from 'react';
import { useRepliesOfComment } from '../api';
import { IComment } from '@/shared/types';
import { Avatar } from '@nextui-org/react';
import { timeAgo } from '@/shared/utils';
import { useReplyStateStore } from '@/features/create-wepp-comment/lib';
import WeppCommentDeleteButton from './wepp-comment-delete-button';
import { Loader } from '@/shared/ui/loader';
import { useSession } from '@/shared/apis/queries/auth';
import { useParams } from 'next/navigation';
import { useWeppDetail } from '@/shared/apis/queries/wepp';

interface Props {
  show: boolean;
  commentId: number;
}

const WeppCommentReplies = ({ commentId, show }: Props) => {
  const {
    data,
    isFetched,
    hasNextPage,
    isFetchingNextPage,
    //
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
              <ReplyComment key={comment.id} comment={comment} />
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
    </div>
  );
};

const ReplyComment = ({ comment }: { comment: IComment }) => {
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

  // deletable check
  const { user: me } = useSession();
  const { weppId }: { weppId: string } = useParams();
  const { data: wepp } = useWeppDetail({ weppId, enabled: false });

  const isMyComment = user.id === me?.id;
  const isCreator = wepp?.developer?.id === me?.id;

  const isDeletable = isCreator || isMyComment;

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
                  replyId: parentId || commentId,
                  mentionId: user.id,
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
