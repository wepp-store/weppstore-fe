import React from 'react';
import { Image, Button, Listbox, ListboxItem } from '@nextui-org/react';
import { Gamepad2, LayoutGrid, Menu, User } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { LayoutDropdownMenu } from '../ui';

const MainLayoutNav = () => {
  const pathname = usePathname();

  const key = new Set(['/' + pathname.split('/')[1]]);

  const selectedClasses = (path: string) =>
    key.has(path) ? 'bg-gray-100' : 'text-default-500';

  return (
    <>
      <nav
        className="
        hidden sm:flex flex-col
        p-4
        border-r
        sm:w-20
        lg:w-auto
      "
      >
        <div className="h-24 flex gap-2 items-center">
          <Image
            src="/logo.svg"
            alt="wepp store logo"
            width={48}
            height={48}
            className="
            aspect-square
            w-[48px]
            min-w-[48px]
            h-[48px]
          "
          />
          <h1 className="text-xl font-semibold text-nowrap hidden lg:inline">
            Wepp Store
          </h1>
        </div>
        <Listbox
          selectedKeys={key}
          variant="flat"
          selectionMode="single"
          aria-label="navigation menu"
          className="grow"
          classNames={{
            list: 'gap-4',
          }}
          hideSelectedIcon
        >
          <ListboxItem
            key="/wepps"
            href="/wepps"
            className={selectedClasses('/wepps')}
            classNames={{
              base: 'gap-0',
            }}
            startContent={<LayoutGrid className="w-6 h-6" />}
          >
            <span className="text-base pl-4 hidden lg:inline">앱</span>
          </ListboxItem>
          <ListboxItem
            key="/games"
            href="/games"
            className={selectedClasses('/games')}
            classNames={{
              base: 'gap-0',
            }}
            startContent={<Gamepad2 className="w-6 h-6" />}
          >
            <span className="text-base pl-4 hidden lg:inline">게임</span>
          </ListboxItem>
          <ListboxItem
            key="profile"
            href="/profile"
            className={selectedClasses('/profile')}
            classNames={{
              base: 'gap-0',
            }}
            // color="danger"
            startContent={<User className="w-6 h-6" />}
          >
            <span className="text-base pl-4 hidden lg:inline">프로필</span>
          </ListboxItem>
        </Listbox>
        {/* 더보기 */}
        <LayoutDropdownMenu>
          <Button
            isIconOnly
            variant="light"
            className="flex gap-4 w-full justify-start p-2"
            data-hover="false"
          >
            <Menu />
            <span className="text-base pl-2 hidden lg:inline">더보기</span>
          </Button>
        </LayoutDropdownMenu>
        {/* <p className="text-xs self-end hidden lg:inline">
        &copy; 2024 Wepp Store. All rights reserved.
      </p> */}
      </nav>
    </>
  );
};

export default MainLayoutNav;
