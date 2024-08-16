import React from 'react';
import { useEmailVerifyStore, useSignUpStepStore } from '../../lib';
import { RHFInput } from '@/shared/ui/hook-form';
import { useSendEmail } from '../../api';
import { useFormContext, useWatch } from 'react-hook-form';
import { SignUpHeader } from '../../ui';
import { KeyboardAdjustButton } from '@/shared/ui/keyboard-adjust-button';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { PATH } from '@/shared/constants';

const EmailStep = () => {
  const { replace } = useRouter();

  const setStep = useSignUpStepStore((state) => state.setStep);
  const { isVerified, setEndAt } = useEmailVerifyStore();
  const setUserToken = useEmailVerifyStore((state) => state.setUserToken);

  const {
    control,
    formState: { errors },
  } = useFormContext();

  const watchedEmail = useWatch({
    control,
    name: 'email',
  });

  const onNextStep = () => {
    if (isVerified) {
      setStep(2);
      return;
    }
    setStep(1);
  };

  const { mutate, isPending } = useSendEmail();

  const sendEmail = () => {
    mutate(
      { email: watchedEmail },
      {
        onSuccess: (userToken: string) => {
          setUserToken(userToken);
          onNextStep();
          setEndAt(Date.now() + 1000 * 60 * 3); // 3m
        },
      }
    );
  };

  const isValid = !!watchedEmail && !errors.email;

  return (
    <div className="h-full flex flex-col justify-between">
      <SignUpHeader
        title="이메일 인증"
        onBack={() => replace(PATH.AUTH.LOGIN)}
      />
      <div className="grow px-4 flex flex-col gap-2">
        <RHFInput
          size="lg"
          name="email"
          label="이메일"
          inputMode="email"
          placeholder="이메일을 입력해주세요."
          isDisabled={isVerified}
          autoComplete="email"
        />
        {isVerified && (
          <div className="flex items-center text-sm text-green-600">
            <span className="ml-2">이메일이 인증되었습니다.</span>
          </div>
        )}
      </div>
      <div className="mt-6 px-4">
        {isVerified ? (
          <Button onPress={onNextStep} size="lg" color="primary" fullWidth>
            다음
          </Button>
        ) : (
          <KeyboardAdjustButton
            onPress={sendEmail}
            size="lg"
            color="primary"
            fullWidth
            isDisabled={!isValid}
            isLoading={isPending}
          >
            {isPending ? '메일 전송 중..' : '이메일 인증하기'}
          </KeyboardAdjustButton>
        )}
      </div>
    </div>
  );
};

export default EmailStep;
