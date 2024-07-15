import { LoginForm } from '@/features/auth';

const SignIn = () => {
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
      <LoginForm />
    </div>
  );
};

export default SignIn;
