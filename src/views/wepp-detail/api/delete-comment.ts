'use client';

import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query';
import { axiosInstance } from '@/shared/apis/axios';
import { PATH_API } from '@/shared/apis/path';
import toast from 'react-hot-toast';
import { useParams } from 'next/navigation';
import { useAuth } from '@/shared/apis/queries/auth';
import { weppKeys } from '@/shared/apis/queries/wepp';
import { IWepp } from '@/shared/types';

type Payload = { commentId: number };

export const useDeleteWeppComment = (
  options?: Omit<UseMutationOptions<any, any, Payload>, 'mutationKey'>
) => {
  const { weppId }: { weppId: string } = useParams();
  const { data: user } = useAuth();

  const queryClient = useQueryClient();

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
    onSuccess: (_data, { commentId }) => {
      toast.success('댓글이 삭제되었습니다.');

      // 댓글 상태 반영
      queryClient.setQueryData(weppKeys.comments(weppId), (oldData: any) => {
        if (!oldData) {
          return oldData;
        }

        return {
          ...oldData,
          pages: oldData.pages.map((page: any) => ({
            ...page,
            data: page.data.filter((comment: any) => comment.id !== commentId),
          })),
        };
      });

      // 댓글 수 반영
      queryClient.setQueryData(weppKeys.detail(weppId), (prev: IWepp) => {
        if (!prev) {
          return prev;
        }

        return {
          ...prev,
          _count: {
            ...prev._count,
            comments: +prev._count!.comments - 1,
          },
        };
      });
    },
    onError: (error) => {
      toast.error(error?.message);
    },
    ...options,
  });
};
