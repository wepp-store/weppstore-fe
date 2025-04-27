'use client';

import React from 'react';
import AccountPopover from './account-popover';
import { Navbar, NavbarBrand, NavbarContent, Image } from '@nextui-org/react';
import { PATH } from '@/shared/constants';
import { useRouter } from 'next/navigation';
import { LogoIcon } from '@/shared/ui/icons';
import { ThemeSwitcher } from '@/shared/ui/theme-switcher';

const Header = () => {
  const { push } = useRouter();

  return (
    <Navbar isBordered maxWidth="full">
      <NavbarBrand className="gap-16 sm:hidden">
        <div
          className="flex gap-2 items-center cursor-pointer"
          onClick={() => push(PATH.DEVELOPER.WEPP)}
        >
          <LogoIcon width={36} height={36} aria-label="logo icon" />
          <h1 className="text-xl font-semibold">Developer</h1>
        </div>
      </NavbarBrand>
      <NavbarContent justify="end" className="gap-6">
        <ThemeSwitcher />
        <AccountPopover />
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
