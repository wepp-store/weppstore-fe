import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import React from 'react';
import { useDeleteWepp } from '../api';

const DeleteWeppButton = () => {
  const { mutate, isPending } = useDeleteWepp();

  const { isOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button color="danger" variant="bordered" onPress={onOpenChange}>
        삭제하기
      </Button>

      {/* confirm modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="justify-center mt-4">
                앱을 삭제하시겠습니까?
              </ModalHeader>
              <ModalBody className="items-center">
                삭제하면 복구할 수 없습니다. 계속하시겠습니까?
              </ModalBody>
              <ModalFooter className="mb-2">
                <Button variant="light" onPress={onClose}>
                  아니요
                </Button>
                <Button
                  color="danger"
                  onPress={() => mutate()}
                  isLoading={isPending}
                >
                  {isPending || '네, 삭제할래요.'}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteWeppButton;
