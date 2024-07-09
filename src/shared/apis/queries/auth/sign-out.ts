'use client';

import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { axiosInstance } from '../../axios';
import { PATH_API } from '../../path';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/navigation';
import { PATH } from '@/shared/constants';
import { removeSession } from '@/features/auth';

export const useSignOut = (
  options?: Omit<UseMutationOptions<any, any>, 'mutationKey'>
) => {
  const { replace } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationKey: [PATH_API.AUTH.SIGN_OUT],
    mutationFn: async () => {
      const response = await axiosInstance.post(PATH_API.AUTH.SIGN_OUT);
      return response.data;
    },
    onSuccess: () => {
      removeSession();
      replace(PATH.AUTH.SIGN_IN);
      window.location.reload();
    },
    onError: (error) => {
      enqueueSnackbar(error?.message, { variant: 'error' });
    },
    ...options,
  });
};
