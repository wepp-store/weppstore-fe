import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryResult,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';
import { IComment } from '@/shared/types';
import { useParams } from 'next/navigation';
import { commentKeys } from '@/views/wepp-detail/api/query-key-factory';
import { axiosInstance } from '@/shared/apis/axios';
import { PATH_API } from '@/shared/apis/path';

interface ResponseType {
  data: IComment[];
  page: number;
  size: number;
  totalCount: number;
  totalPages: number;
}

type Props = { size?: number } & Omit<
  UseInfiniteQueryOptions,
  'queryKey' | 'initialPageParam' | 'getNextPageParam'
>;

export const weppCommentsOptions = (
  weppId: string,
  size: number = 10
): UseInfiniteQueryOptions => ({
  queryKey: commentKeys.list(weppId),
  queryFn: async ({ pageParam: page }) => {
    const response = await axiosInstance.get(
      `${PATH_API.COMMENT.ROOT}/${weppId}`,
      {
        params: { page, size },
      }
    );
    return response.data;
  },
  enabled: !!weppId,
  initialPageParam: 1,
  getNextPageParam: (lastData: any, _allData: any) => lastData?.next,
  // keepPreviousData: true,
});

export const useWeppComments = (props?: Props) => {
  const { weppId }: { weppId: string } = useParams();

  const { size, ...other } = props || {};

  return useInfiniteQuery({
    ...weppCommentsOptions(weppId, size),
    ...other,
  }) as UseInfiniteQueryResult<InfiniteData<ResponseType>, any>;
};
