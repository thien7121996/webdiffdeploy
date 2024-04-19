'use client';
import { useScreenshotPage } from '@/components/pages/ProjectDetailPage/AddNewPageSnapModal/useScreenshotPage';
import { useNotification } from '@/hooks/useNotification';
import { useUpdateDataQuery } from '@/hooks/useUpdateDataQuery';
import { ProjectType } from '@/models/GetProjectType';
import { SCREENSHOT_STATUS_TYPE } from '@/types';
import { AxiosError } from 'axios';
import { keyBy } from 'lodash';
import { useParams } from 'next/navigation';
import { useCallback } from 'react';

export const useUpdateScreenshot = () => {
  const { screenshot, isScreenshotPending } = useScreenshotPage();
  const params = useParams();
  const projectId = params?.projectId as string;

  const updateDataQuery = useUpdateDataQuery();
  const { setNotification } = useNotification();

  const handleUpdateScreenshot = useCallback(
    async (pageSnapshotId: string) => {
      if (!projectId) {
        return;
      }

      try {
        updateDataQuery([projectId], (prev: ProjectType) => {
          const newProject = { ...prev };
          const pageSnapshotsObject = keyBy(newProject.pageSnapShot, 'id');
          pageSnapshotsObject[pageSnapshotId].screenshotStatus =
            SCREENSHOT_STATUS_TYPE.doing;
          newProject.pageSnapShot = Object.values(pageSnapshotsObject);
          return newProject;
        });

        screenshot(pageSnapshotId);
      } catch (error) {
        if (error instanceof AxiosError) {
          setNotification({
            type: 'error',
            message: error.response?.data.message ?? '',
          });
        }
      }
    },
    [projectId, screenshot, setNotification, updateDataQuery]
  );

  return { handleUpdateScreenshot, isScreenshotPending };
};
