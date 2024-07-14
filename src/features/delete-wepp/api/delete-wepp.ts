'use client';

import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useParams, useRouter } from 'next/navigation';
import { axiosInstance } from '@/shared/apis/axios';
import { PATH_API } from '@/shared/apis/path';
import { PATH } from '@/shared/constants';

export const useDeleteWepp = <T>(
  options?: Omit<UseMutationOptions<any, any>, 'mutationKey'>
) => {
  const { replace } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { id: weppId }: { id: string } = useParams();

  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.delete(
        `${PATH_API.WEPP.ROOT}/${weppId}`
      );
      return response.data;
    },
    onSuccess: () => {
      enqueueSnackbar('앱 삭제가 완료되었습니다.', { variant: 'success' });
      replace(`/${PATH.DEVELOPER.WEPP}`);
    },
    onError: (error) => {
      enqueueSnackbar(error?.message, { variant: 'error' });
    },
    ...options,
  });
};
