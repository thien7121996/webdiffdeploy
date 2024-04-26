import Loader from '@/components/admin/common/Loader';
import { ProjectType } from '@/models/GetProjectType';
import dayjs from 'dayjs';
import Link from 'next/link';
import { FC } from 'react';
import { useProjectArticle } from './projectArticle.hooks';

type Props = { project: ProjectType };

export const ProjectArticle: FC<Props> = ({ project }) => {
  const { onDeleteProject, isDeleteProjectPending } = useProjectArticle();

  return (
    <tr>
      <td className='border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11'>
        <p className='text-sm'>{project.id}</p>
      </td>
      <td className='border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11'>
        <p className='text-sm'>{project.name}</p>
      </td>
      <td className='border-b border-[#eee] px-4 py-5 dark:border-strokedark'>
        {project.createdAt && (
          <p className='text-black dark:text-white'>
            {dayjs(project.createdAt).format(
              '<span>DD/MM/YYYY</span><span>H:m:s</span>'
            )}
          </p>
        )}
      </td>
      <td className='border-b border-[#eee] px-4 py-5 dark:border-strokedark'>
        {project.updatedAt &&
          dayjs(project.updatedAt).format(
            '<span>DD/MM/YYYY</span><span>H:m:s</span>'
          )}
      </td>
      <td className='border-b border-[#eee] px-4 py-5 dark:border-strokedark'>
        {project.userId}
      </td>
      <td className='flex gap-3 border-b border-[#eee] px-4 py-5 dark:border-strokedark'>
        <div className='flex items-center justify-center space-x-3.5'>
          <Link
            href={`/admin/projects/${project.id}`}
            className='hover:text-primary'
          >
            <svg
              className='fill-current'
              width='18'
              height='18'
              viewBox='0 0 18 18'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z'
                fill=''
              />
              <path
                d='M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z'
                fill=''
              />
            </svg>
          </Link>
        </div>
        <div>
          {isDeleteProjectPending ? (
            <Loader width='5' height='5' />
          ) : (
            <svg
              onClick={() => onDeleteProject(project.id)}
              className='h-[20px] w-[20px] cursor-pointer fill-[#2c2a2a] hover:opacity-60'
              viewBox='0 0 448 512'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z'></path>
            </svg>
          )}
        </div>
      </td>
    </tr>
  );
};
