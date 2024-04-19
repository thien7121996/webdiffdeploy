import Loader from '@/components/admin/common/Loader';
import { InfoBaseUrl } from '@/components/pages/ProjectDetailPage/AddNewPageSnapModal/AddNewPageSnapModal';
import { useAddPageSnapshot } from '@/components/pages/ProjectDetailPage/AddNewPageSnapModal/useAddPageSnapshot.hooks';
import { SCREENSHOT_STATUS_TYPE } from '@/types';
import { FC, useState } from 'react';
import { InputBaseUrl } from './InputBaseUrl';

type Props = { onClose: () => void };

const infoDefault: InfoBaseUrl = {
  urlBase: '',
  isPagePrivate: false,
  screenshotStatus: SCREENSHOT_STATUS_TYPE.doing,
};

export const AddUrlByText: FC<Props> = ({ onClose }) => {
  const [newUrl, setNewUrl] = useState<InfoBaseUrl>(infoDefault);

  const { mutate, isPending } = useAddPageSnapshot(onClose);

  const handleAddPageSnapshot = async () => {
    mutate(newUrl);
  };

  const handleGetTextUrl = (url: InfoBaseUrl) => {
    setNewUrl(url);
  };

  return (
    <div>
      <div className='w-full'>
        <InputBaseUrl onGetTextUrl={handleGetTextUrl} />
      </div>
      <div className='w-full px-4'>
        <button
          onClick={handleAddPageSnapshot}
          className='shadow-submit flex w-full items-center justify-center gap-x-6 rounded-2xl bg-emerald-400 p-5  py-2 text-base font-medium text-white duration-300 hover:bg-primary/90'
        >
          {isPending && <Loader />}
          Add new
        </button>
      </div>
    </div>
  );
};
