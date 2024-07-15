'use client';

import { IUser } from '@/shared/types';
import {
  useQuery,
  UseQueryResult,
  UseQueryOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { axiosInstance } from '../../axios';
import { PATH_API } from '../../path';
import { authKeys } from './query-key-factory';

type Props = Omit<UseQueryOptions, 'queryKey'>;

export const useMyProfile = (params?: Props) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: authKeys.profile,
    queryFn: async () => {
      const response = await axiosInstance.get(PATH_API.AUTH.ME);
      const user = response.data;

      queryClient.setQueryData(authKeys.session, user);

      return user;
    },
    ...params,
  }) as UseQueryResult<IUser, AxiosError>;
};
