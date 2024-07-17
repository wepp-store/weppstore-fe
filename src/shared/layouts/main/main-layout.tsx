'use client';
import React from 'react';
import MainLayoutHeader from './main-layout-header';
import MainLayoutNavBottom from './main-layout-nav-bottom';
import { cn } from '@nextui-org/theme';

interface Props {
  showMenu?: boolean;
  showBackButton?: boolean;
  children: React.ReactNode;
}

const MainLayout: React.FC<Props> = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="flex flex-col w-full h-dvh">
      <MainLayoutHeader />
      <main
        className={cn(
          'flex flex-col',
          'overflow-y-auto',
          'box-border',
          'flex-grow',
          'pb-4'
        )}
      >
        {children}
      </main>
      <MainLayoutNavBottom />
    </div>
  );
};

export default MainLayout;
