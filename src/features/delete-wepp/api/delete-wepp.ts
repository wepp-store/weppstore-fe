'use client';

import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { axiosInstance } from '@/shared/apis/axios';
import { PATH_API } from '@/shared/apis/path';
import { PATH } from '@/shared/constants';
import toast from 'react-hot-toast';
import { weppKeys } from '@/shared/apis/queries/wepp';

export const useDeleteWepp = <T>(
  options?: Omit<UseMutationOptions<any, any>, 'mutationKey'>
) => {
  const { replace } = useRouter();
  const { weppId }: { weppId: string } = useParams();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.delete(
        `${PATH_API.WEPP.ROOT}/${weppId}`
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success('앱 삭제가 완료되었습니다.');
      queryClient.invalidateQueries({ queryKey: weppKeys.mineList });
      replace(PATH.DEVELOPER.WEPP);
    },
    onError: (error) => {
      toast.error(error?.message);
    },
    ...options,
  });
};
