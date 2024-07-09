'use client';

import { isValidToken, setSession } from '@/features/auth/utils';
import { REFRESH_TOKEN_KEY } from '@/shared/constants';
import { IUser } from '@/shared/types';
import { localStorageAvailable } from '@/shared/utils';
import {
  useQuery,
  useQueryClient,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { axiosInstance } from '../../axios';
import { PATH_API } from '../../path';

type Props = Omit<UseQueryOptions, 'queryKey'>;

export const useAuth = (params?: Props) => {
  return useQuery({
    queryKey: [PATH_API.AUTH.ME],
    queryFn: async () => {
      if (!localStorageAvailable()) {
        throw new Error('Error! 인증 정보를 가져올 수 없음');
      }
      const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY!);

      if (!refreshToken || !isValidToken(refreshToken)) {
        throw new Error('Error! refresh 토큰 만료');
      }

      if (!axiosInstance.defaults.headers.common.Authorization) {
        const tokenResponse = await axiosInstance.post(
          PATH_API.AUTH.REFRESH_TOKEN,
          {
            refreshToken,
          }
        );

        const { accessToken } = tokenResponse.data;

        setSession({ accessToken, refreshToken });
      }

      const response = await axiosInstance.get(PATH_API.AUTH.ME);

      return response.data;
    },
    // 계속 가지고 있을 거임
    gcTime: Infinity,
    staleTime: Infinity,
    ...params,
  }) as UseQueryResult<IUser, AxiosError>;
};

//
export const useCachedUser = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<IUser>([PATH_API.AUTH.ME]);
  return { user };
};
