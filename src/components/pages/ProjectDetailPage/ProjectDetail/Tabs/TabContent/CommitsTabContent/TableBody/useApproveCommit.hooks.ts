import { useNotification } from '@/hooks/useNotification';
import { useUpdateDataQuery } from '@/hooks/useUpdateDataQuery';
import {
  ApproveCommitPageSnapRequest,
  ApproveCommitPageSnapResponse,
} from '@/models/ApproveCommitPageSnap';
import { ProjectType } from '@/models/GetProjectType';
import { approveCommitPageSnap } from '@/services/visualSnapshot';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { keyBy } from 'lodash';
import { useParams } from 'next/navigation';
import { useCallback } from 'react';

export const useApproveCommit = () => {
  const params = useParams();
  const projectId = params?.projectId as string;
  const { setNotification } = useNotification();
  const updateDataQuery = useUpdateDataQuery();

  const onSuccess = useCallback(
    (response: ApproveCommitPageSnapResponse) => {
      setNotification({ type: 'success', message: response.message });

      if (!response.data) {
        return;
      }

      const { projectId, pageSnapId, path } = response.data;

      updateDataQuery([projectId], (prev: ProjectType) => {
        const newProject = { ...prev };
        const pageSnapshotsObject = keyBy(newProject.pageSnapShot, 'id');
        pageSnapshotsObject[pageSnapId].path = path;
        newProject.pageSnapShot = Object.values(pageSnapshotsObject);
        return newProject;
      });
    },
    [setNotification, updateDataQuery]
  );

  const approve = useCallback(
    async (projectId: string, commitId: string, commitPageSnapId: string) => {
      try {
        const response = await approveCommitPageSnap({
          projectId,
          commitId,
          commitPageSnapId,
        });

        onSuccess(response);
      } catch (error) {
        if (error instanceof AxiosError) {
          setNotification({
            type: 'error',
            message: error.response?.data ?? 'Approve failed',
          });
        }
      }
    },
    [onSuccess, setNotification]
  );

  const { mutate, isPending } = useMutation({
    mutationFn: ({
      commitId,
      commitPageSnapId,
    }: Omit<ApproveCommitPageSnapRequest, 'projectId'>) =>
      approve(projectId, commitId, commitPageSnapId),
  });

  return { handleApprove: mutate, isLoading: isPending };
};
