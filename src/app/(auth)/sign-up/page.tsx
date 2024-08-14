import { SignUpPage } from '@/views/(auth)/sign-up';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '회원가입',
  description: 'Wepp Store 회원가입 페이지',
};

const Page = () => {
  return <SignUpPage />;
};

export default Page;
