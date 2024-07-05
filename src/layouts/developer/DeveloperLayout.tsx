'use client';
import { DeveloperGuard } from '@/_auth';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

const DeveloperLayout: React.FC<Props> = ({ children }) => {
  return <DeveloperGuard>{children}</DeveloperGuard>;
};

export default DeveloperLayout;
