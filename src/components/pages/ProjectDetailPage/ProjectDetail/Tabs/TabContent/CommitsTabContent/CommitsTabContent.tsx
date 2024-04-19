'use client';
import { useGetFetchQuery } from '@/hooks/useGetFetchQuery';
import { useParams } from 'next/navigation';
import { TableBody } from './TableBody';
import { TableHead } from './TableHead';

export const CommitsTabContent = () => {
  const params = useParams();
  const projectId = params?.projectId as string;

  const commits = useGetFetchQuery([projectId, 'commits']);

  if (!commits) {
    return <div>Empty</div>;
  }

  return (
    <>
      <table className='w-full'>
        <TableHead isAdmin={false} />
        <TableBody commits={commits} isAdmin={false} />
      </table>
    </>
  );
};
