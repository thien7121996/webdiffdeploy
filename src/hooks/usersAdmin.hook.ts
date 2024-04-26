'use client';
import { useNotification } from '@/hooks/useNotification';
import { useUpdateDataQuery } from '@/hooks/useUpdateDataQuery';
import { UserInfoAuth, UserUpdateReq } from '@/models/users.model';
import {
  deleteUserInfo,
  getUserDetail,
  listAllUser,
  updateUserInfo,
} from '@/services/admin/users';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useCallback } from 'react';

export const useAdminUsers = () => {
  const { setNotification } = useNotification();

  const updateDataQuery = useUpdateDataQuery();
  const deleteQuery = useCallback(
    (userId: string) => {
      updateDataQuery(['users'], (prev: UserInfoAuth[]) => {
        const users = [...prev];
        const newUser = users.filter((user) => user.uid !== userId);

        return newUser;
      });
    },
    [updateDataQuery]
  );

  const updateQuery = useCallback(
    (userDataNew: UserInfoAuth) => {
      updateDataQuery(['users'], (prev: UserInfoAuth[]) => {
        return prev.map((user) => {
          if (user.uid === userDataNew.uid) {
            return userDataNew;
          }
          // Nếu không, giữ nguyên user
          return user;
        });
      });
    },
    [updateDataQuery]
  );
  const handleGetUsers = async () => {
    try {
      const usersData = await listAllUser();
      return usersData.data;
    } catch (error) {
      const errorMessage = (error as AxiosError).response?.data as string;
      setNotification({ type: 'error', message: errorMessage });
      return [];
    }
  };

  const handleUpdateUsers = async (dataUpdate: UserUpdateReq) => {
    try {
      const usersData = await updateUserInfo(dataUpdate);
      const userInfo = await handleGetDetailUser(dataUpdate.userId);
      updateQuery(userInfo);
      setNotification({
        type: 'success',
        message: 'Update user success',
      });
    } catch (error) {
      const errorMessage = (error as AxiosError).response?.data as string;
      setNotification({ type: 'error', message: errorMessage });
      return [];
    }
  };

  const handleGetDetailUser = async (userId: string) => {
    try {
      const usersData = await getUserDetail(userId);
      return usersData.data;
    } catch (error) {
      const errorMessage = (error as AxiosError).response?.data as string;
      setNotification({ type: 'error', message: errorMessage });
      return [];
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      const result = await deleteUserInfo(userId);
      deleteQuery(userId);
      setNotification({
        type: 'success',
        message: 'Delete user successfully',
      });
    } catch (error) {
      const errorMessage = (error as AxiosError).response?.data as string;
      setNotification({ type: 'error', message: errorMessage });
      return [];
    }
  };

  const { isLoading, data: users } = useQuery({
    refetchOnWindowFocus: false,
    queryFn: handleGetUsers,
    queryKey: ['users'],
  });
  const { isPending: isPendingUpdate, mutate: updateUser } = useMutation({
    mutationFn: handleUpdateUsers,
  });

  const { isPending: isPendingDelete, mutate: deleteUser } = useMutation({
    mutationFn: handleDeleteUser,
  });

  return {
    isLoading,
    users,
    isPendingUpdate,
    updateUser,
    isPendingDelete,
    deleteUser,
  };
};
