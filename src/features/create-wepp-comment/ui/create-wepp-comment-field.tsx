import React from 'react';
import { useCreateWeppComment } from '../api/create-wepp-comment';
import { useForm } from 'react-hook-form';
import { FormProvider, RHFInput } from '@/shared/ui/hook-form';
import { Button } from '@nextui-org/react';

const CreateWeppCommentField = () => {
  const { mutate, isPending } = useCreateWeppComment();

  const methods = useForm<{ content: string }>();

  const { handleSubmit } = methods;

  const onSubmit = (data: { content: string }) => {
    mutate(data);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-4 mt-4">
        <RHFInput name="content" placeholder="댓글을 입력해주세요." />
        <Button
          type="submit"
          color="primary"
          isDisabled={isPending}
          isLoading={isPending}
        >
          {isPending ? '작성중...' : '작성'}
        </Button>
      </div>
    </FormProvider>
  );
};

export default CreateWeppCommentField;
