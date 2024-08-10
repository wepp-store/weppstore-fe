'use client';

import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { axiosInstance } from '@/shared/apis/axios';
import { PATH_API } from '@/shared/apis/path';
import toast from 'react-hot-toast';
import { useParams } from 'next/navigation';
import { useSession } from '@/shared/apis/queries/auth';
import { IComment } from '@/shared/types';
import { useCommentCache } from '../lib/use-comment-cache';

type Payload = { commentId: number };

export const useDeleteWeppComment = (
  options?: Omit<UseMutationOptions<any, any, Payload>, 'mutationKey'>
) => {
  const { weppId }: { weppId: string } = useParams();
  const { user } = useSession();

  const {
    // remove
    removeCacheReply,
    removeCacheComment,
    // count
    decreaseCacheReplyCount,
    decreaseCacheCommentCount,
  } = useCommentCache();

  return useMutation({
    mutationFn: async (payload: Payload) => {
      if (!user) {
        throw new Error('로그인이 필요합니다.');
      }

      const response = await axiosInstance.delete(
        `${PATH_API.COMMENT.ROOT}/${payload.commentId}`
      );

      return response.data;
    },
    onSuccess: (data: Pick<IComment, 'id' | 'parentId'>) => {
      toast.success('댓글이 삭제되었습니다.');

      const parentId = data.parentId;
      const isReply = !!parentId;
      const commentId = data.id;

      if (!isReply) {
        // 댓글 상태 반영
        removeCacheComment({ commentId, weppId });
      } else {
        removeCacheReply({ parentId, weppId, commentId });
        // 대댓글 수 반영
        decreaseCacheReplyCount({ weppId, parentId });
      }

      // 댓글 수 반영
      decreaseCacheCommentCount({ weppId });
    },
    onError: (error) => {
      toast.error(error?.message);
    },
    ...options,
  });
};
