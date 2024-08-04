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
          // TODO: 작동하나?
          'Cache-Control': 'max-age=3600, must-revalidate', // 1시간 동안 캐시 유지
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
