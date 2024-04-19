import { tabObject } from '@/components/pages/ProjectDetailPage/ProjectDetail/Tabs/TabButtons';
import { FC } from 'react';
import { Commits } from './Commits';
import { PageSnapshots } from './PageSnapshots';

type Props = {
  tabSelectedId: number;
};

const renderTab = (tabSelectedId: number) => {
  switch (tabSelectedId) {
    case tabObject.pageSnapshotsTabId:
      return <PageSnapshots />;

    case tabObject.commitsTabId:
      return <Commits />;

    default:
      return null;
  }
};

export const TabContent: FC<Props> = ({ tabSelectedId }) => {
  return renderTab(tabSelectedId);
};
