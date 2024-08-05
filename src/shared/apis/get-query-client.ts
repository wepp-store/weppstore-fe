import {
  isServer,
  QueryClient,
  defaultShouldDehydrateQuery,
} from '@tanstack/react-query';
import { cache } from 'react';

const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
        refetchOnReconnect: true, // 네트워크 재연결이 발생한 경우
        refetchOnWindowFocus: false, // 브라우저에 포커스가 들어온 경우
        refetchOnMount: true, // 새로운 컴포넌트 마운트가 발생한 경우
        // staleTime: 0, // 데이터가 fresh -> stale 되는 시간
        // gcTime: 0, // 캐시된 데이터가 얼마나 오랫동안 메모리에 유지될 것인지
        retry: 0,
      },
      dehydrate: {
        // include pending queries in dehydration
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === 'pending',
      },
    },
  });

let browserQueryClient: QueryClient | undefined = undefined;

export const getServerQueryClient = cache(() => makeQueryClient());

export function getBrowserQueryClient() {
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}
