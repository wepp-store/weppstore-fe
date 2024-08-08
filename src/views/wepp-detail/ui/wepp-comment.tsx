import { IComment } from '@/shared/types';
import { Avatar } from '@nextui-org/react';
import React from 'react';
import { useSession } from '@/shared/apis/queries/auth';
import { useWeppDetail } from '@/shared/apis/queries/wepp';
import { useParams } from 'next/navigation';
import { timeAgo } from '@/shared/utils';
import { useReplyStateStore } from '@/features/create-wepp-comment/lib';
import WeppCommentDeleteButton from './wepp-comment-delete-button';
import WeppCommentReplies from './wepp-comment-replies';
import { parseMention } from '../lib';

interface Props {
  comment: IComment;
}

const WeppComment = ({ comment }: Props) => {
  const {
    // comment data
    user,
    _count,
    content,
    mention,
    parentId,
    createdAt,
    id: commentId,
  } = comment;

  const { user: me } = useSession();

  const [isShowReply, setIsShowReply] = React.useState(false);

  // creator check
  const { weppId }: { weppId: string } = useParams();
  const { data: wepp } = useWeppDetail({ weppId, enabled: false });

  // reply state
  const setReplyComment = useReplyStateStore((state) => state.setReplyComment);

  const isMyComment = user.id === me?.id;
  const isCreator = wepp?.developer?.id === me?.id;

  const isDeletable = isCreator || isMyComment;

  const hasChildren = _count?.children > 0;

  return (
    <>
      <div className="pt-4 flex justify-between">
        <div className="flex gap-4 grow">
          <Avatar
            name={user.userName}
            src={user.profileUrl || '/no-image.svg'}
          />
          <div className="flex flex-col grow">
            <p className="text-sm">@{user.userName}</p>
            <p className="font-gray-800">
              {mention && (
                <span
                  className="text-sm text-gray-500"
                  aria-label={String(parseMention(mention).id)}
                >
                  @{parseMention(mention).name}{' '}
                </span>
              )}
              {content}
            </p>
            <div className="flex gap-2 mt-1 text-xs text-gray-500">
              <time>{timeAgo(createdAt)}</time>
              <div
                role="button"
                onClick={() =>
                  setReplyComment({
                    replyId: commentId,
                    mentionId: user.id,
                    writer: user.userName,
                  })
                }
              >
                답글 달기
              </div>
            </div>

            {hasChildren && (
              <>
                <div
                  role="button"
                  className="flex items-center mt-4 mb-2 text-sm text-gray-700"
                  onClick={() => setIsShowReply((v) => !v)}
                >
                  {/* divider */}
                  <div className="w-8 h-px bg-divider" />
                  {isShowReply ? (
                    <span className="ml-2">답글 숨기기</span>
                  ) : (
                    <span className="ml-2">답글 {_count.children}개</span>
                  )}
                </div>
                {isShowReply && (
                  <WeppCommentReplies
                    commentId={commentId}
                    show={isShowReply}
                  />
                )}
              </>
            )}
          </div>
        </div>

        {isDeletable && <WeppCommentDeleteButton commentId={commentId} />}
      </div>
    </>
  );
};

export default WeppComment;
