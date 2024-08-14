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
    <div className="flex flex-col size-full overflow-y-auto">
      <MainLayoutHeader />
      <main
        className={cn(
          'flex flex-col',
          'w-full max-w-screen-lg mx-auto',
          'box-border',
          'flex-grow',
          'pt-2',
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
