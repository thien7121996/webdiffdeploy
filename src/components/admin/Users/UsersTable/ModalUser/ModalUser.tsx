import Loader from '@/components/admin/common/Loader';
import { Modal } from '@/components/ui/Modal/Modal';
import { useBooleanState } from '@/hooks/useBooleanState';
import { useAdminUsers } from '@/hooks/usersAdmin.hook';
import { UserInfoAuth, UserUpdateReq } from '@/models/users.model';
import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
type Props = {
  userView: UserInfoAuth;
  activeModal: boolean;
  toggleActiveModal: () => void;
  setCloseModal: () => void;
};
export const ModalUserInfo: FC<Props> = ({
  userView,
  activeModal,
  toggleActiveModal,
  setCloseModal,
}) => {
  const [userInfo, setUserInfo] = useState<UserInfoAuth>(userView);

  useEffect(() => {
    setUserInfo(userView);
    //
  }, [userView]);

  const { isPendingUpdate, updateUser } = useAdminUsers();
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateUser = async () => {
    try {
      const dataUpdate: UserUpdateReq = {
        userId: userInfo.uid,
        email: userInfo.email,
        type: userInfo.type,
        rule: userInfo.rule,
        newPassword: userInfo.newPassword,
      };
      await updateUser(dataUpdate);
    } catch (error) {}
  };

  return (
    <div className='mb-8 flex h-full items-center justify-between text-right'>
      <Modal
        open={activeModal}
        onClose={setCloseModal}
        $isModalNotAlignCenter
        $isAllowClickOutsideToClose={true}
        widthModal='600px'
      >
        <div
          className='shadow-three mb-12 rounded-3xl bg-white px-8 py-11 shadow-2xl sm:p-[25px] lg:mb-0 lg:px-8 xl:p-[25px]'
          data-wow-delay='.15s
              '
        >
          <h2 className='mb-3 text-left text-2xl font-bold text-black sm:text-3xl lg:text-2xl xl:text-3xl'>
            View User
          </h2>
          <p className='mb-12 text-left text-base font-medium text-body-color'>
            Our support team will get back to you ASAP via email.
          </p>
          <div className='-mx-4 flex flex-wrap'>
            <div className='w-full px-4'>
              <div className='mb-4'>
                <label
                  htmlFor='name'
                  className='mb-3 block text-left text-sm font-medium text-dark'
                >
                  Email
                </label>
                <input
                  type='text'
                  disabled
                  name='email'
                  value={userInfo.email}
                  onChange={handleChange}
                  placeholder='Enter your project name'
                  className='border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary'
                />
              </div>
            </div>
            <div className='w-full px-4'>
              <div className='mb-4'>
                <label
                  htmlFor='name'
                  className='mb-3 block text-left text-sm font-medium text-dark'
                >
                  New password
                </label>
                <input
                  type='text'
                  name='newPassword'
                  onChange={handleChange}
                  placeholder='Enter your project name'
                  className='border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base outline-none focus:border-primary'
                />
              </div>
            </div>
            <div className='w-full px-4'>
              <div className='mb-4'>
                <label
                  htmlFor='name'
                  className='mb-3 block text-left text-sm font-medium text-dark'
                >
                  Rule
                </label>
                <select
                  className='block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none'
                  id='grid-state'
                  onChange={handleChange}
                  name='rule'
                  value={userInfo.rule}
                >
                  <option value={0} selected={userInfo.rule === 0}>
                    User Basic
                  </option>
                  <option value={1} selected={userInfo.rule === 1}>
                    User Admin
                  </option>
                </select>
              </div>
            </div>
            <div className='flex w-full justify-end gap-10 px-4'>
              {isPendingUpdate && <Loader />}
              <button
                onClick={handleUpdateUser}
                className='shadow-submit flex rounded-2xl bg-primary px-4  py-2 text-base font-medium text-white duration-300 hover:bg-primary/90'
              >
                Update User
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
