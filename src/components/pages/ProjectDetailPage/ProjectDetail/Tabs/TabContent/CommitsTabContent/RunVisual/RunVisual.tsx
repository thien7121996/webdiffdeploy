import Loader from '@/components/admin/common/Loader';
import { useProjectDetail } from '@/components/pages/ProjectDetailPage/projectDetail.hooks';
import { useParams } from 'next/navigation';
import { useVisualSnaps } from './runVisualSnaps.hooks';

export const RunVisual = () => {
  const params = useParams();
  const projectId = params?.projectId as string;

  const { createCommitDocs, isPending, startRun, setStartRun } =
    useVisualSnaps(projectId);

  const { project } = useProjectDetail(projectId);
  return (
    <button
      onClick={() => {
        createCommitDocs();
        setStartRun(true);
      }}
      disabled={project?.statusRun === 1}
      className='item-center inline-flex gap-5 rounded-full bg-purple-400 px-4 py-2 text-small font-bold text-white hover:bg-blue-700'
    >
      {project?.statusRun || startRun ? (
        <>
          <Loader width='5' height='5' />
          {startRun ? 'Creating Test...' : 'Running Test...'}
        </>
      ) : (
        'Screenshot visual check'
      )}
    </button>
  );
};
