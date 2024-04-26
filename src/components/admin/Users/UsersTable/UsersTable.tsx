'use client';
import { SkeletonLoader } from '@/components/admin/common/SkeletonLoader';
import { UserInfoAuth } from '@/models/users.model';
import { FC, useEffect, useState } from 'react';
import { useAdminUsers } from '@/hooks/usersAdmin.hook';
import { UserRow } from './UserRow';
import { ModalUserInfo } from './ModalUser';
import { useBooleanState } from '@/hooks/useBooleanState';

export const UsersTable = () => {
  const { isLoading, users } = useAdminUsers();
  const {
    boolean: activeModal,
    toggle: toggleActiveModal,
    setFalse: setCloseModal,
  } = useBooleanState(false);

  const [userViewDetail, setUserViewDetail] = useState<UserInfoAuth>();

  if (isLoading) {
    return <SkeletonLoader />;
  }

  return (
    <>
      {userViewDetail && (
        <ModalUserInfo
          userView={userViewDetail}
          activeModal={activeModal}
          toggleActiveModal={toggleActiveModal}
          setCloseModal={setCloseModal}
        />
      )}
      <div className='border-stroke rounded-sm border bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1'>
        <div className='max-w-full'>
          <table className='w-full table-auto'>
            <thead>
              <tr className='bg-gray-2 text-left dark:bg-meta-4'>
                <th className='min-w-[200px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11'>
                  ID
                </th>
                <th className='min-w-[150px] px-4 py-4 font-medium text-black dark:text-white'>
                  Email
                </th>
                <th className='min-w-[120px] px-4 py-4 font-medium text-black dark:text-white'>
                  Rule
                </th>
                <th className='min-w-[120px] px-4 py-4 font-medium text-black dark:text-white'>
                  Created At
                </th>
                <th className='px-4 py-4 font-medium text-black dark:text-white'>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((userInfo: UserInfoAuth, index: number) => (
                <UserRow
                  key={index}
                  userInfo={userInfo}
                  setUserViewDetail={setUserViewDetail}
                  toggleActiveModal={toggleActiveModal}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

UsersTable.displayName = 'UsersTable';
