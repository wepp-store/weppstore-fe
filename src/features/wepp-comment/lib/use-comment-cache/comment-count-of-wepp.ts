import { weppKeys } from '@/shared/apis/queries/wepp';
import { IWepp } from '@/shared/types';
import { type QueryClient } from '@tanstack/react-query';

export const increaseCacheCommentCount =
  (queryClient: QueryClient) =>
  ({ weppId }: { weppId: string }) => {
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

export const decreaseCacheCommentCount =
  (queryClient: QueryClient) =>
  ({ weppId }: { weppId: string }) => {
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
  };
