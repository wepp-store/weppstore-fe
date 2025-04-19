import {
  useQuery,
  UseQueryResult,
  UseQueryOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { PATH_API } from '../../path';
import { axiosInstance } from '../../axios';
import { weppKeys } from './query-key-factory';
import { notFound } from 'next/navigation';

type Props = {
  weppId: string;
  from?: string;
  to?: string;
} & Omit<UseQueryOptions, 'queryKey'>;

interface ResponseType {
  date: string;
  devicePlatform: string;
  deviceType: string;
  view: number;
  install: number;
}

export const useEventLogs = ({ weppId, from, to, ...other }: Props) => {
  return useQuery({
    queryKey: weppKeys.eventLogs(weppId, from, to),
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(PATH_API.WEPP.EVENT_LOG, {
          params: {
            wepp_id: weppId,
            from,
            to,
          },
        });

        return response.data;
      } catch (error: any) {
        if (error.statusCode === 404) {
          return notFound();
        }

        throw error;
      }
    },
    enabled: !!weppId,
    staleTime: Infinity,
    gcTime: Infinity,
    ...other,
  }) as UseQueryResult<ResponseType[], AxiosError>;
};
