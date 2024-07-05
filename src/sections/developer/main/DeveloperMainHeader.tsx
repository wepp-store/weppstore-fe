'use client';
import React from 'react';
import { Button } from '@/components/button';
import { Section } from '@/components/section';
import { Modal } from '@/components/modal';
import { FormProvider, RHFInput } from '@/components/hook-form';
import { useForm } from 'react-hook-form';
import { useCreateWepp } from '@/_apis/queries/wepp';
import { IWepp } from '@/_types';

type FieldValues = Pick<IWepp, 'name'>;

const DeveloperMainHeader = () => {
  const createMutation = useCreateWepp<FieldValues>();

  const [openCreateModal, setOpenCreateModal] = React.useState(false);

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
          Featured Apps
        </h2>
        <Button onClick={() => setOpenCreateModal(true)}>생성하기</Button>
      </Section>

      {/* Modal */}
      <Modal open={openCreateModal} onClose={() => setOpenCreateModal(false)}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Modal.Title>
            <h2 className="text-2xl font-bold text-gray-800">
              앱 이름을 입력해주세요.
            </h2>
          </Modal.Title>
          <Modal.Content>
            <RHFInput
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="name"
              type="text"
              placeholder="앱 이름을 입력해주세요."
            />
          </Modal.Content>
          <Modal.Actions>
            <Button type="submit" className="w-full bg-gray-600 text-white">
              생성하기
            </Button>
          </Modal.Actions>
        </FormProvider>
      </Modal>
    </>
  );
};

export default DeveloperMainHeader;
