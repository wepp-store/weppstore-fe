import { IComment } from '@/shared/types';
import { commentKeys } from '@/views/wepp-detail/api/query-key-factory';
import { type QueryClient, type InfiniteData } from '@tanstack/react-query';

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
