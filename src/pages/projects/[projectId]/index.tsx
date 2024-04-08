import { Layout } from '@/components/layout';
import { ProjectDetailPage } from '@/components/pages/ProjectDetailPage';
import { NextPageWithLayout } from '@/pages/_app';
import { useParams } from 'next/navigation';
import { ReactNode } from 'react';

const ProjectDetail: NextPageWithLayout = () => {
  const params = useParams();
  const projectId =
    typeof params?.projectId === 'string' ? params.projectId : '';

  return (
    <>
      <section className='pb-[120px] pt-[150px]'>
        <div className='container'>
          {projectId ? (
            <ProjectDetailPage projectId={projectId} />
          ) : (
            <div>Loading</div>
          )}
        </div>
      </section>
    </>
  );
};

export default ProjectDetail;

ProjectDetail.getLayout = (page: ReactNode) => <Layout>{page}</Layout>;
