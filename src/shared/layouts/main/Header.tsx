'use client';
import {
  Tab,
  Tabs,
  Navbar,
  NavbarBrand,
  NavbarContent,
} from '@nextui-org/react';
import Image from 'next/image';
import SearchInput from './SearchInput';
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();

  const key = '/' + pathname.split('/')[1];

  return (
    <Navbar isBordered maxWidth="full">
      <NavbarBrand className="gap-16">
        <div className="flex gap-4 items-center">
          <Image src="/logo.svg" alt="wepp store logo" width={48} height={48} />
          <h1 className="text-xl font-semibold">Wepp Store</h1>
        </div>

        <Tabs
          selectedKey={key}
          variant="underlined"
          aria-label="navigation"
          color="primary"
          className="hidden sm:flex"
          classNames={{
            tabList: 'gap-6 p-0 border-b',
            // cursor: 'w-full bg-[#22d3ee]',
            tab: 'max-w-fit h-16 text-lg',
            // tabContent: 'group-data-[selected=true]:text-[#06b6d4]',
          }}
        >
          <Tab key="/wepps" title="앱" href="/wepps" />
          <Tab key="/games" title="게임" href="/games" />
        </Tabs>
      </NavbarBrand>

      <NavbarContent justify="end">
        <SearchInput />
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
