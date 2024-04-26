import { Modal } from '@/components/ui/Modal/Modal';
import { useBooleanState } from '@/hooks/useBooleanState';
import { ChangeEvent, FC, useCallback, useState } from 'react';
import { useAddProject } from './useAddProject';

type InfoBaseUrl = {
  index: number;
  urlBase: string;
  isPagePrivate: boolean;
};

export type InfoProject = {
  userId: string;
  name: string;
  urlLogin: string;
  userNameLogin: string;
  passwordLogin: string;
  userNameBasicAuth: string;
  passwordBasicAuth: string;
};

export const BlockProjectAdd: FC = () => {
  const [projectName, setProjectName] = useState<string>('');

  const {
    boolean: activeModal,
    toggle: toggleActiveModal,
    setFalse: setCloseModal,
  } = useBooleanState(false);

  const { addAProject, isDeletePending } = useAddProject(setCloseModal);

  const handleProjectName = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setProjectName(value);
    },
    []
  );

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
            Add New Project
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
                  Project name
                </label>
                <input
                  type='text'
                  onChange={handleProjectName}
                  placeholder='Enter your project name'
                  className='border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary'
                />
              </div>
            </div>

            <div className='flex w-full justify-end gap-10 px-4'>
              <button
                onClick={() => addAProject(projectName)}
                className='shadow-submit rounded-2xl bg-primary px-4  py-2 text-base font-medium text-white duration-300 hover:bg-primary/90'
              >
                Create Project
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <button
        onClick={toggleActiveModal}
        className='inline-flex items-center rounded-2xl bg-primary px-4 py-2 font-bold text-white hover:bg-gray-400'
      >
        <span>New Project</span>
      </button>
    </div>
  );
};
