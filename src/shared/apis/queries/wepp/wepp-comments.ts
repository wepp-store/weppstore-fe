import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryResult,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';
import { IComment } from '@/shared/types';
import { PATH_API } from '../../path';
import { axiosInstance } from '../../axios';
import { weppKeys } from './query-key-factory';
import { useParams } from 'next/navigation';

interface ResponseType {
  data: IComment[];
  page: number;
  size: number;
  totalCount: number;
  totalPages: number;
}

type Props = Omit<
  UseInfiniteQueryOptions,
  'queryKey' | 'initialPageParam' | 'getNextPageParam'
>;

export const weppCommentsOptions = (
  weppId: string
): UseInfiniteQueryOptions => ({
  queryKey: weppKeys.comments(weppId),
  queryFn: async ({ pageParam: page }) => {
    const response = await axiosInstance.get(
      `${PATH_API.COMMENT.ROOT}/${weppId}`,
      {
        params: { page, size: 10 },
      }
    );
    return response.data;
  },
  enabled: !!weppId,
  initialPageParam: 1,
  getNextPageParam: (lastData: any, _allData: any) => {
    const isEnd = lastData?.page === lastData?.totalPages;
    return isEnd ? undefined : lastData?.page + 1;
  },
  // keepPreviousData: true,
});

export const useWeppComments = (props?: Props) => {
  const { weppId } = useParams();

  return useInfiniteQuery({
    ...weppCommentsOptions(weppId as string),
    ...props,
  }) as UseInfiniteQueryResult<InfiniteData<ResponseType>, any>;
};
