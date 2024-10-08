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
import { useSession } from '@/shared/apis/queries/auth';
import { likeKeys } from './query-key-factory';
import { weppKeys } from '@/shared/apis/queries/wepp';
import { IWepp } from '@/shared/types';

export const useAddWeppLike = (
  options?: Omit<UseMutationOptions<any, any, any>, 'mutationKey'>
) => {
  const { weppId }: { weppId: string } = useParams();
  const { user } = useSession();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!user) {
        throw new Error('로그인이 필요합니다.');
      }

      const response = await axiosInstance.post(PATH_API.LIKE.ROOT, {
        weppId,
        userId: user.id,
      });

      return response.data;
    },
    onSuccess: () => {
      // 좋아요 상태 반영
      queryClient.setQueryData(likeKeys.hasLiked(weppId), { hasLiked: true });
      // 좋아요 수 반영
      queryClient.setQueryData(weppKeys.detail(weppId), (prev: IWepp) => {
        if (!prev) {
          return prev;
        }

        return {
          ...prev,
          _count: {
            ...prev._count,
            likes: +prev._count!.likes + 1,
          },
        };
      });
      toast.success('좋아요가 추가되었습니다.');
    },
    ...options,
  });
};
