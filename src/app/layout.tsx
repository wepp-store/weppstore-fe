import {
  ClientNextUIProvider,
  ClientNotistackProvider,
  ClientQueryClientProvider,
} from '@/shared/providers';
import '@/shared/styles/globals.scss';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

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
        <ClientNextUIProvider>
          <ClientQueryClientProvider>
            <ClientNotistackProvider>
              {children}
              <div id="drawer-root"></div>
              <div id="modal-root"></div>
            </ClientNotistackProvider>
          </ClientQueryClientProvider>
        </ClientNextUIProvider>
      </body>
    </html>
  );
}
