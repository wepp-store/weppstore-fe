'use client';
import { DeveloperGuard } from '@/features/auth';
import React from 'react';
import Header from './developer-layout-header';
import Footer from './developer-layout-footer';

interface Props {
  children: React.ReactNode;
}

const DeveloperLayout: React.FC<Props> = ({ children }) => {
  return (
    <DeveloperGuard>
      <Header />
      <main
        className="
          container
          mx-auto
          flex-grow
          p-4
          sm:p-6
          md:p-8
          lg:p-10
          xl:p-12
        "
      >
        {children}
      </main>
      <Footer />
    </DeveloperGuard>
  );
};

export default DeveloperLayout;
