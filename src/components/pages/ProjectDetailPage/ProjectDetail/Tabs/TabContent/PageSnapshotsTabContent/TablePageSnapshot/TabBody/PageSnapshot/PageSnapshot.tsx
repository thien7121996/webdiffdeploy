import Loader from '@/components/admin/common/Loader';
import { PageSnapShotType } from '@/models/pageSnapShot.model';
import { SCREENSHOT_STATUS_TYPE } from '@/types';
import { FC } from 'react';

type Props = {
  handlePageSnapStatus: (
    pageSnapshotId: string,
    screenshotStatus?: SCREENSHOT_STATUS_TYPE
  ) => JSX.Element;
  handleDeletePageSnapShot: (pageSnapShotId?: string) => void;
  pageSnap: PageSnapShotType;
  orderNumber: number;
  projectId: string;
  isPending: boolean;
};

export const PageSnapshot: FC<Props> = ({
  handlePageSnapStatus,
  handleDeletePageSnapShot,
  orderNumber,
  projectId,
  pageSnap,
  isPending,
}) => {
  return (
    <tr className='border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600'>
      <td
        scope='row'
        className='max-w-80 truncate whitespace-nowrap text-wrap break-normal px-6 py-4 font-medium text-gray-900 dark:text-white'
      >
        #{orderNumber}: {pageSnap.url}
      </td>
      <td className='px-6 py-4'>
        {handlePageSnapStatus(pageSnap.id, pageSnap.screenshotStatus)}
      </td>
      <td className='flex gap-2 px-6 py-4'>
        <div className='relative right-0'>
          <div
            id='dropdownInformationButton'
            data-dropdown-toggle='dropdownInformation'
            className='group inline-flex items-center rounded-lg px-5 py-2.5 text-left text-sm text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-300'
          >
            <svg
              className='h-5 w-5'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='currentColor'
              viewBox='0 0 16 3'
            >
              <path d='M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z' />
            </svg>

            <div className='absolute right-0 top-8 z-10 hidden w-44 divide-y divide-gray-100 rounded-lg bg-white shadow group-hover:block dark:divide-gray-600 dark:bg-gray-700'>
              <div className='px-4 py-3 text-sm text-gray-900 dark:text-white'>
                <div>Action</div>
              </div>
              <ul
                className='py-2 text-sm text-gray-700 dark:text-gray-200'
                aria-labelledby='dropdownInformationButton'
              >
                <>
                  {!!projectId && (
                    <li>
                      <button
                        onClick={() => handleDeletePageSnapShot(pageSnap.id)}
                        className='block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                      >
                        {isPending && (
                          <span>
                            <Loader />
                          </span>
                        )}
                        Delete
                      </button>
                    </li>
                  )}
                </>
              </ul>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
};

PageSnapshot.displayName = 'PageSnapshot';
