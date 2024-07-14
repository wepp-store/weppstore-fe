'use client';

import { FormProvider, RHFInput } from '@/shared/ui/hook-form';
import {
  Link,
  Card,
  Divider,
  CardBody,
  CardFooter,
  CardHeader,
  Button,
} from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { useSignIn } from '../api';

const LoginForm = () => {
  const methods = useForm();

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
      <Card className="max-w-full w-[340px]">
        <CardHeader className="justify-center">
          <h1 className="text-3xl font-bold">Login</h1>
        </CardHeader>
        <Divider />
        <CardBody className="items-center gap-4 p-4">
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
            Need to create an account?{' '}
            <Link size="sm" href="/sign-up">
              SignUp
            </Link>
          </p>
        </CardBody>

        <CardFooter className="justify-end">
          <Button
            color="primary"
            type="submit"
            fullWidth
            isLoading={signInMutation.isPending}
          >
            {signInMutation.isPending || 'Login'}
          </Button>
        </CardFooter>
      </Card>
    </FormProvider>
  );
};

export default LoginForm;
