import { useMutation, useQuery } from "@tanstack/react-query";
import {
  CreateUser,
  DeleteUser,
  UpdateStatusUser,
  UpdateUser,
  User,
  Users,
} from "../db/dbService/admin";

export const useUserLogin = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => User(),
    staleTime: 7 * 60 * 1000,
  });
};

export const useDataUsers = () => {
  return useQuery({
    queryKey: ["data-customers"],
    queryFn: () => Users(),
    staleTime: 7 * 60 * 1000,
  });
};

export const useAddUser = () => {
  const result = useMutation({
    mutationFn: (item) => CreateUser(item),
    onError: (error) => {
      return error;
    },
  });

  return result;
};

export const useDeleteUser = () => {
  const result = useMutation({
    mutationFn: (id) => DeleteUser(id),
    onError: (error) => {
      return error;
    },
  });

  return result;
};

export const useUpdateStatus = () => {
  const result = useMutation({
    mutationFn: (data) => UpdateStatusUser(data.id, data.status),
    onError: (error) => {
      return error;
    },
  });

  return result;
};

export const useUpdateUser = () => {
  const result = useMutation({
    mutationFn: (data) => UpdateUser(data),
    onError: (error) => {
      return error;
    },
  });

  return result;
};
