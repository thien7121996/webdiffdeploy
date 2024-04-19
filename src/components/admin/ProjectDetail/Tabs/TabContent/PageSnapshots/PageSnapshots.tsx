import { SkeletonLoader } from '@/components/admin/common/SkeletonLoader';
import { PageSnapshotList } from './PageSnapshotList';
import { useProjectDetail } from './projectDetail.hooks';

export const PageSnapshots = () => {
  const { isLoading, isError, project } = useProjectDetail();

  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (isError) {
    return <>Some error occurred</>;
  }

  if (!project) {
    return <>Not found</>;
  }

  return (
    <div>
      <PageSnapshotList
        projectId={project.id}
        userId={project.userId}
        pageSnapshots={project.pageSnapShot}
      />
    </div>
  );
};
