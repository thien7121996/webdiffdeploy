import { uploadUrlList } from '@/components/pages/ProjectDetailPage/AddNewPageSnapModal/Tabs/TabContent/AddUrlByCsv';
import { useAtom } from 'jotai';
import { keyBy } from 'lodash';
import { useCallback } from 'react';
import { Url } from './Url';

export const ParseUrlList = () => {
  const [uploadUrls, setUploadUrls] = useAtom(uploadUrlList);

  const handleChangeApproved = useCallback(
    (urlId: number) => {
      setUploadUrls((prev) => {
        const newUrls = [...prev];
        const newUrlsObject = keyBy(newUrls, 'id');
        newUrlsObject[urlId].approved = !newUrlsObject[urlId].approved;
        return Object.values(newUrlsObject);
      });
    },
    [setUploadUrls]
  );

  return (
    <ul className='list-decimal px-5 py-7'>
      {uploadUrls.map((urlItem) => (
        <Url
          key={urlItem.id}
          urlItem={urlItem}
          onChangeApproved={() => handleChangeApproved(urlItem.id)}
        />
      ))}
    </ul>
  );
};
