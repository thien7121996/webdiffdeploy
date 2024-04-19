import {
  ApproveCommitPageSnapRequest,
  ApproveCommitPageSnapResponse,
} from '@/models/ApproveCommitPageSnap';
import { httpClient } from '@/utils/httpClient';

type DeleteVisualSnapshotRequest = {
  projectId: string;
  pageSnapshotId: string;
  visualSnapshotId: string;
};

const baseRoute = '/page-visual-snapshot';

export const approveCommitPageSnap = async (
  request: ApproveCommitPageSnapRequest
): Promise<ApproveCommitPageSnapResponse> => {
  return await httpClient.post(`${baseRoute}/update-reference`, request);
};

export const deleteVisualSnapshot = async (
  body: DeleteVisualSnapshotRequest
) => {
  return await httpClient.delete(`${baseRoute}/delete`, body);
};
