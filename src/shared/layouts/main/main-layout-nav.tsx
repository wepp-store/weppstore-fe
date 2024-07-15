import React from 'react';
import {
  Image,
  Listbox,
  ListboxItem,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import { Gamepad2, LayoutGrid, Menu, User } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useSignOut } from '@/shared/apis/queries/auth';

const MainLayoutNav = () => {
  const pathname = usePathname();

  const key = new Set(['/' + pathname.split('/')[1]]);

  const selectedClasses = (path: string) =>
    key.has(path) ? 'bg-gray-100' : 'text-default-500';

  const { isOpen, onOpenChange, onClose } = useDisclosure();

  const signOutMutation = useSignOut();

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
        <Dropdown>
          <DropdownTrigger>
            <Button
              isIconOnly
              variant="light"
              className="flex gap-4 w-full justify-start p-2"
              data-hover="false"
            >
              <Menu />
              <span className="text-base pl-2 hidden lg:inline">더보기</span>
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Dropdown add menu" variant="solid">
            <DropdownItem key="new" href="/developer">
              개발자 센터
            </DropdownItem>
            <DropdownItem
              key="delete"
              className="text-danger"
              color="danger"
              onPress={onOpenChange}
            >
              로그아웃
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        {/* <p className="text-xs self-end hidden lg:inline">
        &copy; 2024 Wepp Store. All rights reserved.
      </p> */}
      </nav>
      {/* sign out modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader className="justify-center mt-4">
            정말 로그아웃하시겠습니까?
          </ModalHeader>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              아니요
            </Button>
            <Button color="primary" onPress={() => signOutMutation.mutate()}>
              네, 로그아웃할래요.
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MainLayoutNav;
