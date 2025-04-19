import { IComment } from '@/shared/types';
import { type QueryClient, type InfiniteData } from '@tanstack/react-query';
import { commentKeys } from '../../api/query-key-factory';

export const getCacheComment = (
  queryClient: QueryClient,
  weppId: string,
  commentId: number
): IComment | null => {
  const comments = queryClient.getQueryData<InfiniteData<IComment>>(
    commentKeys.list(weppId)
  );

  if (!comments) return null;

  let parent: IComment | null = null;

  comments.pages.forEach((page: any) => {
    page.data.forEach((comment: any) => {
      if (comment.id === commentId) {
        parent = comment;
      }
    });
  });

  return parent;
};
