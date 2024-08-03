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
import { likeKeys } from './query-key-factory';
import { weppKeys } from '@/shared/apis/queries/wepp';
import { IWepp } from '@/shared/types';

export const useDeleteWeppLike = (
  options?: Omit<UseMutationOptions<any, any, any>, 'mutationKey'>
) => {
  const { weppId }: { weppId: string } = useParams();
  const { data: user } = useAuth();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!user) {
        throw new Error('로그인이 필요합니다.');
      }

      const response = await axiosInstance.delete(PATH_API.LIKE.ROOT, {
        params: {
          wid: weppId,
          uid: user.id,
        },
      });

      return response.data;
    },
    onSuccess: () => {
      // 좋아요 상태 반영
      queryClient.setQueryData(likeKeys.hasLiked(weppId), { hasLiked: false });
      // 좋아요 수 반영
      queryClient.setQueryData(weppKeys.detail(weppId), (prev: IWepp) => {
        if (!prev) {
          return prev;
        }

        return {
          ...prev,
          _count: {
            ...prev._count,
            likes: +prev._count!.likes - 1,
          },
        };
      });
      toast.success('좋아요가 삭제되었습니다.');
    },
    ...options,
  });
};
