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
  Tooltip,
} from '@nextui-org/react';
import { CircleHelp } from 'lucide-react';
import React from 'react';

const AddWeppHelpButton = () => {
  const { isOpen, onOpenChange, onClose } = useDisclosure();

  return (
    <>
      <Tooltip content="앱 등록 인증 절차가 궁금하신가요?">
        <Button
          isIconOnly
          variant="light"
          className="text-sm"
          onClick={onOpenChange}
          aria-label="add wepp help button"
        >
          <CircleHelp />
        </Button>
      </Tooltip>

      {/* modal */}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="4xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          <ModalHeader>앱 등록 및 인증 절차</ModalHeader>
          <ModalBody>
            <ol className="relative ml-3 border-s border-gray-200 dark:border-gray-700">
              <li className="mb-10 ms-6">
                <Chip className="absolute -start-3">1</Chip>
                <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                  앱 정보 입력
                </h3>
                <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                  앱 이름, 설명, 로고, 스크린샷 등의 정보를 입력합니다.
                </p>
              </li>
              <li className="mb-10 ml-6">
                <Chip className="absolute -left-3">2</Chip>
                <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                  도메인 소유권 확인
                </h3>
                <div className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                  <p className="my-4">
                    Wepp Store 제공 스크립트 추가 <strong>(권장)</strong>
                  </p>
                  <ul className="flex flex-col gap-4">
                    <li>
                      1. Wepp Store에서 제공하는 PWA 설치 스크립트를
                      index.html에 추가합니다.
                    </li>
                    <li>
                      2. 스크립트 추가시 특정 경로로 접근하면 PWA 설치
                      프롬프트가 뜨며, 도메인 소유권을 확인할 수 있습니다.
                    </li>
                    <li>
                      3. 도메인 소유권 확인이 완료되면, 승인 절차 없이 앱을
                      등록할 수 있습니다.
                    </li>
                  </ul>
                </div>
              </li>
              <li className="mb-10 ml-6">
                <Chip className="absolute -left-3">3</Chip>
                <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                  별도로 PWA 설치 프롬프트를 사용하고 계신가요?
                </h3>
                <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                  도메인 소유권 확인을 위해 Wepp Store 관리자에게 승인을 받은 후
                  앱 등록을 할 수 있습니다.
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

export default AddWeppHelpButton;
