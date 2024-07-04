'use client';

import { queryClient } from '@/_apis/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

const ClientQueryClientProvider: React.FC<Props> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ClientQueryClientProvider;
