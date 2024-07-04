'use client';

import {
  useQuery,
  UseQueryResult,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { isValidToken, setSession } from '@/_auth/utils';
import { REFRESH_TOKEN_KEY } from '@/_constants';
import { localStorageAvailable } from '@/_utils';
import { IUser } from '@/_types';
import { PATH_API } from '../../path';
import { axiosInstance } from '../../axios';

type Props = Omit<UseQueryOptions, 'queryKey'>;

export const useAuth = <T>(params?: Props) => {
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
  }) as UseQueryResult<T, AxiosError>;
};

//
export const useCachedUser = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<IUser>([PATH_API.AUTH.ME]);
  return { user };
};
