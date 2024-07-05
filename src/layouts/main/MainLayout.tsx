'use client';
import React from 'react';
import Header from './header/Header';
import Footer from './footer/Footer';

interface Props {
  children: React.ReactNode;
}

const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8 mt-20">{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
