import Breadcrumb from '@/components/admin/Breadcrumbs/Breadcrumb';
import TableOne from '@/components/admin/Tables/TableOne';
import TableThree from '@/components/admin/Tables/TableThree';
import TableTwo from '@/components/admin/Tables/TableTwo';

import DefaultLayout from '@/components/admin/Layouts/DefaultLayout';
import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Next.js Tables | TailAdmin - Next.js Dashboard Template',
  description:
    'This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template',
};

const UsersAdminPage = () => {
  return (
    <>
      <Breadcrumb pageName='Tables' />
      <div className='flex flex-col gap-10'>
        <TableOne />
        <TableTwo />
        <TableThree />
      </div>
    </>
  );
};

export default UsersAdminPage;

UsersAdminPage.getLayout = (children: ReactNode) => (
  <DefaultLayout>{children}</DefaultLayout>
);
