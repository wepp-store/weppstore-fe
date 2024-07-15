'use client';

import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { axiosInstance } from '@/shared/apis/axios';
import { PATH_API } from '@/shared/apis/path';
import toast from 'react-hot-toast';
import { IUser } from '@/shared/types';
import { authKeys } from '@/shared/apis/queries/auth/query-key-factory';

type Payload = Partial<IUser>;

export const useUpdateProfile = (
  options?: Omit<UseMutationOptions<any, any, Payload>, 'mutationKey'>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: Payload) => {
      await axiosInstance.patch(`${PATH_API.AUTH.ME}`, payload);
      return payload;
    },
    onSuccess: (newData) => {
      toast.success('프로필을 수정하였습니다.');
      const oldData = queryClient.getQueryData<IUser>(authKeys.profile);
      queryClient.setQueryData(authKeys.profile, {
        ...oldData,
        ...newData,
      });
    },
    onError: (error) => {
      toast.error(error?.message);
    },
    ...options,
  });
};
