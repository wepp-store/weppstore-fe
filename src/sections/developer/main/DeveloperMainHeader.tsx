'use client';
import React from 'react';
import { Section } from '@/components/section';
import { FormProvider, RHFInput } from '@/components/hook-form';
import { useForm } from 'react-hook-form';
import { useCreateWepp } from '@/_apis/queries/wepp';
import { IWepp } from '@/_types';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import { useAuth } from '@/_apis/queries/auth';

type FieldValues = Pick<IWepp, 'name'>;

const DeveloperMainHeader = () => {
  const { data: me } = useAuth();

  const createMutation = useCreateWepp<FieldValues>();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const methods = useForm<FieldValues>();

  const { handleSubmit } = methods;

  const onSubmit = (data: FieldValues) => {
    createMutation.mutate(data);
  };

  return (
    <>
      <Section className="flex justify-between">
        <h2
          className="
          text-3xl
          font-bold
          text-gray-800
          mb-4
          "
        >
          {me?.userName}님의 앱
        </h2>
        <Button color="primary" onClick={onOpen}>
          생성하기
        </Button>
      </Section>

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

export default DeveloperMainHeader;
