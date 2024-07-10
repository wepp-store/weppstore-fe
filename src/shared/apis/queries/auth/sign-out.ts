'use client';

import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/navigation';
import { PATH } from '@/shared/constants';
import { removeSession } from '@/features/auth';
import { axiosInstance } from '@/shared/apis/axios';
import { PATH_API } from '@/shared/apis/path';

export const useSignOut = (
  options?: Omit<UseMutationOptions<any, any>, 'mutationKey'>
) => {
  const { replace } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post(PATH_API.AUTH.SIGN_OUT);
      return response.data;
    },
    onSuccess: () => {
      removeSession();
      replace(PATH.AUTH.LOGIN);
      window.location.reload();
    },
    onError: (error) => {
      enqueueSnackbar(error?.message, { variant: 'error' });
    },
    ...options,
  });
};
