import { IWepp } from '@/shared/types';
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
import { useFormContext } from 'react-hook-form';
import { useSubmitWepp, useUpdateWepp } from '../../api';
import { WeppField } from '../../types';
import { convertUpdateWeppForm } from '../../utils';
import { useParams, useRouter } from 'next/navigation';
import { PATH } from '@/shared/constants';
import { useQueryClient } from '@tanstack/react-query';
import { weppKeys } from '@/shared/apis/queries/wepp';

const SubmitWeppButton = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id: weppId }: { id: string } = useParams();

  const { isOpen, onOpenChange, onClose } = useDisclosure();

  // TODO: add toast
  const successOption = {
    onSuccess: () => {
      onClose();
      queryClient.invalidateQueries({
        queryKey: weppKeys.detail(weppId),
      });
      router.replace(`/${PATH.DEVELOPER.WEPP}/${weppId}`);
    },
  };

  const submitWeppMutation = useSubmitWepp<WeppField>(successOption);

  const updateWeppMutation = useUpdateWepp<WeppField>(successOption);

  const { handleSubmit, watch } = useFormContext<IWepp>();

  const onSubmit = (data: IWepp) => {
    const isVerified = watch('isVerified');

    if (!isVerified) {
      onOpenChange();
      return;
    }
    submitWeppMutation.mutate(convertUpdateWeppForm(data));
  };

  const onRequest = (data: IWepp) => {
    updateWeppMutation.mutate({
      ...convertUpdateWeppForm(data),
      status: 'PENDING',
    });
  };

  return (
    <>
      <Button
        color="primary"
        isLoading={submitWeppMutation.isPending}
        onPress={handleSubmit(onSubmit) as VoidFunction}
      >
        {submitWeppMutation.isPending || '앱 제출'}
      </Button>

      {/* modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>앱이 인증되지 않았습니다.</ModalHeader>
          <ModalBody>
            앱이 인증되지 않은 경우 관리자 승인이 필요합니다.
            <br />
            앱을 제출하시겠습니까?
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onClose}>
              아니요
            </Button>
            <Button
              color="primary"
              onPress={handleSubmit(onRequest) as VoidFunction}
              isLoading={updateWeppMutation.isPending}
            >
              {updateWeppMutation.isPending || '네, 제출할게요'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SubmitWeppButton;
