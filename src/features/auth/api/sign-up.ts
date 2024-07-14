'use client';

import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { PATH } from '@/shared/constants';
import { useRouter } from 'next/navigation';
import { axiosInstance } from '@/shared/apis/axios';
import { PATH_API } from '@/shared/apis/path';
import toast from 'react-hot-toast';

export const useSignUp = <T>(
  options?: Omit<UseMutationOptions<any, any, T>, 'mutationKey'>
) => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: T) => {
      const response = await axiosInstance.post(PATH_API.AUTH.SIGN_UP, payload);
      return response.data;
    },
    onSuccess: () => {
      toast.success('회원가입이 완료되었습니다.');
      router.push(PATH.AUTH.LOGIN);
    },
    onError: (error) => {
      toast.error(error?.message);
    },
    ...options,
  });
};
