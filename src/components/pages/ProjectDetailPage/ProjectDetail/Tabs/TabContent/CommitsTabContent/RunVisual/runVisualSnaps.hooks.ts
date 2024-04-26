import { RunVisualSnapshotsRequest } from '@/models/RunVisualSnapshotsType';
import {
  createVisualSnapshotDocs,
  runVisualSnapshots,
} from '@/services/runVisualSnapshot';
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';

export const useVisualSnaps = (projectId: string) => {
  const run = useCallback(
    async (projectId?: string, visualCheckId?: string) => {
      if (!projectId || !visualCheckId) {
        return;
      }

      try {
        await runVisualSnapshots({ projectId, visualCheckId });
      } catch (error) {
        // do nothing
      }
    },
    []
  );

  const {
    mutate: runVisualSnap,
    isError,
    isPending,
  } = useMutation({
    mutationFn: (request: RunVisualSnapshotsRequest) =>
      run(request.projectId, request.visualCheckId),
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.log(error.message);
    },
  });

  const createDocs = useCallback(
    async (projectId?: string) => {
      try {
        if (!projectId) {
          return;
        }

        const response = await createVisualSnapshotDocs({ projectId });

        runVisualSnap({
          projectId,
          visualCheckId: response.data.visualCheckId,
        });
      } catch (error) {
        throw error;
      }
    },
    [runVisualSnap]
  );

  const { mutate: createCommitDocs } = useMutation({
    mutationFn: () => createDocs(projectId),
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.log(error.message);
    },
    onSettled: () => {
      // do nothing
    },
  });

  return {
    isError,
    isPending,
    createCommitDocs,
  };
};
