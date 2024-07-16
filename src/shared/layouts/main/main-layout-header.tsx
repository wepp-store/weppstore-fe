'use client';
import {
  Link,
  Button,
  Navbar,
  NavbarItem,
  NavbarContent,
} from '@nextui-org/react';
import { Github, Instagram, Twitter } from '@/shared/assets/icons';
import { LayoutDropdownMenu } from '../ui';
import { Menu } from 'lucide-react';

const Header = () => {
  return (
    <Navbar maxWidth="full">
      {/* desktop */}
      <NavbarContent justify="end" className="hidden sm:flex">
        <NavbarItem>
          <Link
            href="https://www.instagram.com/wepp.store?igsh=cmw5M3N5ZTZpczNw"
            target="_blank"
            className="text-gray-800"
          >
            <Instagram
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            />
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href="https://github.com/ryxxn"
            target="_blank"
            className="text-gray-800"
          >
            <Github
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            />
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#" target="_blank" className="text-gray-800">
            <Twitter
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            />
          </Link>
        </NavbarItem>
      </NavbarContent>

      {/* mobile */}
      <NavbarContent justify="end" className="sm:hidden">
        <NavbarItem>
          <LayoutDropdownMenu>
            <Button
              isIconOnly
              variant="light"
              className="flex w-full justify-end"
              data-hover="false"
            >
              <Menu />
            </Button>
          </LayoutDropdownMenu>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
