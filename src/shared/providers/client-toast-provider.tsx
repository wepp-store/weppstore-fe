'use client';

import React from 'react';
import { CircleCheckBig, CircleX } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { useResponsive } from '@/shared/hooks';

const ClientToastProvider = ({ children }: React.PropsWithChildren) => {
  const { isMobile } = useResponsive();

  return (
    <>
      <Toaster
        position={isMobile ? 'top-center' : 'bottom-right'}
        toastOptions={{
          className: '',
          success: {
            className:
              'flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800',
            icon: (
              <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                <CircleCheckBig className="w-5 h-5" />
              </div>
            ),
          },
          error: {
            className:
              'flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800',
            icon: (
              <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                <CircleX className="w-5 h-5" />
              </div>
            ),
          },
          duration: 3000,
        }}
      />
      {children}
    </>
  );
};

export default ClientToastProvider;
