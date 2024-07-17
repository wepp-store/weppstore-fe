import React from 'react';
import { Image, Listbox, ListboxItem } from '@nextui-org/react';
import { LayoutGrid } from 'lucide-react';
import { usePathname } from 'next/navigation';

const DeveloperLayoutNav = () => {
  const pathname = usePathname();

  const key = new Set(['/' + pathname.split('/')[1]]);

  const selectedClasses = (path: string) =>
    key.has(path) ? 'bg-gray-100' : 'text-default-500';

  return (
    <>
      <nav
        className="
        hidden sm:flex flex-col gap-4
        p-4
        border-r
        sm:w-20
        lg:min-w-[200px]
      "
      >
        <div className="h-20 flex gap-2 items-center">
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
            Developer
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
            key="/developer"
            href="/developer"
            className={selectedClasses('/developer')}
            classNames={{
              base: 'gap-0',
            }}
            startContent={<LayoutGrid className="w-6 h-6" />}
          >
            <span className="text-base pl-4 hidden lg:inline">내 앱</span>
          </ListboxItem>
          <ListboxItem
            key="/make"
            href="/make"
            className={selectedClasses('/make')}
            classNames={{
              base: 'gap-0',
            }}
            startContent={<LayoutGrid className="w-6 h-6" />}
          >
            <span className="text-base pl-4 hidden lg:inline">PWA 만들기</span>
          </ListboxItem>
        </Listbox>

        {/* <p className="text-xs self-end hidden lg:inline">
        &copy; 2024 Wepp Store. All rights reserved.
      </p> */}
      </nav>
    </>
  );
};

export default DeveloperLayoutNav;