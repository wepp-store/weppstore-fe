import { redirect } from 'next/navigation';

const Page = () => {
  redirect('/wepps');
  return null; // This won't be rendered since redirect happens before render
};

export default Page;
