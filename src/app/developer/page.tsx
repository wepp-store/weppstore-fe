import {
  DeveloperMainList,
  DeveloperMainHeader,
} from '@/sections/developer/main';
import React from 'react';

const DeveloperHome = () => {
  return (
    <>
      <h1>Developer Home</h1>

      <DeveloperMainHeader />
      <DeveloperMainList />
    </>
  );
};

export default DeveloperHome;
