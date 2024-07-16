import { useSignOut } from '@/shared/apis/queries/auth';
import {
  Button,
  // dropdown
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
  // modal
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react';

const LayoutDropdownMenu = ({ children }: React.PropsWithChildren) => {
  const { isOpen, onOpenChange, onClose } = useDisclosure();

  const signOutMutation = useSignOut();
  return (
    <>
      {/* 더보기 */}
      <Dropdown>
        <DropdownTrigger>{children}</DropdownTrigger>
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

export default LayoutDropdownMenu;
