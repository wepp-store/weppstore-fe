import {
  Button,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalContent,
  useDisclosure,
} from '@nextui-org/react';
import React from 'react';
import { useDeleteWeppComment } from '../api';

interface Props {
  commentId: number;
}

const WeppCommentDeleteButton = ({ commentId }: Props) => {
  const { isOpen, onOpenChange, onClose } = useDisclosure();

  const { mutate, isPending } = useDeleteWeppComment();

  return (
    <>
      <Button size="sm" variant="light" onPress={onOpenChange}>
        삭제
      </Button>

      {/* confirm modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>댓글을 삭제하시겠습니까?</ModalHeader>
          <ModalFooter>
            <Button variant="light" onPress={onClose}>
              아니요
            </Button>
            <Button
              color="primary"
              isLoading={isPending}
              onPress={() => mutate({ commentId })}
            >
              {isPending || '네, 삭제할게요'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default WeppCommentDeleteButton;