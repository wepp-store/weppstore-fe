import { Gamepad2, LayoutGrid, User, Wrench } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const DeveloperLayoutNavBottom = () => {
  return (
    <div className="sticky bottom-0 left-0 z-50 w-full min-h-16 max-h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600 sm:hidden">
      <div className="grid h-full max-w-lg grid-cols-2 mx-auto">
        <Link
          href="/developer/wepps"
          className="flex justify-center items-center"
        >
          <LayoutGrid />
        </Link>

        <Link
          href="/developer/make"
          className="flex justify-center items-center"
        >
          <Wrench />
        </Link>
      </div>
    </div>
  );
};

export default DeveloperLayoutNavBottom;
