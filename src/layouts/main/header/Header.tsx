import { SearchIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import AccountPopover from './AccountPopover';

const Header = () => {
  return (
    <header
      className="
      fixed
      top-0
      start-0
      w-full
      flex
      items-center
      justify-between
      p-4
      shadow-md
    "
    >
      <div
        className="
        flex
        items-center
        gap-2
      "
      >
        <Image src="/logo.svg" alt="wepp store logo" width={48} height={48} />
        <h1 className="text-xl font-semibold">Wepp Store</h1>
      </div>
      <div
        className="
        flex
        items-center
        gap-4
      "
      >
        <SearchIcon />
        <AccountPopover />
      </div>
    </header>
  );
};

export default Header;
