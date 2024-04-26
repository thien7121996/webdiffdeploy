import Loader from '@/components/admin/common/Loader';
import { useCommit } from '@/components/pages/ProjectDetailPage/ProjectDetail/Tabs/TabContent/CommitsTabContent/TableBody/useCommit.hooks';
import { useBooleanState } from '@/hooks/useBooleanState';
import { ApproveCommitPageSnapRequest } from '@/models/ApproveCommitPageSnap';
import { CommitType } from '@/models/GetCommitsType';
import { DisplayImageDiffType } from '@/models/pageSnapShot.model';
import { countTimeRun } from '@/utils/countTimeRun';
import dayjs from 'dayjs';
import { FC, memo, useEffect, useState } from 'react';
import { ItemCommit } from './ItemCommit';

type Props = {
  isAdmin: boolean;
  commit: CommitType;
  isLoading: boolean;
  onApprove: (payload: Omit<ApproveCommitPageSnapRequest, 'projectId'>) => void;
  toggleActiveModal?: () => void;
  setImageView?: React.Dispatch<React.SetStateAction<DisplayImageDiffType>>;
};

export const Commit: FC<Props> = memo(
  ({
    commit,
    isAdmin,
    isLoading,
    onApprove,
    toggleActiveModal,
    setImageView,
  }) => {
    const { boolean: isOpen, toggle } = useBooleanState(false);
    const pageSnapshots = commit.pageSnapshots;

    const [startTime, setStartTime] = useState<Date>();
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);

    const { handleDeleteCommit, cancelJobVisual } = useCommit();

    useEffect(() => {
      if (commit?.createdAt) {
        setStartTime(new Date(commit.createdAt));
      }
    }, [commit?.createdAt]);
    const handleCancelJobVisual = async (visualCheckId: string) => {
      try {
        await cancelJobVisual(visualCheckId);
      } catch (error) {
        // do nothing
      }
    };

    useEffect(() => {
      if (!startTime || !commit.screenshotingUrl) {
        return;
      }

      const timerInterval = setInterval(() => {
        const currentTime = new Date();
        const diffTime = currentTime.getTime() - startTime.getTime();
        setElapsedTime(diffTime);
      }, 1000);

      return () => {
        clearInterval(timerInterval);
      };
    }, [commit.screenshotingUrl, startTime]);

    const rowWidth = !isAdmin ? 'w-1/4' : 'w-1/4';

    return (
      <>
        <tr className='relative flex flex-wrap border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600'>
          <td
            colSpan={1}
            className={`align-center flex ${rowWidth} max-w-80 justify-center truncate whitespace-nowrap text-wrap break-normal px-6 py-4 text-center text-sm text-gray-900 dark:text-white`}
          >
            {commit.id}
          </td>
          <td
            colSpan={1}
            className={`${rowWidth} truncate whitespace-nowrap text-wrap break-normal px-6 py-4 text-left text-sm font-medium text-gray-900 dark:text-white`}
          >
            <p>
              <span
                style={{
                  width: '10px',
                  height: '10px',
                  background: '#50e3c2',
                  display: 'inline-block',
                  borderRadius: '50%',
                  marginRight: '5px',
                }}
              ></span>
              Success :{commit.success}
            </p>
            <p>
              <span
                style={{
                  width: '10px',
                  height: '10px',
                  background: 'red',
                  display: 'inline-block',
                  borderRadius: '50%',
                  marginRight: '5px',
                }}
              ></span>
              Fail : {commit.fail}
            </p>
            <p className='flex items-center justify-start gap-5 text-left align-middle text-sm font-bold'>
              {commit.screenshotingUrl && (
                <>
                  <span style={{ color: 'red' }}>
                    <span
                      style={{
                        width: '10px',
                        height: '10px',
                        background: '#baba0f',
                        display: 'inline-block',
                        borderRadius: '50%',
                        marginRight: '5px',
                      }}
                    ></span>
                    Runing : {countTimeRun(elapsedTime)}
                  </span>
                  <Loader height='6' width='6' />
                </>
              )}
            </p>
          </td>
          <td
            colSpan={1}
            className={`flex ${rowWidth} justify-center truncate whitespace-nowrap text-wrap break-normal px-6 py-4 text-center font-medium text-gray-900 dark:text-white`}
          >
            {commit?.createdAt &&
              dayjs(commit?.createdAt).format('DD/MM/YYYY HH:mm:ss')}
          </td>
          <td
            colSpan={1}
            className={`align-center flex  ${rowWidth} justify-center truncate whitespace-nowrap text-wrap break-normal px-2 py-4 text-center font-medium text-gray-900 dark:text-white`}
          >
            <button
              className='h-10 rounded-full bg-emerald-400 px-4 py-2 text-small font-bold text-white hover:bg-blue-700'
              onClick={toggle}
            >
              View Detail
            </button>
            {!commit.screenshotingUrl && (
              <button
                className='ml-5 rounded-full  bg-blue-400 px-2 py-2 text-small font-bold text-white hover:bg-blue-700'
                onClick={() => {
                  handleDeleteCommit(commit.id);
                  setIsProcessing(true);
                }}
              >
                {isProcessing ? (
                  <Loader height='6' width='6' />
                ) : (
                  <svg
                    className='h-[20px] w-[20px] fill-[#fff]'
                    viewBox='0 0 448 512'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z'></path>
                  </svg>
                )}
              </button>
            )}
            {commit.screenshotingUrl && (
              <button
                className='ml-5 flex h-10 w-10 items-center justify-center rounded-full bg-purple-400 align-middle text-small font-bold text-white hover:bg-blue-700'
                onClick={() => handleCancelJobVisual(commit.id)}
              >
                <svg
                  className='h-[20px] w-[20px] fill-[#fff]'
                  viewBox='0 0 512 512'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm192-96H320c17.7 0 32 14.3 32 32V320c0 17.7-14.3 32-32 32H192c-17.7 0-32-14.3-32-32V192c0-17.7 14.3-32 32-32z'></path>
                </svg>
              </button>
            )}
          </td>
          {pageSnapshots && isOpen && (
            <td className='flex basis-full'>
              <div className='w-full'>
                {pageSnapshots.map((pageSnapshot) => (
                  <ItemCommit
                    isAdmin={isAdmin}
                    commitId={commit.id}
                    key={pageSnapshot.id}
                    isLoading={isLoading}
                    onApprove={onApprove}
                    commitPageSnapshot={pageSnapshot}
                    urlShorting={commit.screenshotingUrl}
                    toggleActiveModal={toggleActiveModal}
                    setImageView={setImageView}
                  />
                ))}
              </div>
            </td>
          )}
        </tr>
      </>
    );
  }
);

Commit.displayName = 'Commit';
