import { RHFInput } from '@/shared/ui/hook-form';
import React from 'react';
import { useSignUpStepStore } from '../../lib';
import { SignUpHeader } from '../../ui';
import { KeyboardAdjustButton } from '@/shared/ui/keyboard-adjust-button';
import { Eye, EyeOff } from 'lucide-react';
import { useSignUp } from '../../api';
import { useFormContext, useWatch } from 'react-hook-form';

const PasswordStep = () => {
  const setStep = useSignUpStepStore((state) => state.setStep);

  const [isVisible, setIsVisible] = React.useState(false);
  const [isVisible2, setIsVisible2] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleVisibility2 = () => setIsVisible2(!isVisible2);

  const {
    control,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  const watchedPw = useWatch({ control, name: 'password' });
  const watchedPw2 = useWatch({ control, name: 'password2' });

  const { mutate, isPending } = useSignUp();

  const onSubmit = () => {
    const [email, userName, password] = getValues([
      'email',
      'userName',
      'password',
    ]);

    mutate({
      email,
      userName,
      password,
    });
  };

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && isValid) {
      handleSubmit(onSubmit)();
    }
  };

  const isValid =
    !!watchedPw && !!watchedPw2 && !errors.password && !errors.password2;

  return (
    <div className="h-full flex flex-col justify-between">
      <SignUpHeader title="사용자 정보 입력 (2/2)" onBack={() => setStep(2)} />
      <div className="grow px-4 flex flex-col gap-4">
        <RHFInput
          size="lg"
          autoFocus
          isClearable={false}
          type={isVisible ? 'test' : 'password'}
          name="password"
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          onKeyUp={onKeyUp}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
              aria-label="toggle password visibility"
            >
              {isVisible ? (
                <Eye className="text-xl text-default-400 pointer-events-none" />
              ) : (
                <EyeOff className="text-xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
        />
        <RHFInput
          size="lg"
          isClearable={false}
          type={isVisible2 ? 'test' : 'password'}
          name="password2"
          label="비밀번호 확인"
          placeholder="비밀번호 확인을 입력해주세요."
          onKeyUp={onKeyUp}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility2}
              aria-label="toggle password visibility"
            >
              {isVisible2 ? (
                <Eye className="text-xl text-default-400 pointer-events-none" />
              ) : (
                <EyeOff className="text-xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
        />
      </div>
      <div className="mt-6 px-4">
        <KeyboardAdjustButton
          isDisabled={!isValid}
          isLoading={isPending}
          onPress={handleSubmit(onSubmit) as VoidFunction}
          size="lg"
          color="primary"
          fullWidth
        >
          {isPending ? '회원가입 중..' : '회원가입 마치기'}
        </KeyboardAdjustButton>
      </div>
    </div>
  );
};

export default PasswordStep;
