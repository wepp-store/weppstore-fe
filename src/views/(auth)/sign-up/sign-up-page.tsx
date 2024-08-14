'use client';

import React from 'react';
import { EmailStep, NameStep, PasswordStep, VerifyEmailStep } from './sections';
import { useForm } from 'react-hook-form';
import { signUpSchema, useSignUpStepStore } from './lib';
import { FormProvider } from '@/shared/ui/hook-form';
import { Image, Link } from '@nextui-org/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { PATH } from '@/shared/constants';

const SignUpPage = () => {
  const step = useSignUpStepStore((state) => state.step);

  const methods = useForm({
    resolver: yupResolver(signUpSchema),
    mode: 'onChange',
  });

  return (
    <div
      className="
        w-full max-w-screen-md min-h-svh
        box-border
        mx-auto
        flex sm:items-center
      "
    >
      <div className="flex grow sm:h-96">
        <div className="flex-1 p-4 hidden sm:flex bg-gradient-to-tr from-primary-100 rounded-l-lg">
          <div className="flex flex-col grow items-center justify-between">
            <div className="flex flex-col items-center">
              <Image src="/logo.svg" width={64} height={64} alt="logo" />
              <h1 className="text-3xl font-bold text-gray-900">회원가입</h1>
            </div>
            <Link
              href={PATH.AUTH.LOGIN}
              className="mt-4 text-gray-600 underline"
            >
              로그인 페이지로 이동하기
            </Link>
          </div>
        </div>
        <div className="flex-1 py-4">
          <FormProvider className="size-full" methods={methods}>
            {step === 0 && <EmailStep />}
            {step === 1 && <VerifyEmailStep />}
            {step === 2 && <NameStep />}
            {step === 3 && <PasswordStep />}
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
