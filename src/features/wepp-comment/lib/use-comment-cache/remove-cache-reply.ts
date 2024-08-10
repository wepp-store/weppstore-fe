import { commentKeys } from '@/views/wepp-detail/api/query-key-factory';
import { type QueryClient } from '@tanstack/react-query';
import { getCacheComment } from './get-cache-comment';

interface Props {
  parentId: number;
  weppId: string;
  commentId: number;
}

export const removeCacheReply =
  (queryClient: QueryClient) =>
  ({ parentId, weppId, commentId }: Props) => {
    let isLastReply = false;
    // delete reply cache
    queryClient.setQueryData(commentKeys.replies(parentId), (oldData: any) => {
      if (!oldData) {
        return oldData;
      }

      if (oldData.pages.length === 1 && oldData.pages[0].data.length === 1) {
        isLastReply = true;
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

    /**
     * 마지막 대댓글 삭제 && 부모 댓글이 삭제된 상태이면
     * 부모 댓글도 삭제 처리
     */
    const parentComment = getCacheComment(queryClient, weppId, parentId);
    const isDeletedParent = !!parentComment?.deletedAt;

    if (isDeletedParent && isLastReply) {
      deleteCachedParentComment(queryClient, weppId, parentId);
    }
  };

const deleteCachedParentComment = (
  queryClient: QueryClient,
  weppId: string,
  parentId: number
) => {
  queryClient.setQueryData(commentKeys.list(weppId), (oldData: any) => {
    if (!oldData) return oldData;

    return {
      ...oldData,
      pages: oldData.pages.map((page: any) => ({
        ...page,
        data: page.data.filter((comment: any) => comment.id !== parentId),
      })),
    };
  });
};
