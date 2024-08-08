import { IComment } from '@/shared/types';
import { useParams } from 'next/navigation';
import { axiosInstance } from '@/shared/apis/axios';
import { PATH_API } from '@/shared/apis/path';
import React from 'react';

// ----------------------------------------------------------------------

interface ResponseReplies {
  data: IComment[];
  page: number;
  size: number;
  next: number | null;
}

interface Props {
  size?: number;
  commentId: number;
  children: React.ReactNode;
}

interface ContextType {
  data: IComment[];
  setData: React.Dispatch<React.SetStateAction<IComment[]>>;
  isError: boolean;
  isLoading: boolean;
  isFetching: boolean;
  isFetched: boolean;
  isNotData: boolean;
  hasNextPage: boolean;
  initFetch: () => void;
  fetchNext: () => void;
  addMemoryReply: (comment: IComment) => void;
  deleteMemoryReply: (commentId: number) => void;
}

const defaultValues: ContextType = {
  data: [],
  setData: () => {},
  isError: false,
  isLoading: false,
  isFetching: false,
  isFetched: false,
  isNotData: false,
  hasNextPage: false,
  initFetch: () => {},
  fetchNext: () => {},
  addMemoryReply: () => {},
  deleteMemoryReply: () => {},
};

// ----------------------------------------------------------------------

const RepliesContext = React.createContext<ContextType>(defaultValues);

// ----------------------------------------------------------------------

// provider
export const RepliesProvider = ({ size, commentId, children }: Props) => {
  const [data, setData] = React.useState<IComment[]>([]);

  const [page, setPage] = React.useState<number | null>(1);
  const [isError, setIsError] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isFetched, setIsFetched] = React.useState<boolean>(false);
  const [isFetching, setIsFetching] = React.useState<boolean>(false);

  const fetchNext = React.useCallback(async () => {
    try {
      setIsFetching(true);
      const response = await axiosInstance.get<ResponseReplies>(
        `${PATH_API.COMMENT.REPLIES}/${commentId}`,
        {
          params: { page, size },
        }
      );
      setPage(response.data.next);
      setData([...data, ...response.data.data]);
      setIsFetched(true);
    } catch (e) {
      console.error(e);
      setIsError(true);
    } finally {
      setIsFetching(false);
    }
  }, [
    data,
    page,
    size,
    commentId,
    setPage,
    setData,
    setIsError,
    setIsFetched,
    setIsFetching,
  ]);

  const initFetch = React.useCallback(async () => {
    if (data.length > 0) return;

    setIsLoading(true);
    try {
      await fetchNext();
    } finally {
      setIsLoading(false);
    }
  }, [fetchNext]);

  // update memory reply
  const deleteMemoryReply = React.useCallback((commentId: number) => {
    setData((prev) => prev.filter((reply) => reply.id !== commentId));
  }, []);

  const addMemoryReply = React.useCallback((comment: IComment) => {
    setData((prev) => [comment, ...prev]);
  }, []);

  const hasNextPage = page !== null;
  const isNotData = isFetched && data.length === 0;

  const memoizedValue = React.useMemo(
    () => ({
      // data
      data,
      setData,
      // state
      isError,
      isLoading,
      isFetching,
      isFetched,
      isNotData,
      hasNextPage,
      // action
      fetchNext,
      initFetch,
      // memory
      addMemoryReply,
      deleteMemoryReply,
    }),
    [
      data,
      isError,
      isLoading,
      isFetched,
      isFetching,
      isNotData,
      hasNextPage,
      fetchNext,
      initFetch,
      addMemoryReply,
      deleteMemoryReply,
    ]
  );

  // TODO: React 19로 업데이트하면 Provider 빼기
  return (
    <RepliesContext.Provider value={memoizedValue}>
      {children}
    </RepliesContext.Provider>
  );
};

// ----------------------------------------------------------------------

// hook
export const useRepliesOfComment = () => React.useContext(RepliesContext);
