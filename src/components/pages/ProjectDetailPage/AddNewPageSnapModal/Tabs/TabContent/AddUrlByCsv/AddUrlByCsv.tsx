import { atom } from 'jotai';
import { FC } from 'react';
import { AddPageByCsvButton } from './AddPageByCsvButton';
import { ParseUrlList } from './ParseUrlList';
import { UploadInput } from './UploadInput';

type Props = { onClose: () => void };

export type DisplayUrlType = { id: number; url: string; approved: boolean };

export const uploadUrlList = atom<DisplayUrlType[]>([]);

export const AddUrlByCsv: FC<Props> = ({ onClose }) => {
  return (
    <div>
      <UploadInput />
      <ParseUrlList />
      <AddPageByCsvButton onClose={onClose} />
    </div>
  );
};
