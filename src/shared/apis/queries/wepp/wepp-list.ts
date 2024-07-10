import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryResult,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';
import { IWepp } from '@/shared/types';
import { PATH_API } from '../../path';
import { axiosInstance } from '../../axios';
import { weppKeys } from './query-key-factory';

interface ResponseType {
  data: IWepp[];
  page: number;
  size: number;
  totalCount: number;
  totalPages: number;
}

type Props = Omit<
  UseInfiniteQueryOptions,
  'queryKey' | 'initialPageParam' | 'getNextPageParam'
>;

export const weppListOptions: UseInfiniteQueryOptions = {
  queryKey: weppKeys.all,
  queryFn: async ({ pageParam: page }) => {
    const response = await axiosInstance.get(PATH_API.WEPP.ROOT, {
      params: { page, size: 20 },
    });
    return response.data;
  },
  initialPageParam: 1,
  getNextPageParam: (lastData: any, _allData: any) => {
    const isEnd = lastData?.page === lastData?.totalPages;
    return isEnd ? undefined : lastData?.page + 1;
  },
  // keepPreviousData: true,
};

export const useWeppList = (props?: Props) => {
  return useInfiniteQuery({
    ...weppListOptions,
    ...props,
  }) as UseInfiniteQueryResult<InfiniteData<ResponseType>, any>;
};
