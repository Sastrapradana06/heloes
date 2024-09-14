import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getDataDb } from "../db/dbService";
import { inserDataDb } from "../db/dbService/insert";

export function useInvalidate() {
  const query = useQueryClient();

  const invalidateListQuery = async (key) => {
    await query.invalidateQueries([key]);
  };

  return { invalidateListQuery };
}

export const useDataProducts = () => {
  return useQuery({
    queryKey: ["data-products"],
    queryFn: () => getDataDb("products"),
    staleTime: 5 * 60 * 1000,
  });
};

export const useTambahProduct = () => {
  const tambahSiswa = useMutation({
    mutationFn: (item) => inserDataDb("products", item),
    onError: (error) => {
      return error;
    },
  });

  return tambahSiswa;
};
