'use client';

import { isValidToken, setSession } from '@/features/auth/utils';
import { REFRESH_TOKEN_KEY } from '@/shared/constants';
import { IUser } from '@/shared/types';
import { localStorageAvailable } from '@/shared/utils';
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

      let user = null;

      if (!axiosInstance.defaults.headers.common.Authorization) {
        const response = await axiosInstance.post(PATH_API.AUTH.REFRESH_TOKEN, {
          refreshToken,
        });

        const accessToken = response.data.accessToken;
        user = response.data.user;

        setSession({ accessToken, refreshToken });
      }

      return user;
    },
    // 계속 가지고 있을 거임
    gcTime: Infinity,
    staleTime: Infinity,
    ...params,
  }) as UseQueryResult<IUser, AxiosError>;
};

export const useSession = () => {
  const { data: user } = useAuth({ enabled: false });

  return {
    user,
    isLoggedIn: !!user,
  };
};
