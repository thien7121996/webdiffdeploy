'use client';
import { SkeletonLoader } from '@/components/admin/common/SkeletonLoader';
import { TableBody } from '@/components/pages/ProjectDetailPage/ProjectDetail/Tabs/TabContent/CommitsTabContent/TableBody';
import { TableHead } from '@/components/pages/ProjectDetailPage/ProjectDetail/Tabs/TabContent/CommitsTabContent/TableHead';
import { useCommits } from '@/components/pages/ProjectDetailPage/ProjectDetail/Tabs/TabContent/CommitsTabContent/commits.hooks';
import { useParams, usePathname } from 'next/navigation';

export const Commits = () => {
  const params = useParams();
  const projectId = params?.projectId as string;
  const pathname = usePathname();
  const isAdmin = !!pathname?.includes('/admin');

  const { commits, isError, isLoading } = useCommits(projectId);

  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (isError) {
    return <>Error</>;
  }

  if (!commits) {
    return <>Empty</>;
  }

  return (
    <table className='w-full'>
      <TableHead isAdmin={isAdmin} />
      <TableBody commits={commits} isAdmin={isAdmin} />
    </table>
  );
};
