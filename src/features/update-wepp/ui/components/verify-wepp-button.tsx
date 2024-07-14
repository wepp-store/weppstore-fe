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
import { useVerifyWepp } from '../../api';
import { useSnackbar } from 'notistack';
import { useFormContext } from 'react-hook-form';
import { installLink } from '@/shared/utils';
import { Monitor, Smartphone, Tablet } from 'lucide-react';
import { Callout } from '@/shared/ui/callout';

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
      <Button color="primary" onPress={onOpenModal}>
        인증하기
      </Button>

      {/* verify confirm modal */}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="4xl"
        hideCloseButton
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="justify-between">
                <div>도메인 소유권을 인증하시겠습니까?</div>

                <Button
                  color="primary"
                  onPress={handleVerify}
                  isLoading={isPending}
                  disabled={isVerified}
                >
                  인증하기
                </Button>
              </ModalHeader>
              <ModalBody className="gap-8 items-center">
                <Callout color="warning" className="w-full">
                  <div>
                    미리보기 화면에 앱 설치 프롬프트가 표시되지 않나요?{' '}
                    {/* TODO */}
                    <span className="underline">
                      앱 URL이 redirection되지는 않는지 확인해주세요!
                    </span>
                  </div>
                </Callout>
                <div className="rounded-[24px] border-[12px]">
                  <iframe
                    src={verifyLink}
                    className={`container rounded-[12px] w-[340px] h-[604px]`}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
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