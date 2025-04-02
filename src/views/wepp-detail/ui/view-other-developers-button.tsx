import { IWepp } from '@/shared/types';
import { RHFInput } from '@/shared/ui/hook-form';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  User,
} from '@nextui-org/react';
import React from 'react';
import { FormProvider } from 'react-hook-form';

interface Props {
  wepp: IWepp;
}

const ViewOtherDevelopersButton = ({ wepp }: Props) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const developers = [wepp.developer, ...(wepp.otherDevelopers ?? [])];

  return (
    <>
      <span
        className="ml-2 text-gray-500 underline"
        role="button"
        onClick={onOpen}
      >
        외 {wepp?.otherDevelopers?.length}명
      </span>

      {/* Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">개발자 목록</ModalHeader>
          <ModalBody>
            {developers.map((developer) => (
              <div key={developer.id} className="flex items-center gap-2 mb-2">
                <User
                  avatarProps={{
                    src: developer.profileUrl ?? '/no-image.svg',
                  }}
                  name={developer.userName}
                />
              </div>
            ))}
          </ModalBody>
          <ModalFooter>
            <Button type="button" color="primary" onPress={onClose}>
              닫기
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ViewOtherDevelopersButton;
