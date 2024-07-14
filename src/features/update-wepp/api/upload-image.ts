'use client';

import { useMutation } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { axiosInstance } from '@/shared/apis/axios';
import { PATH_API } from '@/shared/apis/path';
import { resizeImage } from '@/shared/utils/resize-image';
import toast from 'react-hot-toast';

type FileType = 'logo' | 'screenshots';

const upload = async (file: File, weppId: string, type: FileType) => {
  const formData = new FormData();
  const resizedFile = await resizeImage(file);
  formData.append('file', resizedFile);

  const response = await axiosInstance.post<{ url: string }>(
    `${PATH_API.WEPP.UPLOAD}/${weppId}/${type}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response.data;
};

export const useUploadWeppImage = ({ type }: { type: FileType }) => {
  const { id: weppId }: { id: string } = useParams();

  return useMutation({
    mutationFn: async (file: File) => {
      if (!weppId) throw new Error('weppId is required');

      return upload(file, weppId, type);
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
};

export const useUploadWeppImages = ({ type }: { type: FileType }) => {
  const { id: weppId }: { id: string } = useParams();

  return useMutation({
    mutationFn: async (files: FileList) => {
      if (!weppId) throw new Error('weppId is required');

      const response = await Promise.all(
        Array.from(files).map((file) => upload(file, weppId, type))
      );

      return response;
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
};
