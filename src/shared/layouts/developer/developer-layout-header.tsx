'use client';

import React from 'react';
import AccountPopover from './account-popover';
import { Navbar, NavbarBrand, NavbarContent, Image } from '@nextui-org/react';
import { PATH } from '@/shared/constants';
import { useRouter } from 'next/navigation';

const Header = () => {
  const { push } = useRouter();

  return (
    <Navbar isBordered maxWidth="full">
      <NavbarBrand className="gap-16 sm:hidden">
        <div
          className="flex gap-4 items-center cursor-pointer"
          onClick={() => push(PATH.DEVELOPER.WEPP)}
        >
          <Image src="/logo.svg" alt="wepp store logo" width={48} height={48} />
          <h1 className="text-xl font-semibold">Developer</h1>
        </div>
      </NavbarBrand>
      <NavbarContent justify="end">
        <AccountPopover />
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
