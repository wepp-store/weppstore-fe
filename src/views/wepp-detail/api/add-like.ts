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

export const useAddWeppLike = (
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

      const response = await axiosInstance.post(PATH_API.LIKE.ROOT, {
        weppId,
        userId: user.id,
      });

      return response.data;
    },
    onSuccess: () => {
      queryClient.setQueryData(likeKeys.hasLiked(weppId), { hasLiked: true });
      toast.success('좋아요가 추가되었습니다.');
    },
    ...options,
  });
};
