import { BrowserShare } from '@/shared/assets/icons';
import useDevice from '@/shared/hooks/use-device';
import { IWepp } from '@/shared/types';
import { installLink } from '@/shared/utils';
import {
  Button,
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

interface Props {
  wepp: IWepp | undefined;
}

const WeppInstallButton = ({ wepp }: Props) => {
  const { name, url, logo, isVerified } = wepp || {};

  const { isIOS, isMobile } = useDevice();

  const { isOpen, onOpenChange, onClose } = useDisclosure();

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
          <ModalFooter>
            <Button variant="light" onPress={onClose}>
              닫기
            </Button>
            <Button
              color="primary"
              as={Link}
              href={installLink(name, url, logo)}
            >
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
          <Button color="primary" as={Link} href={installLink(name, url, logo)}>
            받기
          </Button>
        </ModalFooter>
      </ModalContent>
    );
  };

  if (isVerified && !isIOS) {
    return (
      <Button color="primary" as={Link} href={installLink(name, url, logo)}>
        받기
      </Button>
    );
  }

  return (
    <>
      <Button color="primary" onPress={onOpenChange}>
        받기
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        {modalRenderContent()}
      </Modal>
    </>
  );
};

export default WeppInstallButton;