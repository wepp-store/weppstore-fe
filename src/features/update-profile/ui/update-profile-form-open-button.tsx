import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import React from 'react';
import { useUpdateProfile } from '../api/update-profile';
import { useForm } from 'react-hook-form';
import { IUser } from '@/shared/types';
import { FormProvider, RHFInput, RHFTextArea } from '@/shared/ui/hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface FieldValues extends Pick<IUser, 'userName'> {
  description?: string;
}

const profileSchema = yup.object().shape({
  userName: yup
    .string()
    .required('이름을 입력해주세요.')
    .max(12, '12자 이내로 입력해주세요.')
    .matches(
      /^[a-zA-Z0-9가-힣ㄱ-ㅣ._]*$/, // 허용할 문자들에 .과 _를 포함한 정규식
      '특수문자는 .과 _만 사용할 수 있습니다.'
    ),
});

const UpdateProfileFormOpenButton = ({ profile }: { profile: IUser }) => {
  const { isOpen, onOpenChange, onClose } = useDisclosure();

  const { mutate, isPending } = useUpdateProfile();

  const methods = useForm<FieldValues>({
    defaultValues: {
      userName: profile.userName,
      description: profile.description,
    },
    resolver: yupResolver(profileSchema),
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: FieldValues) => {
    mutate(data);
  };

  return (
    <>
      <Button color="primary" onPress={onOpenChange}>
        프로필 편집
      </Button>

      {/* profile edit modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>프로필 편집</ModalHeader>
            <ModalBody>
              {/* UpdateProfileForm */}
              <RHFInput
                name="userName"
                label="이름"
                placeholder="이름을 입력해주세요."
              />
              <RHFTextArea
                name="description"
                label="소개"
                placeholder="소개를 입력해주세요."
              />
            </ModalBody>
            <ModalFooter>
              <Button onPress={onClose} variant="light">
                취소
              </Button>
              <Button color="primary" type="submit" isLoading={isPending}>
                {isPending || '수정하기'}
              </Button>
            </ModalFooter>
          </FormProvider>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateProfileFormOpenButton;
