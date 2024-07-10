'use client';

import { setSession } from '@/features/auth/utils';
import { axiosInstance } from '@/shared/apis/axios';
import { PATH_API } from '@/shared/apis/path';
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

export const useSignIn = <T>(
  options?: Omit<UseMutationOptions<any, any, T>, 'mutationKey'>
) => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: async (payload: T) => {
      const response = await axiosInstance.post(PATH_API.AUTH.SIGN_IN, payload);
      return response.data;
    },
    onSuccess: (data) => {
      setSession(data);
      queryClient.invalidateQueries({ queryKey: [PATH_API.AUTH.ME] });
    },
    onError: (error) => {
      enqueueSnackbar(error?.message, { variant: 'error' });
    },
    ...options,
  });
};
