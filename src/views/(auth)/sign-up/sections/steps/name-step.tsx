import React from 'react';
import { useSignUpStepStore } from '../../lib';
import { RHFInput } from '@/shared/ui/hook-form';
import { SignUpHeader } from '../../ui';
import { KeyboardAdjustButton } from '@/shared/ui/keyboard-adjust-button';
import { useFormContext, useWatch } from 'react-hook-form';

const NameStep = () => {
  const setStep = useSignUpStepStore((state) => state.setStep);

  const {
    control,
    formState: { errors },
  } = useFormContext();

  const watchedName = useWatch({
    control,
    name: 'userName',
  });

  const isValid = !!watchedName && !errors.userName;

  return (
    <div className="h-full flex flex-col justify-between">
      <SignUpHeader title="사용자 정보 입력 (1/2)" onBack={() => setStep(1)} />
      <div className="grow px-4">
        <RHFInput
          size="lg"
          name="userName"
          label="이름"
          placeholder="이름을 입력해주세요."
        />
      </div>
      <div className="mt-6 px-4">
        <KeyboardAdjustButton
          onPress={() => setStep(3)}
          size="lg"
          color="primary"
          fullWidth
          isDisabled={!isValid}
        >
          다음
        </KeyboardAdjustButton>
      </div>
    </div>
  );
};

export default NameStep;
