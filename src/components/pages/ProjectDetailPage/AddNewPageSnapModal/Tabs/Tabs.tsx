import { FC } from 'react';
import { TabButtons } from './TabButtons';
import { TabContent } from './TabContent';

type Props = { onClose: () => void };

export const Tabs: FC<Props> = ({ onClose }) => {
  return (
    <div>
      <TabButtons />
      <TabContent onClose={onClose} />
    </div>
  );
};
