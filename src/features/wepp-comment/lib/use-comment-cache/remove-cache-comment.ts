import { commentKeys } from '@/views/wepp-detail/api/query-key-factory';
import { type QueryClient } from '@tanstack/react-query';

export const removeCacheComment =
  (queryClient: QueryClient) =>
  ({ commentId, weppId }: { commentId: number; weppId: string }) => {
    queryClient.setQueryData(commentKeys.list(weppId), (oldData: any) => {
      if (!oldData) return oldData;

      return {
        ...oldData,
        pages: oldData.pages.map((page: any) => ({
          ...page,
          data: page.data.filter((comment: any) => comment.id !== commentId),
        })),
      };
    });
  };
