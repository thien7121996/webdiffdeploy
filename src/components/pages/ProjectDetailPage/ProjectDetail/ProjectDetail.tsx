import { useParams } from 'next/navigation';
import { FC } from 'react';
import { Tabs } from './Tabs';
import { RunVisual } from './Tabs/TabContent/CommitsTabContent/RunVisual';
import { useCommits } from './Tabs/TabContent/CommitsTabContent/commits.hooks';
import { useProjectDetailSocket } from './useProjectDetailSocket.hooks';
type Props = {
  setNewPageModalOpen: () => void;
  infoProjectDetailName?: string;
};

export const ProjectDetail: FC<Props> = ({
  infoProjectDetailName,
  setNewPageModalOpen,
}) => {
  useProjectDetailSocket();
  const params = useParams();
  const projectId = params?.projectId as string;
  const { commits } = useCommits(projectId as string);

  return (
    <div>
      <div className='ga mb-5 grid grid-cols-3 gap-4'>
        <div className='col-span-2'>
          <h3 className='text-3xl font-medium'>
            Project : {infoProjectDetailName}
          </h3>
        </div>

        <div className='text-right'>
          <RunVisual />
          <button
            onClick={setNewPageModalOpen}
            className='ml-2 mr-2 rounded-full bg-emerald-400 px-4 py-2 text-base font-bold text-white hover:bg-blue-700'
          >
            Add page
          </button>
        </div>
      </div>
      <Tabs />
    </div>
  );
};

ProjectDetail.displayName = 'ProjectDetail';
