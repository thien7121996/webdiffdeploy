import db from '@/configs/firebase';
import { useNotification } from '@/hooks/useNotification';
import { useSocket } from '@/hooks/useSocket';
import { useUpdateDataQuery } from '@/hooks/useUpdateDataQuery';
import { CommitPageSnapshotType, CommitType } from '@/models/GetCommitsType';
import { ProjectType } from '@/models/GetProjectType';
import { SCREENSHOT_STATUS_TYPE } from '@/types';
import { doc, updateDoc } from 'firebase/firestore';
import { keyBy } from 'lodash';
import { useParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';

type ProcessStartEventDataType = {
  currentProcessingUrl: string;
  visualCheckId: string;
};

type ProcessEndEventType = {
  updatedPageSnap: CommitPageSnapshotType;
  updatedCommit: CommitType;
  visualCheckId: string;
  pageSnapId: string;
};

type newCreatedCommit = { newCommit: CommitType; visualCheckId: string };

export const useProjectDetailSocket = () => {
  const params = useParams();
  const projectId = params?.projectId as string;
  const updateDataQuery = useUpdateDataQuery();
  const { setNotification } = useNotification();
  const socket = useSocket();

  const handleOnCommitStartEvent = useCallback(() => {
    if (!projectId || !socket) {
      return;
    }

    socket.on(
      `projectId-${projectId}-image-process-start`,
      ({ currentProcessingUrl, visualCheckId }: ProcessStartEventDataType) => {
        updateDataQuery([projectId, 'commits'], (prev: CommitType[]) => {
          const newCommits = [...prev];
          const commitsObject = keyBy(newCommits, 'id');
          commitsObject[visualCheckId].screenshotingUrl = currentProcessingUrl;
          return Object.values(commitsObject);
        });
      }
    );
  }, [projectId, socket, updateDataQuery]);

  const handleOnCommitsEndEvent = useCallback(() => {
    if (!projectId || !socket) {
      return;
    }

    socket.on(
      `projectId-${projectId}-image-process-end`,
      ({
        updatedPageSnap,
        visualCheckId,
        updatedCommit,
        pageSnapId,
      }: ProcessEndEventType) => {
        updateDataQuery([projectId, 'commits'], (prev: CommitType[]) => {
          const newCommits = [...prev];
          const commitsObject = keyBy(newCommits, 'id');

          const newCommit = {
            ...commitsObject[visualCheckId],
            ...updatedCommit,
          };

          const newPageSnapshots = [
            ...commitsObject[visualCheckId].pageSnapshots,
          ];

          const pageSnapshotsObject = keyBy(newPageSnapshots, 'id');
          pageSnapshotsObject[pageSnapId] = updatedPageSnap;

          newCommit.pageSnapshots = Object.values(pageSnapshotsObject);

          commitsObject[visualCheckId] = newCommit;
          return Object.values(commitsObject);
        });
      }
    );
  }, [projectId, socket, updateDataQuery]);

  const getCreatedPageSnaps = useCallback(() => {
    if (!socket) {
      return;
    }

    socket.on(
      `projectId-${projectId}-new-created-commit`,
      ({ newCommit, visualCheckId }: newCreatedCommit) => {
        updateDataQuery([projectId, 'commits'], (prev: CommitType[]) => {
          const newCommits = [...prev];
          const newCommitsObject = keyBy(newCommits, 'id');
          newCommitsObject[visualCheckId] = newCommit;
          return Object.values(newCommitsObject);
        });
        updateDataQuery([projectId], (prev: ProjectType) => {
          const newProject = { ...prev };
          newProject.statusRun = 1;
          return newProject;
        });
      }
    );
  }, [projectId, socket, updateDataQuery]);

  const handleProcessEndCommit = useCallback(() => {
    if (!socket) {
      return;
    }

    socket.on(
      `projectId-${projectId}-run-visual-done`,
      async ({ visualCheckId }: { visualCheckId: string }) => {
        const project = { statusRun: null }; // running, null
        const projectDoc = doc(db, 'projects', projectId);
        updateDoc(projectDoc, {
          ...project,
        });
        updateDataQuery([projectId, 'commits'], (prev: CommitType[]) => {
          const newCommits = [...prev];
          const newCommitsObject = keyBy(newCommits, 'id');
          newCommitsObject[visualCheckId].success++;
          newCommitsObject[visualCheckId].screenshotingUrl = null;
          return Object.values(newCommitsObject);
        });
        updateDataQuery([projectId], (prev: ProjectType) => {
          const newProject = { ...prev };
          newProject.statusRun = null;
          return newProject;
        });
      }
    );
  }, [projectId, socket, updateDataQuery]);

  const handleUpdatePageSnap = useCallback(() => {
    if (!projectId || !socket) {
      return;
    }

    socket.on(
      `projectId-${projectId}-add-page-snapshot`,
      (pageVisualSnapResponse) => {
        updateDataQuery([projectId], (prev: ProjectType) => {
          const newProjects = { ...prev };
          const pageSnapObject = keyBy(newProjects.pageSnapShot, 'id');

          pageSnapObject[pageVisualSnapResponse.pageVisualSnapId].path =
            pageVisualSnapResponse.pageScreenshotPath;

          pageSnapObject[
            pageVisualSnapResponse.pageVisualSnapId
          ].screenshotStatus = pageVisualSnapResponse.status;

          const newPageSnapshots = Object.values(pageSnapObject);
          newProjects.pageSnapShot = newPageSnapshots;

          const isSuccess =
            pageVisualSnapResponse.status === SCREENSHOT_STATUS_TYPE.done;

          setNotification({
            type: isSuccess ? 'success' : 'error',
            message: pageVisualSnapResponse.message,
          });

          return newProjects;
        });
      }
    );
  }, [projectId, setNotification, socket, updateDataQuery]);

  useEffect(() => {
    /** page snapshot */
    handleUpdatePageSnap();

    /** Run commits */
    getCreatedPageSnaps();
    handleProcessEndCommit();
    handleOnCommitsEndEvent();
    handleOnCommitStartEvent();
  }, [
    getCreatedPageSnaps,
    handleOnCommitStartEvent,
    handleOnCommitsEndEvent,
    handleProcessEndCommit,
    handleUpdatePageSnap,
  ]);
};
