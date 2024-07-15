'use client';

import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { axiosInstance } from '@/shared/apis/axios';
import { PATH_API } from '@/shared/apis/path';
import toast from 'react-hot-toast';
import { useParams } from 'next/navigation';
import { useAuth } from '@/shared/apis/queries/auth';
import { weppKeys } from '@/shared/apis/queries/wepp';

type Payload = { content: string };

export const useCreateWeppComment = (
  options?: Omit<UseMutationOptions<any, any, Payload>, 'mutationKey'>
) => {
  const { id: weppId }: { id: string } = useParams();
  const { data: user } = useAuth();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (content: Payload) => {
      if (!user) {
        throw new Error('로그인이 필요합니다.');
      }

      const response = await axiosInstance.post(PATH_API.COMMENT.ROOT, {
        content: content.content,
        weppId: weppId,
        userId: user.id,
      });

      return response.data;
    },
    onSuccess: (data: { content: string }) => {
      toast.success('댓글이 작성되었습니다.');

      const newData = {
        ...data,
        user,
      };

      queryClient.setQueryData(weppKeys.comments(weppId), (oldData: any) => {
        if (!oldData) {
          return {
            pages: [newData],
            pageParams: [],
          };
        }

        return {
          ...oldData,
          pages: oldData.pages.map((page: any, index: number) => {
            if (index === oldData.pages.length - 1) {
              return {
                ...page,
                data: [...page.data, newData],
              };
            }
            return page;
          }),
        };
      });
    },
    onError: (error) => {
      toast.error(error?.message);
    },
    ...options,
  });
};
