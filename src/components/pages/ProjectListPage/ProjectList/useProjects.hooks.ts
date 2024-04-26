import { useHandleError } from '@/hooks/useHandleError';
import { getProject } from '@/services/project';
import { Cookie, getCookie } from '@/utils/cookie';
import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

export const useProjects = () => {
  const { handleError } = useHandleError();

  const getListProjects = useCallback(async () => {
    const uuid = getCookie(Cookie.UUID);
    if (!uuid) {
      handleError(new Error('UUID not found'));
      return;
    }

    try {
      const listProject = await getProject(uuid);
      return listProject.data;
    } catch (e) {
      handleError(e);
    }
  }, [handleError]);

  const {
    isLoading: isProjectsLoading,
    isError: isProjectsError,
    data: projects,
  } = useQuery({ queryKey: ['projects'], queryFn: getListProjects });

  return { isProjectsLoading, isProjectsError, projects };
};
