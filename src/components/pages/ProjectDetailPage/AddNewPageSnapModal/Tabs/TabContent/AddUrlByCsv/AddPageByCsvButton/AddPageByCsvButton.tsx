import Loader from '@/components/admin/common/Loader';
import { InfoBaseUrl } from '@/components/pages/ProjectDetailPage/AddNewPageSnapModal';
import {
  DisplayUrlType,
  uploadUrlList,
} from '@/components/pages/ProjectDetailPage/AddNewPageSnapModal/Tabs/TabContent/AddUrlByCsv';
import { SCREENSHOT_STATUS_TYPE } from '@/types';
import { useAtomValue } from 'jotai';
import { FC, useCallback } from 'react';
import { useAddMultiPages } from './useAddMultiPages';

type Props = { onClose: () => void };

export const AddPageByCsvButton: FC<Props> = ({ onClose }) => {
  const uploadUrls = useAtomValue(uploadUrlList);

  const handleUploadUrls = useCallback((uploadUrls: DisplayUrlType[]) => {
    const formatUrls: InfoBaseUrl[] = [];

    uploadUrls.forEach((urlItem) => {
      if (urlItem.approved) {
        formatUrls.push({
          urlBase: urlItem.url,
          isPagePrivate: false,
          screenshotStatus: SCREENSHOT_STATUS_TYPE.notScreenshot,
        });
      }
    });

    return formatUrls;
  }, []);

  const { addMultiPages, isAddMultiPagesPending } = useAddMultiPages(onClose);

  return (
    <button
      onClick={() => addMultiPages(handleUploadUrls(uploadUrls))}
      className='shadow-submit flex w-full items-center justify-center gap-x-6 rounded-2xl bg-emerald-400 p-5  py-2 text-base font-medium text-white duration-300 hover:bg-primary/90'
    >
      {isAddMultiPagesPending && <Loader />}
      Add new
    </button>
  );
};
