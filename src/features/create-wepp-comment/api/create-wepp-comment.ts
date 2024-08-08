'use client';

import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
  type QueryClient,
} from '@tanstack/react-query';
import { axiosInstance } from '@/shared/apis/axios';
import { PATH_API } from '@/shared/apis/path';
import toast from 'react-hot-toast';
import { useParams } from 'next/navigation';
import { useSession } from '@/shared/apis/queries/auth';
import { weppKeys } from '@/shared/apis/queries/wepp';
import { IComment, IWepp } from '@/shared/types';
import { commentKeys } from '@/views/wepp-detail/api/query-key-factory';

type Payload = Pick<IComment, 'content' | 'parentId' | 'mention'>;

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
        mention: content.mention,
        weppId: weppId,
        userId: user.id,
      });

      return response.data;
    },
    onSuccess: (data: Pick<IComment, 'content' | 'parentId'>) => {
      toast.success('댓글이 작성되었습니다.');

      const isReply = !!data.parentId;

      const newData = {
        ...data,
        user,
      };

      if (!isReply) {
        // 댓글 상태 반영
        setCacheComment({ newData, weppId, queryClient });
      } else {
        const commentId = data.parentId!;
        setCacheReply({ parentId: commentId, queryClient });
        // 대댓글 수 반영
        setCacheReplyCount({ weppId, parentId: commentId, queryClient });
      }

      // 댓글 수 반영
      setCacheCommentCount({ weppId, queryClient });
    },
    onError: (error) => {
      toast.error(
        error?.message || '댓글 작성에 실패했습니다. 잠시 후 다시 시도해주세요.'
      );
    },
    ...options,
  });
};

const setCacheComment = ({
  newData,
  weppId,
  queryClient,
}: {
  newData: any;
  weppId: string;
  queryClient: QueryClient;
}) => {
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
};

const setCacheReply = ({
  parentId,
  queryClient,
}: {
  parentId: number;
  queryClient: QueryClient;
}) => {
  queryClient.setQueryData(commentKeys.replies(parentId), (prev: any) => {
    if (!prev) {
      return prev;
    }

    return {
      ...prev,
      pages: prev.pages.map((page: any) => {
        return {
          ...page,
          data: page.data.map((comment: any) => {
            if (comment.id === parentId) {
              return {
                ...comment,
                _count: {
                  ...comment._count,
                  children: comment._count.children + 1,
                },
              };
            }
            return comment;
          }),
        };
      }),
    };
  });
};

const setCacheReplyCount = ({
  weppId,
  parentId,
  queryClient,
}: {
  weppId: string;
  parentId: number;
  queryClient: QueryClient;
}) => {
  queryClient.setQueryData(commentKeys.list(weppId), (prev: any) => {
    if (!prev) {
      return prev;
    }

    return {
      ...prev,
      pages: prev.pages.map((page: any) => {
        return {
          ...page,
          data: page.data.map((comment: any) => {
            if (comment.id === parentId) {
              return {
                ...comment,
                _count: {
                  ...comment._count,
                  children: comment._count.children + 1,
                },
              };
            }
            return comment;
          }),
        };
      }),
    };
  });
};

const setCacheCommentCount = ({
  weppId,
  queryClient,
}: {
  weppId: string;
  queryClient: QueryClient;
}) => {
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
};
