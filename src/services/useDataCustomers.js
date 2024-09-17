import { useQuery } from "@tanstack/react-query";
import { getDataCustomer } from "../db/dbService/fetch";

export const useDataCustomers = () => {
  return useQuery({
    queryKey: ["data-customers"],
    queryFn: () => getDataCustomer(),
    staleTime: 5 * 60 * 1000,
  });
};
