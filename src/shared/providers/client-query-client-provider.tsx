'use client';

import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import React from 'react';

function makeQueryClient() {
  return new QueryClient({
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
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

const ClientQueryClientProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* TODO: Will Delete */}
    </QueryClientProvider>
  );
};

export default ClientQueryClientProvider;
