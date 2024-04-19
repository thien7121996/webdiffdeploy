import Loader from '@/components/admin/common/Loader';
import { InfoBaseUrl } from '@/components/pages/ProjectDetailPage/AddNewPageSnapModal';
import { useAddMultiPages } from '@/components/pages/ProjectDetailPage/AddNewPageSnapModal/Tabs/TabContent/AddUrlByCsv/AddPageByCsvButton/useAddMultiPages';
import { useAddPageSnapshot } from '@/components/pages/ProjectDetailPage/AddNewPageSnapModal/useAddPageSnapshot.hooks';
import { SCREENSHOT_STATUS_TYPE } from '@/types';
import axios from 'axios';
import { FC, useState } from 'react';

type Props = { onClose: () => void };

export const AddUrlBySitemap: FC<Props> = ({ onClose }) => {
  const [listUrl, setListUrl] = useState<InfoBaseUrl[]>([]);
  const [urlSiteMap, setUrlSiteMap] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { mutate, isPending } = useAddPageSnapshot(onClose);

  const { addMultiPages, isAddMultiPagesPending } = useAddMultiPages(onClose);

  const handleGetURLFromSiteMap = async () => {
    const listUrls: InfoBaseUrl[] = [];
    try {
      const response = await axios.get(urlSiteMap);
      const sitemapText = response.data;
      const linkRegex = /<loc>(.*?)<\/loc>/g;
      const extractedLinks = [];
      let match;
      while ((match = linkRegex.exec(sitemapText)) !== null) {
        const sitemapUrl = match[1];
        if (sitemapUrl.endsWith('.xml')) {
          const sitemapResponse = await axios.get(sitemapUrl);
          const subSitemapText = sitemapResponse.data;
          const subLinkRegex = /<loc>(.*?)<\/loc>/g;
          let subMatch;
          while ((subMatch = subLinkRegex.exec(subSitemapText)) !== null) {
            listUrls.push({
              urlBase: subMatch[1],
              isPagePrivate: false,
              screenshotStatus: SCREENSHOT_STATUS_TYPE.notScreenshot,
            });
          }
        } else {
          listUrls.push({
            urlBase: sitemapUrl,
            isPagePrivate: false,
            screenshotStatus: SCREENSHOT_STATUS_TYPE.notScreenshot,
          });
        }
      }
      return listUrls;
    } catch (error) {
      return [];
    }
  };

  const handleAddPageSnapshot = async () => {
    setIsLoading(true);
    try {
      const urlList = await handleGetURLFromSiteMap();
      if (!urlList) {
        return;
      }
      addMultiPages(urlList);
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className='mb-10 w-full px-4'>
        <input
          onChange={(e) => setUrlSiteMap(e.target.value)}
          type='text'
          name='urlSiteMap'
          placeholder='exp: https://example.com'
          className='border-stroke dark:shadow-two w-full rounded-md border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:text-body-color-dark dark:focus:border-primary dark:focus:shadow-none'
        />
      </div>
      <div className='w-full px-4'>
        <button
          onClick={handleAddPageSnapshot}
          className='shadow-submit flex w-full items-center justify-center gap-x-6 rounded-2xl bg-emerald-400 p-5  py-2 text-base font-medium text-white duration-300 hover:bg-primary/90'
        >
          {isLoading && <Loader />}
          Add new
        </button>
      </div>
    </div>
  );
};
