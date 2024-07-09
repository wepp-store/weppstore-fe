import { Navbar, NavbarBrand, NavbarContent } from '@nextui-org/react';
import Image from 'next/image';
import AccountPopover from './AccountPopover';
import SearchInput from './SearchInput';

const Header = () => {
  return (
    <Navbar isBordered maxWidth="full">
      <NavbarBrand>
        <Image src="/logo.svg" alt="wepp store logo" width={48} height={48} />
        <h1 className="text-xl font-semibold">Wepp Store</h1>
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
        <SearchInput />
        <AccountPopover />
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
