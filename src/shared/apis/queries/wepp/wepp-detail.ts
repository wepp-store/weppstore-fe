import {
  useQuery,
  UseQueryResult,
  UseQueryOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { PATH_API } from '../../path';
import { axiosInstance } from '../../axios';
import { IWepp } from '@/shared/types';

type Props = {
  weppId?: string;
  read?: boolean;
} & Omit<UseQueryOptions, 'queryKey'>;

export const useWeppDetail = ({ weppId, read = false, ...other }: Props) => {
  return useQuery({
    queryKey: [PATH_API.WEPP.ROOT, weppId],
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
  }) as UseQueryResult<IWepp, AxiosError>;
};
