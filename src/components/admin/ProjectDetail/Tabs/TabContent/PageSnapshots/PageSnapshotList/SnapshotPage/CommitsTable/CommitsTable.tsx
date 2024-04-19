import { FC } from 'react';

type Props = {
  projectId: string;
  userId: string;
};

export const CommitsTable: FC<Props> = ({ projectId, userId }) => {
  return (
    <div className='w-full border-b border-l-10 border-l-rose-600 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600'>
      <div className='flex w-full bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
        <div className='w-5/12 px-6 py-3'>Test ID</div>
        <div className='w-2/12 px-6 py-3'>Status</div>
        <div className='w-2/12 px-6 py-3'>Created at</div>
        <div className='w-2/12 px-6 py-3'>Action</div>
      </div>
      {[1, 2, 3, 4].map((arr) => (
        <div
          key={arr}
          className='flex border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600'
        >
          <div className='w-5/12 px-6 py-3'>Test ID</div>
          <div className='w-2/12 px-6 py-3'>Status</div>
          <div className='w-2/12 px-6 py-3'>Created at</div>
          <div className='w-2/12 px-6 py-3'>Action</div>
        </div>
      ))}
    </div>
  );
};
