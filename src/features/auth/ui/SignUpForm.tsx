'use client';
import { useSignUp } from '@/shared/apis/queries/auth';
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

const SignUpForm = () => {
  const methods = useForm();
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
          <h1 className="text-3xl font-bold">Sign Up</h1>
        </CardHeader>
        <Divider />
        <CardBody className="items-center gap-4 p-4">
          <RHFInput
            isRequired
            name="userName"
            label="user name"
            placeholder="Enter your name"
          />
          <RHFInput
            isRequired
            name="email"
            label="Name"
            placeholder="Enter your email"
          />
          <RHFInput
            isRequired
            name="password"
            label="password"
            placeholder="Enter your password"
            type="password"
          />

          <p className="text-center text-small">
            Already have an account?{' '}
            <Link size="sm" href="/login">
              Login
            </Link>
          </p>
        </CardBody>

        <CardFooter className="justify-end">
          <Button color="primary" type="submit" fullWidth>
            Sign Up
          </Button>
        </CardFooter>
      </Card>
    </FormProvider>
  );
};

export default SignUpForm;
