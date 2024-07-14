import { useAuth, useSignOut } from '@/shared/apis/queries/auth';
import { PATH } from '@/shared/constants';
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';

const AccountPopover = () => {
  const router = useRouter();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { data: me } = useAuth();

  const signOutMutation = useSignOut();

  const onAction = (key: React.Key) => {
    if (key === 'settings') {
      // router.push('');
    } else if (key === 'logout') {
      onOpen();
    }
  };

  return (
    <>
      <Dropdown placement="bottom-end" backdrop="blur">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            color="secondary"
            name="Jason Hughes"
            size="sm"
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          />
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Avatar Actions"
          variant="flat"
          onAction={onAction}
        >
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">{me?.email}</p>
          </DropdownItem>
          <DropdownItem key="settings" showDivider>
            My Settings
          </DropdownItem>
          <DropdownItem key="logout" color="danger">
            Log Out
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
