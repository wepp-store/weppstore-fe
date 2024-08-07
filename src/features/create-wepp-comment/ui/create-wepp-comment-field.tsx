import React from 'react';
import { useCreateWeppComment } from '../api/create-wepp-comment';
import { useForm } from 'react-hook-form';
import { FormProvider, RHFInput } from '@/shared/ui/hook-form';
import { Button } from '@nextui-org/react';
import { useReplyStateStore } from '../lib';
import { IComment } from '@/shared/types';

const CreateWeppCommentField = () => {
  const { mutate, isPending } = useCreateWeppComment();

  const methods = useForm<{ content: string }>();

  const { handleSubmit } = methods;

  // reply state
  const {
    //state
    replyComment,
    // action
    clearReplyComment,
  } = useReplyStateStore();

  const onSubmit = (data: Pick<IComment, 'content' | 'parentId'>) => {
    if (replyComment) {
      data.parentId = replyComment.id;
      clearReplyComment();
    }

    mutate(data);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-4 items-end mt-4">
        <div className="flex flex-col gap-1 grow">
          {replyComment && (
            <div className="flex gap-2 text-sm text-gray-500">
              To. {replyComment.writer}
              <div role="button" onClick={clearReplyComment}>
                취소
              </div>
            </div>
          )}
          <RHFInput name="content" placeholder="댓글을 입력해주세요." />
        </div>
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
