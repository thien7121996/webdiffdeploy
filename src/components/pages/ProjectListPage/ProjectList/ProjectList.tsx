import { ProjectBlock } from './ProjectBlock';
import { useProjects } from './useProjects.hooks';

export const ProjectList = () => {
  const { isProjectsLoading, isProjectsError, projects } = useProjects();

  return (
    <div className='mx-4 flex flex-wrap justify-start gap-5'>
      {projects?.map((project) => (
        <ProjectBlock key={project.id} project={project} />
      ))}
    </div>
  );
};
