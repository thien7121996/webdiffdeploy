import { rule } from '@/constants/users';
import { getUserInfo } from '@/services/user';

export const handleCheckRole = async (accessToken: string) => {
  try {
    const userInfo = await getUserInfo(accessToken);
    return userInfo.data.rule === rule.ADMIN;
  } catch (error) {
    throw error;
  }
};
