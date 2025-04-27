'use client';

import React from 'react';
import { EmailStep, NameStep, PasswordStep, VerifyEmailStep } from './sections';
import { useForm } from 'react-hook-form';
import { signUpSchema, useSignUpStepStore } from './lib';
import { FormProvider } from '@/shared/ui/hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const SignUpPage = () => {
  const step = useSignUpStepStore((state) => state.step);

  const methods = useForm({
    resolver: yupResolver(signUpSchema),
    mode: 'onChange',
  });

  const onSubmit = () => {};

  return (
    <div className="size-full max-w-md box-border mx-auto flex">
      <div className="flex-1 py-4">
        <FormProvider
          className="size-full"
          methods={methods}
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          {step === 0 && <EmailStep />}
          {step === 1 && <VerifyEmailStep />}
          {step === 2 && <NameStep />}
          {step === 3 && <PasswordStep />}
        </FormProvider>
      </div>
    </div>
  );
};

export default SignUpPage;
