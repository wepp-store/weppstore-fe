'use client';

import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useParams } from 'next/navigation';
import { axiosInstance } from '@/shared/apis/axios';
import { PATH_API } from '@/shared/apis/path';

export const useUploadWeppImage = (
  options?: Omit<UseMutationOptions<any, any, File>, 'mutationKey'>
) => {
  const { id: weppId }: { id: string } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: async (file: File) => {
      if (!weppId) throw new Error('weppId is required');

      const response = await axiosInstance.post(
        `${PATH_API.WEPP.UPLOAD}/${weppId}`,
        file,
        {
          headers: {
            'Content-Type': 'application/octet-stream',
          },
        }
      );
      return response.data;
    },
    onError: (error) => {
      enqueueSnackbar(error?.message, { variant: 'error' });
    },
    ...options,
  });
};
