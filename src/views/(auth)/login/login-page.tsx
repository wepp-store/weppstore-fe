'use client';

import React from 'react';
import { Button, Card, CardBody, Divider, Image } from '@nextui-org/react';
import GoogleLoginButton from './ui/google-login-button';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { PATH } from '@/shared/constants';
import { LoginForm } from './sections';
import { LogoIcon } from '@/shared/ui/icons';

const LoginPage = () => {
  const router = useRouter();

  return (
    <div className=" fixed w-full h-full top-0 left-0 flex justify-center items-center z-50">
      <Button
        isIconOnly
        className="absolute top-3 left-3"
        variant="light"
        onPress={() => router.replace(PATH.MAIN.WEPPS)}
      >
        <ChevronLeft size={24} role="button" aria-label="뒤로가기" />
      </Button>
      <div className="flex flex-col items-center gap-8">
        <div className="flex flex-col justify-center items-center">
          <LogoIcon width={52} height={52} />
          <h1 className="mt-2 text-3xl font-bold">로그인</h1>
        </div>
        <Card className="shadow-none border dark:border-gray-700">
          <CardBody>
            <div className="flex flex-col gap-2">
              <LoginForm />
              <div className="my-6 flex items-center">
                <Divider className="w-auto flex-1" />
                <span className="px-2 text-sm text-gray-500">또는</span>
                <Divider className="w-auto flex-1" />
              </div>
              <GoogleLoginButton />
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
