import {
  Chip,
  Modal,
  Button,
  Snippet,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalContent,
  useDisclosure,
} from '@nextui-org/react';
import React from 'react';

const DomainOwnershipInfoButton = () => {
  const { isOpen, onOpenChange, onClose } = useDisclosure();

  return (
    <>
      <p
        className="text-sm underline"
        onClick={onOpenChange}
        role="button"
        aria-label="domain ownership info button"
      >
        도메인 소유권 인증 절차가 궁금하신가요?
      </p>

      {/* modal */}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="4xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          <ModalHeader>도메인 소유권 인증 절차</ModalHeader>
          <ModalBody>
            <p className="mb-2">
              도메인 소유권 인증은 앱을 등록하고 앱의 URL을 변경할 때 필요한
              절차입니다.
            </p>

            <ol className="relative ml-3 border-s border-gray-200 dark:border-gray-700">
              <li className="mb-10 ms-6">
                <Chip className="absolute -start-3">1</Chip>
                <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                  pwa install script 추가
                </h3>
                <Snippet
                  hideSymbol
                  className="w-full my-2"
                  classNames={{
                    pre: 'whitespace-pre-wrap',
                  }}
                >
                  {`<script id="weppstore-install-script" src="./install-script.js"></script> `}
                </Snippet>
                <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                  Wepp Store에서 제공하는 pwa install script를 앱 HTML 파일의
                  head 태그에 추가합니다.
                </p>
              </li>
              <li className="mb-10 ml-6">
                <Chip className="absolute -left-3">2</Chip>
                <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                  도메인 소유권 확인
                </h3>
                <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                  Wepp Store 개발자 페이지에서 도메인 소유권 확인 절차를
                  진행합니다.
                </p>
              </li>
              <li className="mb-10 ml-6">
                <Chip className="absolute -left-3">3</Chip>
                <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                  인증 완료
                </h3>
                <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                  도메인 소유권 확인이 완료되면, Wepp Store에 앱을 등록할 수
                  있습니다.
                </p>
              </li>
            </ol>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={onClose}>
              확인
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DomainOwnershipInfoButton;
