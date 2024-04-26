import Breadcrumb from '@/components/admin/Breadcrumbs/Breadcrumb';
import { Users } from '@/components/admin/Users';
import { handleCheckRole } from '@/utils/checkRole';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function UsersPage() {
  const cookieList = cookies();
  const accessToken = cookieList.get('accessToken');

  if (!accessToken?.value) {
    redirect('/signin');
  } else {
    const isAdmin = await handleCheckRole(accessToken.value);
    if (!isAdmin) {
      redirect('/users');
    }
  }

  return (
    <>
      <Breadcrumb pageName='Manage Users' />
      <div className='flex flex-col gap-10'>
        <Users />
      </div>
    </>
  );
}
