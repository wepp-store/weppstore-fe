import { Gamepad2, LayoutGrid, User } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const MainLayoutNavBottom = () => {
  return (
    <div className="sticky bottom-0 left-0 z-50 w-full min-h-16 max-h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600 sm:hidden">
      <div className="grid h-full max-w-lg grid-cols-2 mx-auto">
        <Link href="/wepps" className="flex justify-center items-center">
          <LayoutGrid />
        </Link>
        {/* <Link href="/games" className="flex justify-center items-center">
          <Gamepad2 />
        </Link> */}
        <Link href="/profile" className="flex justify-center items-center">
          <User />
        </Link>
      </div>
    </div>
  );
};

export default MainLayoutNavBottom;
