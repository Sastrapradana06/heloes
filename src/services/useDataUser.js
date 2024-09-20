import { useQuery } from "@tanstack/react-query";
import { User, Users } from "../db/dbService/auth";

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
