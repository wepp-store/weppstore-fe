'use client';

import { setSession } from '@/features/auth/utils';
import { axiosInstance } from '@/shared/apis/axios';
import { PATH_API } from '@/shared/apis/path';
import { authKeys } from '@/shared/apis/queries/auth/query-key-factory';
import { PATH } from '@/shared/constants';
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
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

      const { user, ...token } = response.data;

      setSession(token);

      return user;
    },
    onSuccess: (user) => {
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
