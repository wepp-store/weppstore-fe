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
      <main className="container mx-auto p-4 flex-grow">{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
