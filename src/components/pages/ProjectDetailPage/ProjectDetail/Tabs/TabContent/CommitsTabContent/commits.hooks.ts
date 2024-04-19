import { getCommits } from '@/services/commits';
import { useQuery } from '@tanstack/react-query';
import { atom } from 'jotai';
import { useCallback } from 'react';

export const isVisualSnappingAtom = atom(false);

export const useCommits = (projectId?: string) => {
  const get = useCallback(async (projectId?: string) => {
    if (!projectId) {
      return;
    }

    try {
      const response = await getCommits({ projectId });
      return response.data;
    } catch (error) {
      return;
    }
  }, []);

  const {
    isError,
    isLoading,
    data: commits,
  } = useQuery({
    queryKey: [projectId, 'commits'],
    queryFn: () => get(projectId),
    refetchOnWindowFocus: false,
    enabled: !!projectId,
  });

  return {
    commits,
    isError,
    isLoading,
  };
};
