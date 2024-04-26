import Loader from '@/components/admin/common/Loader';
import { useParams } from 'next/navigation';
import { useVisualSnaps } from './runVisualSnaps.hooks';

export const RunVisual = () => {
  const params = useParams();
  const projectId = params?.projectId as string;

  const { createCommitDocs, isPending } = useVisualSnaps(projectId);

  return (
    <button
      onClick={() => createCommitDocs()}
      disabled={isPending}
      className='gap-5 rounded-full bg-purple-400 px-4 py-2 text-small font-bold text-white hover:bg-blue-700'
    >
      {false && <Loader width='5' height='5' />}
      Screenshot visual check
    </button>
  );
};
