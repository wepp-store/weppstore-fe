import { SignUpForm } from '@/features/auth';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '회원가입',
  description: 'Wepp Store 회원가입 페이지',
};

const SignUpPage = () => {
  return (
    <>
      <SignUpForm />
    </>
  );
};

export default SignUpPage;
