import { useQueryClient } from '@tanstack/react-query';
import {
  decreaseCacheCommentCount,
  increaseCacheCommentCount,
} from './comment-count-of-wepp';
import {
  decreaseCacheReplyCount,
  increaseCacheReplyCount,
} from './reply-count-of-comment';
import { addInfiniteCache } from './add-infinite-cache';
import { removeCacheComment } from './remove-cache-comment';
import { removeCacheReply } from './remove-cache-reply';

export const useCommentCache = () => {
  const queryClient = useQueryClient();

  return {
    // set cache comment count
    increaseCacheCommentCount: increaseCacheCommentCount(queryClient),
    decreaseCacheCommentCount: decreaseCacheCommentCount(queryClient),
    // set reply count
    increaseCacheReplyCount: increaseCacheReplyCount(queryClient),
    decreaseCacheReplyCount: decreaseCacheReplyCount(queryClient),
    // add comment
    addCacheComment: addInfiniteCache(queryClient),
    // remove
    removeCacheComment: removeCacheComment(queryClient),
    removeCacheReply: removeCacheReply(queryClient),
  };
};
