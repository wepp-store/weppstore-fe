'use client';
import { Navbar, NavbarContent, NavbarItem, Link } from '@nextui-org/react';
import { Github, Instagram, Twitter } from '@/shared/assets/icons';

const Header = () => {
  return (
    <Navbar maxWidth="full">
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
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
    </Navbar>
  );
};

export default Header;
