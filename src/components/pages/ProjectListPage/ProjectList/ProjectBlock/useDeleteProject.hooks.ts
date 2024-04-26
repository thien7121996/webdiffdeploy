import { useNotification } from '@/hooks/useNotification';
import { useUpdateDataQuery } from '@/hooks/useUpdateDataQuery';
import { ProjectType } from '@/models/GetProjectType';
import { deleteProject } from '@/services/project';
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';

export const useDeleteProject = () => {
  const { setNotification } = useNotification();
  const updateQueryData = useUpdateDataQuery();

  const handleUpdateQueryData = useCallback(
    (projectId: string) => {
      updateQueryData(['projects'], (prev: ProjectType[]) => {
        const projects = [...prev];
        const newProjects = projects.filter(
          (project) => project.id !== projectId
        );
        return newProjects;
      });
    },
    [updateQueryData]
  );

  const handleDeleteProject = async (projectId: string) => {
    try {
      await deleteProject(projectId);
      handleUpdateQueryData(projectId);
      setNotification({
        type: 'success',
        message: 'Delete project successfully!',
      });
    } catch (error) {
      setNotification({
        type: 'fail',
        message: 'Delete project fail!',
      });
    }
  };

  const { isPending: isDeleteProjectPending, mutate: onDeleteProject } =
    useMutation({
      mutationFn: handleDeleteProject,
    });

  return { isDeleteProjectPending, onDeleteProject };
};
