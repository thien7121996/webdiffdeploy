import { FC } from 'react';

type Props = {
  userId: string;
  projectId: string;
  orderNumber: number;
  pageSnapshotId: string;
  pageSnapshotUrl: string;
  pageSnapshotPath?: string;
};

export const SnapshotPage: FC<Props> = ({
  projectId,
  orderNumber,
  pageSnapshotId,
  pageSnapshotUrl,
  pageSnapshotPath,
}) => {
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
        <div className='w-2/12 px-6 py-4'>{pageSnapshotId}</div>
      </div>
      {/* <CommitsTable projectId={projectId} userId={''} /> */}
    </div>
  );
};
