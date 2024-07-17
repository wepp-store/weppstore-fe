import React from 'react';
import AccountPopover from './account-popover';
import { Navbar, NavbarContent } from '@nextui-org/react';

const Header = () => {
  return (
    <Navbar isBordered maxWidth="full">
      <NavbarContent justify="end">
        <AccountPopover />
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
