import { handleCheckRole } from '@/utils/checkRole';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Home() {
  const cookieList = cookies();
  const accessToken = cookieList.get('accessToken');

  if (!accessToken?.value) {
    redirect('/signin');
  } else {
    const isAdmin = await handleCheckRole(accessToken.value);
    if (!isAdmin) {
      redirect('/projects');
    }

    redirect('admin/projects');
  }
}
