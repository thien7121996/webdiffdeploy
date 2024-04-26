'use client';
import { SkeletonLoader } from '@/components/admin/common/SkeletonLoader';
import { FC } from 'react';
import { ProjectArticle } from './ProjectArticle';
import { useAdminProjects } from './projects.hooks';

type Props = {};

export const ProjectsTable: FC<Props> = ({}) => {
  const { isLoading, projects } = useAdminProjects();

  if (isLoading) {
    return <SkeletonLoader />;
  }

  return (
    <div className='border-stroke rounded-sm border bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1'>
      <div className='max-w-full'>
        <table className='w-full table-auto'>
          <thead>
            <tr className='bg-gray-2 text-left dark:bg-meta-4'>
              <th className='min-w-[200px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11'>
                ID
              </th>
              <th className='min-w-[200px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11'>
                Name
              </th>
              <th className='min-w-[150px] px-4 py-4 font-medium text-black dark:text-white'>
                Created at
              </th>
              <th className='min-w-[120px] px-4 py-4 font-medium text-black dark:text-white'>
                Updated At
              </th>
              <th className='px-4 py-4 font-medium text-black dark:text-white'>
                UserId
              </th>
              <th className='px-4 py-4 font-medium text-black dark:text-white'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {projects?.map((project) => (
              <ProjectArticle key={project.id} project={project} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
