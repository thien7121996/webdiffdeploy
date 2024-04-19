export type ApproveCommitPageSnapRequest = {
  projectId: string;
  commitId: string;
  commitPageSnapId: string;
};

export type ApproveCommitPageSnapResponse = {
  message: string;
  data?: ApproveCommitType;
};

export type ApproveCommitType = {
  projectId: string;
  pageSnapId: string;
  url: string;
  path: string;
};
