import { SearchIcon, UserRound } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const Header = () => {
  return (
    <header
      className="
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
        <UserRound />
      </div>
    </header>
  );
};

export default Header;
