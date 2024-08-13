import {
  useQuery,
  UseQueryResult,
  UseQueryOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { type AxiosError } from 'axios';
import { axiosInstance } from '../../axios';
import { authKeys } from './query-key-factory';
import { type OAuthProvider } from '../../types';
import { PATH_API } from '../../path';
import { PATH } from '@/shared/constants';
import { type IUser } from '@/shared/types';

interface Props extends Omit<UseQueryOptions, 'queryKey'> {
  provider: OAuthProvider;
  code: string | null;
}

interface Response {
  user: IUser;
  accessToken: string;
  refreshToken: string;
  redirectUri: string;
}

export const useOAuthLogIn = ({ provider, code, ...options }: Props) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: authKeys.oauthSignIn(provider),
    queryFn: async () => {
      const response = await axiosInstance.post(
        PATH_API.AUTH.OAUTH_SIGN_IN(provider),
        {
          code,
          redirectUri: window.location.origin + PATH.AUTH.OAUTH_LOADING,
        }
      );

      const user = response.data.user;
      queryClient.setQueryData(authKeys.session, user);

      return response.data;
    },
    ...options,
  }) as UseQueryResult<Response, AxiosError>;
};
