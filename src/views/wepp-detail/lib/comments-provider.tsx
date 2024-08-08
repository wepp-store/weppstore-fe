import { IComment } from '@/shared/types';
import { useParams } from 'next/navigation';
import { axiosInstance } from '@/shared/apis/axios';
import { PATH_API } from '@/shared/apis/path';
import React from 'react';

// ----------------------------------------------------------------------

interface ResponseComment {
  data: IComment[];
  page: number;
  size: number;
  next: number | null;
}

interface Props {
  size?: number;
  children: React.ReactNode;
}

interface ContextType {
  comments: IComment[];
  setComments: React.Dispatch<React.SetStateAction<IComment[]>>;
  isError: boolean;
  isLoading: boolean;
  isFetched: boolean;
  isNotData: boolean;
  hasNextPage: boolean;
  fetchNext: () => void;
  addMemoryComment: (comment: IComment) => void;
  deleteMemoryComment: (commentId: number) => void;
  increaseMemoryCommentCount: (commentId: number) => void;
  decreaseMemoryCommentCount: (commentId: number) => void;
}

const defaultValues: ContextType = {
  comments: [],
  setComments: () => {},
  isError: false,
  isLoading: false,
  isFetched: false,
  isNotData: false,
  hasNextPage: false,
  fetchNext: () => {},
  addMemoryComment: () => {},
  deleteMemoryComment: () => {},
  increaseMemoryCommentCount: () => {},
  decreaseMemoryCommentCount: () => {},
};

// ----------------------------------------------------------------------

const CommentContext = React.createContext<ContextType>(defaultValues);

// ----------------------------------------------------------------------

// provider
export const CommentProvider = ({ size, children }: Props) => {
  const { weppId }: { weppId: string } = useParams();

  const [comments, setComments] = React.useState<IComment[]>([]);

  const [page, setPage] = React.useState<number | null>(1);
  const [isError, setIsError] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isFetched, setIsFetched] = React.useState<boolean>(false);
  const [isFetching, setIsFetching] = React.useState<boolean>(false);

  const fetchNext = React.useCallback(async () => {
    try {
      setIsFetching(true);
      const response = await axiosInstance.get<ResponseComment>(
        `${PATH_API.COMMENT.ROOT}/${weppId}`,
        {
          params: { page, size },
        }
      );
      const data = response.data;
      setPage(data.next);
      setComments([...comments, ...data.data]);
      setIsFetched(true);
    } catch (e) {
      console.error(e);
      setIsError(true);
    } finally {
      setIsFetching(false);
    }
  }, [
    comments,
    page,
    size,
    weppId,
    setIsError,
    setIsFetching,
    setIsFetched,
    setPage,
    setComments,
  ]);

  const initFetch = async () => {
    setIsLoading(true);
    try {
      await fetchNext();
    } finally {
      setIsLoading(false);
    }
  };

  // update memory comment
  const deleteMemoryComment = React.useCallback((commentId: number) => {
    setComments((prev) => prev.filter((comment) => comment.id !== commentId));
  }, []);

  const addMemoryComment = React.useCallback((comment: IComment) => {
    setComments((prev) => [comment, ...prev]);
  }, []);

  const increaseMemoryCommentCount = React.useCallback((commentId: number) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? { ...comment, _count: { children: comment._count.children + 1 } }
          : comment
      )
    );
  }, []);

  const decreaseMemoryCommentCount = React.useCallback((commentId: number) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? { ...comment, _count: { children: comment._count.children - 1 } }
          : comment
      )
    );
  }, []);

  // init fetch
  React.useEffect(() => {
    initFetch();
  }, []);

  const hasNextPage = page !== null;
  const isNotData = isFetched && comments.length === 0;

  const memoizedValue = React.useMemo(
    () => ({
      // data
      comments,
      setComments,
      // state
      isError,
      isLoading,
      isFetching,
      isFetched,
      isNotData,
      hasNextPage,
      // action
      fetchNext,
      // memory
      addMemoryComment,
      deleteMemoryComment,
      increaseMemoryCommentCount,
      decreaseMemoryCommentCount,
    }),
    [
      comments,
      isError,
      isLoading,
      isFetched,
      isFetching,
      isNotData,
      hasNextPage,
      fetchNext,
      addMemoryComment,
      deleteMemoryComment,
      increaseMemoryCommentCount,
      decreaseMemoryCommentCount,
    ]
  );

  // TODO: React 19로 업데이트하면 Provider 빼기
  return (
    <CommentContext.Provider value={memoizedValue}>
      {children}
    </CommentContext.Provider>
  );
};

// ----------------------------------------------------------------------

// hook
export const useWeppComments = () => React.useContext(CommentContext);
