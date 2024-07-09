'use client';
import { DeveloperGuard } from '@/features/auth';
import React from 'react';
import Footer from './Footer';
import Header from './Header';

interface Props {
  children: React.ReactNode;
}

const DeveloperLayout: React.FC<Props> = ({ children }) => {
  return (
    <DeveloperGuard>
      <Header />
      <main className="container mx-auto p-4 flex-grow">{children}</main>
      <Footer />
    </DeveloperGuard>
  );
};

export default DeveloperLayout;
