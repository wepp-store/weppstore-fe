'use client';

import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useParams } from 'next/navigation';
import { axiosInstance } from '@/shared/apis/axios';
import { PATH_API } from '@/shared/apis/path';

export const useClearWeppUrl = (
  options?: Omit<UseMutationOptions<any, any>, 'mutationKey'>
) => {
  const { enqueueSnackbar } = useSnackbar();
  const { id: weppId }: { id: string } = useParams();

  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post(`${PATH_API.WEPP.CLEAR_URL}`, {
        id: weppId,
      });
      return response.data;
    },
    onError: (error) => {
      enqueueSnackbar(error?.message, { variant: 'error' });
    },
    ...options,
  });
};
