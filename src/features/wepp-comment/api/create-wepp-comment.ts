'use client';

import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { axiosInstance } from '@/shared/apis/axios';
import { PATH_API } from '@/shared/apis/path';
import toast from 'react-hot-toast';
import { useParams } from 'next/navigation';
import { useSession } from '@/shared/apis/queries/auth';
import { IComment } from '@/shared/types';
import { useCommentCache } from '../lib/use-comment-cache';
import { commentKeys } from './query-key-factory';

type Payload = Pick<IComment, 'content' | 'parentId' | 'mention'>;

export const useCreateWeppComment = (
  options?: Omit<UseMutationOptions<any, any, Payload>, 'mutationKey'>
) => {
  const { weppId }: { weppId: string } = useParams();
  const { user } = useSession();

  const {
    // add comment
    addCacheComment,
    // reply
    increaseCacheReplyCount,
    // comment
    increaseCacheCommentCount,
  } = useCommentCache();

  return useMutation({
    mutationFn: async (content: Payload) => {
      if (!user) {
        throw new Error('로그인이 필요합니다.');
      }

      const response = await axiosInstance.post(PATH_API.COMMENT.ROOT, {
        content: content.content,
        parentId: content.parentId,
        mention: content.mention,
        weppId: weppId,
        userId: user.id,
      });

      return response.data;
    },
    onSuccess: (data: Pick<IComment, 'content' | 'parentId' | '_count'>) => {
      toast.success('댓글이 작성되었습니다.');

      const isReply = !!data.parentId;

      const newData = {
        ...data,
        user,
      };

      if (!isReply) {
        // 댓글 반영
        newData._count = { children: 0 };
        addCacheComment({ data: newData, queryKey: commentKeys.list(weppId) });
      } else {
        const commentId = data.parentId!;
        addCacheComment({
          data: newData,
          queryKey: commentKeys.replies(commentId),
        });
        // 대댓글 수 반영
        increaseCacheReplyCount({ weppId, parentId: commentId });
      }

      // 댓글 수 반영
      increaseCacheCommentCount({ weppId });
    },
    onError: (error) => {
      toast.error(
        error?.message || '댓글 작성에 실패했습니다. 잠시 후 다시 시도해주세요.'
      );
    },
    ...options,
  });
};
