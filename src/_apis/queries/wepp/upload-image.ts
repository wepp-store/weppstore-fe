'use client';

import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { PATH_API } from '../../path';
import { axiosInstance } from '../../axios';

export const useUploadWeppImage = (
  options?: Omit<UseMutationOptions<any, any, File>, 'mutationKey'>
) => {
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: async (file: File) => {
      const response = await axiosInstance.post(PATH_API.WEPP.UPLOAD, file, {
        headers: {
          'Content-Type': 'application/octet-stream',
          'Content-Disposition': `attachment; filename="${file.name}"`,
        },
      });

      return response.data;
    },
    onError: (error) => {
      enqueueSnackbar(error?.message, { variant: 'error' });
    },
    ...options,
  });
};
