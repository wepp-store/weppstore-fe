import { Github, Instagram } from '@/shared/assets/icons';
import { Button } from '@nextui-org/react';
import React from 'react';

const MainLayoutFooter = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-4 hidden md:block">
      <div className="container flex flex-col justify-center items-center lg:grid lg:grid-cols-3">
        <div />

        <p className="text-sm text-center">
          &copy; {new Date().getFullYear()} Wepp Store. All rights reserved.
        </p>
        <div className="flex justify-end">
          <Button
            isIconOnly
            variant="light"
            className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-full"
            aria-label="Instagram"
            as="a"
            href="https://www.instagram.com/wepp.store/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram className="h-5 w-5 text-gray-500 dark:text-gray-300" />
          </Button>

          <Button
            isIconOnly
            variant="light"
            className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-full"
            aria-label="Github"
            as="a"
            target="_blank"
            href="https://github.com/wepp-store"
            rel="noopener noreferrer"
          >
            <Github className="h-5 w-5 text-gray-500 dark:text-gray-300" />
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default MainLayoutFooter;
