'use client';
import React from 'react';
import Footer from './main-layout-footer';
import Header from './main-layout-header';
import MainLayoutNav from './main-layout-nav';
import MainLayoutNavBottom from './main-layout-nav-bottom';
import { cn } from '@nextui-org/theme';

interface Props {
  children: React.ReactNode;
}

const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex h-dvh">
      <MainLayoutNav />
      <div className="flex flex-col w-full">
        <Header />
        <main
          className={cn(
            'flex flex-col',
            'overflow-y-auto',
            'container',
            'mx-auto',
            'box-border',
            'flex-grow',
            'p-4',
            'sm:p-6',
            'md:p-8',
            'lg:p-10',
            'xl:p-124',
            '!pt-0'
          )}
        >
          {children}
        </main>
        <MainLayoutNavBottom />
      </div>
    </div>
  );
};

export default MainLayout;
