'use client';

import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useParams } from 'next/navigation';
import { axiosInstance } from '@/shared/apis/axios';
import { PATH_API } from '@/shared/apis/path';

const upload = async (file: File | File[], weppId: string) => {
  const response = await axiosInstance.post<{ url: string }>(
    `${PATH_API.WEPP.UPLOAD}/${weppId}`,
    file,
    {
      headers: {
        'Content-Type': 'application/octet-stream',
      },
    }
  );
  return response.data;
};

export const useUploadWeppImage = (
  options?: Omit<UseMutationOptions<any, any, File>, 'mutationKey'>
) => {
  const { id: weppId }: { id: string } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: async (file: File) => {
      if (!weppId) throw new Error('weppId is required');

      return upload(file, weppId);
    },
    onError: (error) => {
      enqueueSnackbar(error?.message, { variant: 'error' });
    },
    ...options,
  });
};

export const useUploadWeppImages = () => {
  const { id: weppId }: { id: string } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: async (files: FileList) => {
      if (!weppId) throw new Error('weppId is required');

      const response = await Promise.all(
        Array.from(files).map((file) => upload(file, weppId))
      );

      return response;
    },
    onError: (error) => {
      enqueueSnackbar(error?.message, { variant: 'error' });
    },
  });
};
