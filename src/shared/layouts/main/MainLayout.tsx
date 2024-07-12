'use client';
import React from 'react';
import Footer from './Footer';
import Header from './Header';

interface Props {
  children: React.ReactNode;
}

const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="flex-grow p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
