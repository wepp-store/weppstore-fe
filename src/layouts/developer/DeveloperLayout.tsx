'use client';
import { DeveloperGuard } from '@/_auth';
import React from 'react';
import Header from './header/Header';
import Footer from './footer/Footer';

interface Props {
  children: React.ReactNode;
}

const DeveloperLayout: React.FC<Props> = ({ children }) => {
  return (
    <DeveloperGuard>
      <Header />
      <main>{children}</main>
      <Footer />
    </DeveloperGuard>
  );
};

export default DeveloperLayout;
