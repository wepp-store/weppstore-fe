'use client';

import { jwtDecode, setSession } from '@/features/auth/utils';
import { axiosInstance } from '@/shared/apis/axios';
import { PATH_API } from '@/shared/apis/path';
import { PATH } from '@/shared/constants';
import { IUser } from '@/shared/types';
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';

export const useSignIn = <T>(
  options?: Omit<UseMutationOptions<any, any, T>, 'mutationKey'>
) => {
  const pathname = usePathname();
  const { replace } = useRouter();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: async (payload: T) => {
      const response = await axiosInstance.post(PATH_API.AUTH.SIGN_IN, payload);

      const token = response.data;

      setSession(token);

      return token;
    },
    onSuccess: (token) => {
      const user: IUser = jwtDecode(token.accessToken);

      queryClient.setQueryData([PATH_API.AUTH.ME], user);

      const isLoginPage = pathname.replaceAll('/', '') === PATH.AUTH.LOGIN;
      if (!isLoginPage) return;

      if (user.kind === 'DEVELOPER') {
        replace(`/${PATH.DEVELOPER.MAIN}`);
        return;
      }

      // TODO: user & admin route
      replace('/');
    },
    onError: (error) => {
      enqueueSnackbar(error?.message, { variant: 'error' });
    },
    ...options,
  });
};
