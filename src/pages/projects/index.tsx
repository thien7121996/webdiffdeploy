import { Layout } from '@/components/layout';
import Breadcrumb from '@/components/pages/Common/Breadcrumb';
import { ProjectListPage } from '@/components/pages/ProjectListPage';
import { NextPageWithLayout } from '@/pages/_app';
import { ReactNode } from 'react';

const Projects: NextPageWithLayout = () => {
  return (
    <>
      <Breadcrumb
        pageName='Management Projects'
        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius eros eget sapien consectetur ultrices. Ut quis dapibus libero.'
      />
      <ProjectListPage />
    </>
  );
};

export default Projects;

Projects.getLayout = (page: ReactNode) => <Layout>{page}</Layout>;
