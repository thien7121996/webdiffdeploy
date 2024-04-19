import {
  activeAddPageSnapTab,
  tabIdName,
} from '@/components/pages/ProjectDetailPage/AddNewPageSnapModal/Tabs/TabButtons';
import { useAtomValue } from 'jotai';
import { FC, useCallback } from 'react';
import { AddUrlByCsv } from './AddUrlByCsv';
import { AddUrlBySitemap } from './AddUrlBySitemap';
import { AddUrlByText } from './AddUrlByText';

type Props = { onClose: () => void };

export const TabContent: FC<Props> = ({ onClose }) => {
  const activeTab = useAtomValue(activeAddPageSnapTab);

  const handleRenderTabContent = useCallback(() => {
    if (!activeTab) {
      return null;
    }

    switch (activeTab.id) {
      case tabIdName.BY_TEXT:
        return <AddUrlByText onClose={onClose} />;

      case tabIdName.BY_CSV:
        return <AddUrlByCsv onClose={onClose} />;

      case tabIdName.BY_SITE_MAP:
        return <AddUrlBySitemap onClose={onClose} />;

      default:
        break;
    }
  }, [activeTab, onClose]);

  return <div className='my-10'>{handleRenderTabContent()}</div>;
};
