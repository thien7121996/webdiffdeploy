import { FC, useEffect, useState } from 'react';
import { TabButtons } from './TabButtons';
import { tabObject } from './TabButtons/TabButtons';
import { TabContent } from './TabContent';

type Props = {
  isTabVisualCheck: boolean;
  countUrlList?: number;
};

export const Tabs: FC<Props> = ({ isTabVisualCheck, countUrlList }) => {
  const [tabSelectedId, setTabSelectedId] = useState(
    tabObject.pageSnapshotsTabId
  );

  const handleClickTab = (id: number) => {
    setTabSelectedId(id);
  };

  useEffect(() => {
    if (isTabVisualCheck) {
      setTabSelectedId(tabObject.commitsTabId);
    }
  }, [isTabVisualCheck]);

  return (
    <div>
      <TabButtons
        activeTabId={tabSelectedId}
        onClickTab={handleClickTab}
        countUrlList={countUrlList}
      />
      <TabContent tabSelectedId={tabSelectedId} />
    </div>
  );
};

Tabs.displayName = 'Tabs';
