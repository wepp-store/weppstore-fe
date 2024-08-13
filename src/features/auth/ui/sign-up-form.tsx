'use client';

import { FormProvider, RHFInput } from '@/shared/ui/hook-form';
import {
  Link,
  Card,
  Button,
  Divider,
  CardBody,
  CardHeader,
  CardFooter,
} from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { useSignUp } from '../api';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const signupSchema = Yup.object().shape({
  email: Yup.string()
    .required('이메일을 입력해주세요.')
    .matches(
      /^[a-zA-Z0-9+-_.]+@[a-z]+\.[a-z]{2,3}/i,
      '이메일 형식이 아닙니다.'
    ),
  password: Yup.string().required('비밀번호를 입력해주세요.'),
  userName: Yup.string().required('이름을 입력해주세요.'),
});

const SignUpForm = () => {
  const methods = useForm({
    resolver: yupResolver(signupSchema),
  });
  const { handleSubmit } = methods;

  const signUpMutation = useSignUp();

  const onSubmit = (data: any) => {
    signUpMutation.mutate(data);
  };

  return (
    <FormProvider
      methods={methods}
      onSubmit={handleSubmit(onSubmit)}
      className="m-auto"
    >
      <Card className="max-w-full w-[340px]">
        <CardHeader className="justify-center">
          <h1 className="text-3xl font-bold">회원가입</h1>
        </CardHeader>
        <Divider />
        <CardBody className="items-center gap-4 p-4">
          <RHFInput
            isRequired
            id="name"
            name="userName"
            label="이름"
            placeholder="이름을 입력해주세요."
          />
          <RHFInput
            isRequired
            id="email"
            name="email"
            label="이메일"
            placeholder="이메일을 입력해주세요."
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
            이미 계정이 있으신가요?{' '}
            <Link size="sm" href="/login">
              로그인
            </Link>
          </p>
        </CardBody>

        <CardFooter className="justify-end">
          <Button color="primary" type="submit" fullWidth>
            회원가입
          </Button>
        </CardFooter>
      </Card>
    </FormProvider>
  );
};

export default SignUpForm;
