'use client';

import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { getBrowserQueryClient } from '@/shared/apis/get-query-client';

const ClientQueryClientProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getBrowserQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* TODO: Will Delete */}
    </QueryClientProvider>
  );
};

export default ClientQueryClientProvider;
