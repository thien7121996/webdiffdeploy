import { useNotification } from '@/hooks/useNotification';
import { useUpdateDataQuery } from '@/hooks/useUpdateDataQuery';
import { ProjectType } from '@/models/GetProjectType';
import { deletePageSnapShot } from '@/services/pageSnapShot';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useCallback, useState } from 'react';

export const useAdminPageSnap = () => {
  const [pageSnapId, setPageSnapId] = useState('');

  const params = useParams();
  const projectId = params?.projectId as string;
  const { setNotification } = useNotification();

  const updateDataQuery = useUpdateDataQuery();

  const updateQuery = useCallback(() => {
    updateDataQuery(['projects', projectId], (prev: ProjectType) => {
      const newProjectDetail = { ...prev };
      const pageSnapshots = [...prev.pageSnapShot];
      newProjectDetail.pageSnapShot = pageSnapshots.filter(
        (pageSnap) => pageSnap.id !== pageSnapId
      );

      return newProjectDetail;
    });
  }, [pageSnapId, projectId, updateDataQuery]);

  const handleSuccess = useCallback(() => {
    updateQuery();
    setNotification({ type: 'success', message: 'Delete success' });
  }, [setNotification, updateQuery]);

  const handleError = useCallback(() => {
    setNotification({ type: 'error', message: 'Delete error' });
  }, [setNotification]);

  const handleDeletePageSnap = useCallback(
    async (pageSnapShotId?: string) => {
      if (!projectId || !pageSnapShotId) {
        handleError();
        return;
      }

      try {
        setPageSnapId(pageSnapShotId);
        await deletePageSnapShot(projectId, pageSnapShotId);
      } catch (error) {}
    },
    [handleError, projectId]
  );

  const { mutate: deletePageSnap, isPending } = useMutation({
    mutationFn: handleDeletePageSnap,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  return {
    deletePageSnap,
    isPending,
  };
};
