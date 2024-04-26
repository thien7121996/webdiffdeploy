import { UserUpdateReq } from '@/models/users.model';
import { httpClient } from '@/utils/httpClient';
/**
 * Login
 * @param data
 */

export const listAllUser = (): Promise<any> => {
  return httpClient.get(`/admin/users`);
};

export const getUserDetail = (userId: string): Promise<any> => {
  return httpClient.get(`/admin/users/${userId}`);
};

export const updateUserInfo = (updateData: UserUpdateReq): Promise<any> => {
  return httpClient.post(
    `/admin/users/${updateData.userId}/update`,
    updateData
  );
};

export const deleteUserInfo = (userId: string): Promise<any> => {
  return httpClient.delete(`/admin/users/${userId}/delete`);
};
