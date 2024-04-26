import Loader from '@/components/admin/common/Loader';
import { FC } from 'react';
import { useUpdateScreenshot } from './useUpdateScreenshot';

type Props = { pageSnapshotId: string };

export const ScreenshotButton: FC<Props> = ({ pageSnapshotId }) => {
  const { handleUpdateScreenshot, isScreenshotPending } = useUpdateScreenshot();

  return (
    <button
      onClick={() => handleUpdateScreenshot(pageSnapshotId)}
      className='flex gap-5 rounded-2xl bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
    >
      {isScreenshotPending && (
        <Loader borderColor='-white' width='5' height='5' />
      )}
      Screenshot
    </button>
  );
};
