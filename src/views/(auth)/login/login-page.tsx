'use client';

import React from 'react';
import { Button, Card, CardBody, Divider, Image } from '@nextui-org/react';
import GoogleLoginButton from './ui/google-login-button';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { PATH } from '@/shared/constants';
import { LoginForm } from './sections';

const LoginPage = () => {
  const router = useRouter();

  return (
    <div
      className="
        fixed
        w-full
        h-full
        top-0
        left-0
        flex justify-center items-center
        bg-white
        z-50
    "
    >
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
          <Image src="/logo.svg" width={64} height={64} alt="logo" />
          <h1 className="text-3xl font-bold">로그인</h1>
        </div>
        <Card>
          <CardBody>
            <div className="flex flex-col gap-2">
              <LoginForm />
              <div className="relative my-6">
                <Divider />
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-gray-500">
                  또는
                </span>
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
