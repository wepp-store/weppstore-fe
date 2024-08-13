'use client';

import React from 'react';
import { Button } from '@nextui-org/react';
import { axiosInstance } from '@/shared/apis/axios';
import { PATH_API } from '@/shared/apis/path';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import Google from '@/shared/assets/icons/google';

const isInValidUrl = (url: string) => {
  try {
    new URL(url);
    return false;
  } catch {
    return true;
  }
};

const GoogleLoginButton = () => {
  const searchParams = useSearchParams();

  const redirectUri = searchParams.get('redirect');

  const handleLogin = async () => {
    try {
      // TODO: fix provider
      const provider = 'GOOGLE';

      const params = redirectUri ? { 'redirect-uri': redirectUri } : {};

      const urlResponse = await axiosInstance.get(
        PATH_API.AUTH.OAUTH_SIGN_IN_URI(provider),
        { params }
      );

      const { url } = urlResponse.data;

      if (isInValidUrl(url)) {
        toast.error('로그인 페이지를 찾을 수 없습니다.');
        return;
      }

      window.location.href = url;
    } catch {
      toast.error('로그인 페이지를 찾을 수 없습니다.');
    }
  };

  return (
    <Button onPress={handleLogin} variant="bordered">
      <Google />
      구글 계정으로 로그인하기
    </Button>
  );
};

export default GoogleLoginButton;
