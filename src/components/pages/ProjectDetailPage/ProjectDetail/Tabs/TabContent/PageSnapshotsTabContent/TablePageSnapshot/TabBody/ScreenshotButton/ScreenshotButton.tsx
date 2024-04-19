import Loader from '@/components/admin/common/Loader';
import { FC } from 'react';
import { useUpdateScreenshot } from './useUpdateScreenshot';

type Props = { pageSnapshotId: string };

export const ScreenshotButton: FC<Props> = ({ pageSnapshotId }) => {
  const { handleUpdateScreenshot, isScreenshotPending } = useUpdateScreenshot();

  return (
    <button
      onClick={() => handleUpdateScreenshot(pageSnapshotId)}
      className='rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
    >
      {isScreenshotPending && <Loader />}
      Screenshot
    </button>
  );
};
