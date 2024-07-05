import { WeppInfoForm, WeppInfoHeader } from '@/sections/developer/wepp';
import React from 'react';

const Page = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <WeppInfoHeader />
      <WeppInfoForm />
    </div>
  );
};

export default Page;
