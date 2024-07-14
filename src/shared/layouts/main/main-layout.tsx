'use client';
import React from 'react';
import Footer from './main-layout-footer';
import Header from './main-layout-header';

interface Props {
  children: React.ReactNode;
}

const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <main
        className="
          container
          mx-auto
          box-border
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
    </>
  );
};

export default MainLayout;
