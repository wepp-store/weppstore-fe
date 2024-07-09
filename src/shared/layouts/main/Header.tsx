'use client';
import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react';
import Image from 'next/image';
import AccountPopover from './AccountPopover';
import SearchInput from './SearchInput';
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path ? 'page' : undefined;
  };

  return (
    <Navbar isBordered maxWidth="full">
      <NavbarBrand className="gap-16">
        <div className="flex gap-4 items-center">
          <Image src="/logo.svg" alt="wepp store logo" width={48} height={48} />
          <h1 className="text-xl font-semibold">Wepp Store</h1>
        </div>

        <NavbarContent className="hidden sm:flex gap-4">
          <NavbarItem isActive>
            <Link
              href="/apps"
              color="foreground"
              aria-current={isActive('/apps')}
            >
              앱
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/games" aria-current={isActive('/games')}>
              게임
            </Link>
          </NavbarItem>
        </NavbarContent>
      </NavbarBrand>

      <NavbarContent justify="end">
        <SearchInput />
        <AccountPopover />
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
