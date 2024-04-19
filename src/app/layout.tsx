import DefaultLayout from '@/components/admin/Layouts/DefaultLayout';
import '@/styles/globals.css';
import { ReactNode } from 'react';
import Providers from './providers';

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>
        <Providers>
          <DefaultLayout>{children}</DefaultLayout>
        </Providers>
      </body>
    </html>
  );
}
