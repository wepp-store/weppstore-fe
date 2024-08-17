import { create } from 'zustand';

interface ReplyComment {
  writer: string;
  mentionId: number;
  replyId: number;
}

interface Store {
  replyComment: ReplyComment | null;
  setReplyComment: (replyComment: ReplyComment | null) => void;
  clearReplyComment: () => void;
}

export const useReplyStateStore = create<Store>((set) => ({
  replyComment: null,
  setReplyComment: (replyComment) => set({ replyComment }),
  clearReplyComment: () => set({ replyComment: null }),
}));
