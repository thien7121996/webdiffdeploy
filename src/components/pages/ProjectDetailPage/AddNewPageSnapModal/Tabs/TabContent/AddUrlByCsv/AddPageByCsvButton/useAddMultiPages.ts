import { InfoBaseUrl } from '@/components/pages/ProjectDetailPage/AddNewPageSnapModal';
import { useNotification } from '@/hooks/useNotification';
import { useUpdateDataQuery } from '@/hooks/useUpdateDataQuery';
import { ProjectType } from '@/models/GetProjectType';
import { addPageSnapShot } from '@/services/pageSnapShot';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useParams } from 'next/navigation';
import { useCallback } from 'react';

export const useAddMultiPages = (onClose: () => void) => {
  const params = useParams();
  const updateDataQuery = useUpdateDataQuery();
  const { setNotification } = useNotification();
  const projectId = params?.projectId as string;

  const handleAddPageSnapshot = useCallback(
    async (newUrls: InfoBaseUrl[]) => {
      if (!projectId) {
        return;
      }

      try {
        const response = await addPageSnapShot({
          projectId,
          baseInfo: newUrls,
        });

        updateDataQuery([projectId], (prev: ProjectType) => {
          const newProject = { ...prev };
          const pageSnapshots = newProject.pageSnapShot;
          pageSnapshots.push(...response.data);
        });

        setNotification({
          type: 'success',
          message: 'Add multiple pages successfully',
        });

        onClose();

        return response.data;
      } catch (error) {
        setNotification({
          type: 'error',
          message: ((error as AxiosError).response?.data as string) ?? '',
        });
      }
    },
    [onClose, projectId, setNotification, updateDataQuery]
  );

  const { mutate: addMultiPages, isPending: isAddMultiPagesPending } =
    useMutation({
      mutationFn: handleAddPageSnapshot,
    });

  return {
    addMultiPages,
    isAddMultiPagesPending,
  };
};
