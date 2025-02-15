'use client';

import { setSession } from '@/shared/auth/utils';
import { axiosInstance } from '@/shared/apis/axios';
import { PATH_API } from '@/shared/apis/path';
import { authKeys } from '@/shared/apis/queries/auth/query-key-factory';
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import axios from 'axios';

export const useSignIn = <T>(
  options?: Omit<UseMutationOptions<any, any, T>, 'mutationKey'>
) => {
  const { replace } = useRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();

  return useMutation({
    mutationFn: async (payload: T) => {
      // const response = await axiosInstance.post(PATH_API.AUTH.SIGN_IN, payload);
      /** Server side에서 first party cookie를 사용하기 위해
       * route handler 사용
       */
      const response = await axios.post('/api/sign-in', payload);
      const { user, ...token } = response.data;

      setSession(token);

      return user;
    },
    onSuccess: (user) => {
      queryClient.setQueryData(authKeys.session, user);

      if (searchParams.get('redirect')) {
        replace(searchParams.get('redirect') as string);
        return;
      }

      replace('/');
    },
    onError: (error) => {
      toast.error(error?.message);
    },
    ...options,
  });
};
