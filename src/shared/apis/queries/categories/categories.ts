import { axiosInstance } from '@/shared/apis/axios';
import { PATH_API } from '@/shared/apis/path';
import { ICategory } from '@/shared/types';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

type ResponseType = Omit<ICategory, 'description'>[];

export const useCategories = () => {
  return useQuery({
    queryKey: [PATH_API.CATEGORIES.ROOT],
    queryFn: async () => {
      const response = await axiosInstance.get(PATH_API.CATEGORIES.ROOT);
      return response.data;
    },
    gcTime: Infinity,
    staleTime: Infinity,
  }) as UseQueryResult<ResponseType, AxiosError>;
};
