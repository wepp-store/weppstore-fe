'use client';
import { useSignUp } from '@/shared/apis/queries/auth';
import { FormProvider, RHFInput } from '@/shared/ui/hook-form';
import { Button, Card } from '@nextui-org/react';
import { useForm } from 'react-hook-form';

const SignInFormSection = () => {
  const methods = useForm();
  const { handleSubmit } = methods;

  const signUpMutation = useSignUp();

  const onSubmit = (data: any) => {
    signUpMutation.mutate(data);
  };

  return (
    <div
      className="
      flex flex-col
      items-center
      justify-center
      h-screen
      bg-gray-100
    "
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Card
          className="
          w-96
          flex flex-col
          items-center
          justify-center
          gap-4
          p-4
          bg-white
          "
        >
          <h1 className="text-3xl font-bold">Sign Up</h1>
          <RHFInput name="userName" required placeholder="user name" />
          <RHFInput name="email" required placeholder="email" />
          <RHFInput name="password" required placeholder="password" />
          <Button
            type="submit"
            className="
            w-full
            bg-blue-500
            hover:bg-blue-700
            text-white
            font-bold
            py-2
            px-4
            rounded
          "
          >
            Sign Up
          </Button>
        </Card>
      </FormProvider>
    </div>
  );
};

export default SignInFormSection;
