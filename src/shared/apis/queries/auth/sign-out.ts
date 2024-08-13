'use client';

import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { PATH, REFRESH_TOKEN_KEY } from '@/shared/constants';
import { removeSession } from '@/shared/auth';
import { axiosInstance } from '@/shared/apis/axios';
import { PATH_API } from '@/shared/apis/path';
import toast from 'react-hot-toast';

export const useSignOut = (
  options?: Omit<UseMutationOptions<any, any>, 'mutationKey'>
) => {
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY!);

      const response = await axiosInstance.post(PATH_API.AUTH.SIGN_OUT, {
        refreshToken,
      });
      return response.data;
    },
    onSuccess: () => {
      removeSession();
      window.location.replace(PATH.AUTH.LOGIN);
    },
    onError: (error) => {
      toast.error(error?.message);
    },
    ...options,
  });
};
