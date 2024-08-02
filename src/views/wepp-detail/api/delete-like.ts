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

const useDeleteWeppLike = (
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

      const response = await axiosInstance.delete(PATH_API.COMMENT.ROOT, {
        data: {
          weppId,
          userId: user.id,
        },
      });

      return response.data;
    },
    onSuccess: () => {
      queryClient.setQueryData(likeKeys.hasLiked(weppId), { hasLiked: false });
      toast.success('좋아요가 삭제되었습니다.');
    },
    ...options,
  });
};

export default useDeleteWeppLike;
