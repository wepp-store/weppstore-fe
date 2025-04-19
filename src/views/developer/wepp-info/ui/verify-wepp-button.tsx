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
import { useFormContext } from 'react-hook-form';
import { installLink } from '@/shared/utils';
import { Monitor, Smartphone, Tablet } from 'lucide-react';
import { Callout } from '@/shared/ui/callout';
import toast from 'react-hot-toast';

const VerifyWeppButton = () => {
  const { watch, setValue, trigger } = useFormContext();

  const { url, logo, name, isVerified } = watch();

  const { mutate, isPending } = useVerifyWepp();

  const { isOpen, onOpenChange } = useDisclosure();

  const onOpenModal = async () => {
    if (verifyLink === '#') {
      toast.error('URL 및 로고를 입력해주세요.');
      return;
    }

    if (!(await trigger('url'))) {
      toast.error('URL 형식이 아닙니다.');
      return;
    }

    onOpenChange();
  };

  const handleVerify = () => {
    const url = new URL(verifyLink).origin;
    mutate(url, {
      onSuccess: () => {
        toast.success('앱 인증이 완료되었습니다.');
        // optimistic update
        setValue('isVerified', true);
      },
    });
  };

  const verifyLink = installLink(url);

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
                    className={`container rounded-[12px] w-[280px] h-[560px]`}
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
