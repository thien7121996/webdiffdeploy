import Loader from '@/components/admin/common/Loader';
import { FC } from 'react';
import { useAdminPageSnap } from './useAdminPageSnap.hooks';

type Props = {
  userId: string;
  orderNumber: number;
  pageSnapshotId: string;
  pageSnapshotUrl: string;
  pageSnapshotPath?: string;
};

export const SnapshotPage: FC<Props> = ({
  orderNumber,
  pageSnapshotId,
  pageSnapshotUrl,
  pageSnapshotPath,
}) => {
  const { deletePageSnap, isPending } = useAdminPageSnap();

  return (
    <div key={pageSnapshotId}>
      <div className='flex border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600'>
        <div className='w-1/24 p-4'>
          <input
            id='checkbox-table-1'
            type='checkbox'
            className='h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800'
          />
          <label htmlFor='checkbox-table-1' className='sr-only'>
            checkbox
          </label>
        </div>
        <div className='w-6/12 truncate whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'>
          #{orderNumber}: {pageSnapshotUrl}
        </div>
        <div className='w-2/12 px-6 py-4'>
          {pageSnapshotPath ? 'ScreenShot' : 'Not ScreenShot'}
        </div>
        <div className='w-3/12 px-6 py-4'>{pageSnapshotId}</div>
        <div className='flex w-1/12 justify-end px-6 py-4'>
          {isPending ? (
            <Loader width='5' height='5' />
          ) : (
            <svg
              onClick={() => deletePageSnap(pageSnapshotId)}
              className='h-[20px] w-[20px] cursor-pointer fill-[#2c2a2a] hover:opacity-60'
              viewBox='0 0 448 512'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z'></path>
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};
