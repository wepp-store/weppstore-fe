import React from 'react';
import { useEmailVerifyStore, useSignUpStepStore } from '../../lib';
import { RHFInput } from '@/shared/ui/hook-form';
import { useFormContext, useWatch } from 'react-hook-form';
import { useSendEmail, useVerifyEmail } from '../../api';
import { SignUpHeader } from '../../ui';
import { KeyboardAdjustButton } from '@/shared/ui/keyboard-adjust-button';
import { useTimer } from '@/shared/hooks';
import { formatTimer } from '@/shared/utils';

const VerifyEmailStep = () => {
  const setStep = useSignUpStepStore((state) => state.setStep);

  const {
    endAt,
    userToken,
    // actions
    setEndAt,
    setIsVerified,
    setUserToken,
  } = useEmailVerifyStore();

  const { timer, isTimerCompleted, setTimer } = useTimer(endAt);

  const {
    control,
    getValues,
    formState: { errors },
  } = useFormContext();

  const watchedCode = useWatch({
    control,
    name: 'code',
  });

  const email = getValues('email');

  const verifyMutation = useVerifyEmail();
  const sendMutation = useSendEmail();

  const verifyEmail = () => {
    verifyMutation.mutate(
      { email, code: watchedCode, userToken },
      {
        onSuccess: () => {
          setStep(2);
          setEndAt(null);
          setTimer(null);
          setIsVerified(true);
        },
      }
    );
  };

  const sendEmail = () => {
    sendMutation.mutate(
      { email },
      {
        onSuccess: (userToken: string) => {
          setUserToken(userToken);
          setStep(1);
          setEndAt(Date.now() + 1000 * 60 * 3); // 3m
        },
      }
    );
  };

  const isValid = watchedCode?.length === 6 && !errors.email;

  // 이메일 보내고 1.5m 지난 경우
  const isShowResendButton =
    isTimerCompleted || (timer && timer < 1.5 * 60 * 1000);

  return (
    <div className="h-full flex flex-col justify-between">
      <SignUpHeader title="이메일 인증" onBack={() => setStep(0)} />
      <div className="grow px-4">
        <RHFInput
          size="lg"
          name="code"
          maxLength={6}
          inputMode="decimal"
          label="인증코드"
          placeholder="인증코드를 입력해주세요."
        />
        <div className="flex flex-col items-end mt-3 text-sm">
          {timer && <p className="text-red-500">{formatTimer(timer)}</p>}
          {isTimerCompleted && (
            <p className="text-red-300">인증번호가 만료되었습니다.</p>
          )}
          {isShowResendButton && (
            <div className="mt-2">
              {sendMutation.isPending ? (
                <span className="text-gray-500">인증번호 재요청 중..</span>
              ) : (
                <div className="text-gray-500">
                  이메일이 도착하지 않았나요?{' '}
                  <span role="button" className="underline" onClick={sendEmail}>
                    인증번호 재요청
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="mt-6 px-4">
        <KeyboardAdjustButton
          onPress={verifyEmail}
          size="lg"
          color="primary"
          fullWidth
          isDisabled={!isValid}
          isLoading={verifyMutation.isPending}
        >
          {verifyMutation.isPending ? '인증 중입니다..' : '다음'}
        </KeyboardAdjustButton>
      </div>
    </div>
  );
};

export default VerifyEmailStep;
