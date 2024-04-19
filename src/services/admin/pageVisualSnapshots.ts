import { GetVisualSnapshotsResponse } from '@/models/GetVisualSnapshotsType';
import { httpClient } from '@/utils/httpClient';

export const getVisualSnapshots = async (
  request: any
): Promise<GetVisualSnapshotsResponse> => {
  return await httpClient.get('/admin/visual-snapshots', request);
};
