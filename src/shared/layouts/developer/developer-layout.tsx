'use client';
import React from 'react';
import Header from './developer-layout-header';
import DeveloperLayoutNav from './developer-layout-nav';
import { cn } from '@nextui-org/theme';
import DeveloperLayoutNavBottom from './developer-layout-nav-bottom';

interface Props {
  children: React.ReactNode;
}

const DeveloperLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex w-full h-dvh">
      <DeveloperLayoutNav />
      <div className="flex flex-col w-full grow overflow-y-auto">
        <Header />
        <main
          className={cn(
            'flex flex-col',
            'w-full max-w-screen-xl mx-auto',
            'box-border',
            'flex-grow',
            'pb-4'
          )}
        >
          {children}
        </main>
        <DeveloperLayoutNavBottom />
      </div>
    </div>
  );
};

export default DeveloperLayout;
