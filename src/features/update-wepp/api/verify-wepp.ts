'use client';

import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { axiosInstance } from '@/shared/apis/axios';
import { PATH_API } from '@/shared/apis/path';
import toast from 'react-hot-toast';

export const useVerifyWepp = (
  options?: Omit<UseMutationOptions<any, any, string>, 'mutationKey'>
) => {
  const { id: weppId }: { id: string } = useParams();

  return useMutation({
    mutationFn: async (url: string) => {
      const response = await axiosInstance.post(`${PATH_API.WEPP.VERIFY}`, {
        id: weppId,
        url,
      });
      return response.data;
    },
    onError: (error) => {
      toast.error(error?.message);
    },
    ...options,
  });
};
