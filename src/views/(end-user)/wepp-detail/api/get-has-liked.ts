'use client';

import { axiosInstance } from '@/shared/apis/axios';
import { PATH_API } from '@/shared/apis/path';
import { useSession } from '@/shared/apis/queries/auth';
import {
  useQuery,
  UseQueryResult,
  UseQueryOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useParams } from 'next/navigation';
import { likeKeys } from './query-key-factory';

type Props = Omit<UseQueryOptions, 'queryKey'>;
type ResponseType = { hasLiked: boolean | undefined };

export const useGetHasLiked = (params?: Props) => {
  const { weppId }: { weppId: string } = useParams();
  const { user } = useSession();

  return useQuery({
    queryKey: likeKeys.hasLiked(weppId),
    queryFn: async () => {
      if (!user) {
        return { hasLiked: undefined };
      }

      const response = await axiosInstance.get(PATH_API.LIKE.HAS_LIKED, {
        params: {
          wid: weppId,
          uid: user.id,
        },
      });

      return response.data;
    },
    gcTime: Infinity,
    staleTime: Infinity,
    enabled: !!user,
    ...params,
  }) as UseQueryResult<ResponseType, AxiosError>;
};
