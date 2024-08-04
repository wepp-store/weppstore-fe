import { IComment } from '@/shared/types';
import { StarRating } from '@/shared/ui/star-rating';
import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  User,
} from '@nextui-org/react';
import React from 'react';
import { useDeleteWeppComment } from '../api';
import { useSession } from '@/shared/apis/queries/auth';

interface Props {
  comment: Pick<IComment, 'id' | 'content' | 'user'>;
}

const WeppComment = ({ comment }: Props) => {
  const { id: commentId, content, user } = comment;

  const { user: me } = useSession();

  const { isOpen, onOpenChange, onClose } = useDisclosure();

  const { mutate, isPending } = useDeleteWeppComment();

  const isMyComment = user.id === me?.id;

  return (
    <>
      <div className="border-b border-gray-200 py-4">
        <div className="flex items-center mb-2 gap-4">
          <User
            name={user.userName}
            description={user.email}
            avatarProps={{
              src: user.profileUrl || '/no-image.svg',
            }}
          />
          {isMyComment && (
            <Button size="sm" variant="light" onPress={onOpenChange}>
              삭제
            </Button>
          )}
        </div>
        <p className="text-gray-700">{content}</p>
      </div>

      {/* modal */}
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

export default WeppComment;
