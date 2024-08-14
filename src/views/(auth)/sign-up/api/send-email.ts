import { axiosInstance } from '@/shared/apis/axios';
import { PATH_API } from '@/shared/apis/path';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

interface Payload {
  email: string;
}

export const useSendEmail = (
  options?: Omit<UseMutationOptions<any, any, Payload>, 'mutationKey'>
) => {
  return useMutation({
    mutationFn: async (payload: Payload) => {
      const response = await axiosInstance.post(
        PATH_API.AUTH.SEND_EMAIL,
        payload
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success('이메일 전송이 완료되었습니다.');
    },
    onError: (error) => {
      toast.error(String(error));
      toast.error(error?.message);
    },
    ...options,
  });
};
