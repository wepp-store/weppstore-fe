'use client';

import { FormProvider, RHFInput } from '@/shared/ui/hook-form';
import { Link, Button } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSignIn } from '../api';

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .required('이메일을 입력해주세요.')
    .matches(
      /^[a-zA-Z0-9+-_.]+@[a-z]+\.[a-z]{2,3}/i,
      '이메일 형식이 아닙니다.'
    ),
  password: Yup.string().required('비밀번호를 입력해주세요.'),
});

const LoginForm = () => {
  const methods = useForm({
    resolver: yupResolver(loginSchema),
  });

  const { handleSubmit } = methods;

  const signInMutation = useSignIn();

  const onSubmit = (data: any) => {
    signInMutation.mutate(data);
  };

  return (
    <FormProvider
      methods={methods}
      onSubmit={handleSubmit(onSubmit)}
      className="m-auto"
    >
      <div className="max-w-full w-[340px]">
        <div className="flex flex-col items-center gap-4 p-4">
          <RHFInput
            isRequired
            id="email"
            name="email"
            label="이메일"
            placeholder="이메일을 입력해주세요."
            autoComplete="email"
          />
          <RHFInput
            isRequired
            id="password"
            name="password"
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요."
            type="password"
          />

          <p className="text-center text-small">
            계정이 없으신가요?{' '}
            <Link size="sm" href="/sign-up" className="dark:text-gray-400">
              회원가입
            </Link>
          </p>
        </div>

        <div className="flex flex-col justify-end">
          <Button
            type="submit"
            fullWidth
            isLoading={signInMutation.isPending}
            className="bg-black text-white dark:bg-default"
          >
            {signInMutation.isPending || '로그인하기'}
          </Button>
        </div>
      </div>
    </FormProvider>
  );
};

export default LoginForm;
