import { ProjectType } from '@/models/GetProjectType';
import { getDetailProject } from '@/services/project';
import { useQuery } from '@tanstack/react-query';
import { atom, useSetAtom } from 'jotai';
import { useCallback } from 'react';

export const pageSnapCountAtom = atom(0);

export const useProjectDetail = (projectId: string) => {
  const setPageSnapCount = useSetAtom(pageSnapCountAtom);

  const get = useCallback(async (): Promise<ProjectType | undefined> => {
    try {
      const response = await getDetailProject(projectId);
      setPageSnapCount(response.data.pageSnapShot.length);
      return response.data;
    } catch (error) {
      return;
    }
  }, [projectId, setPageSnapCount]);

  const {
    isError,
    isLoading,
    data: project,
  } = useQuery({
    queryFn: get,
    staleTime: 5000,
    enabled: !!projectId,
    queryKey: [projectId],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return {
    isError,
    isLoading,
    project: project,
  };
};
