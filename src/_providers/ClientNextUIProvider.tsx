// app/providers.tsx
'use client';

import { NextUIProvider } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

export default function ClientNextUIProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { push } = useRouter();

  return (
    <NextUIProvider className="flex flex-col min-h-screen" navigate={push}>
      {children}
    </NextUIProvider>
  );
}
