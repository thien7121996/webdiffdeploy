import { FC } from 'react';

type Props = {
  isAdmin: boolean;
};

export const TableHead: FC<Props> = ({ isAdmin }) => {
  const rowWidth = !isAdmin ? 'w-1/4' : 'w-1/4';

  return (
    <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
      <tr className='flex'>
        <th className={`${rowWidth} px-5 py-3 text-center`}>ID</th>
        <th className={`${rowWidth} px-5 py-3 text-center`}>Status</th>
        <th className={`${rowWidth} px-5 py-3 text-center`}>Created At</th>
        <th className={`${rowWidth} px-5 py-3 text-center`}>Action</th>
      </tr>
    </thead>
  );
};
