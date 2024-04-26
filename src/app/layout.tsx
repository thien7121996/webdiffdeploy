import DefaultLayout from '@/components/admin/Layouts/DefaultLayout';
import '@/styles/globals.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode } from 'react';
import Providers from './providers';

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>
        <Providers>
          <ReactQueryDevtools initialIsOpen={false} />
          <DefaultLayout>{children}</DefaultLayout>
        </Providers>
      </body>
    </html>
  );
}
