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
import { IComment, IWepp } from '@/shared/types';
import { commentKeys } from './query-key-factory';
import { weppKeys } from '@/shared/apis/queries/wepp';

type Payload = { commentId: number };

export const useDeleteWeppComment = (
  options?: Omit<UseMutationOptions<any, any, Payload>, 'mutationKey'>
) => {
  const { weppId }: { weppId: string } = useParams();
  const { user } = useSession();

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
    onSuccess: (data: Pick<IComment, 'id' | 'parentId'>) => {
      toast.success('댓글이 삭제되었습니다.');

      const parentId = data.parentId;
      const isReply = !!parentId;
      const commentId = data.id;

      if (!isReply) {
        // 댓글 상태 반영
        removeCacheComment({ commentId, queryClient, weppId });
      } else {
        removeCacheReply({ parentId, commentId, queryClient });
        // 대댓글 수 반영
        removeCacheRepliesCount({ weppId, parentId, queryClient });
      }

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

// ------------------------------------------------------------
const removeCacheComment = ({
  commentId,
  queryClient,
  weppId,
}: {
  commentId: number;
  queryClient: any;
  weppId: string;
}) => {
  queryClient.setQueryData(commentKeys.list(weppId), (oldData: any) => {
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
};

const removeCacheReply = ({
  parentId,
  commentId,
  queryClient,
}: {
  parentId: number;
  commentId: number;
  queryClient: any;
}) => {
  queryClient.setQueryData(commentKeys.replies(parentId), (oldData: any) => {
    if (!oldData) {
      return oldData;
    }

    if (oldData.pages.length === 1 && oldData.pages[0].data.length === 1) {
      return {
        pages: [],
        pageParams: [],
      };
    }

    return {
      ...oldData,
      pages: oldData.pages.map((page: any) => ({
        ...page,
        data: page.data.filter((comment: any) => comment.id !== commentId),
      })),
    };
  });
};

const removeCacheRepliesCount = ({
  weppId,
  parentId,
  queryClient,
}: {
  weppId: string;
  parentId: number;
  queryClient: any;
}) => {
  queryClient.setQueryData(commentKeys.list(weppId), (oldData: any) => {
    if (!oldData) {
      return oldData;
    }

    return {
      ...oldData,
      pages: oldData.pages.map((page: any) => ({
        ...page,
        data: page.data.map((comment: any) => {
          if (comment.id === parentId) {
            return {
              ...comment,
              _count: {
                ...comment._count,
                children: comment._count.children - 1,
              },
            };
          }
          return comment;
        }),
      })),
    };
  });
};
