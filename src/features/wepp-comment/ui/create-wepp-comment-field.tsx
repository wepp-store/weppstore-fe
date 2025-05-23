import React from 'react';
import { useCreateWeppComment } from '../api/create-wepp-comment';
import { useForm } from 'react-hook-form';
import { FormProvider, RHFInput } from '@/shared/ui/hook-form';
import { Button } from '@nextui-org/react';
import { useReplyStateStore } from '../lib';
import { IComment } from '@/shared/types';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { stringifyMention } from '@/views/(end-user)/wepp-detail/lib';
import { ELEMENT_ID } from '@/shared/constants';

const commentSchema = Yup.object().shape({
  content: Yup.string().required('내용을 입력해주세요.'),
});

const CreateWeppCommentField = () => {
  const { mutate, isPending } = useCreateWeppComment();

  const methods = useForm<{ content: string }>({
    resolver: yupResolver(commentSchema),
  });

  const {
    handleSubmit,
    setValue,
    formState: { isValid },
  } = methods;

  // reply state
  const {
    //state
    replyComment,
    // action
    clearReplyComment,
  } = useReplyStateStore();

  const onSubmit = (
    data: Pick<IComment, 'content' | 'parentId' | 'mention'>
  ) => {
    const newComment = { ...data };

    if (replyComment) {
      const { replyId, mentionId, writer } = replyComment;
      newComment.parentId = replyId;
      newComment.mention = stringifyMention(mentionId, writer);
      clearReplyComment();
    }

    mutate(newComment, {
      onSuccess: () => {
        setValue('content', '');
        clearReplyComment();
      },
    });
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
          <RHFInput
            name="content"
            placeholder="댓글을 입력해주세요."
            id={ELEMENT_ID.CREATE_COMMENT_FIELD}
          />
        </div>
        <Button
          type="submit"
          color="primary"
          isDisabled={!isValid || isPending}
          isLoading={isPending}
        >
          {isPending ? '작성중...' : '작성'}
        </Button>
      </div>
    </FormProvider>
  );
};

export default CreateWeppCommentField;
