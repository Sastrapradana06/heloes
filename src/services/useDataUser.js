import { useMutation, useQuery } from "@tanstack/react-query";
import { CreateUser, DeleteUser, User, Users } from "../db/dbService/admin";

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
