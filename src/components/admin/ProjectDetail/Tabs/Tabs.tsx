'use client';
import { activeTab } from '@/components/pages/ProjectDetailPage/ProjectDetail/Tabs';
import { TabButtons } from '@/components/pages/ProjectDetailPage/ProjectDetail/Tabs/TabButtons/TabButtons';
import { useAtom } from 'jotai';
import { TabContent } from './TabContent';

export const Tabs = () => {
  const [tabSelectedId, setTabSelectedId] = useAtom(activeTab);

  const handleClickTab = (id: number) => {
    setTabSelectedId(id);
  };

  return (
    <div>
      <TabButtons activeTabId={tabSelectedId} onClickTab={handleClickTab} />
      <TabContent tabSelectedId={tabSelectedId} />
    </div>
  );
};
