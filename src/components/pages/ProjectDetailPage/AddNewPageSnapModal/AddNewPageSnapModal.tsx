import { Modal } from '@/components/ui/Modal';
import { SCREENSHOT_STATUS_TYPE } from '@/types';
import { FC } from 'react';
import { Tabs } from './Tabs';

type Props = {
  open: boolean;
  onClose: () => void;
};

export type InfoBaseUrl = {
  urlBase: string;
  isPagePrivate: boolean;
  screenshotStatus?: SCREENSHOT_STATUS_TYPE;
};

export const AddNewPageSnapModal: FC<Props> = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      $isModalNotAlignCenter
      $isAllowClickOutsideToClose
      widthModal={'600px'}
    >
      <div
        className='shadow-three mb-12 rounded-3xl bg-white px-8 py-11 shadow-2xl sm:p-[25px] lg:mb-0 lg:px-8 xl:p-[25px]'
        data-wow-delay='.15s'
      >
        <h2 className='mb-3 text-left text-2xl font-bold text-black sm:text-3xl lg:text-2xl xl:text-3xl'>
          Add new page url
        </h2>
        <Tabs onClose={onClose} />
      </div>
    </Modal>
  );
};

AddNewPageSnapModal.displayName = 'AddNewPageSnapModal';
