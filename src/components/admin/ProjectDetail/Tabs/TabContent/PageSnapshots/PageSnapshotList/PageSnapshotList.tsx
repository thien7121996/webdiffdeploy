import { PageSnapShotType } from '@/models/pageSnapShot.model';
import { FC } from 'react';
import { SnapshotPage } from './SnapshotPage';

type Props = {
  userId: string;
  projectId: string;
  pageSnapshots: Omit<PageSnapShotType, 'pageVisualSnapShot'>[];
};

export const PageSnapshotList: FC<Props> = ({
  pageSnapshots,
  projectId,
  userId,
}) => {
  return (
    <div className='relative overflow-hidden shadow-md sm:rounded-lg'>
      <div className='w-full table-auto text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right'>
        <div className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
          <div className='flex'>
            <div className='w-1/24 p-4'>
              <div className='flex items-center'>
                <input
                  id='checkbox-all'
                  type='checkbox'
                  className='h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800'
                />
                <label htmlFor='checkbox-all' className='sr-only'>
                  checkbox
                </label>
              </div>
            </div>
            <div className='w-6/12 px-6 py-3'>URL</div>
            <div className='w-2/12 px-6 py-3'>Status</div>
            <div className='w-2/12 px-6 py-3'>ID</div>
          </div>
        </div>
        <div>
          {pageSnapshots.map((pageSnapshot, index) => (
            <SnapshotPage
              userId={userId}
              projectId={projectId}
              key={pageSnapshot.id}
              orderNumber={index + 1}
              pageSnapshotId={pageSnapshot.id}
              pageSnapshotUrl={pageSnapshot.url}
              pageSnapshotPath={pageSnapshot.path}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
