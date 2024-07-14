'use client';

import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { PATH } from '@/shared/constants';
import { useRouter } from 'next/navigation';
import { axiosInstance } from '@/shared/apis/axios';
import { PATH_API } from '@/shared/apis/path';
import toast from 'react-hot-toast';

export const useCreateWepp = <T>(
  options?: Omit<UseMutationOptions<any, any, T>, 'mutationKey'>
) => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: T) => {
      const response = await axiosInstance.post(PATH_API.WEPP.ROOT, payload);
      return response.data;
    },
    onSuccess: (id) => {
      toast.success('앱 생성 완료');
      router.push(`${PATH.DEVELOPER.WEPP}/${id}/info`);
    },
    onError: (error) => {
      toast.error(error?.message);
    },
    ...options,
  });
};
