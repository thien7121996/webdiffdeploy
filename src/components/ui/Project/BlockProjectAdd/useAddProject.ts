import { useHandleError } from '@/hooks/useHandleError';
import { useNotification } from '@/hooks/useNotification';
import { useUpdateDataQuery } from '@/hooks/useUpdateDataQuery';
import { ProjectType } from '@/models/project.model';
import { addProject } from '@/services/project';
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';

export const useAddProject = (setCloseModal: () => void) => {
  const { setNotification } = useNotification();
  const { handleError } = useHandleError();

  const updateDataQuery = useUpdateDataQuery();

  const handleUpdateProjects = useCallback(
    (aNew: ProjectType) => {
      updateDataQuery(['projects'], (prev: ProjectType[]) => {
        const newProjects = [...prev];
        newProjects.unshift(aNew);
        return newProjects;
      });
    },
    [updateDataQuery]
  );

  const addNewProject = useCallback(
    async (projectName: string) => {
      try {
        const response = await addProject({ name: projectName });
        handleUpdateProjects(response.data);

        setCloseModal();
        setNotification({
          type: 'success',
          message: 'Create Project successfully',
        });
      } catch (e) {
        handleError(e);
      }
    },
    [handleError, handleUpdateProjects, setCloseModal, setNotification]
  );

  const { mutate: addAProject, isPending: isDeletePending } = useMutation({
    mutationFn: addNewProject,
  });

  return { addAProject, isDeletePending };
};
