import { useNotification } from '@/hooks/useNotification';
import { useUpdateDataQuery } from '@/hooks/useUpdateDataQuery';
import { ProjectType } from '@/models/GetProjectType';
import { deleteProject } from '@/services/admin/project';
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';

export const useProjectArticle = () => {
  const { setNotification } = useNotification();

  const updateDataQuery = useUpdateDataQuery();

  const updateQuery = useCallback(
    (projectId: string) => {
      updateDataQuery(['projects'], (prev: ProjectType[]) => {
        const projects = [...prev];
        const newProject = projects.filter(
          (project) => project.id !== projectId
        );

        return newProject;
      });
    },
    [updateDataQuery]
  );

  const handleDeleteProject = useCallback(
    async (projectId: string) => {
      try {
        await deleteProject({ projectId });
        updateQuery(projectId);
        setNotification({
          type: 'success',
          message: 'Delete project successfully',
        });
      } catch (error) {
        setNotification({ type: 'error', message: 'Delete project failed' });
      }
    },
    [setNotification, updateQuery]
  );

  const { isPending: isDeleteProjectPending, mutate: onDeleteProject } =
    useMutation({ mutationFn: handleDeleteProject });

  return { onDeleteProject, isDeleteProjectPending };
};
