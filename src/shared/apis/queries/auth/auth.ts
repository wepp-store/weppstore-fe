'use client';

import { isValidToken, jwtDecode, setSession } from '@/features/auth/utils';
import { REFRESH_TOKEN_KEY } from '@/shared/constants';
import { IUser } from '@/shared/types';
import { localStorageAvailable } from '@/shared/utils';
import {
  useQuery,
  UseQueryResult,
  UseQueryOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { axiosInstance } from '../../axios';
import { PATH_API } from '../../path';
import { authKeys } from './query-key-factory';

type Props = Omit<UseQueryOptions, 'queryKey'>;

export const useAuth = (params?: Props) => {
  return useQuery({
    queryKey: authKeys.session,
    queryFn: async () => {
      if (!localStorageAvailable()) {
        throw new Error('Error! 인증 정보를 가져올 수 없음');
      }
      const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY!);

      if (!refreshToken || !isValidToken(refreshToken)) {
        throw new Error('Error! refresh 토큰 만료');
      }

      let accessToken = null;

      if (!axiosInstance.defaults.headers.common.Authorization) {
        const tokenResponse = await axiosInstance.post(
          PATH_API.AUTH.REFRESH_TOKEN,
          {
            refreshToken,
          }
        );

        accessToken = tokenResponse.data.accessToken;

        setSession({ accessToken, refreshToken });
      }

      // const response = await axiosInstance.get(PATH_API.AUTH.ME);

      const { sub, kind, email, status, userName } = jwtDecode(accessToken);

      return {
        id: sub,
        kind,
        email,
        status,
        userName,
      };
    },
    // 계속 가지고 있을 거임
    gcTime: Infinity,
    staleTime: Infinity,
    ...params,
  }) as UseQueryResult<IUser, AxiosError>;
};
