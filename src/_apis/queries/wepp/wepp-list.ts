'use client';

import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryResult,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';
import { IWepp } from '@/_types';
import { PATH_API } from '../../path';
import { axiosInstance } from '../../axios';

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

export const useWeppList = (props?: Props) => {
  return useInfiniteQuery({
    queryKey: [PATH_API.WEPP.ROOT],
    queryFn: async ({ pageParam: page }) => {
      const response = await axiosInstance.get(PATH_API.WEPP.ROOT, {
        params: { page, size: 20 },
      });
      return response.data;
    },
    ...props,
    initialPageParam: 1,
    getNextPageParam: (lastData: any, _allData) => {
      const isEnd = lastData?.page === lastData?.totalPages;
      return isEnd ? undefined : lastData?.page + 1;
    },
    // keepPreviousData: true,
  }) as UseInfiniteQueryResult<InfiniteData<ResponseType>, any>;
};
