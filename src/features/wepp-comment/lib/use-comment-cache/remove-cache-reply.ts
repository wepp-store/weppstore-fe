import { commentKeys } from '@/views/wepp-detail/api/query-key-factory';
import { type QueryClient } from '@tanstack/react-query';

export const removeCacheReply =
  (queryClient: QueryClient) =>
  ({ parentId, commentId }: { parentId: number; commentId: number }) => {
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
