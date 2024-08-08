'use client';

import { BrowserShare } from '@/shared/assets/icons';
import useDevice from '@/shared/hooks/use-device';
import { IWepp } from '@/shared/types';
import { installLink } from '@/shared/utils';
import {
  Button,
  ButtonProps,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import { Info } from 'lucide-react';
import React from 'react';

interface Props extends ButtonProps {
  wepp: IWepp | undefined;
}

const WeppInstallButton = ({ wepp, ...other }: Props) => {
  const { url, isVerified } = wepp || {};

  const { isIOS, isMobile } = useDevice();

  const { isOpen, onOpenChange, onClose } = useDisclosure();

  const weppInstallLink = installLink(url);

  const modalRenderContent = () => {
    if (isIOS) {
      return (
        <ModalContent>
          <ModalHeader className="gap-4 items-center">
            <Info /> IOS 앱 설치 방법
          </ModalHeader>
          <ModalBody>
            <p>1. 받기 버튼 클릭 후</p>
            <p className="flex">
              브라우저 주소 표시줄에 <BrowserShare /> 아이콘을 클릭하세요.
            </p>
            <p>2. {`'홈 화면에 추가'`}를 눌러주세요.</p>
          </ModalBody>
          <ModalFooter className="mb-2">
            <Button variant="light" onPress={onClose}>
              닫기
            </Button>
            <Button color="primary" as={Link} href={weppInstallLink}>
              받기
            </Button>
          </ModalFooter>
        </ModalContent>
      );
    }

    return (
      <ModalContent>
        <ModalHeader className="gap-4 items-center">
          <Info /> 앱 설치 방법
        </ModalHeader>
        <ModalBody>
          <p>1. 받기 버튼 클릭 후</p>
          <p className="flex">
            브라우저 주소 표시줄에 <BrowserShare /> 아이콘을 클릭하세요.
          </p>
          <p>2. {`'홈 화면에 추가'`}를 눌러주세요.</p>
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={onClose}>
            닫기
          </Button>
          <Button color="primary" as={Link} href={weppInstallLink}>
            받기
          </Button>
        </ModalFooter>
      </ModalContent>
    );
  };

  if (isVerified && !isIOS) {
    return (
      <Button
        color="primary"
        size="sm"
        as={Link}
        href={weppInstallLink}
        {...other}
      >
        받기
      </Button>
    );
  }

  return (
    <>
      <Button color="primary" onPress={onOpenChange} {...other}>
        받기
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        {modalRenderContent()}
      </Modal>
    </>
  );
};

export default WeppInstallButton;
