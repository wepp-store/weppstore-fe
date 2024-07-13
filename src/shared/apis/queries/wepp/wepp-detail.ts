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

type Props = {
  weppId: string;
  read?: boolean;
} & Omit<UseQueryOptions, 'queryKey'>;

export const weppDetailOptions = ({
  weppId,
  read = false,
  ...other
}: Props): UseQueryOptions => ({
  queryKey: weppKeys.detail(weppId),
  queryFn: async () => {
    const response = await axiosInstance.get(
      `${PATH_API.WEPP.ROOT}/${weppId}`,
      {
        headers: {
          'X-WEPP-READ': read,
        },
      }
    );
    return response.data;
  },
  enabled: !!weppId,
  ...other,
});

export const useWeppDetail = ({ weppId, read = false, ...other }: Props) => {
  return useQuery(
    weppDetailOptions({ weppId, read, ...other })
  ) as UseQueryResult<IWepp, AxiosError>;
};
