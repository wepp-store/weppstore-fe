'use client';

import { jwtDecode, setSession } from '@/features/auth/utils';
import { axiosInstance } from '@/shared/apis/axios';
import { PATH_API } from '@/shared/apis/path';
import { authKeys } from '@/shared/apis/queries/auth/query-key-factory';
import { PATH } from '@/shared/constants';
import { IUser } from '@/shared/types';
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export const useSignIn = <T>(
  options?: Omit<UseMutationOptions<any, any, T>, 'mutationKey'>
) => {
  const pathname = usePathname();
  const { replace } = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: T) => {
      const response = await axiosInstance.post(PATH_API.AUTH.SIGN_IN, payload);

      const token = response.data;

      setSession(token);

      return token;
    },
    onSuccess: (token) => {
      const user: IUser = jwtDecode(token.accessToken);

      queryClient.setQueryData(authKeys.session, user);

      const isLoginPage = pathname === PATH.AUTH.LOGIN;
      if (!isLoginPage) return;

      // TODO: admin route
      replace('/');
    },
    onError: (error) => {
      toast.error(error?.message);
    },
    ...options,
  });
};
