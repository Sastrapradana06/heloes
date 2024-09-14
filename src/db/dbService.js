import { supabase } from "./supabase";

export const getDataDb = async (db) => {
  const { data, error } = await supabase.from(db).select();
  if (error) return null;
  return data;
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

export const inserDataDb = async (db, data) => {
  const { error } = await supabase.from(db).insert(data);
  console.log({ error });

  if (error) {
    return {
      status: false,
      message: error.code == "23505" ? "Email sudah terdaftar" : error.message,
    };
  }
  return { status: true, message: "Success" };
};
