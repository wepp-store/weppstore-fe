'use client';

import { SnackbarProvider, closeSnackbar } from 'notistack';
import React from 'react';
import { px } from '@/shared/utils';

interface ClientSnackbarProviderProps {
  children: React.ReactNode;
}

const ClientSnackbarProvider = ({ children }: ClientSnackbarProviderProps) => {
  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      maxSnack={3}
      action={(key) => (
        <button
          type="button"
          style={{
            all: 'initial',
            color: '#fff',
            fontSize: px(12),
            paddingInline: px(8),
            fontFamily: 'inherit',
          }}
          onClick={() => closeSnackbar(key)}
        >
          닫기
        </button>
      )}
      autoHideDuration={3000}
    >
      {children}
    </SnackbarProvider>
  );
};

export default ClientSnackbarProvider;
