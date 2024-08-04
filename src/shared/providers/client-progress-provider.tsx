'use client';

import React from 'react';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const ClientProgressProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="#006FEE"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};

export default ClientProgressProvider;
