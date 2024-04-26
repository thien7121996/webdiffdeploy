export type User = {
  id?: string;
  userName: string;
  email: string;
  password: string;
  type: number;
  status: number;
};

export type UserInfo = {
  email: string;
  createdAt: string;
  emailVerified: boolean;
  lastLoginAt: string;
  lastRefreshAt: string;
  localId: string;
};

export type UserInfoAuth = {
  uid: string;
  email: string;
  emailVerified: boolean;
  disabled: boolean;
  metadata?: {
    lastSignInTime?: string;
    creationTime?: string;
    lastRefreshTime?: string;
  };
  passwordHash: string;
  passwordSalt: string;
  tokensValidAfterTime: string;
  providerData: [
    {
      uid: string;
      email: string;
      providerId: string;
    },
  ];
  status: number;
  type: number;
  rule: number;
  newPassword?: string;
  userId: string;
};

export type UserUpdateReq = {
  email: string;
  userId: string;
  newPassword?: string;
  rule: number;
  type: number;
};
