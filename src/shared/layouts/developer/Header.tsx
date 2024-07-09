import { SearchIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import AccountPopover from './AccountPopover';
import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react';

const Header = () => {
  return (
    <Navbar isBordered maxWidth="full">
      <NavbarBrand>
        <Image src="/logo.svg" alt="wepp store logo" width={48} height={48} />
        <h1 className="text-xl font-semibold">Wepp Developer</h1>
      </NavbarBrand>

      {/* <NavbarContent className="hidden sm:flex gap-4 grow" justify="center">
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent> */}

      <NavbarContent justify="end">
        <SearchIcon />
        <AccountPopover />
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
