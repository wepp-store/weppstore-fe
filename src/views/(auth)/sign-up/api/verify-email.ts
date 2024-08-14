import { axiosInstance } from '@/shared/apis/axios';
import { PATH_API } from '@/shared/apis/path';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import toast from 'react-hot-toast';

interface Payload {
  code: string;
  email: string;
  userToken: string;
}

export const useVerifyEmail = (
  options?: Omit<UseMutationOptions<any, any, Payload>, 'mutationKey'>
) => {
  return useMutation({
    mutationFn: async (payload: Payload) => {
      const response = await axiosInstance.post(
        PATH_API.AUTH.VERIFY_EMAIL,
        payload
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success('이메일 인증이 완료되었습니다.');
    },
    onError: (error) => {
      toast.error(error?.message);
    },
    ...options,
  });
};
