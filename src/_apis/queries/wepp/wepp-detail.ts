import {
  useQuery,
  UseQueryResult,
  UseQueryOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { PATH_API } from '../../path';
import { axiosInstance } from '../../axios';

type Props = {
  weppId?: string;
} & Omit<UseQueryOptions, 'queryKey'>;

export const useWeppDetail = <T>({ weppId, ...other }: Props) => {
  return useQuery({
    queryKey: [PATH_API.WEPP.ROOT, weppId],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `${PATH_API.WEPP.ROOT}/${weppId}`
      );
      return response.data;
    },
    // 계속 가지고 있을 거임
    gcTime: Infinity,
    staleTime: Infinity,
    enabled: !!weppId,
    ...other,
  }) as UseQueryResult<T, AxiosError>;
};
