import { PATH_API } from '@/shared/apis/path';

export const likeKeys = {
  hasLiked: (weppId: string) => [PATH_API.LIKE.HAS_LIKED, weppId] as const,
};
