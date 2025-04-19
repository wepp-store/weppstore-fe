import { PATH_API } from '@/shared/apis/path';

export const commentKeys = {
  list: (weppId: string) => [PATH_API.COMMENT.ROOT, weppId] as const,
  replies: (commentId: number) =>
    [PATH_API.COMMENT.REPLIES, commentId] as const,
};
