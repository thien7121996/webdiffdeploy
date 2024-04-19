import { useBooleanState } from '@/hooks/useBooleanState';
import { FC } from 'react';
import { AddNewPageSnapModal } from './AddNewPageSnapModal';
import { ProjectDetail } from './ProjectDetail';
import { useProjectDetail } from './projectDetail.hooks';

type Props = {
  projectId: string;
};

export const ProjectDetailPage: FC<Props> = ({ projectId }) => {
  const {
    boolean: isNewPageModalActive,
    setFalse: setNewPageModalClose,
    setTrue: setNewPageModalOpen,
  } = useBooleanState(false);

  const { isError, isLoading, project } = useProjectDetail(projectId);

  return (
    <>
      {isError && <div>Error</div>}
      {isLoading && <div>Loading</div>}
      <AddNewPageSnapModal
        open={isNewPageModalActive}
        onClose={setNewPageModalClose}
      />
      {!!project && (
        <ProjectDetail
          infoProjectDetailName={project.name}
          setNewPageModalOpen={setNewPageModalOpen}
        />
      )}
    </>
  );
};
ProjectDetailPage.displayName = 'ProjectDetailPage';
