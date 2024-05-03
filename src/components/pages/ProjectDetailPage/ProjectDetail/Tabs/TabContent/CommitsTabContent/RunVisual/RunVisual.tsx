import Loader from '@/components/admin/common/Loader';
import { useParams } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { useVisualSnaps } from './runVisualSnaps.hooks';
type Props = {
  isLoadingCheck: boolean;
  setIsLoadingCheck: React.Dispatch<React.SetStateAction<boolean>>;
};
export const RunVisual: FC<Props> = ({ isLoadingCheck, setIsLoadingCheck }) => {
  const params = useParams();
  const projectId = params?.projectId as string;
  const [isRuning, setIsRuning] = useState<boolean>(false);
  const { createCommitDocs, isPending } = useVisualSnaps(projectId);

  const handleClickRun = async () => {
    try {
      setIsRuning(true);
      setIsLoadingCheck(true);
      await createCommitDocs();
    } catch (error) {
    } finally {
      setIsRuning(false);
      setIsLoadingCheck(false);
    }
  };

  useEffect(() => {
    if (isPending) {
      setIsRuning(false);
    }
  }, [isPending]);
  return (
    <button
      onClick={() => handleClickRun()}
      disabled={isPending}
      className='align-center flex gap-5 rounded-full bg-purple-400 px-4 py-2 text-small font-bold text-white hover:bg-blue-700'
    >
      {isLoadingCheck ? (
        <>
          {isRuning ? (
            <>
              {' '}
              <Loader width='5' height='5' /> <span>Creating Test....</span>
            </>
          ) : (
            <>
              {' '}
              <Loader width='5' height='5' /> <span>Running Test....</span>
            </>
          )}
        </>
      ) : (
        'Screenshot visual check'
      )}
    </button>
  );
};
