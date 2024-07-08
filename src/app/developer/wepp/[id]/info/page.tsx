import { WeppInfoForm, WeppInfoBreadcrumbs } from '@/sections/developer/wepp';
import React from 'react';

const Page = () => {
  return (
    <div className="container mx-auto py-8">
      <WeppInfoBreadcrumbs />
      <WeppInfoForm />
    </div>
  );
};

export default Page;
