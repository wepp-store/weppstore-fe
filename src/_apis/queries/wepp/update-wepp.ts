'use client';

import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { PATH } from '@/_constants';
import { PATH_API } from '../../path';
import { axiosInstance } from '../../axios';
import { useRouter } from 'next/navigation';

export const useUpdateWepp = <T>(
  options?: Omit<UseMutationOptions<any, any, T>, 'mutationKey'>
) => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: T) => {
      const response = await axiosInstance.patch(PATH_API.WEPP.ROOT, payload);
      return response.data;
    },
    onSuccess: () => {
      enqueueSnackbar('앱 수정 완료', { variant: 'success' });
      // router.push(PATH.DEVELOPER.WEPP);
    },
    onError: (error) => {
      enqueueSnackbar(error?.message, { variant: 'error' });
    },
    ...options,
  });
};
