import { TabType } from '@/components/pages/ProjectDetailPage/AddNewPageSnapModal/Tabs/TabButtons/TabButtons';
import Image from 'next/image';
import { FC, useRef } from 'react';
import { ImageWrapper } from './styles';

type Props = { tab: TabType; isActive: boolean; onClick: () => void };

export const TabButton: FC<Props> = ({ tab, isActive, onClick }) => {
  const imageRef = useRef<HTMLImageElement>(null);

  return (
    <li
      className={`group me-2 inline-flex items-center justify-center gap-2 rounded-t-lg border-b-2 border-transparent p-4  ${isActive ? `active group rounded-t-lg border-b-2 border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500` : `cursor-pointer hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300`}`}
      onClick={onClick}
    >
      <ImageWrapper $isActive={isActive}>
        <Image
          width={15}
          height={15}
          ref={imageRef}
          src={tab.icon}
          alt='tab-icon'
        />
      </ImageWrapper>
      {tab.name}
    </li>
  );
};
