import Breadcrumb from '@/components/admin/Breadcrumbs/Breadcrumb';
import { Projects } from '@/components/admin/Projects';
import { handleCheckRole } from '@/utils/checkRole';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function ProjectsPage() {
  const cookieList = cookies();
  const accessToken = cookieList.get('accessToken');

  if (!accessToken?.value) {
    redirect('/signin');
  } else {
    const isAdmin = await handleCheckRole(accessToken.value);
    if (!isAdmin) {
      redirect('/projects');
    }
  }

  return (
    <>
      <Breadcrumb pageName='Manage Projects' />
      <div className='flex flex-col gap-10'>
        <Projects />
      </div>
    </>
  );
}
