import {
  Modal,
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalContent,
  useDisclosure,
} from '@nextui-org/react';
import React from 'react';
import { useVerifyWepp } from '../api';
import { useSnackbar } from 'notistack';
import { useFormContext } from 'react-hook-form';
import { installLink } from '@/shared/utils';

const VerifyWeppButton = () => {
  const { watch, setValue } = useFormContext();
  const { enqueueSnackbar } = useSnackbar();

  const { url, logo, name, isVerified } = watch();

  const { mutate, isPending } = useVerifyWepp();

  const { isOpen, onOpenChange } = useDisclosure();

  const onOpenModal = () => {
    if (verifyLink === '#') {
      enqueueSnackbar('URL 및 로고를 입력해주세요.', { variant: 'error' });
      return;
    }

    onOpenChange();
  };

  const handleVerify = () => {
    const url = new URL(verifyLink).origin;
    mutate(url, {
      onSuccess: () => {
        enqueueSnackbar('앱 인증이 완료되었습니다.', { variant: 'success' });
        // optimistic update
        setValue('isVerified', true);
      },
    });
  };

  const verifyLink = installLink(name, url, logo);

  return (
    <>
      {isVerified ? (
        <Button color="warning" variant="bordered">
          변경하기
        </Button>
      ) : (
        <Button color="primary" onPress={onOpenModal}>
          인증하기
        </Button>
      )}

      {/* verify confirm modal */}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="5xl"
        hideCloseButton
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="justify-between">
                <div>앱 인증 절차</div>

                <Button
                  color="danger"
                  onPress={handleVerify}
                  isLoading={isPending}
                  disabled={isVerified}
                >
                  인증하기
                </Button>
              </ModalHeader>
              <ModalBody className="items-center">
                <iframe
                  src={verifyLink}
                  className="container h-[calc(100vh-20rem)]"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="flat" onPress={onClose}>
                  닫기
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default VerifyWeppButton;
