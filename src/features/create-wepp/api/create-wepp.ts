'use client';

import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { PATH } from '@/shared/constants';
import { useRouter } from 'next/navigation';
import { axiosInstance } from '@/shared/apis/axios';
import { PATH_API } from '@/shared/apis/path';

export const useCreateWepp = <T>(
  options?: Omit<UseMutationOptions<any, any, T>, 'mutationKey'>
) => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: T) => {
      const response = await axiosInstance.post(PATH_API.WEPP.ROOT, payload);
      return response.data;
    },
    onSuccess: (id) => {
      enqueueSnackbar('앱 생성 완료', { variant: 'success' });
      router.push(`${PATH.DEVELOPER.WEPP}/${id}/info`);
    },
    onError: (error) => {
      enqueueSnackbar(error?.message, { variant: 'error' });
    },
    ...options,
  });
};
