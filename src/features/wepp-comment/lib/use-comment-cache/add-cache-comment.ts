import { type QueryKey, type QueryClient } from '@tanstack/react-query';

export const addCacheComment =
  (queryClient: QueryClient) =>
  ({ data, queryKey }: { data: any; queryKey: QueryKey }) => {
    queryClient.setQueryData(queryKey, (oldData: any) => {
      if (!oldData) {
        return {
          pages: [
            {
              data: [data],
              page: 1,
              size: 8,
              next: null,
            },
          ],
          pageParams: [1],
        };
      }

      return {
        ...oldData,
        pages: oldData.pages.map((page: any, index: number) => {
          if (index === oldData.pages.length - 1) {
            return {
              ...page,
              data: [...page.data, data],
            };
          }
          return page;
        }),
      };
    });
  };
