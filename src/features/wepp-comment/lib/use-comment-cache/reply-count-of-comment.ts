import { type QueryClient } from '@tanstack/react-query';
import { commentKeys } from '../../api/query-key-factory';

export const increaseCacheReplyCount =
  (queryClient: QueryClient) =>
  ({ weppId, parentId }: { weppId: string; parentId: number }) => {
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

export const decreaseCacheReplyCount =
  (queryClient: QueryClient) =>
  ({ weppId, parentId }: { weppId: string; parentId: number }) => {
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
                    children: comment._count.children - 1,
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
