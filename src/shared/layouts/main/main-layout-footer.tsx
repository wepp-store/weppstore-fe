import { Github, Instagram, Twitter } from '@/shared/assets/icons';
import { Divider, Link } from '@nextui-org/react';
import React from 'react';

const Footer = () => {
  return (
    <footer>
      <Divider />

      <div className="px-8 py-6 flex justify-end items-center gap-8">
        <div className="flex space-x-4">
          <Link
            href="https://www.instagram.com/wepp.store?igsh=cmw5M3N5ZTZpczNw"
            target="_blank"
            className="text-gray-800"
          >
            <Instagram
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            />
          </Link>
          <Link
            href="https://github.com/ryxxn"
            target="_blank"
            className="text-gray-800"
          >
            <Github
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            />
          </Link>
          <Link href="#" target="_blank" className="text-gray-800">
            <Twitter
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
