'use client';
import Loader from '@/components/admin/common/Loader';
import { SCREENSHOT_STATUS_TYPE } from '@/types';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { FC, useCallback } from 'react';
import { PageSnapshot } from './PageSnapshot';
import { ScreenshotButton } from './ScreenshotButton';
import FailIcon from './assets/fail.svg';
import SuccessIcon from './assets/success.svg';
import { useTableCommit } from './useTableCommit';

export const TabBody: FC = () => {
  const params = useParams();
  const projectId = params?.projectId as string;

  const { pageSnapShots, isPending, deletePageSnap } = useTableCommit();

  const handleDeletePageSnapShot = useCallback(
    (pageSnapShotId?: string) => {
      deletePageSnap(pageSnapShotId);
    },
    [deletePageSnap]
  );

  const handlePageSnapStatus = useCallback(
    (pageSnapshotId: string, screenshotStatus?: SCREENSHOT_STATUS_TYPE) => {
      switch (screenshotStatus) {
        case SCREENSHOT_STATUS_TYPE.done:
          return (
            <Image
              src={SuccessIcon}
              width={32}
              height={32}
              alt='success-icon'
            />
          );

        case SCREENSHOT_STATUS_TYPE.fail:
          return (
            <Image src={FailIcon} width={32} height={32} alt='fail-icon' />
          );

        case SCREENSHOT_STATUS_TYPE.notScreenshot:
          return <ScreenshotButton pageSnapshotId={pageSnapshotId} />;

        default:
          return <Loader width={'6'} height={'6'} position='flex-start' />;
      }
    },
    []
  );

  return (
    <tbody>
      {pageSnapShots?.map((pageSnap, index) => (
        <PageSnapshot
          handleDeletePageSnapShot={handleDeletePageSnapShot}
          handlePageSnapStatus={handlePageSnapStatus}
          orderNumber={index + 1}
          isPending={isPending}
          projectId={projectId}
          pageSnap={pageSnap}
          key={pageSnap.id}
        />
      ))}
    </tbody>
  );
};

TabBody.displayName = 'TabBody';
