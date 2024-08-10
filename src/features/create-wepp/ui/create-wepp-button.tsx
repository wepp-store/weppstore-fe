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
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type FieldValues = Pick<IWepp, 'name'>;

const createWeppSchema = Yup.object().shape({
  name: Yup.string().required('앱 이름을 입력해주세요.'),
});

const CreateWeppButton = () => {
  const createMutation = useCreateWepp<FieldValues>();

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const methods = useForm<FieldValues>({
    resolver: yupResolver(createWeppSchema),
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: FieldValues) => {
    createMutation.mutate(data, {
      onSuccess: onClose,
    });
  };

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        생성하기
      </Button>

      {/* Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
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
              <Button type="submit" color="primary">
                생성하기
              </Button>
            </ModalFooter>
          </FormProvider>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateWeppButton;
