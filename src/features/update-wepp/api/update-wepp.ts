'use client';

import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useParams } from 'next/navigation';
import { axiosInstance } from '@/shared/apis/axios';
import { PATH_API } from '@/shared/apis/path';

export const useUpdateWepp = <T>(
  options?: Omit<UseMutationOptions<any, any, T>, 'mutationKey'>
) => {
  const { enqueueSnackbar } = useSnackbar();
  const { id: weppId }: { id: string } = useParams();

  return useMutation({
    mutationFn: async (payload: T) => {
      const response = await axiosInstance.patch(
        `${PATH_API.WEPP.ROOT}/${weppId}`,
        payload
      );
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