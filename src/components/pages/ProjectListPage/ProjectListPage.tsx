import { FC } from 'react';

import { BlockProjectAdd } from '@/components/ui/Project/BlockProjectAdd';

import { ProjectList } from './ProjectList';

export const ProjectListPage: FC = () => {
  return (
    <section className='container pb-[120px]'>
      <BlockProjectAdd />
      <ProjectList />
    </section>
  );
};
