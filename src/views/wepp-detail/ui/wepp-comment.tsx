import { IComment } from '@/shared/types';
import { Avatar } from '@nextui-org/react';
import React from 'react';
import { useSession } from '@/shared/apis/queries/auth';
import { useWeppDetail } from '@/shared/apis/queries/wepp';
import { useParams } from 'next/navigation';
import { timeAgo } from '@/shared/utils';
import { useReplyStateStore } from '@/features/wepp-comment/lib';
import WeppCommentReplies from './wepp-comment-replies';
import { parseMention } from '../lib';
import { DeleteWeppCommentButton } from '@/features/wepp-comment';
import Link from 'next/link';
import { PATH } from '@/shared/constants';

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
    deletedAt,
    id: commentId,
  } = comment;

  const { user: me } = useSession();

  const [isShowReply, setIsShowReply] = React.useState(false);

  // creator check
  const { weppId }: { weppId: string } = useParams();
  const { data: wepp } = useWeppDetail({ weppId, enabled: false });

  // reply state
  const setReplyComment = useReplyStateStore((state) => state.setReplyComment);

  const isMyComment = user?.id && user.id === me?.id;
  const isCreator = wepp?.developer?.id === me?.id;

  const isDeletable = (!deletedAt && isCreator) || isMyComment;

  const hasChildren = _count?.children > 0;

  return (
    <>
      <div className="pt-4 flex justify-between">
        <div className="flex gap-4 grow">
          <Avatar
            showFallback
            name={user?.userName?.charAt(0)}
            src={user?.profileUrl || '/no-image.svg'}
          />
          <div className="flex flex-col grow">
            {!deletedAt ? (
              <>
                <Link
                  className="text-sm"
                  href={`${PATH.MAIN.PROFILE}/${user.id}`}
                >
                  @<span className="hover:underline">{user.userName}</span>
                </Link>
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
              </>
            ) : (
              <>
                <p className="text-sm">(삭제)</p>
                <p className="font-gray-800">{content}</p>
              </>
            )}

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

        {isDeletable && <DeleteWeppCommentButton commentId={commentId} />}
      </div>
    </>
  );
};

export default WeppComment;
