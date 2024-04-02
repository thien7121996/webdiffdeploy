export type CreateCommitDocsRequest = {
  projectId: string;
  urlList: string[];
};

export type CreateCommitDocsResponse = {
  message: string;
  data: {
    visualCheckId: string;
  };
};

export type CheckTaskResponse = {
  message: string;
  data: boolean | string;
};
export type CheckTaskRequest = {
  visualCheckId: string;
};
