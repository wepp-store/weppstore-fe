'use client';
import React from 'react';
import Header from './header/Header';
import Footer from './footer/Footer';
import AuthGuard from '@/_auth/AuthGuard';

interface Props {
  children: React.ReactNode;
}

const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <AuthGuard>
      <Header />
      <main className="container mx-auto px-4 py-8">{children}</main>
      <Footer />
    </AuthGuard>
  );
};

export default MainLayout;
