import { AdminDeleteProjectRequest } from '@/models/AdminDeleteProject';
import {
  GetProjectRequestType,
  GetProjectResponseType,
} from '@/models/GetProjectType';
import { httpClient } from '@/utils/httpClient';

export const getProject = async (
  request: GetProjectRequestType
): Promise<GetProjectResponseType> => {
  return await httpClient.get(`/admin/project`, request);
};

export const deleteProject = async (request: AdminDeleteProjectRequest) => {
  return await httpClient.delete(`/admin/projects/${request.projectId}`);
};
