import {
  useQuery,
  UseQueryResult,
  UseQueryOptions,
  useMutation,
  UseMutationOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { PATH_API } from '../../path';
import { axiosInstance } from '../../axios';
import { IUser } from '@/shared/types';
import { userKeys } from './query-key-factory';
import toast from 'react-hot-toast';

type Props = {
  params: { email?: string; id?: number };
} & Omit<UseQueryOptions, 'queryKey'>;

export const useFindUser = ({ params, ...other }: Props) => {
  return useQuery({
    queryKey: userKeys.find,
    queryFn: async () => {
      const response = await axiosInstance.get(PATH_API.USER.FIND, { params });
      return response.data;
    },
    enabled: !!params?.id || !!params?.email,
    gcTime: 3_000, // 5m
    staleTime: 3_000,
    ...other,
  }) as UseQueryResult<IUser, AxiosError>;
};

export const useFindUserMutate = (
  options?: Omit<
    UseMutationOptions<any, any, { id?: string; email?: string }>,
    'mutationKey'
  >
) => {
  return useMutation({
    mutationFn: async (params) => {
      const response = await axiosInstance.get(PATH_API.USER.FIND, { params });
      return response.data;
    },
    onError: (error) => {
      toast.error(error.message ?? '사용자를 찾을 수 없습니다.');
    },
    ...options,
  });
};
