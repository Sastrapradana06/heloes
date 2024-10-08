import { supabase } from "../supabase";

export const getDataDb = async (db, order) => {
  const { data, error } = await supabase
    .from(db)
    .select()
    .order(order, { ascending: false });
  if (error) return null;
  return data;
};

export const getTopSelling = async () => {
  const { data, error } = await supabase
    .from("products")
    .select()
    .order("sales", { ascending: false });
  if (error) return null;
  const filter = data.filter((item) => item.sales !== 0);
  return filter;
};

export const getDataDbWithKey = async (db, key, value) => {
  const { data, error } = await supabase.from(db).select().eq(key, value);

  if (error) return null;

  if (data.length === 0) return null;
  return data[0];
};

export const getDataCustomer = async () => {
  const { data, error } = await supabase.from("user").select();
  if (error) return [];
  const filter = data.filter((item) => item.role === "customer");
  return filter;
};
