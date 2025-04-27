import React from 'react';
import {
  Button,
  cn,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from '@nextui-org/react';
import { useUploadProfileImage } from '../api/upload-profile-image';

const UpdateProfileImage = ({
  src,
  isMine,
}: {
  src: string | null | undefined;
  isMine: boolean;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate, isPending } = useUploadProfileImage();

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    mutate(files[0]);
  };

  if (!isMine) {
    return (
      <>
        <Image
          width={128}
          height={128}
          src={src || '/no-image.svg'}
          alt="Profile"
          fallbackSrc="/no-image.svg"
          className={cn(
            'w-24 md:w-32',
            'min-w-24 md:min-w-32',
            'max-w-24 md:max-w-32',
            'h-24 md:h-32',
            'min-h-24 md:min-h-32',
            'max-h-24 md:max-h-32',
            'rounded-full',
            'border-4 dark:border-gray-700',
            'z-50',
            'cursor-pointer'
          )}
          onClick={onOpen}
        />
        <Modal
          isOpen={isOpen}
          onOpenChange={onClose}
          className="w-full max-w-lg"
        >
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">
              프로필 사진
            </ModalHeader>
            <ModalBody className="w-full items-center">
              <Image
                width={256}
                height={256}
                src={src || '/no-image.svg'}
                alt="Profile"
                fallbackSrc="/no-image.svg"
                className="
                rounded-full
                border-4
                border-white
                z-50
                "
              />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onPress={onClose}>
                닫기
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }

  return (
    <Tooltip showArrow content="프로필 이미지 수정">
      <label>
        <Image
          width={128}
          height={128}
          src={src || '/no-image.svg'}
          alt="Profile"
          fallbackSrc="/no-image.svg"
          className={cn(
            'w-24 md:w-32',
            'min-w-24 md:min-w-32',
            'max-w-24 md:max-w-32',
            'h-24 md:h-32',
            'min-h-24 md:min-h-32',
            'max-h-24 md:max-h-32',
            'rounded-full',
            'border-4',
            'border dark:border-gray-700',
            'z-50',
            'cursor-pointer'
          )}
        />
        <input type="file" onChange={onUpload} className="hidden" />
      </label>
    </Tooltip>
  );
};

export default UpdateProfileImage;
