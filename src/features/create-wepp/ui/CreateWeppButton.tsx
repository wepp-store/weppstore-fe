'use client';

import React from 'react';
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
import { FormProvider, RHFInput } from '@/shared/ui/hook-form';
import { useForm } from 'react-hook-form';
import { useCreateWepp } from '../api/create-wepp';

type FieldValues = Pick<IWepp, 'name'>;

const CreateWeppButton = () => {
  const createMutation = useCreateWepp<FieldValues>();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const methods = useForm<FieldValues>();

  const { handleSubmit } = methods;

  const onSubmit = (data: FieldValues) => {
    createMutation.mutate(data);
  };

  return (
    <>
      <Button color="primary" onClick={onOpen}>
        생성하기
      </Button>

      {/* Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader className="flex flex-col gap-1">
                앱 이름을 입력해주세요.
              </ModalHeader>
              <ModalBody>
                <RHFInput
                  name="name"
                  type="text"
                  placeholder="앱 이름을 입력해주세요."
                />
              </ModalBody>
              <ModalFooter>
                <Button type="submit" color="primary" onPress={onClose}>
                  생성하기
                </Button>
              </ModalFooter>
            </FormProvider>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateWeppButton;
