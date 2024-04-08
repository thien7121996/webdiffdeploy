import { useNotification } from '@/hooks/useNotification';
import { PageSnapShotType } from '@/models/pageSnapShot.model';
import { deletePageSnapShot } from '@/services/pageSnapShot';
import { FC, useEffect, useState } from 'react';

type Props = {
  dataPageSnapShot?: PageSnapShotType[];
  isLoading: boolean;
  handleJobProgressing: (id?: string) => void;
  idJobProgressing?: string;
  handleScreenShot: (
    projectId: string,
    url: string,
    id: string,
    isQueueRunning: boolean
  ) => void;
  progress: number;
  jobQueueProcess: any[];
  handleGetListHistoryCheck: (pageSnapShot: PageSnapShotType) => void;
  toggleActiveModal: () => void;
  infoProjectDetailId: string;
  handleGetDetailProject: () => Promise<void>;
};

export const TablePageSnapshot: FC<Props> = ({
  dataPageSnapShot,
  idJobProgressing,
  isLoading,
  handleJobProgressing,
  handleScreenShot,
  handleGetListHistoryCheck,
  progress,
  jobQueueProcess,
  toggleActiveModal,
  infoProjectDetailId,
  handleGetDetailProject,
}) => {
  const [listUrlScan, setListUrlScan] = useState<PageSnapShotType[]>();
  const { setNotification } = useNotification();
  useEffect(() => {
    setListUrlScan(dataPageSnapShot);
  }, [dataPageSnapShot]);

  const handleDeletePageSnapShot = async (
    projectId: string,
    pageSnapShotId: string
  ) => {
    try {
      await deletePageSnapShot(projectId, pageSnapShotId);
      await handleGetDetailProject();
      setNotification({
        type: 'success',
        message: 'Delete page snapshot successfully',
      });
    } catch (error) {}
  };

  return (
    <div className='relative shadow-md'>
      <table className='w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right'>
        <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope='col' className='p-4'>
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
            </th>
            <th scope='col' className='px-6 py-3'>
              URL
            </th>
            <th scope='col' className='px-6 py-3'>
              Status
            </th>
            <th scope='col' className='px-6 py-3'>
              ID
            </th>
            <th scope='col' className='px-6 py-3'>
              Progress
            </th>
            <th scope='col' className='px-6 py-3'>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {listUrlScan?.map((snapShotItem, index) => (
            <tr
              key={index}
              className='border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600'
            >
              <td className='w-4 p-4'>
                <div className='flex items-center'>
                  <input
                    id='checkbox-table-1'
                    type='checkbox'
                    className='h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800'
                  />
                  <label htmlFor='checkbox-table-1' className='sr-only'>
                    checkbox
                  </label>
                </div>
              </td>
              <th
                scope='row'
                className='max-w-80 truncate whitespace-nowrap text-wrap break-normal px-6 py-4 font-medium text-gray-900 dark:text-white'
              >
                URL PAGE #{index + 1}: {snapShotItem.url}
              </th>
              <td className='px-6 py-4'>
                {snapShotItem.path ? 'ScreenShot' : 'Not ScreenShot'}
              </td>
              <td className='px-6 py-4'>{snapShotItem.id}</td>
              <td className='px-6 py-4'>
                {isLoading && idJobProgressing == snapShotItem.id && (
                  <p className='text-xs leading-5 text-gray-500'>
                    {progress}% Loading...
                  </p>
                )}
              </td>
              <td className='flex gap-2 px-6 py-4'>
                <div className='relative right-0'>
                  <button
                    id='dropdownInformationButton'
                    data-dropdown-toggle='dropdownInformation'
                    className='group inline-flex items-center rounded-lg px-5 py-2.5 text-left text-sm text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-300'
                    type='button'
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
                        {!isLoading && jobQueueProcess.length == 0 && (
                          <>
                            <li>
                              <button
                                onClick={() => {
                                  toggleActiveModal();
                                  handleGetListHistoryCheck(snapShotItem ?? []);
                                }}
                                className='block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                              >
                                History Check
                              </button>
                            </li>

                            {infoProjectDetailId && snapShotItem && (
                              <li>
                                <button
                                  onClick={() => {
                                    handleScreenShot(
                                      infoProjectDetailId,
                                      snapShotItem.url || '',
                                      snapShotItem.id || '',
                                      false
                                    );
                                    handleJobProgressing(snapShotItem.id);
                                  }}
                                  className='block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                                >
                                  ScreenShot
                                </button>
                              </li>
                            )}
                            <li>
                              <button
                                onClick={() =>
                                  handleDeletePageSnapShot(
                                    infoProjectDetailId,
                                    snapShotItem.id || ''
                                  )
                                }
                                className='block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                              >
                                Delete
                              </button>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  </button>
                </div>

                {isLoading && idJobProgressing == snapShotItem.id && (
                  <div role='status'>
                    <svg
                      aria-hidden='true'
                      className='h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600'
                      viewBox='0 0 100 101'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                        fill='currentColor'
                      />
                      <path
                        d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                        fill='currentFill'
                      />
                    </svg>
                    <span className='sr-only'>{progress}% Loading...</span>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

TablePageSnapshot.displayName = 'TablePageSnapshot';
