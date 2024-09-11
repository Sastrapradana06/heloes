import { supabase } from "./supabase";

export const getDataDb = async (db) => {
  const { data, error } = await supabase.from(db).select();
  if (error) return [];
  return data;
};

export const getDataCustomer = async () => {
  const { data, error } = await supabase.from("user").select();
  if (error) return [];
  const filter = data.filter((item) => item.role === "customer");
  return filter;
};
