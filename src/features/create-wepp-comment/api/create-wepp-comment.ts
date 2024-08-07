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
import { weppKeys } from '@/shared/apis/queries/wepp';
import { IComment, IWepp } from '@/shared/types';
import { commentKeys } from '@/views/wepp-detail/api/query-key-factory';

type Payload = Pick<IComment, 'content' | 'parentId'>;

export const useCreateWeppComment = (
  options?: Omit<UseMutationOptions<any, any, Payload>, 'mutationKey'>
) => {
  const { weppId }: { weppId: string } = useParams();
  const { user } = useSession();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (content: Payload) => {
      if (!user) {
        throw new Error('로그인이 필요합니다.');
      }

      const response = await axiosInstance.post(PATH_API.COMMENT.ROOT, {
        content: content.content,
        parentId: content.parentId,
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

      // 댓글 상태 반영
      queryClient.setQueryData(commentKeys.list(weppId), (oldData: any) => {
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

      // 댓글 수 반영
      queryClient.setQueryData(weppKeys.detail(weppId), (prev: IWepp) => {
        if (!prev) {
          return prev;
        }

        return {
          ...prev,
          _count: {
            ...prev._count,
            comments: +prev._count!.comments + 1,
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
