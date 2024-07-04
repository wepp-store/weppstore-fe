import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.scss';
import {
  ClientNotistackProvider,
  ClientQueryClientProvider,
} from '@/_providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Wepp Store',
  description: 'A simple PWA app store',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientQueryClientProvider>
          <ClientNotistackProvider>{children}</ClientNotistackProvider>
        </ClientQueryClientProvider>
      </body>
    </html>
  );
}
