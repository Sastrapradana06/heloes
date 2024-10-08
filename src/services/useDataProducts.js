import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getDataDb, getTopSelling } from "../db/dbService/fetch";
import { insertProductDB } from "../db/dbService/insert";
import { deleteDataDb } from "../db/dbService/delete";
import { updateDataDB } from "../db/dbService/update";

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
    queryFn: () => getDataDb("products", "id"),
    staleTime: 5 * 60 * 1000,
  });
};

export const useTopSelling = () => {
  return useQuery({
    queryKey: ["top-selling"],
    queryFn: () => getTopSelling(),
    staleTime: 5 * 60 * 1000,
  });
};

export const useTambahProduct = () => {
  const tambahSiswa = useMutation({
    mutationFn: (item) => insertProductDB(item),
    onError: (error) => {
      return error;
    },
  });

  return tambahSiswa;
};

export const useDeleteProduct = () => {
  const result = useMutation({
    mutationFn: (id) => deleteDataDb("products", "id", id),
    onError: (error) => {
      return error;
    },
  });

  return result;
};

export const useUpdateProduct = () => {
  const result = useMutation({
    mutationFn: (item) => updateDataDB("products", item, item.id),
    onError: (error) => {
      return error;
    },
  });

  return result;
};
