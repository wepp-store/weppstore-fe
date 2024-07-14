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
import { useFormContext } from 'react-hook-form';
import { useClearWeppUrl } from '../../api';

const WeppUrlChangeButton = () => {
  const { setValue } = useFormContext();

  const { isOpen, onOpenChange, onClose } = useDisclosure();

  const { mutate, isPending } = useClearWeppUrl({
    onSuccess: () => {
      // optimistic update
      setValue('url', '');
      setValue('isVerified', false);

      onClose();
    },
  });

  return (
    <>
      <Button
        color="warning"
        variant="bordered"
        onPress={onOpenChange}
        isLoading={isPending}
      >
        {isPending || '변경하기'}
      </Button>

      {/* confirm modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>URL을 변경하시겠습니까?</ModalHeader>
          <ModalBody>
            <p>URL을 변경하시면 앱 인증이 해제됩니다.</p>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onClose}>
              아니요
            </Button>
            <Button color="primary" onPress={mutate as VoidFunction}>
              네, 변경할게요
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default WeppUrlChangeButton;
