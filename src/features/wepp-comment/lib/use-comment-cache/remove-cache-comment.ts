import { IComment } from '@/shared/types';
import { commentKeys } from '@/views/wepp-detail/api/query-key-factory';
import { type InfiniteData, type QueryClient } from '@tanstack/react-query';
import { getCacheComment } from './get-cache-comment';

export const removeCacheComment =
  (queryClient: QueryClient) =>
  ({ commentId, weppId }: { commentId: number; weppId: string }) => {
    const comment = getCacheComment(queryClient, weppId, commentId);
    // 대댓글이 있는 경우 논리적 삭제 처리
    if (comment && comment._count.children > 0) {
      logicalDeleteComment(queryClient, weppId, commentId);
      return;
    }

    // 대댓글이 없는 경우 찐 삭제
    queryClient.setQueryData(commentKeys.list(weppId), (oldData: any) => {
      if (!oldData) return oldData;

      if (oldData.pages.length === 1 && oldData.pages[0].data.length === 1) {
        return null;
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

interface ICommentPagination {
  data: IComment[];
  page: number;
  size: number;
  next: number | null;
}

const logicalDeleteComment = (
  queryClient: QueryClient,
  weppId: string,
  commentId: number
) => {
  queryClient.setQueryData(
    commentKeys.list(weppId),
    (oldData: InfiniteData<ICommentPagination>) => {
      if (!oldData) return oldData;

      return {
        ...oldData,
        pages: oldData.pages.map((page: ICommentPagination) => ({
          ...page,
          data: page.data.map((comment: IComment) => {
            if (comment.id === commentId) {
              return {
                ...comment,
                user: null,
                mention: null,
                content: '삭제된 댓글입니다.',
                deletedAt: new Date().toISOString(),
              };
            }
            return comment;
          }),
        })),
      };
    }
  );
};
