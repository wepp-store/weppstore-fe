'use client';

import { setSession } from '@/features/auth/utils';
import { PATH } from '@/shared/constants';
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import { axiosInstance } from '../../axios';
import { PATH_API } from '../../path';

export const useSignIn = <T>(
  options?: Omit<UseMutationOptions<any, any, T>, 'mutationKey'>
) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationKey: [PATH_API.AUTH.SIGN_IN],
    mutationFn: async (payload: T) => {
      const response = await axiosInstance.post(PATH_API.AUTH.SIGN_IN, payload);
      return response.data;
    },
    onSuccess: (data) => {
      setSession(data);
      queryClient.invalidateQueries({ queryKey: [PATH_API.AUTH.ME] });
      router.replace(PATH.MAIN.HOME);
    },
    onError: (error) => {
      enqueueSnackbar(error?.message, { variant: 'error' });
    },
    ...options,
  });
};
