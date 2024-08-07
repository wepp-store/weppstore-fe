import { PATH_API } from '@/shared/apis/path';

export const likeKeys = {
  hasLiked: (weppId: string) => [PATH_API.LIKE.HAS_LIKED, weppId] as const,
};

export const commentKeys = {
  list: (weppId: string) => [PATH_API.COMMENT.ROOT, weppId] as const,
  replies: (commentId: number) =>
    [PATH_API.COMMENT.REPLIES, commentId] as const,
};
