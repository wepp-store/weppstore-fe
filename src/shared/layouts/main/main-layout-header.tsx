'use client';
import { Navbar, NavbarBrand, NavbarContent } from '@nextui-org/react';
import { usePathname, useRouter } from 'next/navigation';
import AccountPopover from './account-popover';
import { PATH } from '@/shared/constants';
import { LogoIcon } from '@/shared/ui/icons';
import { ThemeSwitcher } from '@/shared/ui/theme-switcher';

interface Props {
  showMenu?: boolean;
  showBackButton?: boolean;
}

const Header = ({ showMenu = true, showBackButton = false }: Props) => {
  const pathname = usePathname();

  const { push } = useRouter();

  const key = '/' + pathname.split('/')[1];

  return (
    <Navbar isBordered maxWidth="full">
      <NavbarBrand className="gap-16">
        <div
          className="flex gap-2 items-center cursor-pointer"
          onClick={() => push(PATH.MAIN.WEPPS)}
        >
          <LogoIcon width={36} height={36} />
          <h1 className="text-xl font-semibold">Wepp Store</h1>
        </div>

        {/* <Tabs
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
        </Tabs> */}
      </NavbarBrand>

      <NavbarContent justify="end" className="gap-6">
        <ThemeSwitcher />
        <AccountPopover />
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
