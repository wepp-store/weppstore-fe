import {
  useQuery,
  UseQueryResult,
  UseQueryOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { PATH_API } from '../../path';
import { axiosInstance } from '../../axios';
import { IWepp } from '@/shared/types';
import { weppKeys } from './query-key-factory';
import { notFound } from 'next/navigation';

type Props = {
  weppId: string;
} & Omit<UseQueryOptions, 'queryKey'>;

export const weppDetailOptions = ({
  weppId,
  ...other
}: Props): UseQueryOptions => ({
  queryKey: weppKeys.detail(weppId),
  queryFn: async () => {
    try {
      const response = await axiosInstance.get(PATH_API.WEPP.DETAIL(weppId));
      return response.data;
    } catch (error: any) {
      if (error.statusCode === 404) {
        return notFound();
      }
      throw error;
    }
  },
  enabled: !!weppId,
  ...other,
});

export const useWeppDetail = ({ weppId, ...other }: Props) => {
  return useQuery(weppDetailOptions({ weppId, ...other })) as UseQueryResult<
    IWepp,
    AxiosError
  >;
};
