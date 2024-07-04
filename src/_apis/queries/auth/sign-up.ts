'use client';

import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { PATH } from '@/_constants';
import { PATH_API } from '../../path';
import { axiosInstance } from '../../axios';
import { useRouter } from 'next/router';

export const useSignUp = <T>(
  options?: Omit<UseMutationOptions<any, any, T>, 'mutationKey'>
) => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  return useMutation({
    mutationKey: [PATH_API.AUTH.SIGN_UP],
    mutationFn: async (payload: T) => {
      const response = await axiosInstance.post(PATH_API.AUTH.SIGN_UP, payload);
      return response.data;
    },
    onSuccess: () => {
      enqueueSnackbar('회원가입이 완료되었습니다.', { variant: 'success' });
      router.push(PATH.AUTH.SIGN_IN);
    },
    onError: (error) => {
      enqueueSnackbar(error?.message, { variant: 'error' });
    },
    ...options,
  });
};
