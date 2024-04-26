import { AddNewProjectRequest } from '@/models/AddNewProjectType';
import { GetProjectResponseType } from '@/models/GetProjectType';
import { GetProjectsResponseType } from '@/models/GetProjectsType';
import { httpClient } from '@/utils/httpClient';

export const addProject = (request: AddNewProjectRequest): Promise<any> => {
  return httpClient.post(`/project/create`, request);
};

export const getProject = (
  userId: string
): Promise<GetProjectsResponseType> => {
  return httpClient.get(`/project/get?userid=${userId}`);
};

export const deleteProject = (projectId: string): Promise<any> => {
  return httpClient.post(`/project/delete`, { projectId });
};

export const getDetailProject = (
  projectId: string
): Promise<GetProjectResponseType> => {
  return httpClient.get(`/project/detail?projectid=${projectId}`);
};
