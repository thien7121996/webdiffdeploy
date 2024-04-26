'use client';
import { useGetFetchQuery } from '@/hooks/useGetFetchQuery';
import { useParams } from 'next/navigation';
import { TableBody } from './TableBody';
import { TableHead } from './TableHead';
import { ModalPreviewImage } from './ModalPreviewImage';
import { useBooleanState } from '@/hooks/useBooleanState';
import { useState } from 'react';
import { DisplayImageDiffType } from '@/models/pageSnapShot.model';

export const CommitsTabContent = () => {
  const [imageView, setImageView] = useState<DisplayImageDiffType>({
    diff: '0%',
    match: '0%',
    imageUrl: '',
  });
  const params = useParams();
  const projectId = params?.projectId as string;

  const commits = useGetFetchQuery([projectId, 'commits']);
  const {
    boolean: activeModal,
    toggle: toggleActiveModal,
    setFalse: setCloseModal,
  } = useBooleanState(false);

  if (!commits) {
    return <div>Empty</div>;
  }

  return (
    <>
      <ModalPreviewImage
        activeModal={activeModal}
        toggleActiveModal={toggleActiveModal}
        setCloseModal={setCloseModal}
        imageView={imageView}
      />
      <table className='w-full'>
        <TableHead isAdmin={false} />
        <TableBody
          toggleActiveModal={toggleActiveModal}
          commits={commits}
          isAdmin={false}
          setImageView={setImageView}
        />
      </table>
    </>
  );
};
