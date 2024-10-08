// app/providers.tsx
'use client';

import { NextUIProvider } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

export default function ClientNextUIProvider({
  children,
}: React.PropsWithChildren) {
  const { push } = useRouter();

  return (
    <NextUIProvider className="size-full" navigate={push}>
      {children}
    </NextUIProvider>
  );
}
