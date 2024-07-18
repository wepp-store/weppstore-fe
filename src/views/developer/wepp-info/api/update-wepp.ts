'use client';

import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { axiosInstance } from '@/shared/apis/axios';
import { PATH_API } from '@/shared/apis/path';
import toast from 'react-hot-toast';

export const useUpdateWepp = <T>(
  options?: Omit<UseMutationOptions<any, any, T>, 'mutationKey'>
) => {
  const { weppId }: { weppId: string } = useParams();

  return useMutation({
    mutationFn: async (payload: T) => {
      const response = await axiosInstance.patch(
        `${PATH_API.WEPP.ROOT}/${weppId}`,
        payload
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success('앱 수정 완료');
      // router.push(PATH.DEVELOPER.WEPP);
    },
    onError: (error) => {
      toast.error(error?.message);
    },
    ...options,
  });
};
