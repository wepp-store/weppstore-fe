'use client';

import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { axiosInstance } from '@/shared/apis/axios';
import { PATH_API } from '@/shared/apis/path';
import toast from 'react-hot-toast';

export const useClearWeppUrl = (
  options?: Omit<UseMutationOptions<any, any>, 'mutationKey'>
) => {
  const { weppId }: { weppId: string } = useParams();

  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post(`${PATH_API.WEPP.CLEAR_URL}`, {
        id: weppId,
      });
      return response.data;
    },
    onError: (error) => {
      toast.error(error?.message);
    },
    ...options,
  });
};
