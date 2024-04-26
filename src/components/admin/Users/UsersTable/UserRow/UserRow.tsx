import { UserInfoAuth } from '@/models/users.model';
import dayjs from 'dayjs';
import { FC, useCallback, useRef, useState } from 'react';
import { useAdminUsers } from '@/hooks/usersAdmin.hook';
import { useClickOutside } from '@/utils/clickOutside';
import Loader from '@/components/admin/common/Loader';
type Props = {
  userInfo: UserInfoAuth;
  setUserViewDetail?: React.Dispatch<
    React.SetStateAction<UserInfoAuth | undefined>
  >;
  toggleActiveModal: () => void;
};
export const UserRow: FC<Props> = ({
  userInfo,
  setUserViewDetail,
  toggleActiveModal,
}) => {
  const { isPendingDelete, deleteUser } = useAdminUsers();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [activeDropdown, setActiveDropdown] = useState(false);

  const closeDropdown = useCallback(() => {
    setActiveDropdown(false);
  }, []);

  const openDropdown = useCallback(() => {
    setActiveDropdown(true);
  }, []);
  useClickOutside(dropdownRef, closeDropdown);

  const handleViewUserInfo = () => {
    toggleActiveModal();
    setUserViewDetail && setUserViewDetail(userInfo);
  };
  return (
    <tr>
      <td className='border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11'>
        <p className='text-sm'>{userInfo.uid}</p>
      </td>
      <td className='border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11'>
        <p className='text-sm'>{userInfo.email}</p>
      </td>
      <td className='border-b border-[#eee] px-4 py-5 dark:border-strokedark'>
        {userInfo.rule}
      </td>
      <td className='border-b border-[#eee] px-4 py-5 dark:border-strokedark'>
        {userInfo.metadata &&
          dayjs(userInfo.metadata.creationTime).format('DD/MM/YYYY H:m:s')}
      </td>
      <td className='relative flex gap-3 px-4 py-5'>
        <div className='absolute right-0'>
          <button
            id='dropdownInformationButton'
            data-dropdown-toggle='dropdownInformation'
            className='inline-flex items-center rounded-lg px-5 py-2.5 text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-300'
            type='button'
            onClick={openDropdown}
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
          </button>
          {activeDropdown && (
            <div
              ref={dropdownRef}
              className='absolute right-0 top-8 z-10 w-44 divide-y divide-gray-100 rounded-lg bg-white shadow dark:divide-gray-600 dark:bg-gray-700'
            >
              <div className='px-4 py-3 text-sm text-gray-900 dark:text-white'>
                <div>Users action</div>
              </div>
              <ul
                className='py-2 text-sm text-gray-700 dark:text-gray-200'
                aria-labelledby='dropdownInformationButton'
              >
                <li>
                  <button
                    onClick={() => {
                      closeDropdown;
                      handleViewUserInfo();
                    }}
                    className='flex w-full justify-start px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                  >
                    Edit
                  </button>
                </li>
              </ul>
              <div className='py-2'>
                <button
                  onClick={() => deleteUser(userInfo.uid)}
                  className='flex w-full justify-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white'
                >
                  Delete {isPendingDelete && <Loader />}
                </button>
              </div>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};
UserRow.displayName = 'UserRow';
