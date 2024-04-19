import { getVisualSnapshots } from '@/services/admin/pageVisualSnapshots';
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';

export const useGetCommit = () => {
  const getCommits = useCallback(async (projectId: string, userId: string) => {
    await getVisualSnapshots({ projectId, userId });
  }, []);

  const {} = useMutation({});
};
