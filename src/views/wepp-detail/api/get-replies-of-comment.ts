import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryResult,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';
import { IComment } from '@/shared/types';
import { commentKeys } from './query-key-factory';
import { axiosInstance } from '@/shared/apis/axios';
import { PATH_API } from '@/shared/apis/path';

interface ResponseType {
  data: IComment[];
  page: number;
  size: number;
}

type Props = { commentId: number; size?: number } & Omit<
  UseInfiniteQueryOptions,
  'queryKey' | 'initialPageParam' | 'getNextPageParam'
>;

export const useRepliesOfComment = (props: Props) => {
  const { commentId, size, ...other } = props || {};

  return useInfiniteQuery({
    queryKey: commentKeys.replies(commentId),
    queryFn: async ({ pageParam: page }) => {
      const response = await axiosInstance.get(
        `${PATH_API.COMMENT.REPLIES}/${commentId}`,
        {
          params: { page, size },
        }
      );
      return response.data;
    },
    enabled: false,
    initialPageParam: 1,
    getNextPageParam: (lastData: any, _allData: any) => lastData?.next,
    gcTime: 1000 * 60 * 10, // 10분
    staleTime: 1000 * 60 * 10, // 10분
    ...other,
  }) as UseInfiniteQueryResult<InfiniteData<ResponseType>, any>;
};
