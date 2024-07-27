import { useAuth, useSignOut } from '@/shared/apis/queries/auth';
import { PATH } from '@/shared/constants';
import {
  Link,
  Avatar,
  Button,
  Skeleton,
  // dropdown
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  // modal
  Modal,
  ModalFooter,
  ModalHeader,
  ModalContent,
  useDisclosure,
} from '@nextui-org/react';
import { usePathname } from 'next/navigation';

const AccountPopover = () => {
  const pathname = usePathname();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { data: me, isLoading } = useAuth();

  const signOutMutation = useSignOut();

  const onAction = (key: React.Key) => {
    if (key === 'settings') {
      // router.push('');
    } else if (key === 'logout') {
      onOpen();
    }
  };

  if (isLoading) {
    return <Skeleton className="flex rounded-full w-8 h-8" />;
  }

  if (!me) {
    return (
      <Button
        as={Link}
        href={`${PATH.AUTH.LOGIN}?redirect=${pathname}`}
        color="primary"
      >
        로그인
      </Button>
    );
  }

  return (
    <>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            radius="lg"
            name={me?.userName}
            size="sm"
            src={me?.profileUrl || './no-image.svg'}
          />
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Avatar Actions"
          variant="flat"
          onAction={onAction}
        >
          <DropdownItem key="developer" href="/wepps">
            스토어로 이동하기
          </DropdownItem>
          <DropdownItem key="logout" color="danger">
            로그아웃
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      {/* sign out modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="justify-center mt-4">
                정말 로그아웃하시겠습니까?
              </ModalHeader>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  아니요
                </Button>
                <Button
                  color="primary"
                  onPress={() => signOutMutation.mutate()}
                >
                  네, 로그아웃할래요.
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AccountPopover;
